Evan's Personal Webpage

[evanstpierre.com](https://www.evanstpierre.com/)

## Getting Started

To run the development server:

```bash
# Build & run the dev env
docker compose --profile dev up -d --build next-dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If port 3000 is already in use, choose another host port:

```bash
DEV_PORT=3001 docker compose --profile dev up -d --build next-dev
```

Then open [http://localhost:3001](http://localhost:3001).

## Production

Pushes to the default branch (`main`) and manual runs on that branch publish
`ghcr.io/evanstpierre/evans-website:sha-<full SHA>` and deploy its immutable digest.
If the default branch changes, update the workflow push filter. Production uses
`docker-compose.prod.yml`; local development still uses `docker-compose.yml`.
Builds run on GitHub's AMD64 runners with Buildx layer caching. MongoDB and tunnel
credentials stay in the server's `.env` and are excluded from the build context.

Configure repository Actions secrets:

- `DEPLOY_SSH_KEY`: dedicated private key authorized on the server.
- `DEPLOY_KNOWN_HOSTS`: SSH host keys verified through a trusted channel. For a
  nonstandard port the entry must use `[host]:port`. Do not trust an unverified
  `ssh-keyscan` result.

Configure repository Actions variables:

| Variable | Value |
| --- | --- |
| `DEPLOY_HOST` | Public SSH hostname or IPv4 address |
| `DEPLOY_PORT` | SSH port, defaults to `22` |
| `DEPLOY_USER` | Deployment user |
| `DEPLOY_PATH` | Absolute existing directory, e.g. `/srv/evans-website` |
| `DEPLOY_COMPOSE_PROJECT` | Existing Compose project name |

Use paths without spaces or shell metacharacters. The workflow serializes
production runs without cancelling an active deployment. The server also uses
`flock` to prevent concurrent deploy scripts.

### Server setup and first rollout

1. Confirm `uname -m` reports `x86_64`, Bash and `flock` are installed, Docker
   works for the deployment user, and `docker compose up --help` includes `--wait`
   and `--wait-timeout`. Allow SSH from GitHub-hosted runners.
2. Authorize the deployment key and grant the user access to Docker and the
   deployment directory. Keep the existing `.env` (including `MONGODB_URI` and
   `TUNNEL_TOKEN`) there, with mode `600`. Preserve the existing Compose project
   name; find it with `docker inspect next-prod --format
   '{{ index .Config.Labels "com.docker.compose.project" }}'`.
3. As that user, authenticate Docker to GHCR with a classic GitHub PAT granting
   `read:packages`: `docker login ghcr.io -u evanstpierre --password-stdin`.
   Supply the PAT on stdin through your secret manager. Keep Docker's credential
   store outside the repository. New GHCR packages default to private; verify
   this package is private and linked to this repository in GitHub package
   settings, including if it already exists. Grant this repository Actions access
   if necessary. See [GHCR authentication and visibility](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).
4. Check `df -h` and `docker system df` for space for a candidate plus the current
   and previous images. Never globally prune Docker as part of deployment.
5. Before the first deployment, seed a rollback release from the running app.
   Copy this repository's `docker-compose.prod.yml` to the deployment directory,
   then run there, substituting the existing project name:

   ```bash
   umask 077
   mkdir -p releases/initial
   cp docker-compose.prod.yml releases/initial/compose.yml
   docker inspect next-prod --format '{{.Image}}' > releases/initial/image
   ln -s releases/initial current
   APP_IMAGE=$(cat current/image) docker compose --env-file .env -p EXISTING_PROJECT \
     -f current/compose.yml --profile prod config --quiet
   ```

   The captured local image ID works without a registry pull for rollback. Keep
   that image locally. Verify the running website is healthy before seeding.
   The first rollback also applies the new HTTP health check to the old image.
6. Leave the existing tunnel running. For a new server, seed `current` with a
   known healthy published image and matching Compose file, then bootstrap both
   services once:

   ```bash
   APP_IMAGE=$(cat current/image) docker compose --env-file .env -p EXISTING_PROJECT \
     -f current/compose.yml --profile prod up -d --no-build --wait --wait-timeout 120
   ```

7. Push to `main` or manually run the workflow. SSH transfers only the script and
   production Compose file; the server needs no Git checkout or Node toolchain.

### Updates, recovery, and acceptance

The script validates Compose and pulls only `next-prod` before replacing it.
It starts the app with `--no-build --no-deps --wait --wait-timeout 120`, leaving
the tunnel running. An HTTP 200 from `/` is required. A failed startup restores
the saved Compose configuration and image without pulling, verifies health, and
returns failure to Actions. If rollback also fails, the job explicitly reports
it and requires server investigation. Failed validation or pulls leave the
running app untouched. Container replacement causes a short interruption.

`current` records the last healthy image and Compose configuration; `previous`
records its predecessor. Failed candidate directories and uploaded `incoming-*`
directories remain for diagnosis. Keep both referenced images and their release
directories. To reclaim space, inspect `docker image ls --digests
ghcr.io/evanstpierre/evans-website` and `cat current/image previous/image`, then
remove only explicitly identified older, unused app image references with
`docker image rm IMAGE_REFERENCE`. Never use forced removal or global pruning.

Before considering rollout complete:

- Confirm the Actions build succeeds with no runtime secrets, the package is
  private, and its manifest includes `linux/amd64`.
- Run a second build and check Buildx logs for cached layers.
- Verify Docker health and the public site at https://www.evanstpierre.com/.
- In a maintenance window, deploy a deliberately unhealthy test image by digest
  using `bash scripts/deploy.sh IMAGE DEPLOY_PATH PROJECT COMPOSE_FILE`; verify
  a nonzero exit, a healthy restored container, and unchanged `current`.
- Test an unavailable digest and a failing CI build; confirm the running
  container is unchanged. Inspect deployment logs to confirm the server only
  pulls/runs images and never invokes a build.

Publishing follows GitHub's [Docker publishing workflow](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images).

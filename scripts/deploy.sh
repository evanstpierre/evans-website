#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

# Usage: deploy.sh IMAGE DEPLOY_PATH COMPOSE_PROJECT COMPOSE_SOURCE
image=${1:?image required}
root=${2:?deployment directory required}
project=${3:?Compose project required}
source_config=${4:?Compose source required}
[[ $image =~ ^ghcr\.io/evanstpierre/evans-website@sha256:[a-f0-9]{64}$ ]] || {
  echo 'Expected the published GHCR digest' >&2; exit 1;
}
cd "$root"
root=$PWD
test -f .env
mkdir -p releases
exec 9> .deploy.lock
flock -n 9 || { echo 'Another deployment is active' >&2; exit 1; }
release=$(mktemp -d "$root/releases/release.XXXXXXXX")
cp "$source_config" "$release/compose.yml"
printf '%s\n' "$image" > "$release/image"

compose() {
  local dir=$1
  shift
  APP_IMAGE=$(cat "$dir/image") docker compose --project-directory "$root" \
    --env-file "$root/.env" -p "$project" -f "$dir/compose.yml" --profile prod "$@"
}

# Do not modify the running container until validation and pull succeed.
compose "$release" config --quiet
compose "$release" pull next-prod
test -L current || { echo 'Seed current rollback release first; see README' >&2; exit 1; }
previous=$(readlink -f current)
test -f "$previous/image"
test -f "$previous/compose.yml"
compose "$previous" config --quiet

if compose "$release" up -d --no-build --no-deps --wait --wait-timeout 120 next-prod; then
  ln -sfn "$previous" previous
  ln -sfn "$release" current
  echo "Deployed $image"
else
  echo 'Candidate failed; restoring last successful release' >&2
  if compose "$previous" up -d --no-build --no-deps --pull never --wait --wait-timeout 120 next-prod; then
    echo 'Previous release is healthy again' >&2
  else
    echo 'ROLLBACK FAILED: inspect Docker on the server immediately' >&2
  fi
  exit 1
fi

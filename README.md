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

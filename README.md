Evan's Personal Webpage

## Getting Started

To run the development server:

```bash
# Build & run the dev target (hot reload, polling on)
docker build -t myapp:dev --target dev .
docker run --rm -p 3000:3000 -v "$PWD":/app -v /app/node_modules myapp:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


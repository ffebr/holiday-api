FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lock /app/
RUN bun install --frozen-lockfile

COPY . /app/

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

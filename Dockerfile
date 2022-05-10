FROM node:14-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@reputable/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:14-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM node:14-alpine AS sourcer
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
CMD yarn turbo run build --scope=@reputable/api

FROM sourcer as deployer
RUN apk update
WORKDIR /app
COPY --from=sourcer /app/apps/api/dist/ .
EXPOSE 4000
CMD ["node","main.js"]
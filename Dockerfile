FROM node:14-alpine
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@reputable/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:14-alpine
RUN apk update
WORKDIR /app
COPY --from=0 /app/out/json/ .
RUN yarn install

FROM node:14-alpine
RUN apk update
WORKDIR /app
COPY --from=1 /app/ .
COPY --from=0 /app/out/full/ .
EXPOSE 4000
CMD yarn turbo run start:prod
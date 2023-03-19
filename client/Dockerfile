# Stage 1
FROM node:16.19-alpine3.16 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


# Stage 2
FROM nginx:1.21.3-alpine
WORKDIR /usr/share/nginx/html
ENV key=value
RUN rm -rf ./*
COPY --from=builder /app/build . 
CMD ["nginx", "-g", "daemon off;"]

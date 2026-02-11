FROM node:18-alpine as builder
WORKDIR /app

COPY . ./

RUN npm install --legacy-peer-deps

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
ENV NODE_ENV=production
CMD ["serve", "-s", "build", "-l", "3000"]

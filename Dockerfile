FROM node:lts-alpine as builder


WORKDIR /my-react
COPY . /my-react
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run dev

EXPOSE 3008
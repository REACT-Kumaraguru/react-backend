FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Same-origin /api and /uploads via nginx — leave VITE_API_URL unset
ENV VITE_API_URL=
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-map-forwarded-proto.conf /etc/nginx/conf.d/00-map-forwarded-proto.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

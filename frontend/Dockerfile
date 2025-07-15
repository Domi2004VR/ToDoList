# Fase 1: Build
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Fase 2: Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# ✅ Aggiungi questa riga:
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
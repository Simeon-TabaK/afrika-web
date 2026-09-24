# Étape 1 : Build de l'application Vite
FROM node:22-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

RUN npm ci

# Variables d'environnement pour le build Vite (si fournies en build-arg)
ARG VITE_API_URL
ARG VITE_BACKEND_URL
ARG VITE_APP_NAME
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

# Copie du code source
COPY . .

# Compilation de l'application
RUN npm run build

# Étape 2 : Serveur Nginx de production
FROM nginx:alpine

# Copie de la configuration Nginx optimisée pour SPA React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers compilés depuis l'étape de build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

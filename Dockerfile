# =====================================================================
# ÉTAPE 1 : Build de l'application Vite (Node.js)
# =====================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copie des manifestes de dépendances
COPY package*.json ./
RUN npm ci --frozen-lockfile

# ===========================================================================
# IMPORTANT COOLIFY : Variables de build Vite (injectées au moment du build)
# Dans Coolify > Environment Variables, cochez "Build Variable" pour ces clés.
# ===========================================================================
ARG VITE_API_URL
ARG VITE_BACKEND_URL
ARG VITE_APP_NAME=Afri'Ka
ENV VITE_API_URL=$VITE_API_URL \
    VITE_BACKEND_URL=$VITE_BACKEND_URL \
    VITE_APP_NAME=$VITE_APP_NAME

# Copie du code source et build de production
COPY . .
RUN npm run build

# =====================================================================
# ÉTAPE 2 : Serveur Nginx de production (image légère Alpine)
# =====================================================================
FROM nginx:1.27-alpine

# Suppression de la config Nginx par défaut
RUN rm -f /etc/nginx/conf.d/default.conf

# Config Nginx SPA optimisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers statiques compilés par Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Health check pour Coolify / Docker Swarm
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost/healthz || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Deploiement Coolify — Afri'Ka

## Architecture

```
Coolify Server
- afri-ka-backend  : Django DRF (Docker, port 8000) + PostgreSQL
- afri-ka-web      : Vite + React (Docker, Nginx port 80)
```

---

## PARTIE 1 — Backend Django DRF (afri-ka-backend)

### Etape 1 : Creer l'application Coolify

- Applications > New Application > Git Repository
- Branch : main
- Build Pack : Dockerfile
- Root Directory : /afri-ka-backend (si monorepo) ou /
- Port : 8000

### Etape 2 : Variables d'environnement OBLIGATOIRES

Copiez dans Coolify > Environment Variables :

```
# Django Core
SECRET_KEY=une-cle-secrete-unique-50-chars-minimum
DEBUG=False
ALLOWED_HOSTS=api.afri-ka.com,votre-serveur.com
CSRF_TRUSTED_ORIGINS=https://api.afri-ka.com,https://afri-ka.com

# Base de données
DATABASE_URL=postgres://user:password@host:5432/afrikadb

# CORS (origines frontend autorisées)
CORS_ALLOWED_ORIGINS=https://afri-ka.com,https://www.afri-ka.com

# Cloudinary (stockage médias)
CLOUD_NAME=votre_cloud_name
API_KEY=votre_api_key
API_SECRET=votre_api_secret

# Email SMTP
EMAIL_HOST_USER=notifications@afri-ka.com
EMAIL_HOST_PASSWORD=mot_de_passe_app_email

# Twilio (SMS/OTP)
TWILIO_SID=ACxxxxxxxxxxxx
TWILIO_TOKEN=votre_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Pawapay (Mobile Money)
PAWAPAY_API_KEY=votre_pawapay_key

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com

# Firebase Push Notifications
FCM_SERVER_KEY=votre_fcm_key

# Gunicorn (optionnel)
GUNICORN_WORKERS=3
GUNICORN_THREADS=2
GUNICORN_TIMEOUT=120
```

### Etape 3 : PostgreSQL

Option A (recommande) — Ressource Coolify geree :
1. Resources > New > PostgreSQL 16
2. Coolify fournit DATABASE_URL automatiquement
3. Liez-la via Linked Resources a votre application

Option B — PostgreSQL externe :
- Saisissez manuellement DATABASE_URL dans les variables

### Etape 4 : Domaine et HTTPS

- Domains > api.afri-ka.com
- Let's Encrypt active automatiquement par Coolify/Traefik

### Etape 5 : Health Check

- Health Check URL : /api/v1/
- Interval : 30s / Timeout : 10s

---

## PARTIE 2 — Frontend Vite/React (afri-ka-web)

### Etape 1 : Creer l'application Coolify

- Applications > New Application > Git Repository
- Build Pack : Dockerfile
- Root Directory : /afri-ka-web (si monorepo) ou /
- Port : 80

### Etape 2 : Variables d'environnement

!!! CRITIQUE : Les variables VITE_* sont injectees au BUILD, pas a l'execution.
Dans Coolify, cochez imperativement "Build Variable" pour chaque VITE_*.

```
VITE_API_URL=https://api.afri-ka.com/api/v1       [BUILD VARIABLE ✓]
VITE_BACKEND_URL=https://api.afri-ka.com           [BUILD VARIABLE ✓]
VITE_APP_NAME=Afri'Ka                              [BUILD VARIABLE ✓]
```

### Etape 3 : Domaine et HTTPS

- Domains > afri-ka.com
- Let's Encrypt active automatiquement

### Etape 4 : Health Check

- Health Check URL : /healthz
- Interval : 30s

---

## Deploiement automatique CI/CD

```
Git push main
  → Webhook Coolify
    → Build Docker
      → entrypoint.sh:
          1. python manage.py migrate --noinput
          2. python manage.py collectstatic --noinput
          3. gunicorn config.wsgi:application
```

Configurer le webhook :
1. Coolify > Application > Webhooks > Copier l'URL
2. GitHub/GitLab > Settings > Webhooks > Add webhook
3. Event : Push on main branch

---

## Fichiers crees / modifies

### afri-ka-backend/
- Dockerfile          : Python 3.12-slim avec entrypoint
- entrypoint.sh       : migrate + collectstatic + gunicorn au demarrage
- .dockerignore       : Exclut .venv, __pycache__, .env, db.sqlite3
- .env.example        : Template documente de toutes les variables
- docker-compose.yml  : Dev local avec PostgreSQL + healthcheck
- requirements.txt    : Converti UTF-8 + dj-database-url ajoute
- config/settings.py  : DATABASE_URL, ALLOWED_HOSTS, CORS, WhiteNoise configures

### afri-ka-web/
- Dockerfile          : Multi-stage Node → Nginx avec HEALTHCHECK
- nginx.conf          : SPA fallback + /healthz + headers securite + gzip
- .dockerignore       : Exclut node_modules, dist, .env
- .env.example        : Template avec instructions build-time Vite
- .gitignore          : .env et .env.production exclus du repo

---

## Checklist securite avant production

[ ] SECRET_KEY unique et aleatoire (50+ chars) - JAMAIS la cle par defaut
[ ] DEBUG=False
[ ] ALLOWED_HOSTS restreint a vos vrais domaines
[ ] CSRF_TRUSTED_ORIGINS avec HTTPS
[ ] CORS_ALLOWED_ORIGINS restreint au domaine frontend
[ ] Aucun fichier .env committe dans Git
[ ] Base de donnees PostgreSQL (pas SQLite en prod)
[ ] Backups PostgreSQL actives dans Coolify
[ ] SSL Let's Encrypt actif sur les deux domaines

---

## Depannage

DisallowedHost at /
  → Ajoutez votre domaine dans ALLOWED_HOSTS

CSRF verification failed
  → Ajoutez https://votre-domaine.com dans CSRF_TRUSTED_ORIGINS

API non joignable depuis le frontend
  → Verifiez CORS_ALLOWED_ORIGINS et VITE_API_URL

VITE_API_URL vide en prod
  → Dans Coolify, cochez bien "Build Variable" sur VITE_API_URL

django.db.OperationalError: could not connect to server
  → Verifiez DATABASE_URL et Linked Resources PostgreSQL

Fichiers medias manquants
  → Configurez Cloudinary (CLOUD_NAME, API_KEY, API_SECRET)

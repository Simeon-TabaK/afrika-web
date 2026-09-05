# Afri-ka Web — Portail Admin React/Vite

> **Portail web d'administration** de la plateforme **Afri-ka**, construit avec **React 19 + Vite**. Il consomme l'API REST Django et offre une interface de gestion basée sur les rôles (RBAC).

---

## 🌍 Langues supportées

| Langue | Code | Statut |
|---|---|---|
| Français | `fr` | ✅ Par défaut |
| Anglais | `en` | ✅ |
| Swahili | `sw` | ✅ |

Le sélecteur de langue est disponible dans le **Header** de l'interface.

---

## 🎨 Design

Fidèle au Figma de l'application Afri-ka :
- [Voir le Figma](https://www.figma.com/design/4f1cf5w14XD4ZyHRpTKht0/Afri-ka-App)
- Couleur principale : vert `#6DBE47`
- **Desktop/PC** : Sidebar latérale fixe
- **Tablette** : Sidebar collapsible avec bouton `×`
- **Mobile** : Bottom Navigation Bar

---

## 🏗️ Architecture

```
src/
├── main.tsx                     # Point d'entrée — importe i18n
├── App.tsx                      # Composant racine — routing RBAC
├── i18n.ts                      # Configuration i18next (FR/EN/SW)
├── index.css                    # Design system — variables CSS, layout
├── locales/
│   ├── fr.json                  # Traductions Français
│   ├── en.json                  # Traductions Anglais
│   └── sw.json                  # Traductions Swahili
├── components/
│   ├── Navigation.tsx           # Sidebar (desktop/tablette) + BottomNav (mobile)
│   └── Header.tsx               # En-tête : titre, rôle, devise, langue, heure GMT
├── views/
│   ├── OverviewDashboard.tsx    # Vue d'ensemble (super_admin, ops_agent)
│   ├── DonationsDashboard.tsx   # Dons & trésorerie multi-devises
│   ├── KYCAdminView.tsx         # Modération KYC & certifications
│   ├── KYCClientView.tsx        # Demande de certification (utilisateur)
│   ├── CommunitiesView.tsx      # Espaces communautaires & sous-groupes
│   ├── OpsHealthView.tsx        # Infrastructure Dokploy & systèmes
│   └── HelpCenterView.tsx       # Centre d'aide, FAQ, CGU, Confidentialité
├── services/
│   └── currencyService.ts       # Taux de change multi-devises
├── types/
│   └── index.ts                 # Types TypeScript (UserRole, SupportedCurrency…)
└── utils/
    └── dateFormatter.ts         # Formatage dates UTC → fuseau local (Intl API)
```

---

## 📦 Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Icônes | Lucide React |
| Localisation | react-i18next + i18next |
| Styles | Vanilla CSS (variables CSS custom) |
| Linting | OXLint |

---

## 👥 RBAC — Contrôle d'accès par rôle

| Rôle | Vues accessibles |
|---|---|
| `super_admin` | Toutes |
| `ops_agent` | Vue d'ensemble, KYC Admin, Dokploy, Aide |
| `donations_agent` | Dons & Finance, Aide |
| `communities_agent` | Communautés, KYC Client, Aide |
| `marketing_agent` | Dons (lecture), Communautés, Aide |
| `user` | KYC Client, Communautés (lecture), Aide |

---

## 💱 Devises supportées

`USD` · `EUR` · `CDF` · `XAF` · `XOF` · `RWF`

Le sélecteur de devise est disponible dans le Header. Tous les montants sont convertis depuis la devise pivot **USD** via le `currencyService`.

---

## 🕐 Gestion des fuseaux horaires

La fonction `formatDate(isoString, locale)` dans `utils/dateFormatter.ts` utilise l'API native `Intl.DateTimeFormat` du navigateur pour convertir automatiquement les dates UTC en heure locale de l'utilisateur — **sans dépendance externe**.

Le Header affiche également l'heure GMT actuelle mise à jour chaque minute.

---

## 🚀 Installation & Démarrage

```bash
# Installer les dépendances
cd afri-ka-web
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build
```

Le serveur de développement démarre sur [http://localhost:5173](http://localhost:5173).

---

## 🔗 Projets liés

| Projet | Description |
|---|---|
| [`afri-ka`](../afri-ka/README.md) | Application Mobile Flutter |
| [`afri-ka-backend`](../afri-ka-backend/README.md) | API REST Django |
# afrika-web

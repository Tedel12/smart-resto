# Smart Resto

Plateforme de gestion de restaurant avec 5 templates switchables — construit avec **React + Vite**.

## Fonctionnalités

-  **5 thèmes visuels** switchables en temps réel (Élégance Sombre, Frais & Léger, Brasserie Classique, Néon Street Food, **Zen Africain**)
-  **Panier interactif** avec checkout
-  **Dashboard admin** : commandes, stats, gestion menu, sélection de template
-  **Statistiques** : revenus, top plats, ventes par catégorie
-  **Gestion menu** : modifier, supprimer des plats
-  Responsive mobile

## Lancer en local

```bash
npm install
npm run dev
```

→ Ouvre http://localhost:5173

## Déployer sur Vercel

1. Push ce dossier sur GitHub
2. Va sur [vercel.com](https://vercel.com) → "New Project"
3. Importe le repo → Framework: **Vite** → Deploy

## Structure

```
src/
├── App.jsx              # Point d'entrée, routing vitrine/dashboard
├── components/
│   ├── LandingPage.jsx  # 5 thèmes visuels + switcher
│   ├── CartSidebar.jsx  # Panier latéral
│   └── Dashboard.jsx    # Admin : commandes, stats, menu, thèmes
├── data/index.js        # Menu, thèmes, tokens design
├── hooks/index.js       # useCart, useOrders
└── styles/global.css    # Fonts, animations, reset
```

## Templates GitHub de référence

| # | Nom | GitHub |
|---|-----|--------|
| 1 | Élégance Sombre (Gericht style) | [basedhound/gericht-restaurant_ui_react](https://github.com/basedhound/gericht-restaurant_ui_react) |
| 2 | Frais & Léger (RestoOne style) | [themixlyweb/react-restaurant-website-template](https://github.com/themixlyweb/react-restaurant-website-template) |
| 3 | Brasserie Classique (SavoryGrid style) | [topics/restaurant-menu](https://github.com/topics/restaurant-menu) |
| 4 | Néon Street Food | [topics/restaurant-template](https://github.com/topics/restaurant-template) |
| 5 | **Zen Africain** (custom Cotonou/Dakar) | Base = artifact Smart-Table, poussé haut de gamme Afrique de l'Ouest |

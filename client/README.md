# Client - Portfolio de NDOUYI Harley Fedy

Front public du portfolio : React + Vite + Sass, bilingue (FR / EN), thèmes clair et sombre, accessibilité WCAG AA visée.

## Versions

Node v22.13.0, npm 10.9.0, React 19.3.0, Vite 8.3.4, react-router-dom 7.18.4, axios 1.20.0, Sass 1.105.1.

## Architecture (MVC côté client)

- **Vue** : `src/composants/` (miseEnPage, sections, ui) et `src/pages/`
- **Contrôleur** : `src/hooks/` et `src/contextes/` (thème, langue, logique des formulaires et du chargement)
- **Modèle** : `src/services/` (appels à l'API via axios) et `src/donnees/` (contenus statiques)
- **Styles** : `src/styles/` (Sass : abstracts, base, composants), thèmes par variables CSS (`data-theme`)
- **Traductions** : `src/traductions/fr.json` et `en.json`

## Installation et lancement

Depuis le dossier `client` :

```powershell
npm install
copy .env.exemple .env
npm run dev
```

Le site est disponible sur http://localhost:5173. L'API doit tourner en parallèle (voir `../serveur/README.md`).

## Variables d'environnement

| Variable       | Rôle                                            | Exemple                     |
| -------------- | ----------------------------------------------- | --------------------------- |
| `VITE_API_URL` | URL de base de l'API, qui se termine par `/api` | `http://localhost:5000/api` |

## Commandes

| Commande          | Rôle                                            |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Serveur de développement                        |
| `npm run lint`    | Analyse du code avec ESLint                     |
| `npm run build`   | Build de production dans `dist/`                |
| `npm run preview` | Prévisualise le build sur http://localhost:4173 |

## Accessibilité et performance

- Lien d'évitement, navigation au clavier, focus visible, `prefers-reduced-motion`
- Lighthouse (build de production, mobile) : 99 performance, 100 accessibilité, 100 bonnes pratiques, 100 SEO
- Les mesures en mode `dev` ne sont pas représentatives : toujours auditer `npm run preview`

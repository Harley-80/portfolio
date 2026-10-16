# Client - Portfolio de NDOUYI Harley Fedy

Front du portfolio : site public et tableau de bord administrateur (`/admin`). React + Vite + Sass, bilingue (FR / EN), thèmes clair et sombre, accessibilité WCAG AA visée.

## Versions

Node v22.13.0, npm 10.9.0, React 19.3.0, Vite 8.3.4, react-router-dom 7.18.4, axios 1.20.0, Sass 1.105.1.

## Architecture (MVC côté client)

-- **Vue** : `src/composants/` (miseEnPage, sections, ui, admin) et `src/pages/` (pages publiques et pages du tableau de bord)

- **Contrôleur** : `src/hooks/` et `src/contextes/` (thème, langue, authentification, logique des formulaires et du chargement)
- **Modèle** : `src/services/` (appels à l'API via axios), `src/utilitaires/` (conversion formulaire ↔ API, validation des chemins d'images) et `src/donnees/` (contenus statiques)
- **Styles** : `src/styles/` (Sass : abstracts, base, composants), thèmes par variables CSS (`data-theme`)
- **Traductions** : `src/traductions/fr.json` et `en.json`

## Routes

| Chemin                                        | Page                          | Accès    |
| --------------------------------------------- | ----------------------------- | -------- |
| `/`                                           | Site public (toutes sections) | Public   |
| `/admin`                                      | Connexion                     | Public   |
| `/admin/tableau-de-bord`                      | Tableau de bord               | Connecté |
| `/admin/tableau-de-bord/projets`              | Liste des projets             | Connecté |
| `/admin/tableau-de-bord/projets/nouveau`      | Création d'un projet          | Connecté |
| `/admin/tableau-de-bord/projets/:id/modifier` | Modification d'un projet      | Connecté |
| `/admin/tableau-de-bord/messages`             | Messages reçus                | Connecté |

- Le code de `/admin` est chargé à la demande (`React.lazy`) : le site public n'embarque pas le tableau de bord.
- Le contexte d'authentification n'est monté que sous `/admin` : le site public n'appelle jamais `/api/authentification/moi`.
- Les routes « Connecté » sont protégées par `RouteProtegee` : sans session, redirection vers `/admin`.

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

| Commande                                    | Rôle                                            |
| ------------------------------------------- | ----------------------------------------------- |
| `npm run dev`                               | Serveur de développement                        |
| `npm run lint`                              | Analyse du code avec ESLint                     |
| `npm run build`                             | Build de production dans `dist/`                |
| `npx vite preview --port 5173 --strictPort` | Prévisualise le build sur http://localhost:5173 |

## Accessibilité et performance

- Lien d'évitement, navigation au clavier, focus visible, `prefers-reduced-motion`
- Lighthouse (build de production, mobile) : 99 performance, 100 accessibilité, 100 bonnes pratiques, 100 SEO
- Les mesures en mode `dev` ne sont pas représentatives : toujours auditer le build (`npm run build`, puis la commande de prévisualisation ci-dessus). Le port 5173 est obligatoire pour l'admin : l'API n'accepte que cette origine (`CLIENT_URL`). Sous PowerShell, `npm run preview -- --port` perd les options, d'où l'appel direct à `npx vite preview`.

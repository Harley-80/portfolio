# Serveur - API du portfolio (étape 1)

API REST Express + MongoDB, architecture MVC.

## Prérequis

- Node v22 ou plus, npm 10
- MongoDB (local) ou un cluster MongoDB Atlas

## Installation

```bash
cd serveur
npm install
cp .env.exemple .env      # PowerShell : Copy-Item .env.exemple .env
```

Renseigne ensuite `.env` :

| Variable | Rôle |
|----------|------|
| `MONGODB_URI` | URI MongoDB (local ou Atlas) |
| `JWT_SECRET` | Chaîne aléatoire de 32 caractères minimum |
| `CLIENT_URL` | URL exacte du front autorisé (CORS + contrôle d'origine) |
| `ADMIN_EMAIL`, `ADMIN_MOT_DE_PASSE` | Utilisés une seule fois par `npm run admin:creer` (mot de passe : 12 caractères minimum) |
| `SMTP_*` | Optionnel : notification par courriel à chaque message reçu |

Génère un secret JWT :

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Scripts

| Commande | Action |
|----------|--------|
| `npm run dev` | Démarre l'API en mode surveillance |
| `npm start` | Démarre l'API (production) |
| `npm run admin:creer` | Crée l'unique administrateur |
| `npm test` | Lance les tests (runner natif de Node + Supertest) |
| `npm run admin:reinitialiser` | Remplace le mot de passe de l'administrateur existant |

## Endpoints

| Méthode | URL | Accès | Description |
|---------|-----|-------|-------------|
| GET | `/api/sante` | Public | État de l'API et de la base |
| POST | `/api/authentification/connexion` | Public (5 essais / 15 min) | Ouvre la session (cookie httpOnly) |
| POST | `/api/authentification/deconnexion` | Public | Ferme la session |
| GET | `/api/authentification/moi` | Admin | Utilisateur connecté |
| GET | `/api/projets` | Public | Projets publiés |
| GET | `/api/projets/:id` | Public | Un projet publié |
| GET | `/api/projets/admin/liste` | Admin | Tous les projets |
| POST | `/api/projets` | Admin | Crée un projet |
| PUT | `/api/projets/:id` | Admin | Modifie (partiel) un projet |
| DELETE | `/api/projets/:id` | Admin | Supprime un projet |
| POST | `/api/messages` | Public (5 / heure) | Envoie un message de contact |
| GET | `/api/messages?page=1&limite=20` | Admin | Liste paginée |
| PATCH | `/api/messages/:id/lu` | Admin | Marque lu / non lu |
| DELETE | `/api/messages/:id` | Admin | Supprime un message |

Format des erreurs : `{ "succes": false, "message": "...", "details": [{ "champ": "...", "message": "..." }] }`.

## Sécurité

- `helmet`, CORS restreint à `CLIENT_URL`, limiteurs de débit (global, connexion, contact)
- Validation stricte des entrées (`express-validator`) et `matchedData` : seuls les champs validés atteignent la base
- `sanitizeFilter` Mongoose contre l'injection NoSQL
- Mots de passe hachés (`bcryptjs`, coût 12), jamais renvoyés (`select: false`)
- JWT dans un cookie `httpOnly`, `secure` et `SameSite=None` en production, `Lax` en local
- Contrôle de l'en-tête `Origin` sur les requêtes modifiantes (défense CSRF)
- Champ piège (honeypot) sur le formulaire de contact
- Un seul administrateur, créé par script (aucune route d'inscription)

## Tester avec Postman

1. `POST /api/authentification/connexion` avec `{ "email": "...", "motDePasse": "..." }` : Postman conserve le cookie.
2. `POST /api/projets` avec un corps JSON, par exemple :

```json
{
    "titre": { "fr": "Nody", "en": "Nody" },
    "resume": { "fr": "Plateforme e-commerce MERN + TypeScript." },
    "stack": ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    "role": "Conception et réalisation intégrale",
    "lienGithub": "https://github.com/Harley-80/Nody",
    "publie": true
}
```
## Dépannage

| Symptôme | Cause | Solution |
|----------|-------|----------|
| `Variables d'environnement manquantes` | `.env` absent ou commande lancée hors de `serveur` | Se placer dans `serveur`, vérifier `.env` |
| `JWT_SECRET doit contenir au moins 32 caractères` | Valeur `CHANGER_MOI` laissée | Générer un secret (voir Installation) |
| `ECONNREFUSED 127.0.0.1:27017` | Service MongoDB arrêté | `Start-Service MongoDB` (PowerShell administrateur) |
| `Identifiants incorrects.` alors que `.env` a changé | Le mot de passe est haché à la création, `.env` n'est lu qu'au lancement du script | `npm run admin:reinitialiser` |
| `Un administrateur existe déjà` | Un seul administrateur autorisé | Utiliser `admin:reinitialiser` |
| `MongooseServerSelectionError` avec Atlas | IP non autorisée dans Network Access | Ajouter l'IP actuelle |

## Bonnes pratiques

- Le projet ne doit jamais se trouver dans le dossier public d'un serveur web (ex. `htdocs` de XAMPP).
- `.env` ne se commit jamais. Un mot de passe ou une URI qui fuit doit être changé immédiatement.

## Git de cette étape

```bash
git switch -c etape-1-serveur
git add .
git commit -m "feat(serveur): API REST, modèles, authentification JWT et tests"
git switch main
git merge etape-1-serveur
git tag v0.1.0-etape-1
git push origin main --tags
```

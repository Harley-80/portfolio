# Portfolio Full-Stack MERN - NDOUYI Harley Fedy

Portfolio complet : vitrine publique (React), API REST (Express), base MongoDB et tableau de bord administrateur.
Le site est lui-même une preuve de compétence full-stack : projets, messages et contenus sont gérés en base, sans redéploiement.

## Avancement

| Étape | Contenu                                                                      | Statut                                                        |
| ----- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1     | Serveur : API, modèles, authentification, sécurité, tests                    | Livrée et validée (MongoDB local, puis Atlas)                 |
| 2     | Front public : thèmes clair/sombre, sections, formulaire de contact, WCAG AA | Terminée (branche `etape-2-client`, Pull Request vers `main`) |
| 3     | Tableau de bord administrateur                                               | À venir                                                       |
| 4     | Déploiement : Atlas, Render, Vercel                                          | À venir                                                       |

## Versions

Node v22.13.0, npm 10.9.0, Express 4, Mongoose 8, React 19.3.0, Vite 8.3.4, react-router-dom 7.18.4, axios 1.20.0, Sass 1.105.1.

## Structure globale

```
portfolio/
    README.md
        client/                          (étape 2 : React + Vite + Sass)
            .env.exemple
            public/                      (images, CV, favicons, robots.txt)
            src/
                composants/              (V : miseEnPage, sections, ui)
                contextes/               (C : thème et langue)
                hooks/                   (C : logique réutilisable)
                services/                (M : appels à l'API via axios)
                donnees/                 (contenus statiques)
                traductions/             (fr.json, en.json)
                pages/
                styles/                  (Sass : abstracts, base, composants)
        serveur/                         (étape 1 : API Express)
            README.md
            package.json
            .env.exemple
            src/
                app.js                   (assemblage Express)
                serveur.js               (point d'entrée : connexion BD + écoute)
                configuration/           (variables d'environnement, base de données)
                modeles/                 (M : schémas Mongoose)
                controleurs/             (C : logique de chaque route)
                routes/                  (association URL -> contrôleur)
                middlewares/             (authentification, erreurs, limiteurs, validation, CSRF)
                validateurs/             (règles express-validator)
                services/                (courriel)
                utilitaires/             (JWT, erreurs, helpers)
                scripts/                 (création de l'administrateur)
            tests/
```

## Diagrammes

### Architecture

```mermaid
flowchart LR
    V[Visiteur] --> C[Client React / Vite]
    A[Administrateur] --> C
    C -->|HTTPS + cookie httpOnly| S[API Express]
    S --> M[(MongoDB Atlas)]
    S -.->|SMTP optionnel| E[Courriel]
```

### Flux d'une requête (MVC)

```mermaid
flowchart LR
    R[Requête HTTP] --> MW[middlewares : helmet, cors, limiteur, origine]
    MW --> RT[routes]
    RT --> VA[validateurs]
    VA --> CT[controleurs]
    CT --> MD[modeles Mongoose]
    MD --> DB[(MongoDB)]
    CT --> J[Réponse JSON]
```

### Modèle de données

```mermaid
erDiagram
    UTILISATEUR {
        ObjectId _id
        string email
        string motDePasse
        string role
    }
    PROJET {
        ObjectId _id
        object titre
        object resume
        object probleme
        string role
        array stack
        string lienDemo
        string lienGithub
        array images
        number ordre
        boolean publie
    }
    MESSAGE {
        ObjectId _id
        string nom
        string email
        string sujet
        string contenu
        boolean lu
    }
    UTILISATEUR ||--o{ PROJET : "administre"
    UTILISATEUR ||--o{ MESSAGE : "consulte"
```

Les relations sont logiques (pas de clé étrangère) : il n'y a qu'un seul administrateur.

### Authentification

```mermaid
sequenceDiagram
    participant A as Admin (React)
    participant S as API Express
    participant B as MongoDB
    A->>S: POST /api/authentification/connexion
    S->>B: findOne({ email })
    B-->>S: utilisateur + hash
    S->>S: bcrypt.compare
    S-->>A: 200 + cookie httpOnly (JWT, 24 h)
    A->>S: POST /api/projets (cookie envoyé)
    S->>S: vérification JWT + rôle admin
    S->>B: insertion
    S-->>A: 201 projet créé
```

## Journal d'avancement (07-08 octobre 2026)

- Cadrage : positionnement, cibles, compétences, parcours, design (`#16213e`, thèmes clair et sombre, WCAG AA)
- Étape 1 : API REST en architecture MVC (Utilisateur, Projet, Message) et sécurité
- Authentification JWT en cookie `httpOnly`, un seul administrateur
- Scripts `admin:creer` et `admin:reinitialiser`
- 7 tests automatisés réussis
- Vérifications en réel sur MongoDB local : connexion, session, création du projet Nody, lecture publique, refus sans session (401)
- Prochaine étape : connexion à MongoDB Atlas, puis front React

Reste à tester : modification et suppression de projets, routes de messages, envoi d'email (SMTP), cookies en production.

## Journal d'avancement (étape 2, 13-14 octobre 2026)

- Front React (Vite) : thèmes clair/sombre, bilingue FR/EN, navigation au clavier, lien d'évitement
- Sections : Accueil, À propos, Compétences, Services, Projets (galerie accessible), Parcours, Contact
- Projets chargés depuis l'API (`/api/projets`), formulaire de contact relié à `/api/messages`
- SEO de base : métadonnées, Open Graph, favicons, `robots.txt`
- Lighthouse (build de production, mobile) : 99 performance, 100 accessibilité, 100 bonnes pratiques, 100 SEO
- Prochaine étape : tableau de bord administrateur

## Démarrage rapide

- API : voir [serveur/README.md](serveur/README.md)
- Client : voir [client/README.md](client/README.md)

## Convention de commits

`feat`, `fix`, `docs`, `test`, `chore`, `refactor`, avec la portée : `feat(serveur): ajoute le modèle Projet`.

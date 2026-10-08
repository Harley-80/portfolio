import { env } from '../configuration/environnement.js';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';

const METHODES_SURES = new Set(['GET', 'HEAD', 'OPTIONS']);

// Défense CSRF : le cookie de session est envoyé en cross-site (SameSite=None en production).
// Tout navigateur envoie l'en-tête Origin sur une requête modifiante : on le compare au front autorisé.
// Les clients sans Origin (Postman, curl) ne sont pas des navigateurs : ils restent acceptés.
export const verifierOrigine = (req, res, next) => {
    if (METHODES_SURES.has(req.method)) {
        return next();
    }
    const origine = req.get('Origin');
    if (origine && origine !== env.urlClient) {
        return next(new ErreurHttp(403, 'Origine non autorisée.'));
    }
    return next();
};

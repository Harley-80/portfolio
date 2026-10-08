import { validationResult } from 'express-validator';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';

export const valider = (req, res, next) => {
    const resultat = validationResult(req);
    if (resultat.isEmpty()) {
        return next();
    }
    const details = resultat.array().map((erreur) => ({
        champ: erreur.path,
        message: erreur.msg,
    }));
    return next(new ErreurHttp(422, 'Données invalides.', details));
};

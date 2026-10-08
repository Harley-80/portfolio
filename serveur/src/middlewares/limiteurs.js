import rateLimit from 'express-rate-limit';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';

const creerLimiteur = ({ minutes, limite, message }) =>
    rateLimit({
        windowMs: minutes * 60 * 1000,
        limit: limite,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => next(new ErreurHttp(429, message)),
    });

export const limiteurGlobal = creerLimiteur({
    minutes: 15,
    limite: 300,
    message: 'Trop de requêtes. Réessaie plus tard.',
});

export const limiteurConnexion = creerLimiteur({
    minutes: 15,
    limite: 5,
    message: 'Trop de tentatives de connexion. Réessaie dans 15 minutes.',
});

export const limiteurContact = creerLimiteur({
    minutes: 60,
    limite: 5,
    message: 'Trop de messages envoyés. Réessaie dans une heure.',
});

import { Utilisateur } from '../modeles/utilisateur.modele.js';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';
import { enveloppeAsync } from '../utilitaires/enveloppeAsync.js';
import { NOM_COOKIE, verifierJeton } from '../utilitaires/jetonJwt.js';

export const exigerAuthentification = enveloppeAsync(async (req, res, next) => {
    const jeton = req.cookies?.[NOM_COOKIE];
    if (!jeton) {
        throw new ErreurHttp(401, 'Authentification requise.');
    }

    let charge;
    try {
        charge = verifierJeton(jeton);
    } catch {
        throw new ErreurHttp(401, 'Session invalide ou expirée.');
    }

    // Lecture en base : permet de révoquer l'accès en supprimant l'utilisateur.
    const utilisateur = await Utilisateur.findById(charge.id);
    if (!utilisateur) {
        throw new ErreurHttp(401, 'Session invalide ou expirée.');
    }

    req.utilisateur = utilisateur;
    next();
});

export const exigerRole =
    (...roles) =>
    (req, res, next) => {
        if (!req.utilisateur || !roles.includes(req.utilisateur.role)) {
            return next(new ErreurHttp(403, 'Accès refusé.'));
        }
        return next();
    };

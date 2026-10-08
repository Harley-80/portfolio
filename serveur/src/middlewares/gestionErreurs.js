import { ErreurHttp } from '../utilitaires/erreurHttp.js';

export const routeIntrouvable = (req, res, next) =>
    next(new ErreurHttp(404, 'Ressource introuvable.'));

// Les 4 paramètres sont obligatoires pour qu'Express reconnaisse un gestionnaire d'erreurs.
// eslint-disable-next-line no-unused-vars
export const gestionnaireErreurs = (erreur, req, res, next) => {
    let statut = erreur.statut || 500;
    let message = erreur.message;

    if (erreur.type === 'entity.parse.failed') {
        statut = 400;
        message = 'JSON invalide.';
    } else if (erreur.type === 'entity.too.large') {
        statut = 413;
        message = 'Requête trop volumineuse.';
    } else if (erreur.name === 'CastError') {
        statut = 400;
        message = 'Identifiant invalide.';
    } else if (erreur.name === 'ValidationError') {
        statut = 400;
        message = 'Données invalides.';
    } else if (erreur.code === 11000) {
        statut = 409;
        message = 'Cette valeur existe déjà.';
    }

    if (statut >= 500) {
        console.error(erreur);
        message = 'Erreur interne du serveur.';
    }

    res.status(statut).json({
        succes: false,
        message,
        ...(erreur.details ? { details: erreur.details } : {}),
    });
};

import { matchedData } from 'express-validator';
import { Utilisateur } from '../modeles/utilisateur.modele.js';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';
import { enveloppeAsync } from '../utilitaires/enveloppeAsync.js';
import {
    NOM_COOKIE,
    optionsCookieBase,
    optionsCookieSession,
    signerJeton,
} from '../utilitaires/jetonJwt.js';

const presenterUtilisateur = (utilisateur) => ({
    id: utilisateur._id,
    email: utilisateur.email,
    role: utilisateur.role,
});

export const connexion = enveloppeAsync(async (req, res) => {
    const { email, motDePasse } = matchedData(req, { locations: ['body'] });

    const utilisateur = await Utilisateur.findOne({ email }).select('+motDePasse');
    const valide = utilisateur ? await utilisateur.comparerMotDePasse(motDePasse) : false;

    // Même message dans les deux cas : on ne révèle pas si l'email existe.
    if (!valide) {
        throw new ErreurHttp(401, 'Identifiants incorrects.');
    }

    res.cookie(NOM_COOKIE, signerJeton(utilisateur), optionsCookieSession());
    res.json({ succes: true, utilisateur: presenterUtilisateur(utilisateur) });
});

export const deconnexion = (req, res) => {
    res.clearCookie(NOM_COOKIE, optionsCookieBase());
    res.json({ succes: true });
};

export const moi = (req, res) => {
    res.json({ succes: true, utilisateur: presenterUtilisateur(req.utilisateur) });
};

import jwt from 'jsonwebtoken';
import { env } from '../configuration/environnement.js';

export const NOM_COOKIE = 'jeton';
export const DUREE_SESSION_SECONDES = 24 * 60 * 60;

export const signerJeton = (utilisateur) =>
    jwt.sign({ id: utilisateur._id.toString(), role: utilisateur.role }, env.jwtSecret, {
        algorithm: 'HS256',
        expiresIn: DUREE_SESSION_SECONDES,
    });

export const verifierJeton = (jeton) =>
    jwt.verify(jeton, env.jwtSecret, { algorithms: ['HS256'] });

// En production, le front (Vercel) et l'API (Render) sont sur des domaines différents :
// le cookie doit être "secure" + SameSite=None. En local : Lax.
export const optionsCookieBase = () => ({
    httpOnly: true,
    secure: env.estProduction,
    sameSite: env.estProduction ? 'none' : 'lax',
    path: '/',
});

export const optionsCookieSession = () => ({
    ...optionsCookieBase(),
    maxAge: DUREE_SESSION_SECONDES * 1000,
});

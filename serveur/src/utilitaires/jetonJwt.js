import jwt from 'jsonwebtoken';
import { env } from '../configuration/environnement.js';

export const NOM_COOKIE = 'jeton';
export const DUREE_SESSION_SECONDES = 24 * 60 * 60;

export const signerJeton = (utilisateur) =>
    jwt.sign(
        { id: utilisateur._id.toString(), role: utilisateur.role },
        env.jwtSecret,
        {
            algorithm: 'HS256',
            expiresIn: DUREE_SESSION_SECONDES,
        }
    );

export const verifierJeton = (jeton) =>
    jwt.verify(jeton, env.jwtSecret, { algorithms: ['HS256'] });

// En production, Vercel relaie /api vers Render : le navigateur ne voit qu'un seul site.
// Le cookie reste de première partie : "secure" en production, SameSite=Lax partout.
export const optionsCookieBase = () => ({
    httpOnly: true,
    secure: env.estProduction,
    sameSite: 'lax',
    path: '/',
});

export const optionsCookieSession = () => ({
    ...optionsCookieBase(),
    maxAge: DUREE_SESSION_SECONDES * 1000,
});

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './configuration/environnement.js';
import routes from './routes/index.js';
import { limiteurGlobal } from './middlewares/limiteurs.js';
import { verifierOrigine } from './middlewares/verifierOrigine.js';
import {
    gestionnaireErreurs,
    routeIntrouvable,
} from './middlewares/gestionErreurs.js';

const app = express();

// Réglage provisoire (1 saut) : protection rétablie le temps de mesurer la chaîne réelle.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// DIAGNOSTIC TEMPORAIRE, à supprimer : adresses vues par l'API lors d'une tentative de connexion.
app.use((req, res, next) => {
    if (req.method === 'POST' && req.path.endsWith('/connexion')) {
        console.log(
            'diag-ip',
            JSON.stringify({
                ip: req.ip,
                xff: req.headers['x-forwarded-for'],
                pair: req.socket.remoteAddress,
                realIp: req.headers['x-real-ip'],
            })
        );
    }
    next();
});

app.use(helmet());
app.use(
    cors({
        origin: env.urlClient,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.use(limiteurGlobal);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(verifierOrigine);

app.use('/api', routes);

app.use(routeIntrouvable);
app.use(gestionnaireErreurs);

export default app;

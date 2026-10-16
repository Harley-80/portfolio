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

// Render place l'API derrière un proxy : nécessaire pour que le limiteur voie la vraie IP.
app.set('trust proxy', 1);
app.disable('x-powered-by');

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

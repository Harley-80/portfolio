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

// Production : navigateur -> Vercel -> Render -> API. On fait confiance aux deux proxys pour lire l'IP réelle du visiteur.
app.set('trust proxy', 2);
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

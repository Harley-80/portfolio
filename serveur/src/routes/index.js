import { Router } from 'express';
import mongoose from 'mongoose';
import authentificationRoutes from './authentification.routes.js';
import projetRoutes from './projet.routes.js';
import messageRoutes from './message.routes.js';

const routeur = Router();

routeur.get('/sante', (req, res) => {
    res.json({
        statut: 'ok',
        baseDeDonnees:
            mongoose.connection.readyState === 1 ? 'connectee' : 'deconnectee',
        horodatage: new Date().toISOString(),
    });
});

routeur.use('/authentification', authentificationRoutes);
routeur.use('/projets', projetRoutes);
routeur.use('/messages', messageRoutes);

export default routeur;

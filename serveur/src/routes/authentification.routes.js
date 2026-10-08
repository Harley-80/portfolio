import { Router } from 'express';
import { connexion, deconnexion, moi } from '../controleurs/authentification.controleur.js';
import { exigerAuthentification } from '../middlewares/authentification.js';
import { limiteurConnexion } from '../middlewares/limiteurs.js';
import { validateurConnexion } from '../validateurs/authentification.validateur.js';

const routeur = Router();

routeur.post('/connexion', limiteurConnexion, validateurConnexion, connexion);
routeur.post('/deconnexion', deconnexion);
routeur.get('/moi', exigerAuthentification, moi);

export default routeur;

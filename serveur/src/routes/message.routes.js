import { Router } from 'express';
import {
    creer,
    lister,
    marquerLu,
    supprimer,
} from '../controleurs/message.controleur.js';
import {
    exigerAuthentification,
    exigerRole,
} from '../middlewares/authentification.js';
import { limiteurContact } from '../middlewares/limiteurs.js';
import { validateurIdentifiant } from '../validateurs/identifiant.validateur.js';
import {
    validateurCreationMessage,
    validateurLecture,
} from '../validateurs/message.validateur.js';

const routeur = Router();
const admin = [exigerAuthentification, exigerRole('admin')];

routeur.post('/', limiteurContact, validateurCreationMessage, creer);
routeur.get('/', ...admin, lister);
routeur.patch(
    '/:id/lu',
    ...admin,
    validateurIdentifiant,
    validateurLecture,
    marquerLu
);
routeur.delete('/:id', ...admin, validateurIdentifiant, supprimer);

export default routeur;

import { Router } from 'express';
import {
    creer,
    lister,
    listerTous,
    modifier,
    obtenir,
    supprimer,
} from '../controleurs/projet.controleur.js';
import { exigerAuthentification, exigerRole } from '../middlewares/authentification.js';
import { validateurIdentifiant } from '../validateurs/identifiant.validateur.js';
import {
    validateurCreationProjet,
    validateurModificationProjet,
} from '../validateurs/projet.validateur.js';

const routeur = Router();
const admin = [exigerAuthentification, exigerRole('admin')];

routeur.get('/', lister);
// Doit rester AVANT '/:id' sinon "admin" serait interprété comme un identifiant.
routeur.get('/admin/liste', ...admin, listerTous);
routeur.get('/:id', validateurIdentifiant, obtenir);
routeur.post('/', ...admin, validateurCreationProjet, creer);
routeur.put('/:id', ...admin, validateurIdentifiant, validateurModificationProjet, modifier);
routeur.delete('/:id', ...admin, validateurIdentifiant, supprimer);

export default routeur;

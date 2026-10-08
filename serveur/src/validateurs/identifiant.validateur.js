import { param } from 'express-validator';
import { valider } from '../middlewares/valider.js';

export const validateurIdentifiant = [
    param('id').isMongoId().withMessage('Identifiant invalide.'),
    valider,
];

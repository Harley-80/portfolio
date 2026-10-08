import { body } from 'express-validator';
import { valider } from '../middlewares/valider.js';

export const validateurConnexion = [
    body('email').isString().trim().toLowerCase().isEmail().withMessage('Email invalide.'),
    body('motDePasse')
        .isString()
        .isLength({ min: 1, max: 200 })
        .withMessage('Mot de passe invalide.'),
    valider,
];

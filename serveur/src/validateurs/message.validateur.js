import { body } from 'express-validator';
import { valider } from '../middlewares/valider.js';

export const validateurCreationMessage = [
    body('nom')
        .isString()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères.'),
    body('email')
        .isString()
        .trim()
        .toLowerCase()
        .isEmail()
        .isLength({ max: 200 })
        .withMessage('Email invalide.'),
    body('sujet')
        .optional({ values: 'falsy' })
        .isString()
        .trim()
        .isLength({ max: 150 })
        .withMessage('Le sujet ne doit pas dépasser 150 caractères.'),
    body('contenu')
        .isString()
        .trim()
        .isLength({ min: 10, max: 3000 })
        .withMessage('Le message doit contenir entre 10 et 3000 caractères.'),
    // Champ piège (honeypot) : invisible pour un humain, rempli par les robots.
    body('siteWeb').optional().isString().isLength({ max: 300 }),
    valider,
];

export const validateurLecture = [
    body('lu')
        .isBoolean()
        .withMessage('Le champ "lu" doit être un booléen.')
        .toBoolean(),
    valider,
];

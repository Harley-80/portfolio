import { body } from 'express-validator';
import { valider } from '../middlewares/valider.js';

// En création : le champ est obligatoire. En modification : il est optionnel,
// mais s'il est envoyé, un champ obligatoire ne peut pas être vide.
const champ = (nom, estCreation, requis = false) => {
    const chaine = body(nom);
    if (!requis) {
        return chaine.optional();
    }
    const base = estCreation
        ? chaine.exists().withMessage('Champ requis.').bail()
        : chaine.optional();
    return base.trim().notEmpty().withMessage('Champ requis.').bail();
};

const optionsUrl = { protocols: ['http', 'https'], require_protocol: true };

const regles = (estCreation) => [
    champ('titre.fr', estCreation, true)
        .isString()
        .trim()
        .isLength({ max: 120 }),
    champ('titre.en', estCreation).isString().trim().isLength({ max: 120 }),
    champ('resume.fr', estCreation, true)
        .isString()
        .trim()
        .isLength({ max: 2000 }),
    champ('resume.en', estCreation).isString().trim().isLength({ max: 2000 }),
    champ('probleme.fr', estCreation).isString().trim().isLength({ max: 2000 }),
    champ('probleme.en', estCreation).isString().trim().isLength({ max: 2000 }),
    champ('role', estCreation).isString().trim().isLength({ max: 120 }),
    champ('stack', estCreation).isArray({ max: 20 }),
    body('stack.*').isString().trim().isLength({ min: 1, max: 40 }),
    body('lienDemo')
        .optional({ values: 'falsy' })
        .isURL(optionsUrl)
        .withMessage('Lien de démo invalide (http/https requis).'),
    body('lienGithub')
        .optional({ values: 'falsy' })
        .isURL(optionsUrl)
        .withMessage('Lien GitHub invalide (http/https requis).'),
    champ('images', estCreation).isArray({ max: 10 }),
    body('images.*')
        .isString()
        .trim()
        .matches(/^\/images\/projets\/[a-z0-9-]+\.(webp|png|jpe?g)$/)
        .withMessage(
            "Chemin d'image invalide (ex. /images/projets/nom-image.webp)."
        ),
    champ('ordre', estCreation).isInt({ min: 0, max: 999 }).toInt(),
    champ('publie', estCreation).isBoolean().toBoolean(),
    valider,
];

export const validateurCreationProjet = regles(true);
export const validateurModificationProjet = regles(false);

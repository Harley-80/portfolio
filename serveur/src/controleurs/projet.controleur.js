import { matchedData } from 'express-validator';
import { Projet } from '../modeles/projet.modele.js';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';
import { enveloppeAsync } from '../utilitaires/enveloppeAsync.js';
import { aplatir } from '../utilitaires/aplatir.js';

const TRI = { ordre: 1, createdAt: -1 };
const ORDRE_MAX = 999;

// Règle métier : sans ordre fourni, le projet est placé à la suite des autres.
// On prend le plus grand ordre existant (et non le nombre de projets) pour ne
// jamais créer de doublon après une suppression.
const prochainOrdre = async () => {
    const dernier = await Projet.findOne()
        .sort({ ordre: -1 })
        .select('ordre')
        .lean();
    return Math.min((dernier?.ordre ?? -1) + 1, ORDRE_MAX);
};

// Public : uniquement les projets publiés.
export const lister = enveloppeAsync(async (req, res) => {
    const projets = await Projet.find({ publie: true }).sort(TRI).lean();
    res.json({ succes: true, projets });
});

export const obtenir = enveloppeAsync(async (req, res) => {
    const projet = await Projet.findOne({
        _id: req.params.id,
        publie: true,
    }).lean();
    if (!projet) {
        throw new ErreurHttp(404, 'Projet introuvable.');
    }
    res.json({ succes: true, projet });
});

// Admin : tous les projets, publiés ou non.
export const listerTous = enveloppeAsync(async (req, res) => {
    const projets = await Projet.find().sort(TRI).lean();
    res.json({ succes: true, projets });
});

export const creer = enveloppeAsync(async (req, res) => {
    // matchedData ne garde que les champs validés : protection contre le mass assignment.
    const donnees = matchedData(req, { locations: ['body'] });
    if (donnees.ordre === undefined) {
        donnees.ordre = await prochainOrdre();
    }
    const projet = await Projet.create(donnees);
    res.status(201).json({ succes: true, projet });
});

export const modifier = enveloppeAsync(async (req, res) => {
    const donnees = matchedData(req, { locations: ['body'] });
    const projet = await Projet.findByIdAndUpdate(
        req.params.id,
        { $set: aplatir(donnees) },
        { new: true, runValidators: true }
    );
    if (!projet) {
        throw new ErreurHttp(404, 'Projet introuvable.');
    }
    res.json({ succes: true, projet });
});

export const supprimer = enveloppeAsync(async (req, res) => {
    const projet = await Projet.findByIdAndDelete(req.params.id);
    if (!projet) {
        throw new ErreurHttp(404, 'Projet introuvable.');
    }
    res.json({ succes: true });
});

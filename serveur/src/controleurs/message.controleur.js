import { matchedData } from 'express-validator';
import { Message } from '../modeles/message.modele.js';
import { ErreurHttp } from '../utilitaires/erreurHttp.js';
import { enveloppeAsync } from '../utilitaires/enveloppeAsync.js';
import { notifierNouveauMessage } from '../services/courriel.service.js';

export const creer = enveloppeAsync(async (req, res) => {
    const { nom, email, sujet, contenu, siteWeb } = matchedData(req, {
        locations: ['body'],
    });

    // Honeypot rempli = robot : on répond comme un succès sans rien enregistrer.
    if (siteWeb) {
        return res
            .status(201)
            .json({ succes: true, message: 'Message envoyé.' });
    }

    const message = await Message.create({ nom, email, sujet, contenu });

    // La notification ne doit jamais faire échouer la requête.
    notifierNouveauMessage(message).catch((erreur) =>
        console.error('Échec de la notification par courriel :', erreur.message)
    );

    return res.status(201).json({ succes: true, message: 'Message envoyé.' });
});

export const lister = enveloppeAsync(async (req, res) => {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limite = Math.min(
        Math.max(Number.parseInt(req.query.limite, 10) || 20, 1),
        100
    );

    const [messages, total] = await Promise.all([
        Message.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limite)
            .limit(limite)
            .lean(),
        Message.countDocuments(),
    ]);

    res.json({ succes: true, messages, page, limite, total });
});

export const marquerLu = enveloppeAsync(async (req, res) => {
    const { lu } = matchedData(req, { locations: ['body'] });
    const message = await Message.findByIdAndUpdate(
        req.params.id,
        { lu },
        { new: true }
    );
    if (!message) {
        throw new ErreurHttp(404, 'Message introuvable.');
    }
    res.json({ succes: true, message });
});

export const supprimer = enveloppeAsync(async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
        throw new ErreurHttp(404, 'Message introuvable.');
    }
    res.json({ succes: true });
});

import nodemailer from 'nodemailer';
import { env } from '../configuration/environnement.js';

let transporteur = null;

const obtenirTransporteur = () => {
    if (!env.smtp.hote) {
        return null;
    }
    transporteur ??= nodemailer.createTransport({
        host: env.smtp.hote,
        port: env.smtp.port,
        secure: env.smtp.port === 465,
        auth: { user: env.smtp.utilisateur, pass: env.smtp.motDePasse },
    });
    return transporteur;
};

const sansSautsDeLigne = (texte) => String(texte).replace(/[\r\n]+/g, ' ');

// Texte brut uniquement : aucune injection HTML possible.
export const notifierNouveauMessage = async (message) => {
    const transport = obtenirTransporteur();
    if (!transport) {
        return;
    }
    await transport.sendMail({
        from: env.smtp.expediteur,
        to: env.smtp.destinataire,
        replyTo: message.email,
        subject: sansSautsDeLigne(
            `[Portfolio] ${message.sujet || 'Nouveau message'} - ${message.nom}`
        ),
        text: `De : ${message.nom} <${message.email}>\n\n${message.contenu}`,
    });
};

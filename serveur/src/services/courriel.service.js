import { env } from '../configuration/environnement.js';

const URL_API_COURRIEL = 'https://api.resend.com/emails';
const DELAI_MAXIMUM_MS = 10_000;

const sansSautsDeLigne = (texte) => String(texte).replace(/[\r\n]+/g, ' ');

const estConfigure = () =>
    Boolean(env.courriel.cleApi && env.courriel.destinataire);

// Texte brut uniquement : aucune injection HTML possible.
// Envoi par API HTTPS (port 443) : Render bloque le SMTP sur le plan gratuit.
export const notifierNouveauMessage = async (message) => {
    if (!estConfigure()) {
        return;
    }

    const reponse = await fetch(URL_API_COURRIEL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.courriel.cleApi}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: env.courriel.expediteur,
            to: [env.courriel.destinataire],
            reply_to: message.email,
            subject: sansSautsDeLigne(
                `[Portfolio] ${message.sujet || 'Nouveau message'} - ${message.nom}`
            ),
            text: `De : ${message.nom} <${message.email}>\n\n${message.contenu}`,
        }),
        signal: AbortSignal.timeout(DELAI_MAXIMUM_MS),
    });

    if (!reponse.ok) {
        const detail = await reponse.text().catch(() => '');
        throw new Error(
            `Le service de courriel a répondu ${reponse.status} : ${detail.slice(0, 200)}`
        );
    }
};

const variablesRequises = ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'];

// Vérification de la présence des variables d'environnement requises
const manquantes = variablesRequises.filter((nom) => !process.env[nom]);
if (manquantes.length > 0) {
    throw new Error(
        `Variables d'environnement manquantes : ${manquantes.join(', ')}`
    );
}

// Vérification de la longueur de JWT_SECRET
if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');
}

const environnement = process.env.NODE_ENV || 'development';

export const env = Object.freeze({
    environnement,
    estProduction: environnement === 'production',
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    urlClient: process.env.CLIENT_URL.replace(/\/+$/, ''),
    courriel: Object.freeze({
        cleApi: process.env.COURRIEL_CLE_API || '',
        expediteur:
            process.env.COURRIEL_EXPEDITEUR ||
            'Portfolio <onboarding@resend.dev>',
        destinataire: process.env.COURRIEL_DESTINATAIRE || '',
    }),
});

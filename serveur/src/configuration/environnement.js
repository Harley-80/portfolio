const variablesRequises = ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'];

const manquantes = variablesRequises.filter((nom) => !process.env[nom]);
if (manquantes.length > 0) {
    throw new Error(`Variables d'environnement manquantes : ${manquantes.join(', ')}`);
}

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
    smtp: Object.freeze({
        hote: process.env.SMTP_HOTE || '',
        port: Number(process.env.SMTP_PORT) || 587,
        utilisateur: process.env.SMTP_UTILISATEUR || '',
        motDePasse: process.env.SMTP_MOT_DE_PASSE || '',
        expediteur: process.env.SMTP_EXPEDITEUR || '',
        destinataire: process.env.SMTP_DESTINATAIRE || '',
    }),
});

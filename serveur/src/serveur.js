import app from './app.js';
import { env } from './configuration/environnement.js';
import { connecterBaseDeDonnees, deconnecterBaseDeDonnees } from './configuration/baseDeDonnees.js';

const demarrer = async () => {
    await connecterBaseDeDonnees();

    const serveur = app.listen(env.port, () => {
        console.log(`API démarrée sur le port ${env.port} (${env.environnement}).`);
    });

    const arreter = async (signal) => {
        console.log(`${signal} reçu : arrêt propre du serveur.`);
        serveur.close(async () => {
            await deconnecterBaseDeDonnees();
            process.exit(0);
        });
    };

    process.on('SIGTERM', () => arreter('SIGTERM'));
    process.on('SIGINT', () => arreter('SIGINT'));
};

demarrer().catch((erreur) => {
    console.error('Échec du démarrage :', erreur.message);
    process.exit(1);
});

import { connecterBaseDeDonnees, deconnecterBaseDeDonnees } from '../configuration/baseDeDonnees.js';
import { Utilisateur } from '../modeles/utilisateur.modele.js';

const reinitialiserAdmin = async () => {
    const motDePasse = process.env.ADMIN_MOT_DE_PASSE;

    if (!motDePasse || motDePasse.length < 12) {
        throw new Error('ADMIN_MOT_DE_PASSE doit contenir au moins 12 caractères.');
    }

    await connecterBaseDeDonnees();

    const admin = await Utilisateur.findOne({ role: 'admin' });
    if (!admin) {
        throw new Error("Aucun administrateur. Lance d'abord : npm run admin:creer");
    }

    // Le hook pre('save') du modèle hache automatiquement le nouveau mot de passe.
    admin.motDePasse = motDePasse;
    await admin.save();
    console.log(`Mot de passe réinitialisé pour : ${admin.email}`);
};

reinitialiserAdmin()
    .catch((erreur) => {
        console.error(erreur.message);
        process.exitCode = 1;
    })
    .finally(() => deconnecterBaseDeDonnees());
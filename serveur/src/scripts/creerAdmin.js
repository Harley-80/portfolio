import { connecterBaseDeDonnees, deconnecterBaseDeDonnees } from '../configuration/baseDeDonnees.js';
import { Utilisateur } from '../modeles/utilisateur.modele.js';

const creerAdmin = async () => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const motDePasse = process.env.ADMIN_MOT_DE_PASSE;

    if (!email || !motDePasse) {
        throw new Error('ADMIN_EMAIL et ADMIN_MOT_DE_PASSE doivent être définis dans .env.');
    }
    if (motDePasse.length < 12) {
        throw new Error('Le mot de passe admin doit contenir au moins 12 caractères.');
    }

    await connecterBaseDeDonnees();

    // Règle métier : un seul administrateur.
    if ((await Utilisateur.countDocuments()) > 0) {
        throw new Error('Un administrateur existe déjà. Création annulée.');
    }

    await Utilisateur.create({ email, motDePasse, role: 'admin' });
    console.log(`Administrateur créé : ${email}`);
};

creerAdmin()
    .catch((erreur) => {
        console.error(erreur.message);
        process.exitCode = 1;
    })
    .finally(() => deconnecterBaseDeDonnees());

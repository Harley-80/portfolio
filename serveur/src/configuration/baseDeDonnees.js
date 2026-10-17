import mongoose from 'mongoose';
import { env } from './environnement.js';

export const connecterBaseDeDonnees = async () => {
    mongoose.set('strictQuery', true);
    // Retire les opérateurs ($ne, $gt...) injectés dans les filtres : protection NoSQL.
    mongoose.set('sanitizeFilter', true);
    await mongoose.connect(env.mongoUri);
    // console.log('MongoDB connecté.');
    console.log(
        `MongoDB connecté : base "${mongoose.connection.name}" sur ${mongoose.connection.host}.`
    );
};

export const deconnecterBaseDeDonnees = () => mongoose.disconnect();

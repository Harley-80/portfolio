import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const utilisateurSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 200,
        },
        motDePasse: {
            type: String,
            required: true,
            minlength: 12,
            select: false,
        },
        role: {
            type: String,
            enum: ['admin'],
            default: 'admin',
        },
    },
    { timestamps: true }
);

utilisateurSchema.pre('save', async function () {
    if (!this.isModified('motDePasse')) {
        return;
    }
    this.motDePasse = await bcrypt.hash(this.motDePasse, 12);
});

utilisateurSchema.methods.comparerMotDePasse = function (motDePasseClair) {
    return bcrypt.compare(motDePasseClair, this.motDePasse);
};

export const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

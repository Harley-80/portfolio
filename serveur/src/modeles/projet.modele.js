import mongoose from 'mongoose';

const texteBilingue = (requis) => ({
    _id: false,
    fr: { type: String, trim: true, maxlength: 2000, required: requis },
    en: { type: String, trim: true, maxlength: 2000 },
});

const projetSchema = new mongoose.Schema(
    {
        titre: texteBilingue(true),
        resume: texteBilingue(true),
        probleme: texteBilingue(false),
        role: { type: String, trim: true, maxlength: 120 },
        stack: { type: [{ type: String, trim: true, maxlength: 40 }], default: [] },
        lienDemo: { type: String, trim: true, maxlength: 300 },
        lienGithub: { type: String, trim: true, maxlength: 300 },
        images: { type: [{ type: String, trim: true, maxlength: 300 }], default: [] },
        ordre: { type: Number, default: 0, min: 0 },
        publie: { type: Boolean, default: false },
    },
    { timestamps: true }
);

projetSchema.index({ publie: 1, ordre: 1, createdAt: -1 });

export const Projet = mongoose.model('Projet', projetSchema);

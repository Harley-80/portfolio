import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true, trim: true, maxlength: 100 },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            maxlength: 200,
        },
        sujet: { type: String, trim: true, maxlength: 150 },
        contenu: { type: String, required: true, trim: true, maxlength: 3000 },
        lu: { type: Boolean, default: false },
    },
    { timestamps: true }
);

messageSchema.index({ createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema);

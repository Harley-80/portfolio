import api from './api'

export const connecter = async (email, motDePasse) => {
    const { data } = await api.post('/authentification/connexion', {
        email,
        motDePasse,
    })
    return data.utilisateur
}

export const deconnecter = async () => {
    await api.post('/authentification/deconnexion')
}

// Renvoie l'utilisateur si la session est valide, null sinon.
// Toute autre erreur (réseau, serveur) est propagée.
export const recupererSession = async () => {
    try {
        const { data } = await api.get('/authentification/moi')
        return data.utilisateur
    } catch (erreur) {
        if (erreur.response?.status === 401) {
            return null
        }
        throw erreur
    }
}

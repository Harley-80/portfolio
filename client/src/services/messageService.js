import api from './api'

export const envoyerMessage = async donnees => {
    const { data } = await api.post('/messages', donnees)
    return data
}

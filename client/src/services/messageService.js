import api from './api'

export const envoyerMessage = async donnees => {
    const { data } = await api.post('/messages', donnees)
    return data
}

export const listerMessages = async () => {
    const { data } = await api.get('/messages')
    return data.messages
}

export const changerEtatLu = async (id, lu) => {
    const { data } = await api.patch(`/messages/${id}/lu`, { lu })
    return data
}

export const supprimerMessage = async id => {
    const { data } = await api.delete(`/messages/${id}`)
    return data
}

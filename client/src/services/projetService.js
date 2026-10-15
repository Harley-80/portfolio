import api from './api'

export const recupererProjets = async () => {
    const { data } = await api.get('/projets')
    return data.projets
}
export const listerProjetsAdmin = async () => {
    const { data } = await api.get('/projets/admin/liste')
    return data.projets
}

export const creerProjet = async donnees => {
    const { data } = await api.post('/projets', donnees)
    return data
}

export const modifierProjet = async (id, donnees) => {
    const { data } = await api.put(`/projets/${id}`, donnees)
    return data
}

export const supprimerProjet = async id => {
    const { data } = await api.delete(`/projets/${id}`)
    return data
}

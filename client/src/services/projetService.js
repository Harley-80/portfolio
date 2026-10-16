import api from './api'

export const recupererProjets = async () => {
    const { data } = await api.get('/projets')
    return data.projets
}

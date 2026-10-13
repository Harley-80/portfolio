import { useEffect, useState } from 'react'
import { recupererProjets } from '../services/projetService'

export function useProjets() {
    const [projets, setProjets] = useState([])
    const [chargement, setChargement] = useState(true)
    const [erreur, setErreur] = useState(false)

    useEffect(() => {
        let annule = false

        recupererProjets()
            .then(liste => {
                if (!annule) {
                    setProjets(liste)
                }
            })
            .catch(() => {
                if (!annule) {
                    setErreur(true)
                }
            })
            .finally(() => {
                if (!annule) {
                    setChargement(false)
                }
            })

        return () => {
            annule = true
        }
    }, [])

    return { projets, chargement, erreur }
}

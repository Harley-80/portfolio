import { useCallback, useEffect, useState } from 'react'
import {
    listerProjetsAdmin,
    modifierProjet,
    supprimerProjet,
} from '../services/projetService'

export const useProjetsAdmin = () => {
    const [projets, setProjets] = useState([])
    const [chargement, setChargement] = useState(true)
    const [erreur, setErreur] = useState('')
    const [erreurAction, setErreurAction] = useState('')
    const [tentative, setTentative] = useState(0)

    useEffect(() => {
        let annule = false

        listerProjetsAdmin()
            .then(liste => {
                if (!annule) setProjets(liste)
            })
            .catch(() => {
                if (!annule) setErreur('Impossible de charger les projets.')
            })
            .finally(() => {
                if (!annule) setChargement(false)
            })

        return () => {
            annule = true
        }
    }, [tentative])

    const reessayer = useCallback(() => {
        setErreur('')
        setChargement(true)
        setTentative(valeur => valeur + 1)
    }, [])

    const basculerPublication = useCallback(async (id, publie) => {
        setErreurAction('')
        try {
            await modifierProjet(id, { publie })
            setProjets(precedents =>
                precedents.map(projet =>
                    projet._id === id ? { ...projet, publie } : projet
                )
            )
        } catch {
            setErreurAction('Modification impossible pour le moment.')
        }
    }, [])

    const supprimer = useCallback(async id => {
        setErreurAction('')
        try {
            await supprimerProjet(id)
            setProjets(precedents =>
                precedents.filter(projet => projet._id !== id)
            )
        } catch {
            setErreurAction('Suppression impossible pour le moment.')
        }
    }, [])

    return {
        projets,
        chargement,
        erreur,
        erreurAction,
        reessayer,
        basculerPublication,
        supprimer,
    }
}

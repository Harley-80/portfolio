import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    creerProjet,
    listerProjetsAdmin,
    modifierProjet,
} from '../services/projetService'
import {
    erreursVersChamps,
    projetVersValeurs,
    VALEURS_VIDES,
    valeursVersDonnees,
} from '../utilitaires/projetFormulaire'

const ROUTE_LISTE = '/admin/tableau-de-bord/projets'

export const useFormulaireProjet = id => {
    const navigate = useNavigate()
    const estEdition = Boolean(id)

    const [valeurs, setValeurs] = useState(VALEURS_VIDES)
    const [erreurs, setErreurs] = useState({})
    const [erreurGenerale, setErreurGenerale] = useState('')
    const [chargement, setChargement] = useState(estEdition)
    const [erreurChargement, setErreurChargement] = useState('')
    const [introuvable, setIntrouvable] = useState(false)
    const [envoi, setEnvoi] = useState(false)
    const [focusChamp, setFocusChamp] = useState(null)

    useEffect(() => {
        if (!id) return undefined

        let annule = false

        listerProjetsAdmin()
            .then(liste => {
                if (annule) return
                const projet = liste.find(element => element._id === id)
                if (projet) {
                    setValeurs(projetVersValeurs(projet))
                } else {
                    setIntrouvable(true)
                }
            })
            .catch(() => {
                if (!annule) {
                    setErreurChargement('Impossible de charger le projet.')
                }
            })
            .finally(() => {
                if (!annule) setChargement(false)
            })

        return () => {
            annule = true
        }
    }, [id])

    const surChangement = evenement => {
        const { name, type, checked, value } = evenement.target
        setValeurs(precedentes => ({
            ...precedentes,
            [name]: type === 'checkbox' ? checked : value,
        }))
        setErreurs(precedentes => {
            if (!precedentes[name]) return precedentes
            const suivantes = { ...precedentes }
            delete suivantes[name]
            return suivantes
        })
    }

    const signalerErreurs = nouvellesErreurs => {
        setErreurs(nouvellesErreurs)
        const premier = Object.keys(VALEURS_VIDES).find(
            nom => nouvellesErreurs[nom]
        )
        setFocusChamp(premier ? { nom: premier, cle: Date.now() } : null)
    }

    const soumettre = async evenement => {
        evenement.preventDefault()
        setErreurGenerale('')

        const erreursLocales = {}
        if (!valeurs.titreFr.trim()) erreursLocales.titreFr = 'Champ requis.'
        if (!valeurs.resumeFr.trim()) erreursLocales.resumeFr = 'Champ requis.'
        if (Object.keys(erreursLocales).length > 0) {
            signalerErreurs(erreursLocales)
            return
        }

        setEnvoi(true)
        try {
            const donnees = valeursVersDonnees(valeurs)
            if (estEdition) {
                await modifierProjet(id, donnees)
            } else {
                await creerProjet(donnees)
            }
            navigate(ROUTE_LISTE)
        } catch (erreur) {
            const statut = erreur.response?.status
            if (statut === 422) {
                const erreursServeur = erreursVersChamps(
                    erreur.response.data?.details
                )
                if (Object.keys(erreursServeur).length > 0) {
                    signalerErreurs(erreursServeur)
                } else {
                    setErreurGenerale('Certaines données sont invalides.')
                }
            } else if (statut === 401) {
                setErreurGenerale('Session expirée. Reconnectez-vous.')
            } else {
                setErreurGenerale('Enregistrement impossible pour le moment.')
            }
            setEnvoi(false)
        }
    }

    return {
        estEdition,
        valeurs,
        erreurs,
        erreurGenerale,
        chargement,
        erreurChargement,
        introuvable,
        envoi,
        focusChamp,
        surChangement,
        soumettre,
    }
}

import { useState } from 'react'
import { envoyerMessage } from '../services/messageService'

const VALEURS_INITIALES = {
    nom: '',
    email: '',
    sujet: '',
    contenu: '',
    siteWeb: '',
}
const MOTIF_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validerFormulaire = valeurs => {
    const erreurs = {}
    const nom = valeurs.nom.trim()
    const contenu = valeurs.contenu.trim()

    if (nom.length < 2 || nom.length > 100) {
        erreurs.nom = 'contact.erreurNom'
    }
    if (!MOTIF_EMAIL.test(valeurs.email.trim())) {
        erreurs.email = 'contact.erreurEmail'
    }
    if (contenu.length < 10 || contenu.length > 3000) {
        erreurs.contenu = 'contact.erreurMessage'
    }
    return erreurs
}

export function useFormulaireContact() {
    const [valeurs, setValeurs] = useState(VALEURS_INITIALES)
    const [erreurs, setErreurs] = useState({})
    const [statut, setStatut] = useState('inactif')

    const modifierChamp = evenement => {
        const { name, value } = evenement.target
        setValeurs(actuelles => ({ ...actuelles, [name]: value }))
    }

    const soumettre = async evenement => {
        evenement.preventDefault()
        if (statut === 'envoi') {
            return
        }

        const nouvellesErreurs = validerFormulaire(valeurs)
        setErreurs(nouvellesErreurs)
        if (Object.keys(nouvellesErreurs).length > 0) {
            setStatut('inactif')
            return
        }

        setStatut('envoi')
        try {
            await envoyerMessage({
                nom: valeurs.nom.trim(),
                email: valeurs.email.trim(),
                sujet: valeurs.sujet.trim(),
                contenu: valeurs.contenu.trim(),
                siteWeb: valeurs.siteWeb,
            })
            setValeurs(VALEURS_INITIALES)
            setStatut('succes')
        } catch (erreur) {
            setStatut(erreur.response?.status === 429 ? 'limite' : 'erreur')
        }
    }

    return { valeurs, erreurs, statut, modifierChamp, soumettre }
}

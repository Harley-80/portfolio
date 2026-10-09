import { useEffect, useState } from 'react'
import { ContexteLangue } from './ContexteLangue'
import fr from '../traductions/fr.json'
import en from '../traductions/en.json'

const TRADUCTIONS = { fr, en }
const CLE_STOCKAGE = 'langue'

const lireLangueInitiale = () => {
    try {
        const langueSauvegardee = localStorage.getItem(CLE_STOCKAGE)
        if (langueSauvegardee === 'fr' || langueSauvegardee === 'en') {
            return langueSauvegardee
        }
    } catch {
        // Stockage indisponible : on suit la langue du navigateur.
    }
    return navigator.language.startsWith('fr') ? 'fr' : 'en'
}

export function FournisseurLangue({ children }) {
    const [langue, setLangue] = useState(lireLangueInitiale)

    useEffect(() => {
        document.documentElement.lang = langue
        try {
            localStorage.setItem(CLE_STOCKAGE, langue)
        } catch {
            // Sans stockage, la langue n'est simplement pas mémorisée.
        }
    }, [langue])

    const changerLangue = () => {
        setLangue(actuelle => (actuelle === 'fr' ? 'en' : 'fr'))
    }

    // Retourne le texte de la clé ; si elle manque, on affiche la clé (erreur visible).
    const t = cle => TRADUCTIONS[langue][cle] ?? cle

    return (
        <ContexteLangue.Provider value={{ langue, changerLangue, t }}>
            {children}
        </ContexteLangue.Provider>
    )
}
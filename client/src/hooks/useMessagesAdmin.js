import { useCallback, useEffect, useState } from 'react'
import {
    changerEtatLu,
    listerMessages,
    supprimerMessage,
} from '../services/messageService'

export const useMessagesAdmin = () => {
    const [messages, setMessages] = useState([])
    const [chargement, setChargement] = useState(true)
    const [erreur, setErreur] = useState('')
    const [erreurAction, setErreurAction] = useState('')
    const [tentative, setTentative] = useState(0)

    useEffect(() => {
        let annule = false

        listerMessages()
            .then(liste => {
                if (!annule) setMessages(liste)
            })
            .catch(() => {
                if (!annule) setErreur('Impossible de charger les messages.')
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

    const basculerLu = useCallback(async (id, lu) => {
        setErreurAction('')
        try {
            await changerEtatLu(id, lu)
            setMessages(precedents =>
                precedents.map(message =>
                    message._id === id ? { ...message, lu } : message
                )
            )
        } catch {
            setErreurAction('Modification impossible pour le moment.')
        }
    }, [])

    const supprimer = useCallback(async id => {
        setErreurAction('')
        try {
            await supprimerMessage(id)
            setMessages(precedents =>
                precedents.filter(message => message._id !== id)
            )
        } catch {
            setErreurAction('Suppression impossible pour le moment.')
        }
    }, [])

    return {
        messages,
        chargement,
        erreur,
        erreurAction,
        reessayer,
        basculerLu,
        supprimer,
    }
}

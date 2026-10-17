import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContexteAuthentification } from './ContexteAuthentification'
import {
    connecter as connecterService,
    deconnecter as deconnecterService,
    recupererSession,
} from '../services/authentificationService'

function FournisseurAuthentification({ children }) {
    const [utilisateur, setUtilisateur] = useState(null)
    const [chargement, setChargement] = useState(true)

    // Au montage : on demande au serveur si une session valide existe
    useEffect(() => {
        let annule = false

        recupererSession()
            .then(utilisateurSession => {
                if (!annule) {
                    setUtilisateur(utilisateurSession)
                }
            })
            .catch(() => {
                if (!annule) {
                    setUtilisateur(null)
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

    const connecter = useCallback(async (email, motDePasse) => {
        const utilisateurConnecte = await connecterService(email, motDePasse)
        setUtilisateur(utilisateurConnecte)
        return utilisateurConnecte
    }, [])

    // L'état local n'est vidé qu'après la réussite côté serveur : si la
    // requête échoue, le cookie reste valide et l'interface ne doit pas
    // prétendre le contraire.
    const deconnecter = useCallback(async () => {
        await deconnecterService()
        setUtilisateur(null)
    }, [])

    const valeur = useMemo(
        () => ({
            utilisateur,
            chargement,
            estConnecte: utilisateur !== null,
            connecter,
            deconnecter,
        }),
        [utilisateur, chargement, connecter, deconnecter]
    )

    return (
        <ContexteAuthentification.Provider value={valeur}>
            {children}
        </ContexteAuthentification.Provider>
    )
}

export default FournisseurAuthentification

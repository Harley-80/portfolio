import { useState } from 'react'
import { useAuthentification } from '../hooks/useAuthentification'

function PageTableauDeBord() {
    const { utilisateur, deconnecter } = useAuthentification()
    const [erreur, setErreur] = useState('')

    const gererDeconnexion = async () => {
        setErreur('')
        try {
            await deconnecter()
        } catch {
            setErreur('Déconnexion impossible. Réessayez.')
        }
    }

    return (
        <main className="conteneur">
            <h1>Tableau de bord</h1>
            <p>Connecté en tant que {utilisateur.email}</p>
            <button
                type="button"
                className="bouton bouton--primaire"
                onClick={gererDeconnexion}>
                Se déconnecter
            </button>
            <p role="alert">{erreur}</p>
        </main>
    )
}

export default PageTableauDeBord

import { useId, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthentification } from '../hooks/useAuthentification'

// Message volontairement identique pour un email inconnu et un mauvais mot
// de passe : on ne révèle pas quels comptes existent.
const messageErreur = erreur => {
    const statut = erreur.response?.status

    if (statut === 401) {
        return 'Email ou mot de passe incorrect.'
    }
    if (statut === 429) {
        return 'Trop de tentatives. Réessayez dans quelques minutes.'
    }
    if (statut === 422) {
        return 'Saisissez un email valide et votre mot de passe.'
    }
    return 'Connexion impossible pour le moment. Réessayez plus tard.'
}

function PageConnexion() {
    const { estConnecte, chargement, connecter } = useAuthentification()
    const [email, setEmail] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [erreur, setErreur] = useState('')
    const [envoiEnCours, setEnvoiEnCours] = useState(false)
    const idEmail = useId()
    const idMotDePasse = useId()

    if (chargement) {
        return (
            <main className="connexion">
                <p role="status">Vérification de la session…</p>
            </main>
        )
    }

    if (estConnecte) {
        return <Navigate to="/admin/tableau-de-bord" replace />
    }

    const gererEnvoi = async evenement => {
        evenement.preventDefault()
        setErreur('')
        setEnvoiEnCours(true)

        try {
            await connecter(email.trim(), motDePasse)
        } catch (erreurConnexion) {
            setErreur(messageErreur(erreurConnexion))
            setEnvoiEnCours(false)
        }
    }

    return (
        <main className="connexion">
            <div className="connexion__carte">
                <h1 className="connexion__titre">Administration</h1>
                <p className="connexion__intro">
                    Connectez-vous pour gérer vos projets et vos messages.
                </p>

                <form onSubmit={gererEnvoi}>
                    <div className="connexion__champ">
                        <label htmlFor={idEmail}>Adresse email</label>
                        <input
                            id={idEmail}
                            type="email"
                            name="email"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={evenement =>
                                setEmail(evenement.target.value)
                            }
                        />
                    </div>

                    <div className="connexion__champ">
                        <label htmlFor={idMotDePasse}>Mot de passe</label>
                        <input
                            id={idMotDePasse}
                            type="password"
                            name="motDePasse"
                            autoComplete="current-password"
                            required
                            value={motDePasse}
                            onChange={evenement =>
                                setMotDePasse(evenement.target.value)
                            }
                        />
                    </div>

                    <p className="connexion__erreur" role="alert">
                        {erreur}
                    </p>

                    <button
                        type="submit"
                        className="bouton bouton--primaire"
                        disabled={envoiEnCours}>
                        {envoiEnCours ? 'Connexion…' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default PageConnexion

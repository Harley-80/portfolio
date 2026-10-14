import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
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
        <div className="admin">
            <header className="admin__entete">
                <div className="admin__entete-contenu conteneur">
                    <p className="admin__marque">Administration</p>
                    <div className="admin__compte">
                        <span className="admin__email">
                            {utilisateur.email}
                        </span>
                        <a className="admin__lien" href="/">
                            Voir le site
                        </a>
                        <button
                            type="button"
                            className="bouton bouton--primaire"
                            onClick={gererDeconnexion}>
                            Se déconnecter
                        </button>
                    </div>
                    <p className="admin__erreur" role="alert">
                        {erreur}
                    </p>
                </div>
                <nav
                    className="admin__navigation conteneur"
                    aria-label="Sections de l'administration">
                    <NavLink to="projets">Projets</NavLink>
                    <NavLink to="messages">Messages</NavLink>
                </nav>
            </header>

            <main className="admin__contenu conteneur">
                <Outlet />
            </main>
        </div>
    )
}

export default PageTableauDeBord

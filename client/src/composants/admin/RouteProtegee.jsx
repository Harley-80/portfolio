import { Navigate } from 'react-router-dom'
import { useAuthentification } from '../../hooks/useAuthentification'

function RouteProtegee({ children }) {
    const { estConnecte, chargement } = useAuthentification()

    if (chargement) {
        return (
            <p role="status" className="conteneur">
                Vérification de la session…
            </p>
        )
    }

    if (!estConnecte) {
        return <Navigate to="/admin" replace />
    }

    return children
}

export default RouteProtegee

import { Link } from 'react-router-dom'
import CarteProjetAdmin from '../composants/admin/CarteProjetAdmin'
import { useProjetsAdmin } from '../hooks/useProjetsAdmin'

const PageProjetsAdmin = () => {
    const {
        projets,
        chargement,
        erreur,
        erreurAction,
        reessayer,
        basculerPublication,
        supprimer,
    } = useProjetsAdmin()

    if (chargement) {
        return <p role="status">Chargement des projets…</p>
    }

    if (erreur) {
        return (
            <div role="alert">
                <p>{erreur}</p>
                <button
                    type="button"
                    className="bouton bouton--primaire"
                    onClick={reessayer}>
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <section aria-labelledby="titre-projets" className="projets-admin">
            <div className="projets-admin__entete">
                <h1 id="titre-projets">Projets</h1>
                <Link to="nouveau" className="bouton bouton--primaire">
                    Nouveau projet
                </Link>
            </div>

            {erreurAction && <p role="alert">{erreurAction}</p>}

            {projets.length === 0 ?
                <p>Aucun projet pour le moment.</p>
            :   <ul className="projets-admin__liste">
                    {projets.map(projet => (
                        <li key={projet._id}>
                            <CarteProjetAdmin
                                projet={projet}
                                onBasculerPublication={basculerPublication}
                                onSupprimer={supprimer}
                            />
                        </li>
                    ))}
                </ul>
            }
        </section>
    )
}

export default PageProjetsAdmin

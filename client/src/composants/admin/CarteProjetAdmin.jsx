import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CarteProjetAdmin = ({ projet, onBasculerPublication, onSupprimer }) => {
    const idTitre = useId()
    const [confirmation, setConfirmation] = useState(false)
    const boutonAnnuler = useRef(null)
    const titre = projet.titre?.fr || 'Sans titre'

    useEffect(() => {
        if (confirmation) {
            boutonAnnuler.current?.focus()
        }
    }, [confirmation])

    const classes =
        projet.publie ? 'carte-projet-admin' : (
            'carte-projet-admin carte-projet-admin--brouillon'
        )

    return (
        <article className={classes} aria-labelledby={idTitre}>
            <header className="carte-projet-admin__entete">
                <h2 id={idTitre} className="carte-projet-admin__titre">
                    {titre}
                </h2>
                <span className="carte-projet-admin__badge">
                    {projet.publie ? 'Publié' : 'Brouillon'}
                </span>
            </header>

            <p className="carte-projet-admin__meta">Ordre : {projet.ordre}</p>

            <div className="carte-projet-admin__actions">
                <Link to={`${projet._id}/modifier`} className="bouton">
                    Modifier
                    <span className="visuellement-cache">
                        {' '}
                        le projet {titre}
                    </span>
                </Link>

                <button
                    type="button"
                    className="bouton"
                    onClick={() =>
                        onBasculerPublication(projet._id, !projet.publie)
                    }>
                    {projet.publie ? 'Dépublier' : 'Publier'}
                    <span className="visuellement-cache">
                        {' '}
                        le projet {titre}
                    </span>
                </button>

                {confirmation ?
                    <span role="group" aria-label="Confirmation de suppression">
                        <button
                            type="button"
                            className="bouton carte-projet-admin__supprimer"
                            onClick={() => onSupprimer(projet._id)}>
                            Confirmer la suppression
                            <span className="visuellement-cache">
                                {' '}
                                du projet {titre}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="bouton"
                            ref={boutonAnnuler}
                            onClick={() => setConfirmation(false)}>
                            Annuler
                        </button>
                    </span>
                :   <button
                        type="button"
                        className="bouton"
                        onClick={() => setConfirmation(true)}>
                        Supprimer
                        <span className="visuellement-cache">
                            {' '}
                            le projet {titre}
                        </span>
                    </button>
                }
            </div>
        </article>
    )
}

export default CarteProjetAdmin

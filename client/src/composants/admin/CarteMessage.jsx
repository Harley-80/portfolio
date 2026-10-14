import { useEffect, useId, useRef, useState } from 'react'

const formaterDate = date =>
    new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
    }).format(new Date(date))

const CarteMessage = ({ message, onBasculerLu, onSupprimer }) => {
    const idTitre = useId()
    const [confirmation, setConfirmation] = useState(false)
    const boutonAnnuler = useRef(null)

    useEffect(() => {
        if (confirmation) {
            boutonAnnuler.current?.focus()
        }
    }, [confirmation])

    const classes =
        message.lu ? 'carte-message' : 'carte-message carte-message--non-lu'

    return (
        <article className={classes} aria-labelledby={idTitre}>
            <header className="carte-message__entete">
                <h2 id={idTitre} className="carte-message__titre">
                    {message.sujet || 'Sans sujet'}
                </h2>
                {!message.lu && (
                    <span className="carte-message__badge">Non lu</span>
                )}
            </header>

            <p className="carte-message__meta">
                <span>{message.nom}</span>
                {' · '}
                <a href={`mailto:${message.email}`}>{message.email}</a>
                {' · '}
                <time dateTime={message.createdAt}>
                    {formaterDate(message.createdAt)}
                </time>
            </p>

            <p className="carte-message__contenu">{message.contenu}</p>

            <div className="carte-message__actions">
                <button
                    type="button"
                    className="bouton"
                    onClick={() => onBasculerLu(message._id, !message.lu)}>
                    {message.lu ? 'Marquer comme non lu' : 'Marquer comme lu'}
                </button>

                {confirmation ?
                    <span role="group" aria-label="Confirmation de suppression">
                        <button
                            type="button"
                            className="bouton carte-message__supprimer"
                            onClick={() => onSupprimer(message._id)}>
                            Confirmer la suppression
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
                    </button>
                }
            </div>
        </article>
    )
}

export default CarteMessage

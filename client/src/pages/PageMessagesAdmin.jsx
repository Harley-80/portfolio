import CarteMessage from '../composants/admin/CarteMessage'
import { useMessagesAdmin } from '../hooks/useMessagesAdmin'

const PageMessagesAdmin = () => {
    const {
        messages,
        chargement,
        erreur,
        erreurAction,
        reessayer,
        basculerLu,
        supprimer,
    } = useMessagesAdmin()

    if (chargement) {
        return <p role="status">Chargement des messages…</p>
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

    const nonLus = messages.filter(message => !message.lu).length

    return (
        <section aria-labelledby="titre-messages" className="messages-admin">
            <h1 id="titre-messages">Messages</h1>

            <p aria-live="polite">
                {nonLus === 0 ?
                    'Aucun message non lu.'
                :   `${nonLus} non lu${nonLus > 1 ? 's' : ''} sur ${messages.length}.`
                }
            </p>

            {erreurAction && <p role="alert">{erreurAction}</p>}

            {messages.length === 0 ?
                <p>Aucun message pour le moment.</p>
            :   <ul className="messages-admin__liste">
                    {messages.map(message => (
                        <li key={message._id}>
                            <CarteMessage
                                message={message}
                                onBasculerLu={basculerLu}
                                onSupprimer={supprimer}
                            />
                        </li>
                    ))}
                </ul>
            }
        </section>
    )
}

export default PageMessagesAdmin

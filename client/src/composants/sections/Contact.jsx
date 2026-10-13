import Section from '../ui/Section'
import ChampFormulaire from '../ui/ChampFormulaire'
import { useLangue } from '../../hooks/useLangue'
import { useFormulaireContact } from '../../hooks/useFormulaireContact'
import { COORDONNEES } from '../../donnees/contact'
import CodeQr from '../ui/CodeQr'

function Contact() {
    const { t } = useLangue()
    const { valeurs, erreurs, statut, modifierChamp, soumettre } =
        useFormulaireContact()
    const envoiEnCours = statut === 'envoi'

    return (
        <Section id="contact" titre={t('contact.titre')}>
            <div className="contact">
                <div className="contact__infos">
                    <p>{t('contact.intro')}</p>
                    <h3 className="contact__sous-titre">
                        {t('contact.autresMoyens')}
                    </h3>
                    <ul className="contact__liens">
                        <li>
                            <a
                                href={`https://wa.me/${COORDONNEES.whatsappNumero}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                WhatsApp : {COORDONNEES.whatsappAffichage}
                                <span className="visuellement-cache">
                                    {' '}
                                    {t('commun.nouvelOnglet')}
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={COORDONNEES.github}
                                target="_blank"
                                rel="noopener noreferrer">
                                GitHub
                                <span className="visuellement-cache">
                                    {' '}
                                    {t('commun.nouvelOnglet')}
                                </span>
                            </a>
                        </li>
                        {COORDONNEES.linkedin && (
                            <li>
                                <a
                                    href={COORDONNEES.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    LinkedIn
                                    <span className="visuellement-cache">
                                        {' '}
                                        {t('commun.nouvelOnglet')}
                                    </span>
                                </a>
                            </li>
                        )}
                    </ul>
                    <CodeQr
                        valeur={`https://wa.me/${COORDONNEES.whatsappNumero}`}
                        libelle={t('contact.qrAlt')}
                        legende={t('contact.qrLegende')}
                    />
                </div>

                <form
                    className="contact__formulaire"
                    onSubmit={soumettre}
                    noValidate>
                    <p className="contact__note">{t('contact.obligatoire')}</p>

                    <ChampFormulaire
                        nom="nom"
                        libelle={t('contact.nom')}
                        valeur={valeurs.nom}
                        onChange={modifierChamp}
                        erreur={erreurs.nom && t(erreurs.nom)}
                        requis
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                    />
                    <ChampFormulaire
                        nom="email"
                        libelle={t('contact.email')}
                        valeur={valeurs.email}
                        onChange={modifierChamp}
                        erreur={erreurs.email && t(erreurs.email)}
                        requis
                        type="email"
                        autoComplete="email"
                        maxLength={200}
                    />
                    <ChampFormulaire
                        nom="sujet"
                        libelle={t('contact.sujet')}
                        valeur={valeurs.sujet}
                        onChange={modifierChamp}
                        type="text"
                        maxLength={150}
                    />
                    <ChampFormulaire
                        nom="contenu"
                        libelle={t('contact.message')}
                        valeur={valeurs.contenu}
                        onChange={modifierChamp}
                        erreur={erreurs.contenu && t(erreurs.contenu)}
                        requis
                        multiligne
                        maxLength={3000}
                    />

                    <div className="contact__piege" aria-hidden="true">
                        <label htmlFor="contact-siteWeb">
                            {t('contact.piege')}
                        </label>
                        <input
                            id="contact-siteWeb"
                            name="siteWeb"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={valeurs.siteWeb}
                            onChange={modifierChamp}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bouton bouton--primaire contact__envoi"
                        disabled={envoiEnCours}>
                        {envoiEnCours ?
                            t('contact.envoiEnCours')
                        :   t('contact.envoyer')}
                    </button>

                    <div className="contact__retour" aria-live="polite">
                        {statut === 'succes' && (
                            <p className="contact__message contact__message--succes">
                                {t('contact.succes')}
                            </p>
                        )}
                        {statut === 'erreur' && (
                            <p className="contact__message contact__message--erreur">
                                {t('contact.erreurGenerale')}
                            </p>
                        )}
                        {statut === 'limite' && (
                            <p className="contact__message contact__message--erreur">
                                {t('contact.erreurLimite')}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </Section>
    )
}

export default Contact

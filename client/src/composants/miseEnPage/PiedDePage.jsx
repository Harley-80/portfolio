import { useLangue } from '../../hooks/useLangue'
import { COORDONNEES } from '../../donnees/contact'

const ANNEE = new Date().getFullYear()

function PiedDePage() {
    const { t } = useLangue()

    return (
        <footer className="pied-de-page">
            <div className="conteneur pied-de-page__interieur">
                <div className="pied-de-page__texte">
                    <p>
                        © {ANNEE} Harley Fedy NDOUYI. {t('piedDePage.droits')}
                    </p>
                    <p className="pied-de-page__conception">
                        {t('piedDePage.conception')}
                    </p>
                </div>
                <ul
                    className="pied-de-page__liens"
                    aria-label={t('piedDePage.liens')}>
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
                    <li>
                        <a href="#accueil">{t('piedDePage.retourEnHaut')}</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default PiedDePage

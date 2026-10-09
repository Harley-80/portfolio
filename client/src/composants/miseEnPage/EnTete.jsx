import { useTheme } from '../../hooks/useTheme'
import { useLangue } from '../../hooks/useLangue'

const LIENS = [
    { id: 'accueil', cle: 'navigation.accueil' },
    { id: 'a-propos', cle: 'navigation.aPropos' },
    { id: 'competences', cle: 'navigation.competences' },
    { id: 'services', cle: 'navigation.services' },
    { id: 'projets', cle: 'navigation.projets' },
    { id: 'parcours', cle: 'navigation.parcours' },
    { id: 'contact', cle: 'navigation.contact' },
]

function EnTete() {
    const { theme, basculerTheme } = useTheme()
    const { langue, changerLangue, t } = useLangue()
    const estSombre = theme === 'dark'

    return (
        <header className="en-tete">
            <a className="lien-evitement" href="#contenu">
                {t('navigation.evitement')}
            </a>
            <div className="en-tete__interieur">
                <a className="en-tete__logo" href="#accueil">
                    Harley Fedy NDOUYI
                </a>
                <nav aria-label={t('navigation.principale')}>
                    <ul className="en-tete__liens">
                        {LIENS.map(lien => (
                            <li key={lien.id}>
                                <a href={`#${lien.id}`}>{t(lien.cle)}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="en-tete__outils">
                    <button
                        type="button"
                        className="bouton-icone"
                        onClick={changerLangue}
                        aria-label={t('langue.changerVers')}>
                        {langue === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <button
                        type="button"
                        className="bouton-icone"
                        onClick={basculerTheme}
                        aria-label={
                            estSombre ?
                                t('theme.activerClair')
                            :   t('theme.activerSombre')
                        }>
                        {estSombre ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default EnTete

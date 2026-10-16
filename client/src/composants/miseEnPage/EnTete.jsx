import { useEffect, useState } from 'react'
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
    const [menuOuvert, setMenuOuvert] = useState(false)
    const estSombre = theme === 'dark'

    const fermerMenu = () => setMenuOuvert(false)
    const basculerMenu = () => setMenuOuvert(ouvert => !ouvert)

    useEffect(() => {
        if (!menuOuvert) {
            return undefined
        }
        const surTouche = evenement => {
            if (evenement.key === 'Escape') {
                setMenuOuvert(false)
            }
        }
        document.addEventListener('keydown', surTouche)
        return () => document.removeEventListener('keydown', surTouche)
    }, [menuOuvert])

    return (
        <header className="en-tete">
            <a className="lien-evitement" href="#contenu">
                {t('navigation.evitement')}
            </a>
            <div className="en-tete__interieur">
                <a
                    className="en-tete__logo"
                    href="#accueil"
                    onClick={fermerMenu}>
                    Harley Fedy NDOUYI
                </a>
                <nav
                    id="menu-principal"
                    className={`en-tete__nav${menuOuvert ? ' en-tete__nav--ouvert' : ''}`}
                    aria-label={t('navigation.principale')}>
                    <ul className="en-tete__liens">
                        {LIENS.map(lien => (
                            <li key={lien.id}>
                                <a href={`#${lien.id}`} onClick={fermerMenu}>
                                    {t(lien.cle)}
                                </a>
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
                    <button
                        type="button"
                        className="bouton-icone en-tete__burger"
                        onClick={basculerMenu}
                        aria-expanded={menuOuvert}
                        aria-controls="menu-principal"
                        aria-label={
                            menuOuvert ?
                                t('navigation.fermerMenu')
                            :   t('navigation.ouvrirMenu')
                        }>
                        {menuOuvert ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default EnTete

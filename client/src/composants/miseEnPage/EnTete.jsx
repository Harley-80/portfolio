import { useTheme } from '../../hooks/useTheme'

const LIENS = [
    { id: 'accueil', libelle: 'Accueil' },
    { id: 'a-propos', libelle: 'À propos' },
    { id: 'competences', libelle: 'Compétences' },
    { id: 'services', libelle: 'Services' },
    { id: 'projets', libelle: 'Projets' },
    { id: 'parcours', libelle: 'Parcours' },
    { id: 'contact', libelle: 'Contact' },
]

function EnTete() {
    const { theme, basculerTheme } = useTheme()
    const estSombre = theme === 'dark'

    return (
        <header className="en-tete">
            <a className="lien-evitement" href="#contenu">
                Aller au contenu principal
            </a>
            <div className="en-tete__interieur">
                <a className="en-tete__logo" href="#accueil">
                    Harley Fedy NDOUYI
                </a>
                <nav aria-label="Navigation principale">
                    <ul className="en-tete__liens">
                        {LIENS.map(lien => (
                            <li key={lien.id}>
                                <a href={`#${lien.id}`}>{lien.libelle}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    type="button"
                    className="bouton-theme"
                    onClick={basculerTheme}
                    aria-label={
                        estSombre ?
                            'Activer le thème clair'
                        :   'Activer le thème sombre'
                    }>
                    {estSombre ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    )
}

export default EnTete

import { FournisseurTheme } from './contextes/FournisseurTheme'
import EnTete from './composants/miseEnPage/EnTete'

function App() {
    return (
        <FournisseurTheme>
            <EnTete />
            <main id="contenu">
                <h1 id="accueil">Portfolio de NDOUYI Harley Fedy</h1>
                <p>Texte de test</p>
            </main>
        </FournisseurTheme>
    )
}

export default App

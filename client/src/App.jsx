import { FournisseurLangue } from './contextes/FournisseurLangue'
import { FournisseurTheme } from './contextes/FournisseurTheme'
import EnTete from './composants/miseEnPage/EnTete'
import PiedDePage from './composants/miseEnPage/PiedDePage'
import PageAccueil from './pages/PageAccueil'

function App() {
    return (
        <FournisseurLangue>
            <FournisseurTheme>
                <EnTete />
                <PageAccueil />
                <PiedDePage />
            </FournisseurTheme>
        </FournisseurLangue>
    )
}

export default App

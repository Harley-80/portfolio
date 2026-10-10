import Accueil from '../composants/sections/Accueil'
import APropos from '../composants/sections/APropos'

function PageAccueil() {
    return (
        <main id="contenu" tabIndex={-1}>
            <Accueil />
            <APropos />
        </main>
    )
}

export default PageAccueil

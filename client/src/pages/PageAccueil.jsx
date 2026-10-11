import Accueil from '../composants/sections/Accueil'
import APropos from '../composants/sections/APropos'
import Competences from '../composants/sections/Competences'

function PageAccueil() {
    return (
        <main id="contenu" tabIndex={-1}>
            <Accueil />
            <APropos />
            <Competences />
        </main>
    )
}

export default PageAccueil

import Accueil from '../composants/sections/Accueil'
import APropos from '../composants/sections/APropos'
import Competences from '../composants/sections/Competences'
import Services from '../composants/sections/Services'
import Parcours from '../composants/sections/Parcours'

function PageAccueil() {
    return (
        <main id="contenu" tabIndex={-1}>
            <Accueil />
            <APropos />
            <Competences />
            <Services />
            <Parcours />
        </main>
    )
}

export default PageAccueil

import Accueil from '../composants/sections/Accueil'
import APropos from '../composants/sections/APropos'
import Competences from '../composants/sections/Competences'
import Services from '../composants/sections/Services'
import Projets from '../composants/sections/Projets'
import Parcours from '../composants/sections/Parcours'
import Contact from '../composants/sections/Contact'

function PageAccueil() {
    return (
        <main id="contenu" tabIndex={-1}>
            <Accueil />
            <APropos />
            <Competences />
            <Services />
            <Projets />
            <Parcours />
            <Contact />
        </main>
    )
}

export default PageAccueil

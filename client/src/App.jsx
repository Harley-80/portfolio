import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { FournisseurLangue } from './contextes/FournisseurLangue'
import { FournisseurTheme } from './contextes/FournisseurTheme'
import EnTete from './composants/miseEnPage/EnTete'
import PiedDePage from './composants/miseEnPage/PiedDePage'
import PageAccueil from './pages/PageAccueil'

// Chargée à la demande : ce code n'est téléchargé que sur /admin
const PageAdmin = lazy(() => import('./pages/PageAdmin'))

function SitePublic() {
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

function App() {
    return (
        <Routes>
            <Route
                path="/admin/*"
                element={
                    <FournisseurTheme>
                        <Suspense
                            fallback={
                                <p role="status" className="conteneur">
                                    Chargement de l'administration…
                                </p>
                            }>
                            <PageAdmin />
                        </Suspense>
                    </FournisseurTheme>
                }
            />
            <Route path="*" element={<SitePublic />} />
        </Routes>
    )
}

export default App

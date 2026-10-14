import { Navigate, Route, Routes } from 'react-router-dom'
import FournisseurAuthentification from '../contextes/FournisseurAuthentification'
import RouteProtegee from '../composants/admin/RouteProtegee'
import PageConnexion from './PageConnexion'
import PageTableauDeBord from './PageTableauDeBord'
import PageProjetsAdmin from './PageProjetsAdmin'
import PageMessagesAdmin from './PageMessagesAdmin'

function PageAdmin() {
    return (
        <FournisseurAuthentification>
            <Routes>
                <Route index element={<PageConnexion />} />
                <Route
                    path="tableau-de-bord"
                    element={
                        <RouteProtegee>
                            <PageTableauDeBord />
                        </RouteProtegee>
                    }>
                    <Route index element={<Navigate to="projets" replace />} />
                    <Route path="projets" element={<PageProjetsAdmin />} />
                    <Route path="messages" element={<PageMessagesAdmin />} />
                </Route>
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </FournisseurAuthentification>
    )
}

export default PageAdmin

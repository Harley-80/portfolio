import Section from '../ui/Section'
import CarteProjet from './CarteProjet'
import { useLangue } from '../../hooks/useLangue'
import { useProjets } from '../../hooks/useProjets'

function Projets() {
    const { t } = useLangue()
    const { projets, chargement, erreur } = useProjets()

    return (
        <Section id="projets" titre={t('projets.titre')}>
            <p className="projets__intro">{t('projets.intro')}</p>

            <p className="projets__etat" role="status">
                {chargement ? t('projets.chargement') : ''}
            </p>

            {erreur && (
                <p className="projets__erreur" role="alert">
                    {t('projets.erreur')}
                </p>
            )}

            {!chargement && !erreur && projets.length === 0 && (
                <p>{t('projets.vide')}</p>
            )}

            <div className="projets__liste">
                {projets.map(projet => (
                    <CarteProjet key={projet._id} projet={projet} />
                ))}
            </div>
        </Section>
    )
}

export default Projets

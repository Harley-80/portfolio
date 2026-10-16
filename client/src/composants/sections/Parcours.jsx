import Section from '../ui/Section'
import { useLangue } from '../../hooks/useLangue'
import { EXPERIENCES, FORMATIONS } from '../../donnees/parcours'

function Parcours() {
    const { t } = useLangue()

    return (
        <Section id="parcours" titre={t('parcours.titre')}>
            <div className="parcours">
                <div>
                    <h3 className="parcours__sous-titre">
                        {t('parcours.formation')}
                    </h3>
                    <ol className="parcours__liste">
                        {FORMATIONS.map(formation => (
                            <li
                                key={formation.id}
                                className="parcours__element">
                                <p className="parcours__annees">
                                    {formation.annees}
                                </p>
                                <h4 className="parcours__intitule">
                                    {t(`${formation.cle}.diplome`)}
                                </h4>
                                <p className="parcours__detail">
                                    {t(`${formation.cle}.etablissement`)}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3 className="parcours__sous-titre">
                        {t('parcours.experiences')}
                    </h3>
                    <ol className="parcours__liste">
                        {EXPERIENCES.map(experience => (
                            <li
                                key={experience.id}
                                className="parcours__element">
                                <h4 className="parcours__intitule">
                                    {t(`${experience.cle}.titre`)}
                                </h4>
                                <p className="parcours__detail">
                                    {t(`${experience.cle}.description`)}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Section>
    )
}

export default Parcours

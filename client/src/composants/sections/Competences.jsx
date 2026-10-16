import Section from '../ui/Section'
import { useLangue } from '../../hooks/useLangue'
import { GROUPES_COMPETENCES } from '../../donnees/competences'

function Competences() {
    const { t } = useLangue()

    return (
        <Section id="competences" titre={t('competences.titre')}>
            <div className="competences">
                {GROUPES_COMPETENCES.map(groupe => (
                    <article
                        key={groupe.id}
                        className={`competences__groupe${groupe.enCours ? ' competences__groupe--en-cours' : ''}`}>
                        <h3 className="competences__titre">
                            {t(groupe.cleTitre)}
                        </h3>
                        <ul className="competences__liste">
                            {groupe.elements.map(element => (
                                <li
                                    key={element.cle ?? element.nom}
                                    className="competences__element">
                                    {element.cle ? t(element.cle) : element.nom}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </Section>
    )
}

export default Competences

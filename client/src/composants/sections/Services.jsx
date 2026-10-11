import Section from '../ui/Section'
import { useLangue } from '../../hooks/useLangue'
import { SERVICES } from '../../donnees/services'

function Services() {
    const { t } = useLangue()

    return (
        <Section id="services" titre={t('services.titre')}>
            <ul className="services">
                {SERVICES.map(service => (
                    <li key={service.id} className="services__carte">
                        <span className="services__icone" aria-hidden="true">
                            {service.icone}
                        </span>
                        <h3 className="services__titre">
                            {t(`${service.cle}.titre`)}
                        </h3>
                        <p>{t(`${service.cle}.description`)}</p>
                    </li>
                ))}
            </ul>
            <a
                className="bouton bouton--primaire services__action"
                href="#contact">
                {t('services.contacter')}
            </a>
        </Section>
    )
}

export default Services

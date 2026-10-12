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
                        <img
                            className="services__image"
                            src={service.image}
                            alt=""
                            width="800"
                            height="446"
                            loading="lazy"
                        />
                        <div className="services__corps">
                            <h3 className="services__titre">
                                {t(`${service.cle}.titre`)}
                            </h3>
                            <p>{t(`${service.cle}.description`)}</p>
                        </div>
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

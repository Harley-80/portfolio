import Section from '../ui/Section'
import { useLangue } from '../../hooks/useLangue'

function APropos() {
    const { t } = useLangue()

    return (
        <Section id="a-propos" titre={t('aPropos.titre')}>
            <div className="a-propos">
                <img
                    className="a-propos__photo"
                    src="/images/photo-profil.jpg"
                    alt={t('aPropos.photoAlt')}
                    width="448"
                    height="448"
                    loading="lazy"
                />
                <div className="a-propos__texte">
                    <p>{t('aPropos.paragraphe1')}</p>
                    <p>{t('aPropos.paragraphe2')}</p>
                    <div className="a-propos__actions">
                        <a
                            className="bouton bouton--primaire"
                            href="/documents/cv-harley-ndouyi.pdf"
                            download>
                            {t('aPropos.cvDeveloppeur')}
                        </a>
                        <a
                            className="bouton bouton--secondaire"
                            href="/documents/cv-harley-ndouyi-assistant-it.pdf"
                            download>
                            {t('aPropos.cvAssistantIt')}
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default APropos

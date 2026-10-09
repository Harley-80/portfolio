import { useLangue } from '../../hooks/useLangue'

function Accueil() {
    const { t } = useLangue()

    return (
        <section
            id="accueil"
            className="accueil"
            aria-labelledby="titre-accueil">
            <div className="conteneur accueil__contenu">
                <p className="accueil__salutation">{t('accueil.salutation')}</p>
                <h1 id="titre-accueil" className="accueil__nom">
                    Harley Fedy NDOUYI
                </h1>
                <p className="accueil__titre">{t('accueil.titre')}</p>
                <p className="accueil__sous-titre">{t('accueil.sousTitre')}</p>
                <p className="accueil__accroche">{t('accueil.accroche')}</p>
                <p className="accueil__localisation">
                    {t('accueil.localisation')}
                </p>
                <div className="accueil__actions">
                    <a className="bouton bouton--primaire" href="#projets">
                        {t('accueil.voirProjets')}
                    </a>
                    <a className="bouton bouton--secondaire" href="#contact">
                        {t('accueil.contacter')}
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Accueil

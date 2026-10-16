import { useState } from 'react'
import { useLangue } from '../../hooks/useLangue'

const nomImage = chemin =>
    chemin
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')

const estUrlSure = url => typeof url === 'string' && /^https?:\/\//i.test(url)

function CarteProjet({ projet }) {
    const { langue, t } = useLangue()
    const [indexActif, setIndexActif] = useState(0)

    const choisirTexte = texte => texte?.[langue] || texte?.fr || ''

    const traduireOuDefaut = (cle, defaut) => {
        const texte = t(cle)
        return texte === cle ? defaut : texte
    }

    const titre = choisirTexte(projet.titre)
    const probleme = choisirTexte(projet.probleme)
    const images = projet.images ?? []
    const imageActive = images[indexActif]
    const idTitre = `projet-titre-${projet._id}`

    const legende = (chemin, index) =>
        traduireOuDefaut(`projets.legende.${nomImage(chemin)}`, `${index + 1}`)

    const lienGithubValide = estUrlSure(projet.lienGithub)
    const lienDemoValide = estUrlSure(projet.lienDemo)

    return (
        <article className="projet" aria-labelledby={idTitre}>
            <div className="projet__galerie">
                {imageActive && (
                    <figure className="projet__figure">
                        <img
                            className="projet__image"
                            src={imageActive}
                            alt={traduireOuDefaut(
                                `projets.alt.${nomImage(imageActive)}`,
                                titre
                            )}
                            width="1280"
                            height="629"
                            loading="lazy"
                        />
                        <figcaption
                            className="projet__legende"
                            aria-live="polite">
                            {legende(imageActive, indexActif)}
                        </figcaption>
                    </figure>
                )}
                {images.length > 1 && (
                    <ul
                        className="projet__vignettes"
                        aria-label={t('projets.galerie')}>
                        {images.map((chemin, index) => (
                            <li key={chemin}>
                                <button
                                    type="button"
                                    className="projet__vignette"
                                    aria-pressed={index === indexActif}
                                    onClick={() => setIndexActif(index)}>
                                    <img
                                        src={chemin}
                                        alt=""
                                        width="160"
                                        height="79"
                                        loading="lazy"
                                    />
                                    <span>{legende(chemin, index)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="projet__corps">
                <h3 id={idTitre} className="projet__titre">
                    {titre}
                </h3>
                <p>{choisirTexte(projet.resume)}</p>

                {probleme && (
                    <>
                        <h4 className="projet__sous-titre">
                            {t('projets.objectif')}
                        </h4>
                        <p>{probleme}</p>
                    </>
                )}

                {projet.role && (
                    <p className="projet__role">
                        <span className="projet__etiquette">
                            {t('projets.role')}
                        </span>{' '}
                        {projet.role}
                    </p>
                )}

                {projet.stack?.length > 0 && (
                    <>
                        <h4 className="projet__sous-titre">
                            {t('projets.technologies')}
                        </h4>
                        <ul className="projet__technologies">
                            {projet.stack.map(techno => (
                                <li key={techno} className="projet__techno">
                                    {techno}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {(lienGithubValide || lienDemoValide) && (
                    <div className="projet__liens">
                        {lienGithubValide && (
                            <a
                                className="bouton bouton--primaire"
                                href={projet.lienGithub}
                                target="_blank"
                                rel="noopener noreferrer">
                                {t('projets.voirCode')}
                                <span className="visuellement-cache">
                                    {' '}
                                    {t('commun.nouvelOnglet')}
                                </span>
                            </a>
                        )}
                        {lienDemoValide && (
                            <a
                                className="bouton bouton--primaire"
                                href={projet.lienDemo}
                                target="_blank"
                                rel="noopener noreferrer">
                                {t('projets.voirDemo')}
                                <span className="visuellement-cache">
                                    {' '}
                                    ({t('commun.nouvelOnglet')})
                                </span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}

export default CarteProjet

import { Link, useParams } from 'react-router-dom'
import ChampFormulaire from '../composants/admin/ChampFormulaire'
import { useFormulaireProjet } from '../hooks/useFormulaireProjet'
import ApercuImages from '../composants/admin/ApercuImages'
import { listerImages } from '../utilitaires/projetFormulaire'

const ROUTE_LISTE = '/admin/tableau-de-bord/projets'

const FormulaireProjet = ({ id }) => {
    const {
        estEdition,
        valeurs,
        erreurs,
        erreurGenerale,
        chargement,
        erreurChargement,
        introuvable,
        envoi,
        focusChamp,
        surChangement,
        soumettre,
    } = useFormulaireProjet(id)

    const propsChamp = nom => ({
        nom,
        valeur: valeurs[nom],
        onChange: surChangement,
        erreur: erreurs[nom],
        focusChamp,
    })

    if (chargement) {
        return <p role="status">Chargement du projet…</p>
    }

    if (erreurChargement || introuvable) {
        return (
            <div role="alert">
                <p>{erreurChargement || 'Projet introuvable.'}</p>
                <Link to={ROUTE_LISTE} className="bouton">
                    Retour aux projets
                </Link>
            </div>
        )
    }

    return (
        <section
            aria-labelledby="titre-formulaire"
            className="formulaire-projet">
            <Link to={ROUTE_LISTE} className="formulaire-projet__retour">
                ← Retour aux projets
            </Link>

            <h1 id="titre-formulaire">
                {estEdition ? 'Modifier le projet' : 'Nouveau projet'}
            </h1>

            <form onSubmit={soumettre} noValidate>
                {erreurGenerale && (
                    <p role="alert" className="formulaire-projet__erreur">
                        {erreurGenerale}
                    </p>
                )}

                <fieldset>
                    <legend>Titre</legend>
                    <ChampFormulaire
                        {...propsChamp('titreFr')}
                        libelle="Titre (français)"
                        requis
                        maxLength={120}
                    />
                    <ChampFormulaire
                        {...propsChamp('titreEn')}
                        libelle="Titre (anglais)"
                        lang="en"
                        maxLength={120}
                    />
                </fieldset>

                <fieldset>
                    <legend>Résumé</legend>
                    <ChampFormulaire
                        {...propsChamp('resumeFr')}
                        libelle="Résumé (français)"
                        multiligne
                        requis
                        maxLength={2000}
                    />
                    <ChampFormulaire
                        {...propsChamp('resumeEn')}
                        libelle="Résumé (anglais)"
                        lang="en"
                        multiligne
                        maxLength={2000}
                    />
                </fieldset>

                <fieldset>
                    <legend>Problème résolu</legend>
                    <ChampFormulaire
                        {...propsChamp('problemeFr')}
                        libelle="Problème (français)"
                        multiligne
                        maxLength={2000}
                    />
                    <ChampFormulaire
                        {...propsChamp('problemeEn')}
                        libelle="Problème (anglais)"
                        lang="en"
                        multiligne
                        maxLength={2000}
                    />
                </fieldset>

                <fieldset>
                    <legend>Informations</legend>
                    <ChampFormulaire
                        {...propsChamp('role')}
                        libelle="Rôle"
                        maxLength={120}
                    />
                    <ChampFormulaire
                        {...propsChamp('stack')}
                        libelle="Technologies"
                        aide="Séparées par des virgules (20 maximum). Exemple : React, Node.js, MongoDB"
                    />
                    <ChampFormulaire
                        {...propsChamp('lienDemo')}
                        libelle="Lien de la démo"
                        type="url"
                        aide="URL complète commençant par https://"
                    />
                    <ChampFormulaire
                        {...propsChamp('lienGithub')}
                        libelle="Lien GitHub"
                        type="url"
                        aide="URL complète commençant par https://"
                    />
                </fieldset>

                <fieldset>
                    <legend>Images</legend>
                    <ChampFormulaire
                        {...propsChamp('images')}
                        libelle="Chemins des images"
                        multiligne
                        lignes={4}
                        aide="Un chemin par ligne (10 maximum). Exemple : /images/projets/nody-accueil.webp"
                    />
                    <ApercuImages chemins={listerImages(valeurs.images)} />
                </fieldset>

                <fieldset>
                    <legend>Publication</legend>
                    <ChampFormulaire
                        {...propsChamp('ordre')}
                        libelle="Ordre d'affichage"
                        type="number"
                        min={0}
                        max={999}
                        inputMode="numeric"
                        aide="Nombre de 0 à 999. Les plus petits s'affichent en premier."
                    />
                    <div className="champ champ--case">
                        <label>
                            <input
                                type="checkbox"
                                name="publie"
                                checked={valeurs.publie}
                                onChange={surChangement}
                            />{' '}
                            Publier ce projet sur le site
                        </label>
                    </div>
                </fieldset>

                <div className="formulaire-projet__actions">
                    <button
                        type="submit"
                        className="bouton bouton--primaire"
                        disabled={envoi}>
                        {envoi ? 'Enregistrement…' : 'Enregistrer'}
                    </button>
                    <Link to={ROUTE_LISTE} className="bouton">
                        Annuler
                    </Link>
                </div>
            </form>
        </section>
    )
}

const PageFormulaireProjet = () => {
    const { id } = useParams()
    return <FormulaireProjet key={id ?? 'nouveau'} id={id} />
}

export default PageFormulaireProjet

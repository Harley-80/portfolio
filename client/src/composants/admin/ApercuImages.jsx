import { useState } from 'react'
import { CHEMIN_IMAGE_VALIDE } from '../../utilitaires/projetFormulaire'

const ApercuImage = ({ chemin }) => {
    const [echec, setEchec] = useState(false)

    if (!CHEMIN_IMAGE_VALIDE.test(chemin)) {
        return (
            <p className="apercu-images__erreur">Chemin invalide : {chemin}</p>
        )
    }

    if (echec) {
        return (
            <p className="apercu-images__erreur">
                Image introuvable : {chemin}
            </p>
        )
    }

    return (
        <figure className="apercu-images__figure">
            <img
                src={chemin}
                alt=""
                className="apercu-images__image"
                onError={() => setEchec(true)}
            />
            <figcaption>{chemin}</figcaption>
        </figure>
    )
}

const ApercuImages = ({ chemins }) => {
    if (chemins.length === 0) return null

    return (
        <ul className="apercu-images" aria-label="Aperçu des images">
            {chemins.map(chemin => (
                <li key={chemin}>
                    <ApercuImage chemin={chemin} />
                </li>
            ))}
        </ul>
    )
}

export default ApercuImages

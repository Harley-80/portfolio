import { useEffect, useId, useRef } from 'react'

const ChampFormulaire = ({
    nom,
    libelle,
    valeur,
    onChange,
    erreur,
    aide,
    type = 'text',
    multiligne = false,
    lignes = 4,
    requis = false,
    focusChamp,
    ...autres
}) => {
    const id = useId()
    const idAide = `${id}-aide`
    const idErreur = `${id}-erreur`
    const reference = useRef(null)

    useEffect(() => {
        if (focusChamp?.nom === nom) {
            reference.current?.focus()
        }
    }, [focusChamp, nom])

    const description =
        [aide ? idAide : null, erreur ? idErreur : null]
            .filter(Boolean)
            .join(' ') || undefined

    const proprietes = {
        id,
        name: nom,
        value: valeur,
        onChange,
        ref: reference,
        'aria-required': requis ? 'true' : undefined,
        'aria-invalid': erreur ? 'true' : undefined,
        'aria-describedby': description,
        className:
            erreur ?
                'champ__controle champ__controle--erreur'
            :   'champ__controle',
        ...autres,
    }

    return (
        <div className="champ">
            <label htmlFor={id} className="champ__libelle">
                {libelle}
                {requis && (
                    <span className="champ__requis"> (obligatoire)</span>
                )}
            </label>

            {aide && (
                <p id={idAide} className="champ__aide">
                    {aide}
                </p>
            )}

            {multiligne ?
                <textarea rows={lignes} {...proprietes} />
            :   <input type={type} {...proprietes} />}

            {erreur && (
                <p id={idErreur} className="champ__erreur">
                    {erreur}
                </p>
            )}
        </div>
    )
}

export default ChampFormulaire

function ChampFormulaire({
    nom,
    libelle,
    valeur,
    onChange,
    erreur,
    requis = false,
    multiligne = false,
    ...autres
}) {
    const id = `contact-${nom}`
    const idErreur = `${id}-erreur`
    const proprietes = {
        id,
        name: nom,
        value: valeur,
        onChange,
        required: requis,
        className: 'champ__controle',
        'aria-invalid': Boolean(erreur),
        'aria-describedby': erreur ? idErreur : undefined,
        ...autres,
    }

    return (
        <div className="champ">
            <label className="champ__libelle" htmlFor={id}>
                {libelle}
                {requis && ' *'}
            </label>
            {multiligne ?
                <textarea rows={6} {...proprietes} />
            :   <input {...proprietes} />}
            {erreur && (
                <p id={idErreur} className="champ__erreur" role="alert">
                    {erreur}
                </p>
            )}
        </div>
    )
}

export default ChampFormulaire

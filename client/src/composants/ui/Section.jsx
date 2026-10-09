function Section({ id, titre, children }) {
    const idTitre = `titre-${id}`

    return (
        <section id={id} className="section" aria-labelledby={idTitre}>
            <div className="conteneur">
                <h2 id={idTitre} className="section__titre">
                    {titre}
                </h2>
                {children}
            </div>
        </section>
    )
}

export default Section

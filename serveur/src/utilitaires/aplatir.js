const estObjetSimple = (valeur) =>
    valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur);

// { titre: { fr: 'A' } } -> { 'titre.fr': 'A' }
// Permet un $set partiel sans écraser les sous-champs voisins (ex. titre.en).
export const aplatir = (objet, prefixe = '') =>
    Object.entries(objet).reduce((resultat, [cle, valeur]) => {
        const chemin = prefixe ? `${prefixe}.${cle}` : cle;
        if (estObjetSimple(valeur)) {
            Object.assign(resultat, aplatir(valeur, chemin));
        } else {
            resultat[chemin] = valeur;
        }
        return resultat;
    }, {});

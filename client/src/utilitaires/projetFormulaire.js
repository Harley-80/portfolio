export const VALEURS_VIDES = {
    titreFr: '',
    titreEn: '',
    resumeFr: '',
    resumeEn: '',
    problemeFr: '',
    problemeEn: '',
    role: '',
    stack: '',
    lienDemo: '',
    lienGithub: '',
    images: '',
    ordre: '',
    publie: false,
}

const CORRESPONDANCE_CHAMPS = {
    'titre.fr': 'titreFr',
    'titre.en': 'titreEn',
    'resume.fr': 'resumeFr',
    'resume.en': 'resumeEn',
    'probleme.fr': 'problemeFr',
    'probleme.en': 'problemeEn',
    role: 'role',
    stack: 'stack',
    lienDemo: 'lienDemo',
    lienGithub: 'lienGithub',
    images: 'images',
    ordre: 'ordre',
    publie: 'publie',
}

const MESSAGE_PAR_DEFAUT_SERVEUR = 'Invalid value'

export const projetVersValeurs = projet => ({
    titreFr: projet.titre?.fr ?? '',
    titreEn: projet.titre?.en ?? '',
    resumeFr: projet.resume?.fr ?? '',
    resumeEn: projet.resume?.en ?? '',
    problemeFr: projet.probleme?.fr ?? '',
    problemeEn: projet.probleme?.en ?? '',
    role: projet.role ?? '',
    stack: (projet.stack ?? []).join(', '),
    lienDemo: projet.lienDemo ?? '',
    lienGithub: projet.lienGithub ?? '',
    images: (projet.images ?? []).join('\n'),
    ordre: String(projet.ordre ?? 0),
    publie: Boolean(projet.publie),
})

const decouperListe = (texte, separateur) => {
    const dejaVus = new Set()
    return texte
        .split(separateur)
        .map(element => element.trim())
        .filter(element => {
            if (element === '') return false
            const cle = element.toLowerCase()
            if (dejaVus.has(cle)) return false
            dejaVus.add(cle)
            return true
        })
}

// Miroir de la règle du serveur (projet.validateur.js) pour un retour immédiat.
export const CHEMIN_IMAGE_VALIDE =
    /^\/images\/projets\/[a-z0-9-]+\.(webp|png|jpe?g)$/

export const listerImages = texte => decouperListe(texte, /\r?\n/)

export const valeursVersDonnees = valeurs => {
    const ordre = valeurs.ordre.trim()

    return {
        titre: { fr: valeurs.titreFr.trim(), en: valeurs.titreEn.trim() },
        resume: { fr: valeurs.resumeFr.trim(), en: valeurs.resumeEn.trim() },
        probleme: {
            fr: valeurs.problemeFr.trim(),
            en: valeurs.problemeEn.trim(),
        },
        role: valeurs.role.trim(),
        stack: decouperListe(valeurs.stack, ','),
        lienDemo: valeurs.lienDemo.trim(),
        lienGithub: valeurs.lienGithub.trim(),
        images: listerImages(valeurs.images),
        ...(ordre !== '' && { ordre }),
        publie: valeurs.publie,
    }
}

export const erreursVersChamps = details => {
    const erreurs = {}
    for (const { champ, message } of details ?? []) {
        const nom = CORRESPONDANCE_CHAMPS[champ.replace(/\[\d+\]/g, '')]
        if (nom && !erreurs[nom]) {
            erreurs[nom] =
                message === MESSAGE_PAR_DEFAUT_SERVEUR ? 'Valeur invalide.' : (
                    message
                )
        }
    }
    return erreurs
}

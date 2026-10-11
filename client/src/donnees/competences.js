export const GROUPES_COMPETENCES = [
    {
        id: 'langages',
        cleTitre: 'competences.langages',
        elements: [{ nom: 'JavaScript (ES6+)' }, { nom: 'TypeScript' }],
    },
    {
        id: 'frontend',
        cleTitre: 'competences.frontend',
        elements: [
            { nom: 'React' },
            { nom: 'Redux' },
            { nom: 'Context API' },
            { nom: 'Vite' },
            { nom: 'Sass' },
            { nom: 'Tailwind CSS' },
            { nom: 'Bootstrap' },
        ],
    },
    {
        id: 'backend',
        cleTitre: 'competences.backend',
        elements: [
            { nom: 'Node.js' },
            { nom: 'Express' },
            { cle: 'competences.apiRest' },
            { cle: 'competences.authentification' },
            { nom: 'npm' },
        ],
    },
    {
        id: 'bases-de-donnees',
        cleTitre: 'competences.basesDeDonnees',
        elements: [{ nom: 'MongoDB' }, { nom: 'MySQL' }],
    },
    {
        id: 'outils',
        cleTitre: 'competences.outils',
        elements: [
            { nom: 'Git' },
            { nom: 'GitHub' },
            { nom: 'Postman' },
            { nom: 'UML' },
            { nom: 'MVC' },
        ],
    },
    {
        id: 'support',
        cleTitre: 'competences.support',
        elements: [
            { cle: 'competences.windows' },
            { cle: 'competences.office' },
            { cle: 'competences.maintenance' },
        ],
    },
    {
        id: 'en-cours',
        cleTitre: 'competences.enCours',
        enCours: true,
        elements: [{ nom: 'Figma' }, { nom: 'n8n' }],
    },
]

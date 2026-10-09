import { useEffect, useState } from 'react'
import { ContexteTheme } from './ContexteTheme'

const CLE_STOCKAGE = 'theme'

const lireThemeInitial = () => {
    try {
        const themeSauvegarde = localStorage.getItem(CLE_STOCKAGE)
        if (themeSauvegarde === 'light' || themeSauvegarde === 'dark') {
            return themeSauvegarde
        }
    } catch {
        // Stockage indisponible : on suit la préférence du système.
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ?
            'dark'
        :   'light'
}

export function FournisseurTheme({ children }) {
    const [theme, setTheme] = useState(lireThemeInitial)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem(CLE_STOCKAGE, theme)
        } catch {
            // Sans stockage, le thème n'est simplement pas mémorisé.
        }
    }, [theme])

    const basculerTheme = () => {
        setTheme(actuel => (actuel === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ContexteTheme.Provider value={{ theme, basculerTheme }}>
            {children}
        </ContexteTheme.Provider>
    )
}

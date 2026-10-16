import { useContext } from 'react'
import { ContexteTheme } from '../contextes/ContexteTheme'

export function useTheme() {
    const contexte = useContext(ContexteTheme)
    if (!contexte) {
        throw new Error('useTheme doit être utilisé dans un FournisseurTheme.')
    }
    return contexte
}

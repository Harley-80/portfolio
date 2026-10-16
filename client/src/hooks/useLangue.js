import { useContext } from 'react'
import { ContexteLangue } from '../contextes/ContexteLangue'

export function useLangue() {
    const contexte = useContext(ContexteLangue)
    if (!contexte) {
        throw new Error(
            'useLangue doit être utilisé dans un FournisseurLangue.'
        )
    }
    return contexte
}

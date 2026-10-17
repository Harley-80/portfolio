import { useContext } from 'react'
import { ContexteAuthentification } from '../contextes/ContexteAuthentification'

export function useAuthentification() {
    const contexte = useContext(ContexteAuthentification)

    if (contexte === null) {
        throw new Error(
            'useAuthentification doit être utilisé dans un FournisseurAuthentification'
        )
    }

    return contexte
}

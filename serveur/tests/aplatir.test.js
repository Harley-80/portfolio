import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aplatir } from '../src/utilitaires/aplatir.js';

test('aplatir transforme les objets imbriqués en chemins pointés', () => {
    const resultat = aplatir({ titre: { fr: 'A' }, stack: ['React'], publie: true });
    assert.deepEqual(resultat, { 'titre.fr': 'A', stack: ['React'], publie: true });
});

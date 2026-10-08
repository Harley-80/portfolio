// Express 4 ne capte pas les rejets de promesses : on les transmet à next().
export const enveloppeAsync = (gestionnaire) => (req, res, next) =>
    Promise.resolve(gestionnaire(req, res, next)).catch(next);

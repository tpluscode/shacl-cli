import knownPrefixes from '@zazuko/rdf-vocabularies/prefixes';

const { rdf, sh } = knownPrefixes

export function getPrefixes(prefixes) {
    return prefixes.reduce((map, prefix) => {
        if (!prefix in knownPrefixes) {
            return map
        }

        return {
            ...map,
            [prefix]: knownPrefixes[prefix]
        }
    }, { rdf, sh })
}

import knownPrefixes from '@zazuko/rdf-vocabularies/prefixes'

const { rdf, sh } = knownPrefixes

export function getNamespace(...args) {
  const [next, prev = { rdf, sh }] = args
  if (next in knownPrefixes) {
    return {
      ...prev,
      [next]: knownPrefixes[next],
    }
  }

  const [prefix, namespace] = next.split('=')
  if (namespace) {
    return {
      ...prev,
      [prefix]: namespace,
    }
  }

  return prev
}

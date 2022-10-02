import { fromFile } from 'rdf-utils-fs'
import fromStream from 'rdf-dataset-ext/fromStream.js'
import $rdf from '@rdfjs/dataset'
import Validator from 'rdf-validate-shacl'

const extensions = {
  json: 'application/ld+json',
  nq: 'application/n-quads',
  nt: 'application/n-triples',
  ttl: 'text/turtle',
  trig: 'application/trig',
}

export async function getReport(shapeSources, dataSources) {
  const shapes = $rdf.dataset()
  const data = $rdf.dataset()

  await Promise.all(shapeSources.map(async path => {
    const fileStream = fromFile(path, { extensions })
    await fromStream(shapes, fileStream)
  }))

  await Promise.all(dataSources.map(async path => {
    const fileStream = fromFile(path, { extensions })
    await fromStream(data, fileStream)
  }))

  const validator = new Validator(shapes)
  return validator.validate(data)
}

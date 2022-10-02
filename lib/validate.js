import { fromFile } from 'rdf-utils-fs'
import fromStream from 'rdf-dataset-ext/fromStream.js'
import $rdf from '@rdfjs/dataset'
import Validator from 'rdf-validate-shacl'

export async function getReport(shapeSources, dataSources) {
  const shapes = $rdf.dataset()
  const data = $rdf.dataset()

  await Promise.all(shapeSources.map(async path => {
    const fileStream = fromFile(path)
    await fromStream(shapes, fileStream)
  }))

  await Promise.all(dataSources.map(async path => {
    const fileStream = fromFile(path)
    await fromStream(data, fileStream)
  }))

  const validator = new Validator(shapes)
  return validator.validate(data)
}

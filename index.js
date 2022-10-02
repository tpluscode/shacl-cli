#!/usr/bin/env node
import { promisify } from 'util'
import stream from 'stream'
import { program } from 'commander'
import toStream from 'rdf-dataset-ext/toStream.js'
import { turtle } from '@rdfjs-elements/formats-pretty/serializers'
import { getReport } from './lib/validate.js'
import { getNamespace } from './lib/prefixes.js'
import { flattenGlobs } from './lib/paths.js'

const finished = promisify(stream.finished)

program
  .command('validate')
  .requiredOption('--shapes <shapes...>', 'Sources of the Shapes Graph')
  .requiredOption('--data <data...>', 'Source of the Data Graph')
  .option('--prefixes <prefixes...>', 'Prefixes of common vocabularies known to the @zazuko/rdf-vocabularies package', getNamespace)
  .action(async ({ shapes, data, prefixes }) => {
    const sink = await turtle({
      prefixes,
    })

    const report = await getReport(flattenGlobs(shapes), flattenGlobs(data))
    const outStream = sink.import(toStream(report.dataset))
    outStream.pipe(process.stdout)

    return finished(outStream)
      .then(() => {
        process.exit(report.conforms ? 0 : report.results.length)
      })
      .catch(onError)
  })

program.parseAsync(process.argv).catch(onError)

function onError(e) {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(-1)
}

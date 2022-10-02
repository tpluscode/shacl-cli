# shacl-cli [![npm version](https://badge.fury.io/js/@tpluscode%2Fshacl-cli.svg)](https://badge.fury.io/js/@tpluscode%2Fshacl-cli)

Validate RDF using SHACL from the command line. Uses RDF/JS tooling

## Why?

* [x] Loads shapes and data graph from any RDF format known to [@rdfjs/formats-common](https://npm.im/@rdfjs/formats-common).
* [x] Requires only node. No JVM, no Python, etc
* [x] Easily load shapes and data from multiple sources using globs

## Installation

```
npm install @tpluscode/shacl-cli
```

## Usage

```
Usage: shacl-cli validate [options]

Options:
  --shapes <shapes...>      Sources of the Shapes Graph
  --data <data...>          Source of the Data Graph
  --prefixes <prefixes...>  Prefixes of common vocabularies known to the @zazuko/rdf-vocabularies package or custom prefixes as prefix=namespace
  -h, --help                display help for command
```

### Shapes and data as globs

Validates multiple data files using multiple shape sources

```
shacl-cli validate \
  --shapes example/shape/*.ttl \
  --data example/person/*.ttl
```

### Select individual files

Both `--shapes` and `--data` allow multiple values and can be used multiple times

```
shacl-cli validate \
  --shapes example/shape/Person.ttl example/shape/Occupation.ttl \
  --data example/person/John.ttl \
  --data example/person/Frank.ttl
```

### Output prefixes

The output is a nicely formatted turtle. Add `--prefixes` to shorten URIs.

```
shacl-cli validate \
  --shapes example/shape/*.ttl \
  --data example/person/*.ttl \
  --prefixes schema person=http://example.org/person/
```

### Other formats are supported

```
shacl-cli validate \
  --shapes example/shape/*.ttl \
  --data example/person/multiple.trig
```

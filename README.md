### Hexlet tests and linter status:
[![Actions Status](https://github.com/therelyona/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/therelyona/frontend-project-46/actions)
[![Node CI](https://github.com/therelyona/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/therelyona/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/a3e79b6d4d700ddafafc/maintainability)](https://codeclimate.com/github/therelyona/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a3e79b6d4d700ddafafc/test_coverage)](https://codeclimate.com/github/therelyona/frontend-project-46/test_coverage)

# Difference Finder

It's a program that determines the difference between two data structures. This is a common task for which there are numerous online services, such as [jsondiff.com](http://www.jsondiff.com/). This mechanism is useful for outputting tests or tracking changes in configuration files.

**Utility Features:**

- Support for different input formats: YAML, JSON
- Output in 'plain', 'stylish', and JSON formats

Install
-------------------

1. Clone repository local
`git clone git@github.com:therelyona/frontend-project-46.git`
2. Install all dependencies 
`npm install`
3. Install  apps global
`npm link`

### How to use
```
# Run
gendiff [options] <filepath1> <filepath2>

# Example
gendiff --format plain ./__fixtures__/file1.yaml ./__fixtures__/file2.json

# To display the help, run
gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```

**Compare json:**
[![asciicast](https://asciinema.org/a/28NcaNQj0f1lG9LmhDyp38v0d.svg)](https://asciinema.org/a/28NcaNQj0f1lG9LmhDyp38v0d)
**Compare yaml:**
[![asciicast](https://asciinema.org/a/xCzgR3Ohuui5OHoQknB0j36vg.svg)](https://asciinema.org/a/xCzgR3Ohuui5OHoQknB0j36vg)
**Comparison with format stylish:**
[![asciicast](https://asciinema.org/a/5XZFIlXZrMLttpobmjgWXuApE.svg)](https://asciinema.org/a/5XZFIlXZrMLttpobmjgWXuApE)
**Comparison with format plain:**
[![asciicast](https://asciinema.org/a/rbjXj4OXIbpq8sliOldlzJe8K.svg)](https://asciinema.org/a/rbjXj4OXIbpq8sliOldlzJe8K)
**Comparison with format json:**
[![asciicast](https://asciinema.org/a/7xyv7Epn2niicibFB8vnnyS0k.svg)](https://asciinema.org/a/7xyv7Epn2niicibFB8vnnyS0k)
# hoppscotch-transformer

This is a CLI tools to transform exports from other tools to hoppscotch importable formats.

```
Usage: hoppscotch-transform [options]

Transform postman files to hoppscotch.io importable files.

Options:
  -V, --version         output the version number
  -p, --postman <file>  postman environment zip-file
  -f, --format          format output file structured
  -h, --help            display help for command
```

## Current Features

- Convert postman environment (zip) to hoppsctoch environment json


## Setup
Use following command to setup and install

> npm install && npm run create

## Install
Use following command to install `hoppscotch-transform` command

> npm run local

## Test
Display version and help
> hoppscotch-transform

## Run
Try to transform given sample file
> hoppscotch-transform -p ./samples/postman-env.zip -f

# Contribute
Feel free to extend this tool with more features!
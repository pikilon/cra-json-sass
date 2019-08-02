#!/usr/bin/env node
const getArgs = require('../src/get-config-args')
const fileProcessor = require('../src/file-processor')

const { folder, fileExtension } = getArgs()

fileProcessor(folder, true, fileExtension)

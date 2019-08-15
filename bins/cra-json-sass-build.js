#!/usr/bin/env node
const getArgs = require('../build/src/get-config-args').default
const fileProcessor = require('../build/src/file-processor').default

const { folder, fileExtension } = getArgs()

fileProcessor(folder, false, fileExtension)

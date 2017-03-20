#!/usr/bin/env node

/*jshint esversion: 6 */

'use strict';

const consolidate = require('consolidate');
const fs = require('fs');
const program = require('commander');
const cwd = process.cwd();

console.log('\n  lazy generate\n');

if (!fs.existsSync(`${cwd}/.lazy`)) {
  console.log(`  Lazy project folder not found, please execute: lazy init`);
  process.exit(1);
}
const lazySettings = JSON.parse(fs.readFileSync(`${cwd}/.lazy/lazy-settings.json`));

program.parse(process.argv);

if (!program.args.length) {
  console.error('  ERROR - template required');
  process.exit(1);
}

const template = program.args[0];
const templateArgs = program.args.slice(1);

let templatePath = `${cwd}/.lazy/templates/${template}`;
let templateSettings = JSON.parse(fs.readFileSync(`${templatePath}/template-settings.json`));

if (templateArgs.lentgh < templateSettings.inputs.length) {
  console.error('  ERROR - Missing template arguments');

  let inputs = '';
  templateSettings.inputs.forEach(input => {
    inputs += `[${input}]`;
  });

  console.error(`  lazy generate ${template} ${inputs}`)
  process.exit(1);
}

let inputs = {};
for (let key in templateSettings.inputs) {
  inputs[templateSettings.inputs[key]] = templateArgs[key];
}

let outputs = {};
for (let file in templateSettings.outputs) {
  let output = templateSettings.outputs[file];

  for (let input in inputs) {
    output = output.replace(`%{${input}}`, inputs[input]);
  }

  outputs[file] = output;
}

for (let file in outputs) {
  let output = outputs[file];

  console.log(`  Creating ${file} to ${output}`);

  let path = '';
  let directories = output.split("/");
  directories.slice(0, directories.length - 1).forEach(directory => {
    if (path.length > 0) {
      path += "/";
    }
    path += directory;

    if (!fs.existsSync(`${cwd}/${path}`)) {
      fs.mkdirSync(path);
    }
  });

  let templateParams = {};
  Object.assign(templateParams, {path, outputs});
  Object.assign(templateParams, inputs);

  consolidate[lazySettings.engine](`${templatePath}/${file}`, templateParams, (err, result) => {
    if (err) throw err;

    let outputFile = fs.openSync(`${cwd}/${output}`, 'w');
    fs.writeSync(outputFile, result);
    fs.closeSync(outputFile);
  });
}





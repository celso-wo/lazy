#!/usr/bin/env node

/*jshint esversion: 6 */

'use strict';

const fs = require('fs');
const program = require('commander');
const cwd = process.cwd();

console.log('\n  lazy generate\n');

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

for (let file in templateSettings.outputs) {
  let output = templateSettings.outputs[file];

  for (let input in inputs) {
    output = output.replace(`%{${input}}`, inputs[input]);
  }

  console.log(`  Creating ${file} to ${output}`);

  let path = cwd;
  let directories = output.split("/");
  directories.slice(0, directories.length - 1).forEach(directory => {
    path += "/" + directory;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });

  fs.createReadStream(`${templatePath}/${file}`).pipe(fs.createWriteStream(`${cwd}/${output}`));
}





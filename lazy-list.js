#!/usr/bin/env node
/*jshint esversion: 6 */

'use strict';

const fs = require('fs');
const program = require('commander');
const cwd = process.cwd();

if (fs.existsSync(`${cwd}/.lazy`)) {
  console.log('\n  lazy list');

  let files = fs.readdirSync(`${cwd}/.lazy/templates`);
  files.forEach(file => {
    let templateSettings = require(`${cwd}/.lazy/templates/${file}/template-settings.js`);

    let inputs = '';
    for (let key in templateSettings.inputs) {
      inputs += `[${templateSettings.inputs[key]}] `;
    }
    console.log(`  - ${file} ${inputs}`);
  });
} else {
  console.log(`\n  Lazy project folder not found.`);
}

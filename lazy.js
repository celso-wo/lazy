#!/usr/bin/env node
/*jshint esversion: 6 */

'use strict';

const fs = require('fs');
const program = require('commander');
const cwd = process.cwd();
const version = '0.0.1';

console.log(`\n  [Lazy] Version ${version}`);
console.log(`\n  Checking lazy configuration...`);
console.log(`  Current Directory: ${cwd}`);

if (fs.existsSync(`${cwd}/.lazy`)) {
  console.log(`  Lazy project folder found, ready to generate your templates ;)`);
} else {
  console.log(`  Lazy project folder not found, please execute: lazy init`);
}

console.log(); // to add new empty line in the console.

program
  .version(version)
  .command('init', 'Create a lazy template engine project for the current folder')
  .command('generate [template]', 'Generate files from a template')
  .command('list', 'List all your templates for the current folder');
program.parse(process.argv);

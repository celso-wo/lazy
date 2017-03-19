#!/usr/bin/env node
/*jshint esversion: 6 */

'use strict';

const fs = require('fs');
const cwd = process.cwd();

console.log("\n  lazy init");

if (fs.existsSync(`${cwd}/.lazy`)) {
  console.log(`\n  Lazy project folder found, it doesn't need to initialize a new one.`);
} else {
  console.log(`\n  Creating lazy project folder...`);
  fs.mkdirSync(`${cwd}/.lazy`);

  console.log(`  Creating settings file...`);
  var fd = fs.openSync(`${cwd}/.lazy/lazy-settings.json`, 'w');
  fs.writeSync(fd, "{");
  fs.writeSync(fd, "\n");
  fs.writeSync(fd, "}");
  fs.closeSync(fd);

  console.log("\n  Creating sample template");
  fs.mkdirSync(`${cwd}/.lazy/templates`);
  fs.mkdirSync(`${cwd}/.lazy/templates/sample`);
  fd = fs.openSync(`${cwd}/.lazy/templates/sample/template-settings.json`, 'w');
  fs.writeSync(fd, '{\n');
  fs.writeSync(fd, '  "inputs": ["filename"],\n');
  fs.writeSync(fd, '  "outputs": {\n');
  fs.writeSync(fd, '    "express.js": "outputFolder/%{filename}_express.js"\n');
  fs.writeSync(fd, '  }\n');
  fs.writeSync(fd, '}\n');
  fs.closeSync(fd);

  fd = fs.openSync(`${cwd}/.lazy/templates/sample/express.js`, 'w');
  fs.writeSync(fd, "var express = require('express');\n");
  fs.writeSync(fd, "var app = express();\n");
  fs.writeSync(fd, "app.get('/', function (req, res) {\n");
  fs.writeSync(fd, "  res.send('hello world');\n");
  fs.writeSync(fd, "});\n");
  fs.closeSync(fd);

  console.log(`\n  Completed!`);
}

// program
//   .option('-f, --force', 'force installation')
//   .parse(process.argv);

// var pkgs = program.args;

// if (!pkgs.length) {
//   console.error('packages required');
//   process.exit(1);
// }

// console.log();
// if (program.force) console.log('  force: install');
// pkgs.forEach(function(pkg){
//   console.log('  install : %s', pkg);
// });
// console.log();

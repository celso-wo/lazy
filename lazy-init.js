#!/usr/bin/env node
/*jshint esversion: 6 */

'use strict';

const fs = require('fs');
const cwd = process.cwd();

console.log("\n  lazy init");

if (fs.existsSync(`${cwd}/.lazy`)) {
  console.log(`\n  Lazy project folder found, it doesn't need to initialize a new one.`);
  process.exit(0);
}

console.log(`\n  Creating lazy project folder...`);
fs.mkdirSync(`${cwd}/.lazy`);

console.log(`  Creating settings file...`);
var fd = fs.openSync(`${cwd}/.lazy/lazy-settings.json`, 'w');
fs.writeSync(fd, '{');
fs.writeSync(fd, '  "engine": "ejs"');
fs.writeSync(fd, '}');
fs.closeSync(fd);

console.log("\n  Creating sample template");
fs.mkdirSync(`${cwd}/.lazy/templates`);
fs.mkdirSync(`${cwd}/.lazy/templates/sample`);
fd = fs.openSync(`${cwd}/.lazy/templates/sample/template-settings.json`, 'w');
fs.writeSync(fd, '{\n');
fs.writeSync(fd, '  "inputs": ["entity"],\n');
fs.writeSync(fd, '  "outputs": {\n');
fs.writeSync(fd, '    "entity.ejs": "output/entity/%{entity}.java",\n');
fs.writeSync(fd, '    "repository.ejs": "output/repository/%{entity}Repository.java"\n');
fs.writeSync(fd, '  }\n');
fs.writeSync(fd, '}\n');
fs.closeSync(fd);

fd = fs.openSync(`${cwd}/.lazy/templates/sample/entity.ejs`, 'w');
fs.writeSync(fd, `package <%= path.replace(/\\//, '.') %>\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `import javax.persistence.Column;\n`);
fs.writeSync(fd, `import javax.persistence.Entity;\n`);
fs.writeSync(fd, `import javax.persistence.GeneratedValue;\n`);
fs.writeSync(fd, `import javax.persistence.Id;\n`);
fs.writeSync(fd, `import javax.persistence.Table;\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `@Entity\n`);
fs.writeSync(fd, `@Table(name = "<%= entity.toUpperCase() %>")\n`);
fs.writeSync(fd, `public class <%= entity %> {\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `  @Id\n`);
fs.writeSync(fd, `  @GeneratedValue\n`);
fs.writeSync(fd, `  @Column(name = "ID")\n`);
fs.writeSync(fd, `  private Long id;\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `  public <%= entity %>() {\n`);
fs.writeSync(fd, `    // Default Constructor\n`);
fs.writeSync(fd, `  }\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `  public Long getId() {\n`);
fs.writeSync(fd, `      return id;\n`);
fs.writeSync(fd, `  }\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `  public void setId(Long id) {\n`);
fs.writeSync(fd, `      this.id = id;\n`);
fs.writeSync(fd, `  }\n`);
fs.writeSync(fd, `}\n`);
fs.closeSync(fd);

fd = fs.openSync(`${cwd}/.lazy/templates/sample/repository.ejs`, 'w');
fs.writeSync(fd, `package <%= path.replace(/\\//, '.') %>\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `public interface <%= entity %>Repository {\n`);
fs.writeSync(fd, `\n`);
fs.writeSync(fd, `}\n`);
fs.closeSync(fd);

console.log(`\n  Completed!`);

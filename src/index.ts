#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import { randomUUID } from "crypto";
import figlet from "figlet";
import JSZip from "jszip";
import { HoppscotchEnvironment } from "./types/hoppscotch";
import { PostmanEnvironment } from "./types/postman";

var fs = require("fs");
const program = require("commander");

async function run() {
  clear();
  console.log(
    chalk.blue(
      figlet.textSync("hoppscotch-transform", { horizontalLayout: "full" }),
      "by iDschepe"
    )
  );

  program
    .version("1.0.0")
    .description("Transform other files to hoppscotch.io importable files.")
    .option("-p, --postman <file>", "postman environment zip-file")
    .option("-f, --format", "format output file structured")
    .parse(process.argv);

  const options = program.opts();
  
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    return;
  }
  
  let sourcePath = options.postman;
  console.log(chalk.yellow(`Postman Environment zip: ${sourcePath}`));

  const pmEnvironments: PostmanEnvironment[] = [];

  await fs.readFile(sourcePath, async (err, data) => {
    if (err) throw err;
    await JSZip.loadAsync(data).then(async (zip) => {
      const fileKeys = Object.keys(zip.files);
      for (const key of fileKeys) {
        const current = zip.files[key];
        if (!current.dir && current.name.indexOf("archive.json") < 0) {
          const content = await zip.files[key].async("string");
          pmEnvironments.push(JSON.parse(content));
          console.log(
            `Preview: ${zip.files[key].name} | ${content.substring(0, 20)}...`
          );
        }
      }
    });

    console.log(
      chalk.yellow(`Processed environments: ${pmEnvironments.length}`)
    );
    await prepare(pmEnvironments, options);
  });
}

async function prepare(pmEnvironments: PostmanEnvironment[], options) {
  const importable: HoppscotchEnvironment[] = [];
  for (const env of pmEnvironments) {
    importable.push({
      name: env.name,
      variables: env.values.map((entry) => {
        return {
          key: entry.key,
          value: entry.value
            ?.replace(`{{${env.name}_`, `<<`)
            .replace("}}", ">>"),
        };
      }),
    });
  }
  const resultFileName = `${randomUUID()}.hoppscotch.json`;

  let resultContent: string;
  if (options.format) {
    resultContent = JSON.stringify(importable, null, 4);
  } else {
    resultContent = JSON.stringify(importable);
  }

  await fs.writeFile(resultFileName, resultContent, (err) => {
    if (err) throw err;
    console.log(chalk.greenBright(`Successfully created ./${resultFileName}`));
  });
}

run();

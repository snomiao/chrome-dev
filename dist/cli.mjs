#!/usr/bin/env node

// src/cli.ts
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// src/index.ts
import { resolve } from "path";
import puppeteer from "puppeteer";
async function chromeDev({
  inputs = [],
  extension = "",
  openExtensionPage = void 0,
  devtools = false,
  ignoreHTTPSErrors = true,
  ignoreDefaultArgs = false,
  port = 0,
  dotenv = true,
  ...otherArgs
} = {}) {
  const urls = new Set(inputs);
  if (port)
    urls.add(`https://localhost:${port}/`);
  const chromeArgs = [];
  if (extension) {
    const extensionPath = resolve(process.cwd(), extension);
    chromeArgs.push(`--load-extension=${extensionPath}`);
  }
  if (dotenv) {
    await import("dotenv/config");
  }
  const browser = await puppeteer.launch({
    headless: false,
    devtools,
    ignoreDefaultArgs: ignoreDefaultArgs ? true : ["--disable-extensions"],
    args: [...chromeArgs],
    defaultViewport: null,
    ignoreHTTPSErrors
  });
  if (urls.size)
    console.log("open urls: ", [...urls.values()]);
  while ((await browser.pages()).length < urls.size)
    await browser.newPage();
  const pages = await browser.pages();
  await Promise.allSettled(pages.map((page, i) => page.goto([...urls.values()][i])));
  console.log("All pages opened");
}

// src/cli.ts
cli();
async function cli() {
  const argv = await yargs(hideBin(process.argv)).scriptName("chrome-dev").string("extension").describe("extension", "extension mode").number("port").describe("port", "open http://localhost:port").boolean("dotenv").describe("dotenv", "load .env setting").boolean("devtools").describe("devtools", "open devtools everypage").alias("d", "devtools").alias("e", "extension").alias("p", "port").alias("h", "help").alias("v", "version").help().version().epilog("(C) snomiao.com 2022").argv;
  await chromeDev({ ...argv, inputs: argv._.map(String) });
}
export {
  cli as default
};
//# sourceMappingURL=cli.mjs.map

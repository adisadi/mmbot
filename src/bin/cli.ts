#!/usr/bin/env node

import * as gdax from "gdax";
import * as yargs from "yargs";

import { BackfillCommandModule } from "../commands/backfill";
import { ProductsCommandModule } from "../commands/products";
import { SimCommandModule } from "../commands/sim";
import { TestCommandModule } from "../commands/test";
import { Database } from "../db/db";

interface IConfig {
    mongo: { host: string, port: number, db: string };
    products: string[];
    apiURI: string;
}

// tslint:disable-next-line:no-var-requires
const config: IConfig = require("../config.json");

const db = new Database();

const y = yargs
    .command(new BackfillCommandModule(db))
    .command(new ProductsCommandModule())
    .command(new TestCommandModule())
    .command(new SimCommandModule(db))
    .help()
    .argv;

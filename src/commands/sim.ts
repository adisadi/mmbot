
import * as moment from "moment";

import { Argv, CommandModule } from "yargs";

import { Database } from "../db/db";
import { CandleCollection, ICandle, ITrade } from "../util/common";

// tslint:disable-next-line:no-var-requires
const status = require("node-status");
const console = status.console();

export class SimCommandModule implements CommandModule {
    public aliases = ["b"];
    public command = "sim [algo]";
    public describe = "sim desc";

    constructor(private database: Database) {

    }

    public builder = (yargs: Argv) => {
        return yargs;
    }
    // tslint:disable-next-line:no-empty
    public handler = (args: any) => {

    }
}

import chalk from "chalk";
import * as gdax from "gdax";
import { Argv, CommandModule } from "yargs";

export class TestCommandModule implements CommandModule {

    public aliases = ["t"];
    public command = "test";
    public describe = "test";

    public builder = (yargs: Argv) => {
        return yargs;
    }
    public handler = (args: any) => {
        console.log("test");
        return;
    }
}

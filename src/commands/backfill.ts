import * as gdax from "gdax";
import * as moment from "moment";
import { setTimeout } from "timers";
import { Argv, CommandModule } from "yargs";

import chalk from "chalk";

import { Database } from "../db/db";
import { CandleCollection, ICandle, ITrade } from "../util/common";

// tslint:disable-next-line:no-var-requires
const status = require("node-status");
const console = status.console();

export class BackfillCommandModule implements CommandModule {
    public aliases = ["b"];
    public command = "backfill [product] [days]";
    public describe = "backfill desc";

    constructor(private database: Database) {

    }

    public builder = (yargs: Argv) => {
        return yargs;
    }
    public handler = (args: any) => {

        const client = new gdax.PublicClient(undefined);

        let currentDate = moment();
        const endDate = moment(currentDate).subtract(args.days, "day");
        console.log(`${chalk.bold.blue("backfill")} from ${chalk.bold.green(currentDate.toLocaleString())} to ${chalk.bold.green(endDate.toLocaleString())}`);

        let lastTradeId = 0;

        const total = status.addItem("total", {});
        const lastdate = status.addItem("lastdate", {
            count: 0,
            custom() {
                return moment(this.count).toLocaleString();
            },
        });

        status.start({
            pattern: "{uptime.green.bold} {spinner.cyan}  |  Total: {total.blue.bold} | LastDate: {lastdate.custom.magenta}",
        });

        function getTrades(db: Database) {
            if (currentDate >= endDate) {

                const opt: any = {};
                if (lastTradeId > 0) {
                    opt.after = lastTradeId;
                }

                client.getProductTrades(args.product, opt, (err: any, response: any, res: any[]) => {
                    if (err) { throw err; }
                    if (response.statusCode !== 200) {
                        console.log("http error:" + response.statusCode);
                        return;
                    }
                    const trades: ITrade[] = res.map((t: any) => {
                        return {
                            Price: t.price,
                            Side: t.side,
                            Size: t.size,
                            Time: moment(t.time).toDate(),
                            TradeId: t.trade_id,
                        } as ITrade;
                    });

                    db.saveTrades(trades)
                        .then(() => {


                            lastdate.count = new Date(Math.min.apply(null, trades.map((e) => {
                                return e.Time;
                            })));

                            total.inc(trades.length);
                            currentDate = moment(res[res.length - 1].time);
                            lastTradeId = res[res.length - 1].trade_id;
                            setTimeout(() => { getTrades(db); }, 500);
                        });

                });
            } else {
                status.stop();
                console.log("");
            }
        }

        this.database.dropTrades()
            .then(() => {
                getTrades(this.database);
            });

    }
}


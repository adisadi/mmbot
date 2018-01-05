
'use strict';
const Gdax = require('gdax');
const moment = require("moment");
const publicClient = new Gdax.PublicClient('BTC-USD');


const startDate = moment(new Date());
const endDate = moment(startDate).subtract(1, "day");
let currentDate = moment(startDate);

let last_trade_id = 0;

function next() {

    if (currentDate >= endDate) {

        let args = {};
        if (last_trade_id > 0) {
            args.after = last_trade_id;
        }
        console.log("get :" + args);
        publicClient.getProductTrades(args, (err, response, res) => {
            if (err) throw err;
            if (response.statusCode !== 200) {
                console.log("http error:"+ response.statusCode);
                return;
            }
            res.map((t) => {
                console.log(t.time);
            });
            currentDate = moment(res[res.length - 1].time);
            last_trade_id = res[res.length - 1].trade_id;
            setImmediate(next);
        });
    }
}

next();

  
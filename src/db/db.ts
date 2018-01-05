// tslint:disable-next-line:no-var-requires
const config: any = require("../config.json");

import { Db, MongoClient } from "mongodb";
import { ICandle, ITrade } from "../util/common";

const mongo: any = (config as any).mongo;
const mongoConnectionString = "mongodb://" + mongo.host + ":" + mongo.port + "/" + mongo.db;

export class Database {

    public async saveTrades(trades: ITrade[]) {
        const client = await this.openConnection();
        const results = await client.db(mongo.db).collection("trades").insertMany(trades);
        await client.close();
        return results;
    }

    public async dropTrades() {
        const client = await this.openConnection();
        const results = await client.db(mongo.db).collection("trades").drop();
        await client.close();
        return results;
    }

    private async openConnection(): Promise<Db> {
        const client = await MongoClient.connect(mongoConnectionString);
        const db = client.db(mongo.db);

        db.createCollection("trades").then((col) => {
            col.createIndex({ TradeId: 1 }, { unique: true, sparse: true }).then();
        });
        return client;
    }
}

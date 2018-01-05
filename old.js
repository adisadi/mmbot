 /* private _historicTrades(){
        const client = new gdax.PublicClient(args.product, undefined);
        
                const periodSeconds = 120;
                const currentDate = moment();
                const endDate = moment(currentDate).subtract(args.days, "day");
                console.log(args.days);
                console.log(`backfill from ${currentDate.toLocaleString()} to ${endDate.toLocaleString()}`);
        
                console.log("Diff in seconds: " + currentDate.diff(endDate, "seconds"));
        
                const diffSecs = currentDate.diff(endDate, "seconds");
        
                const slices: any[] = [];
                for (let i = 0; i < diffSecs; i = i + (200 * periodSeconds)) {
                    const e = moment(currentDate).subtract(i, "seconds");
                    let s = moment(currentDate).subtract(i + (200 * periodSeconds), "seconds");
                    s = s < endDate ? moment(endDate) : s;
                    slices.push({
                        start: s.toISOString(),
                        end: e.toISOString(),
                        granularity: periodSeconds,
                    });
                }
        
                function* genFunc() {
                    for (const item of slices) {
                        yield item;
                    }
                }
        
                const insertResults = (res: any[][]) => {
                    const candles = res.map((item: any[]) => {
                        return {
                            Time: item[0],// moment(item[0], "X").toDate(),
                            Low: item[1],
                            High: item[2],
                            Open: item[3],
                            Close: item[4],
                            Volume: item[5],
                        } as ICandle;
                    });
                    console.log(candles.length);
                    this.database.saveCandles(candles)
                        .then(() => console.log("done"));
                };
        
                const genObj = genFunc();
        
                let val = genObj.next();
                console.log(`get data from ${val.value.start} to ${val.value.end}`);
                client.getProductHistoricRates(val.value).then((res: any[][]) => {
                    insertResults(res);
                });
        
        
                const interval = setInterval(() => {
                    val = genObj.next();
        
                    if (val.done) {
                        clearInterval(interval);
                    } else {
                        console.log(`get data from ${val.value.start} to ${val.value.end}`);
                        client.getProductHistoricRates(val)
                            .then((res: any[][]) => {
                                insertResults(res);
                            });
                    }
                }, 1000);
        
    } */
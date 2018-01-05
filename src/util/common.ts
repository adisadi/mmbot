
// tslint:disable-next-line:no-var-requires
const timebucket = require("timebucket");

export interface ICandle {
    Time: Date;
    Low: number;
    High: number;
    Open: number;
    Close: number;
    Volume: number;
}

export interface ITrade {
    Time: Date;
    TradeId: number;
    Price: number;
    Size: number;
    Side: string;
}

export class CandleCollection {
    private candles: ICandle[];

    constructor(private period: string) {
        this.candles = [];
    }

    public Count() {
        return this.candles.length;
    }

    public Candles(): ICandle[] {
        return this.candles;
    }

    public addTrade(trade: ITrade): void {
        const tb = timebucket(trade.Time).resize(this.period);
        let candle = this.candles.find((c) => {
            return timebucket(c.Time).resize(this.period).value === tb.value;
        });
        if (candle) {
            candle.High = Math.max(candle.High, trade.Price);
            candle.Low = Math.min(candle.Low, trade.Price);
            candle.Volume += trade.Size;
        } else {
            candle = {
                Time: timebucket(trade.Time).resize(this.period).toDate(),
                High: trade.Price,
                Low: trade.Price,
                Volume: trade.Size,
                Open: 0,
                Close: 0,
            } as ICandle;
            this.candles.push(candle);
        }
    }
}

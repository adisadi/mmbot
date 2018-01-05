declare module "timebucket";

declare module 'gdax' {
    export class PublicClient {
        constructor(apiURI?: string);
        getProductTrades(productID: string,args:any, callback:any): void;        
    }
}

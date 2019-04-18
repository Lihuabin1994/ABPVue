import Entity from './entity'

export default class Trade extends Entity<number>{
    accountNo:string;
    productCode:string;
    secType:string;
    mmy:string;
    putCall:string;
    strikePx:number;
    side:string;
    qty:number;
    ccy:string;
    exchange:string;
    accountType:string;
    bizDate:Date;
}
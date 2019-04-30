import Entity from './entity'

export default class Trade extends Entity<number>{
    SequenceID:number;
    AccountNo:string;
    ProductCode:string;
    SecType:string;
    MMY:string;
    PutCall:string;
    StrikePx:number;
    Side:string;
    Qty:number;
    Ccy:string;
    Exchange:string;
    AccountType:string;
}
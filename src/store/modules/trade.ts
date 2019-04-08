import {Store,Module,ActionContext}from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Trade from '../entities/trade'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result'
import ListMutations from './list-mutations';
interface TradeState extends ListState<Trade>{
    editTrade:Trade;
}
class TradeModule extends ListModule<TradeState,any,Trade>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list:new Array<Trade>(),
        loading:false,
        editTenant:new Trade()
    };
    actions={
        async getAll(context:ActionContext<TradeState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/TradeService/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Trade>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<TradeState,any>,payload:any){
            await Ajax.post('/api/services/app/TradeService/Create',payload.data);
        },
        async update(context:ActionContext<TradeState,any>,payload:any){
            await Ajax.put('/api/services/app/TradeService/Update',payload.data);
        },
        async delete(context:ActionContext<TradeState,any>,payload:any){
            await Ajax.delete('/api/services/app/TradeService/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<TradeState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/TradeService/Get?Id='+payload.id);
            return reponse.data.result as Trade;
        }
    };
    mutations={
        setCurrentPage(state:TradeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TradeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TradeState,trade:Trade){
            state.editTrade=trade;
        }
    }
}
const tradeModule=new TradeModule();
export default tradeModule;
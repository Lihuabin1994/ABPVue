 <template>

 </template>
 <script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../lib/util'
    import AbpBase from '../../lib/abpbase'
    import {FieldType,Filter,CompareType} from '../../store/entities/filter'
    import PageRequest from '../../store/entities/page-request'
    import CreateTrade from './create-trades.vue'
    import EditTrade from './edit-trades.vue'

    class PageTradeRequest extends PageRequest{
        AccountNo:string=''
        SecType:string=''
        ProductCode:string=''
    }

    @Component({
        components:{CreateTrade,EditTrade}
    })
    export default class Trades extends AbpBase{
          edit(){
              this.editModalShow=true;
          }
          pagerequest:PageTradeRequest=new PageTradeRequest();
          createModalShow:boolean=false;
          editModalShow:boolean=false;
          get list(){
              return this.$store.state.trades.list;
          }
    }
 </script>
 
 
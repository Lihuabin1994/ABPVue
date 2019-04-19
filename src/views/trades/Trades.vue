 <template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="8">
                         <FormItem :label="L('账户')+':'" style="width:60%">
                            <Input v-model="pagerequest.AccountNo"></Input>
                         </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem :label="L('产品代码')+':'" style="width:60%">
                                <Input v-model="pagerequest.ProductCode"></Input>
                            </FormItem>
                        </Col> 
                         <Col span="8">
                            <FormItem :label="L('交易类型')+':'" style="width:60%">
                                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                                <Select :placeholder="L('Select')" @on-change="isSecTypChange">
                                    <Option value="">{{L('')}}</Option>
                                    <Option value="FUT">{{L('Futuers')}}</Option>
                                    <Option value="OOF">{{L('Option')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>      
                    </Row>
                      <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
               <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
         <create-trade v-model="createModalShow" @save-success="getpage"></create-trade>
        <edit-trade v-model="editModalShow" @save-success="getpage"></edit-trade>
    </div>

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
              return this.$store.state.trade.list;
          };
          get loading(){
              return this.$store.state.trade.loading;
          };
           create(){
              this.createModalShow=true;
          }
          isSecTypChange(val:string){
              if(val==='Futuers'){
                  this.pagerequest.SecType='FUT';
              }else if(val==='Option'){
                  this.pagerequest.SecType='OOF';
              }else{
                  this.pagerequest.SecType=null;
              }
          }
          pageChange(page:number){
              this.$store.commit('trade/setCurrentPage',page)
          }
          pagesizeChange(pagesize:number){
              this.$store.commit('trade/setPageSize',pagesize);
              this.getpage();
          }
          async getpage(){
              this.pagerequest.maxResultCount=this.pageSize;
              this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
              await this.$store.dispatch({
                  type:'trade/getAll',
                  data:this.pagerequest
              }) 
                                }
          get pageSize(){
              return this.$store.state.trade.pageSize
          }
           get totalCount(){
            return this.$store.state.trade.totalCount;
        }
        get currentPage(){
            return this.$store.state.trade.currentPage;
        }
         async created(){
            this.getpage();
        }
        columns=[{
            title:this.L('清算日'),
            key:'bizDate',
             render:(h:any,params:any)=>{
                return h('span',new Date(params.row.bizDate).toLocaleDateString())
            }
        },{
            title:this.L('账户'),
            key:'accountNo'
        },
        {
            title:this.L('账户类型'),
            key:'accountType'
        },
        {
            title:this.L('交易所'),
            key:'exchange'
        }
        ,{
            title:this.L('产品代码'),
            key:'productCode'
        },
        {
            title:this.L('交易类型'),
            key:'secType',
            render:(h:any,params:any)=>{
                return h('span',params.row.secType==='FUT'?this.L('Futuers'):this.L('Option'))
            }
        },
        {
            title:this.L('合约'),
            key:'mmy'
        },
        {
            title:this.L('涨跌'),
            key:'putCall'
        },
        {
            title:this.L('执行价格'),
            key:'strikePx'
        },
        {
            title:this.L('买卖'),
            key:'side',
            render:(h:any,params:any)=>{
                return h('span',params.row.side==='1'?this.L('Buy'):this.L('Sell'));
            }
        },
        {
            title:this.L('数量'),
            key:'qty'
        },
        {
            title:this.L('币种'),
            key:'ccy'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('trade/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async()=>{
                                this.$Modal.confirm({
                                    title:this.L('Tips'),
                                    content:this.L('DeleteTradeConfirm'),
                                    okText:this.L('Yes'),
                                    cancelText:this.L('No'),
                                    onOk:async()=>{
                                        await this.$store.dispatch({
                                            type:'Trade/delete',
                                            data:params.row
                                        })
                                        await this.getpage();
                                    }
                                })

                            }
                        }
                    },this.L('Delete'))
                    
                ])
            }
        }
        ]
    }
 </script>
 
 
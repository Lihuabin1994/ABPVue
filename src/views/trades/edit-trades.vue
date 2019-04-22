<template>
    <div>
         <Modal
         :title="L('EditTrade')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
         width="600"
         >
           <Form ref="tradeForm"  :rules="tradeRule" :label-width="70" :model="trade" inline>
              <FormItem :label="L('清算日')" prop='bizDate'  >
                    <DatePicker  v-model="trade.bizDate"  format="yyyy-MM-dd" style="width:162px;"placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
               </FormItem>
              <FormItem :label="L('交易所')" prop='exchange' >
                   <Input v-model="trade.exchange" :maxlength="32" :minlength="2"></Input>
               </FormItem>
               <FormItem :label="L('账户')" prop='accountNo' >
                   <Input v-model="trade.accountNo" :maxlength="32" :minlength="2"></Input>
               </FormItem>
               <FormItem :label="L('账户类型')" prop='accountType'  >
                    <Select :placeholder="L('Select')" v-model="trade.accountType" style="width:162px;" >
                      <Option value="O" selected>{{L('Omnibus')}}</Option>
                      <Option value="S">{{L('Speculation')}}</Option>
                   </Select>
               </FormItem>
                <FormItem :label="L('产品代码')" prop='productCode' >
                   <Input v-model="trade.productCode" :maxlength="4" :minlength="4"></Input>
               </FormItem>
                <FormItem :label="L('合约')" prop='mmy' >
                   <Input v-model="trade.mmy" :maxlength="4" :minlength="4"></Input>
               </FormItem>
               <FormItem :label="L('交易类型')" prop='secType' >
                    <Select :placeholder="L('Select')" v-model="trade.secType" style="width:162px;">
                      <Option value="FUT" selected>{{L('Futuers')}}</Option>
                      <Option value="OOF">{{L('Option')}}</Option>
                   </Select>
               </FormItem>
               <FormItem :label="L('买卖')" prop='side' >
                 <Select :placeholder="L('Select')" v-model="trade.side" style="width:162px;">
                      <Option value="1" selected>{{L('Buy')}}</Option>
                      <Option value="2">{{L('Sell')}}</Option>
                   </Select>
               </FormItem>
               
                <FormItem :label="L('数量')" prop='qty' >
                   <Input type="number" v-model="trade.qty" :maxlength="10" :minlength="0"></Input>
               </FormItem>
               <FormItem :label="L('币种')" prop='ccy' >
                   <Input v-model="trade.ccy" :maxlength="10" :minlength="0"></Input>
               </FormItem>
                <FormItem :label="L('涨跌')" prop='putCall' >
                    <Select :placeholder="L('Select')" v-model="trade.putCall" style="width:162px;">
                      <Option value="">{{L('')}}</Option>
                      <Option value="P">{{L('Put')}}</Option>
                      <Option value="C">{{L('Call')}}</Option>
                   </Select>
               </FormItem>
                <FormItem :label="L('执行价格')" prop='strikePx' >
                   <Input type="number" v-model="trade.strikePx" :maxlength="10" :minlength="0"></Input>
               </FormItem>
                
              
           </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
         </Modal>
    </div>
</template>
<script lang="ts">
 import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
 import Util from '../../lib/util'
 import AbpBase from '../../lib/abpbase'
 import Trade from '@/store/entities/trade';
  @Component
export default class EditTrade extends AbpBase {
      @Prop({type:Boolean,default:false}) value:boolean;
      trade:Trade=new Trade();
      save(){
          (this.$refs.tradeForm as any).validate(async (valid:boolean)=>{
              console.log(this.$refs.tradeForm["qty"]);
              console.log(this.$refs.tradeForm["ccy"]);
              if(valid){
                  await this.$store.dispatch({
                      type:'trade/update',
                      data:this.trade
                  });
                  (this.$refs.tradeForm as any).resetFields();
                   this.$emit('save-success');
                    this.$emit('input',false);
              }
          })
      }
      cancel(){
            (this.$refs.tradeForm as any).resetFields();
            this.$emit('input',false);
        }
         visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.trade=Util.extend(true,{},this.$store.state.trade.editTrade);
            }
        }
        tradeRule={
        accountNo:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('accountNo')),trigger:'blur'}],
        productCode:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('productCode')),trigger:'blur'}],
        secType:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('secType')),trigger:'blur'}],
        mmy:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('mmy')),trigger:'blur'}],
        side:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('side')),trigger:'blur'}],
        qty:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('qty')),trigger:'blur'}],
        ccy:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('ccy')),trigger:'blur'}],
        exchange:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('exchange')),trigger:'blur'}],
        accountType:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('accountType')),trigger:'blur'}],
        bizDate:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('bizDate')),trigger:'blur',pattern: /.+/}]
    }
}
</script>


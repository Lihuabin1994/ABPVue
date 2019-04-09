<template>
    <div>
        <Modal
        :title="L('CreateNewTrade')"
        :value="value"
        @on-ok="save"
        @on-visible-change="visibleChange">
            <form ref="tradeForm"
        </Modal>
    </div>
</template>
<script lang="ts">
import {Component,Vue,Inject,Prop,Watch}from 'vue-property-decorator';
 import Util from '../../lib/util'
 import AbpBase from '../../lib/abpbase'
 import Trade from '@/store/entities/trade';
 @Component
export default class CreateTrade extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    trade:Trade=new Trade();
    save(){
        (this.$refs.tradeForm as any).validate(async (vaild:boolean)=>{
            if(vaild){
                await this.$store.dispatch({
                    type:'trade/create',
                    data:this.trade
                });
                 (this.$refs.tenantForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
            }
        })
        
    }
     cancel(){
            (this.$refs.tenantForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
       TradeRule={
           name:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TradeName')),trigger:'blur'}],
       }
}
</script>


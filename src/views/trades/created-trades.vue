<template>
    
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
                    type:''
                })
            }
        })
        
    }
}
</script>


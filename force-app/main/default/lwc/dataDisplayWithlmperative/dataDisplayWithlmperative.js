import { LightningElement , track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class DataDisplayWithlmperative extends LightningElement {
    @track accountRecords;
    @track errors;
    @track columns = [{label : 'Name' , fieldName : 'Name' , type : 'text'},
                      {label : 'Industry' , fieldName : 'Industry' , type : 'text'}];
    connectedCallback(){
        getAccounts()
        .then(result=>{
            this.accountRecords = result;
        })
        .catch(error=>{
            this.errors = error;
        });
    }
}
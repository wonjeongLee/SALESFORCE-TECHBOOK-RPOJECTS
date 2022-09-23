import { LightningElement , track } from 'lwc';
import saveAccounts from '@salesforce/apex/AccountCreateionController.createAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultipleRowInsertion extends LightningElement {
    @track keyIndex = 0;  
    @track error;
    @track message;
    @track accountRecList = [
        {                      
            Name: '',
            Industry: '',
            Phone: ''
        }
    ];
    //Add Row 
    addRow() {
        this.keyIndex+1;   
        this.accountRecList.push ({            
            Name: '',
            Industry: '',
            Phone: ''
        });
    }
    changeHandler(event){       
       // alert(event.target.id.split('-'));
        console.log('Access key2:'+event.target.accessKey);
        console.log('id:'+event.target.id);
        console.log('value:'+event.target.value);  
        if(event.target.name==='accName'){
            this.accountRecList[event.target.accessKey].Name = event.target.value;
        }
        else if(event.target.name==='accIndustry'){
            this.accountRecList[event.target.accessKey].Industry = event.target.value;
        }
        else if(event.target.name==='accPhone'){
            this.accountRecList[event.target.accessKey].Phone = event.target.value;
        }
    }
    //Save Accounts
     saveMultipleAccounts() {

        console.log(this.accountRecList.length);
        console.log(this.accountRecList.length == 0);
        return;
        if(this.accountRecList.length === 0){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: '값이 비어있습니다.',
                    variant: 'success',
                }),
            );
        }

        for(let i=0 ; i<this.accountRecList.length; i++){
            if(this.accountRecList[i].Name == ''){
                console.log("확인" + i);
                this.emptyRemoveRow(i);
            }
        }

        saveAccounts({ accountList : this.accountRecList })
            .then(result => {
                this.message = result;
                this.error = undefined;                
                this.accountRecList.forEach(function(item){                   
                    item.Name='';
                    item.Industry='';
                    item.Phone='';                   
                });

                //this.accountRecList = [];
                if(this.message !== undefined) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Accounts Created!',
                            variant: 'success',
                        }),
                    );
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating records',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
    removeRow(event){       
        console.log('Access key2:'+event.target.accessKey);
        console.log(event.target.id.split('-')[0]);

        if(this.accountRecList.length>=1){             
             this.accountRecList.splice(event.target.accessKey,1);
             this.keyIndex-1;
        }
    }  
    emptyRemoveRow(i){
        if(i !== ''){
            console.log("확인222");
            this.accountRecList.splice(i-1,1);
            this.keyIndex-1;
        }
    }

}
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


        // 한줄의 값이 있지만 값이 들어있을 경우
        if(this.accountRecList.length === 1 && this.accountRecList[0].Name == '' ){
            console.log("한줄의 값이 있지만 값이 들어있을 경우");
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: '값이 비어있습니다.',
                    variant: 'error',
                }),
            );
            return;
        }
        // 값이 안들어있는 경우 삭제
        for(let i=1 ; i<this.accountRecList.length+1; i++){
            console.log("값이 안들어있는 경우 삭제")
            if(this.accountRecList[i].Name == ''){
                console.log("값이 안들어있는 줄" + i);
                this.emptyRemoveRow(i);
            }
        }
        console.log("값 저장")

        // 값 저장
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
    //값이 비어있을 경우 , 골라서 삭제
    emptyRemoveRow(i){
        console.log(i);
        console.log(this.accountRecList.length);
        console.log("확인222");
        this.accountRecList.splice(i,1);
        //this.keyIndex-1;

        console.log(this.accountRecList.length);
        if(this.accountRecList.length > 1){
            this.saveMultipleAccounts();
        }
    }

}
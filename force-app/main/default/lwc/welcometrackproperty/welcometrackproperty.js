import { LightningElement , track } from 'lwc';

export default class Welcometrackproperty extends LightningElement {
    //@track greetings;
    greetings;
    handleGreetingsChanges(event){
        this.greetings = event.target.value;
        console.log(this.greetings);
    }
}
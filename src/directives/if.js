import Directive from '../directive'

export default class Zif extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }
       
        this.el.style.display = !!newVal ? '' : 'none'; 

    }



}
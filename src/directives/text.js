import Directive from '../directive'

export default class Ztext extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }

        this.el.textContent = newVal;

    }



}
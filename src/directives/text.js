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

        if(this.el.nodeName === 'INPUT'
        || this.el.nodeName === 'TEXTAREA'){
            this.el.value = newVal;
        }

    }

}
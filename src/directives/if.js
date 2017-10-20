import Directive from '../directive'

export default class Zif extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        
        this.el.style.display = !!newVal ? '' : 'none'; 

    }



}
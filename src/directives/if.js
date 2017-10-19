import Directive from '../directive'

export default class Zif extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        // console.log(oldVal,newVal);
        // console.log(arguments);
        this.el.style.display = !!newVal ? '' : 'none'; 

    }



}
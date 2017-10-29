import Directive from '../directive'

export default class Zmodel extends Directive{
    constructor(...args){
        super(...args);
    }

    update(newVal,oldVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }

        this.el.value = newVal;

    }

    bind(){
        this.el.addEventListener('input',(e) => {
            let val = e.target.value;
            this.model[this.expression] = val;
            this.value = val;
            this.el.value = val;

        })

    }

}
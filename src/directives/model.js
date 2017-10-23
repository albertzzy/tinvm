import Directive from '../directive'

export default class Zmodel extends Directive{
    constructor(...args){
        super(...args);
    }

    update(val){
        
    }

    bind(){
        this.el.addEventListener('input',(e) => {
            let val = e.target.value;
            this.value = val;
        })

    }

}
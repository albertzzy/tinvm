import Directive from './directive';

class Zshow extends Directive{
    constructor(...args){
        super(args);
    }

    update(oldVal,newVal){
        if(oldVal !== newVal){
            this.el.style.display = newVal;
        }

    }

}

export {Zshow as zshow};
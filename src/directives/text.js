import Directive from '../directive'

export default class Ztext extends Directive{
    constructor(...args){
        super(...args);
    }

    update(val){
        this.el.textContent = val;

    }



}
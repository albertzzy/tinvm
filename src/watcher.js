import Depend from './depend';

class Watcher{
    constructor(raw,model,update){
        this.raw = raw;
        this.model = model;
        this.update = update;
        Depend.target = this;
        this.oldValue = this.getValue();
    }

    run(){
        let newValue = this.getValue();
        let oldValue = this.oldValue;

        console.log('====');
        console.log(oldValue,newValue);
        console.log('====');

        this.update(oldValue,newValue);
    }

    getValue(){
        let func = new Function('model','return model.'+this.raw);
        let val = func(this.model);
        return val;
    }


}


export default Watcher;
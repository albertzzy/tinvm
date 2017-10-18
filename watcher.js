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
        this.newValue = this.getValue();

        this.update(oldValue,newValue);
    }

    getValue(){
        let func = new Function('model','raw','return model.'+raw);
        let val = func(this.model,this.raw);
        return val;
    }


}


export default Watcher;
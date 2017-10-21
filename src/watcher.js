import Depend from './depend';

class Watcher{
    constructor(raw,model,update){
        this.raw = raw;
        this.model = model;
        this.update = update;
        Depend.target = this;
        this.value = this.getValue();
    }

    run(){
        let newValue = this.getValue();
        let oldValue = this.value;

        console.log('===watch run==');
        console.log(oldValue,newValue);
        console.log('===watch run==');

        if(oldValue !== newValue){
            this.update(oldValue,newValue);
        }
    }

    getValue(){

        let func = new Function('model','raw','return model.'+this.raw);

        let val = func(this.model);
        console.log('===getval==');
        console.log(val);
        console.log('====getval==');
        
        return val;
    }


}


export default Watcher;
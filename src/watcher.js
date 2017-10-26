import Depend from './depend';

class Watcher{
    constructor(raw,model,update){
        this.raw = raw;
        this.model = model;
        this.update = update;
        Depend.target = this;

        /* 
         这里也会触发对应prop的getter,dep(被闭包引用) 进行收集watcher
         例如：有多个show.seen,对应的show.seen 就进行多个watcher收集
        */        
        this.value = this.getValue();
        
        // 上一句已经收集完watcher了，保证下次进行初始化watcher的时候是干净的
        Depend.target = null;
    }

    run(){
        let newValue = this.getValue();
        let oldValue = this.value;

        /* console.log('===watch run==');
        console.log(oldValue,newValue);
        console.log('===watch run=='); */

        this.update(oldValue,newValue);
        this.value = newValue;

       
    }

    getValue(){

        let func = new Function('model','raw','return model.'+this.raw);
        let val = func(this.model);
        /* console.log('===getval==');
        console.log(val);
        console.log('====getval=='); */
        
        return val;
    }


}


export default Watcher;
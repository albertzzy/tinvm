import Dep from './depend';

class Observer{
    constructor(obj){
        this.observe(obj);
    }

    observe(obj){
        Object.keys(obj).forEach(prop => {
            let val = obj[prop];

            this.defineProperty(obj,prop,val);
            
            let type = Object.prototype.toString.call(val);
            if(type === '[object Object]'){
                this.observe(val);
            }else if(type === '[object Array]'){
                this.proxyArray(obj,prop,val);
            }

        })

    }

    defineProperty(obj,prop,val){
        let dep = new Dep();
        let childDep;
        if(Object.prototype.toString.call(val) === '[object Array]'){
            childDep = new Dep();
            val.__ob__ = childDep;
        }
            

        Object.defineProperty(obj,prop,{
            get:function(){ 
                let target = Dep.target;
                if(target){
                    dep.add(target)

                    if(childDep){
                        childDep.add(target);
                    }
                }

                return val;
            },
            set:function(value){
                
                if(val !== value){
                    dep.notify();
                }

            }
        })


    }

    proxyArray(obj,prop,val){
        let methods = ['push','pop','shift','reverse','unshift','splice','sort'];
        let proto = Array.prototype;
        
        methods.forEach((m) => {
            val[m] = () => {
                let dp = val.__ob__;
                if(dp){
                    dp.notify();
                }
                proto[m].call(obj[prop],arguments);
            }
        })
        
    }

}

export default Observer;
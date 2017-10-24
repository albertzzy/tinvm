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
            if(prop !== '__ob__'){
                if(type === '[object Object]'){
                    this.observe(val);
                }else if(type === '[object Array]'){
                    
                    this.proxyArray(val);
                }
            }
        })

    }

    defineProperty(obj,prop,val){
        if(prop === '__ob__'){
            return;
        }

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
                    val = value;
                    dep.notify();
                }

            }
        })


    }

    proxyArray(val){
        let methods = ['push','pop','shift','reverse','unshift','splice','sort'];
        let proto = Array.prototype;
        let newProto = Object.create(proto);


        methods.forEach((m) => {
            Object.defineProperty(newProto,m,{
                value:function(){
                    let dp = val.__ob__;
                    if(dp){
                        dp.notify();
                    }
               
                    let res = proto[m].apply(val,arguments);
                    return res;
                },
                enumerable: false,
                configurable: true,
                writable: true
            })

        })

        val.__proto__ = newProto;
        
    }

}

export default Observer;
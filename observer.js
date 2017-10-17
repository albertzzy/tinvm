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



    }

    proxyArray(obj,prop,val){

    }

}

export default Observer;
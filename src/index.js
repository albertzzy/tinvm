import Observe from './observer';
import compiler from './compiler';


export default class Tinvm{
    constructor(arg){
        let {el,data} = arg;

        // this.initModel(data || {});
        new Observe(data);
        compiler(document.querySelector(el),data);
    }

   /*  initModel(data){

        this = new Proxy(this,{
            get(target,prop){
                let keys = Object.keys(data);
                if(prop.indexOf(keys)>-1){
                    return data[prop];
                }else{
                    return target[prop];
                }

            },

            set(){

            }
        })

    } */

}


window.Tinvm = Tinvm;


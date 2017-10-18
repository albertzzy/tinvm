import Observe from './observe';
import compiler from './compiler';


export default class Tinvm{
    consturctor(arg){
        let {el,model} = arg;

        this.initModel(model);
        compiler(document.querySelector(el));
    }

    initModel(){
        

    }

}



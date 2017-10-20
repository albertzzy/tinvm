import Watcher from './watcher';

class Directive{
    constructor(scope){
        this.el = scope.node;
        this.expression = scope.expression;
        this.model = scope.model;

        this.init();
    }

    init(){
        let watcher = new Watcher(this.expression,this.model,this.update.bind(this));

        this.update(watcher.value);
    }
    

}

export default Directive;
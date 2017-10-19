export default class Depend{

    constructor(){
        this.watchers = [];
    }

    add(watcher){
        this.watchers.push(watcher);

    }

    notify(){
        this.watchers.forEach(w => {
            w.run();
        })

    }

    destory(){
        this.watchers = [];
    }

}
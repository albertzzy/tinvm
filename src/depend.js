export default class Depend{

    constructor(){
        this.watchers = [];
    }

    add(watcher){
        this.watchers.push(watcher);

    }

    notify(){

        // console.log(this.watchers);
        this.watchers.forEach(w => {
            w.run();
        })

    }

    destory(){
        this.watchers = [];
    }

}
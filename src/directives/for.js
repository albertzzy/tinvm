import Directive from '../directive'
/* 
    todo
    解析属性
*/

const REG = /\{\{\s*([\w\.\+\-\*\/\s]+)\s*\}\}/;
/* 
    careful 
    类的对象引用了dom对象，dom对象删除还是会在内存中
*/
export default class Zfor extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }
        
        let fragment = document.createDocumentFragment();

        // need to be optimized-dirty now
        let children = this.parent.childNodes;
        for(let i=children.length-1;children.length && i>=0;i--){
            this.parent.removeChild(children[i]);
        }
        
        /* what fuck */
        setTimeout(()=>{
            newVal.length && newVal.forEach((item,index) => {
                let itemElement = this.el.cloneNode(true);
                this.copyChildren(itemElement,item);
                fragment.appendChild(itemElement);
            }) 
            
            this.parent.appendChild(fragment);

            fragment = null;
        })

    }


    copyChildren(element,item){

        this.parseText(element,item);
    }

    parseText(element,item){

        let children = element.childNodes;
        let parentNode = element;

        for(let i=0;children.length && i<children.length;i++){
            if(children[i].splitText){
                let text = children[i].nodeValue;
        
                if(REG.test(text)){
                    let expr = text.match(REG)[1];
                    let val = this.getValue(expr,item);
                    text = text.replace(REG,val);
                    children[i].nodeValue = text;
                }
            }else{
                this.parseText(children[i],item);
            }
        }
       
    }

    getValue(expr,item){
        let func = new Function('item','return '+expr);
        let val = func(item);

        return val;
    }

}
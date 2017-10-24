import Directive from '../directive'
/* 
    to do
    解析属性
*/

const REG = /\{\{\s*([\w\.\+\-\*\/\s]+)\s*\}\}/;

export default class Zfor extends Directive{
    constructor(...args){
        super(...args);

    }

    update(oldVal,newVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }
        
        // console.log(oldVal,newVal);

        let parentNode = this.el.parentNode;
        let node = this.el;
        let fragment = document.createDocumentFragment();

        // parentNode.removeChild(node);
        // parentNode.innerHTML = '';

        /* what fuck */
        setTimeout(()=>{

            newVal.length && newVal.forEach((item,index) => {
                let itemElement = node.cloneNode(true);
                this.copyChildren(itemElement,item);
                fragment.appendChild(itemElement);
            }) 
            
            parentNode.appendChild(fragment);
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
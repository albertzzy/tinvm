import Directive from '../directive'
/* 
    to do
    解析属性
*/
export default class Zfor extends Directive{
    constructor(...args){
        super(...args);
    }

    update(oldVal,newVal){
        if(typeof newVal === 'undefined'){
            newVal = oldVal;
        }

        let parentNode = this.el.parentNode;
        let nodeName = this.el.nodeName;
        let fragment = document.createDocumentFragment();
        let attrs = this.el.attributes;

        newVal.length && newVal.forEach((ele,index) => {
            let itemElement = document.createElement(nodeName.toLowerCase());
            this.copyAttributes(itemElement,attrs);
            this.copyChildren(itemElement,this.el,ele);
            fragment.appendChild(itemElement);
        }) 

        parentNode.appendChild(fragment);

    }

    copyAttributes(element,attrs){
        [...attrs].forEach( (attr) => {
            if(attr.name.indexOf('z-')===-1){
                element.setAttribute(attr.name,attr.value);
            }
        })

    }

    copyChildren(element,el,item){

        let children = el.cloneNode(true);
        children = this.parseText(children,item);

        element.appendChild(children);

    }

    parseText(node,item){
        let children = node.innerHTML;
        


        /* while(node.childNodes.length>=1){
            let text = node.textContent;


            if(text && /\{\{([\w\.]+)\}\}/.test(text)){
                let expr = text.match(/\{\{([\w\.]+)\}\}/)[1];
                let val = this.getValue(expr,item)

                
            }
            
        } */
        return node;
        
    }

    getValue(expr,item){
        let func = new Function('model','return model.'+expr);
        let val = func(item);

        return val;
    }

}
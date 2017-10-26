const zReg = /z-(\w+)/;

import directives from './directives/index'; 


function compileTemplate(nodes,model){
    parseNode(nodes,model);

    if(nodes.hasChildNodes()){
        [...nodes.children].forEach( n => {
            compileTemplate(n,model)
        })
    }
}


function parseNode(node,model){
    let attrs = node.attributes || [];
    let parent = node.parentNode;

    for(let i=0; i<attrs.length; i++){
        let attrType = attrs[i].nodeName;

        if(zReg.test(attrType)){
            let directiveType = attrType.replace('-','');
            let expression,arg;

            expression = attrs[i].value;

            if(directiveType === 'zfor'){
                let matchArr = expression.match(/(\w+)\s+in\s+(\w+)/);

                if(matchArr.length){
                    expression = matchArr[2];
                    arg = matchArr[1];
                }
            }
            
            let scope = {
                parent,
                node,
                model,
                expression,
                arg
            };
            
            let Directive = directives[directiveType];

            new Directive(scope);
        }
    }
}

export default compileTemplate;
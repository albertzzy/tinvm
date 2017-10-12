const zReg = /z-(\w+)/;

import Directive from './directive'; 


function compileTemplate(nodes,model){
    parseNode(nodes,model);

    if(nodes.hasChildNodes()){
        nodes.forEach( n => {
            compileTemplate(n,model)
        })
    }

}

/* 
    {{}}
    z-model
    z-if
    z-else
    z-for
*/
function parseNode(node,model){
    let attrs = node.attributes || [];


    for(let i=0; i<attrs.length; i++){
        let attrType = attrs[i].nodeName;
        
        if(zReg.test(attrType)){
            let directiveType = zReg.exec(attrType)[1];
            let expression = attrs[i].value;
            let scope = {
                node,
                model,
                expression
            };

            new Directive(directiveType,scope);
        }
    }
}
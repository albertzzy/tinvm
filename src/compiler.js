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


    for(let i=0; i<attrs.length; i++){
        let attrType = attrs[i].nodeName;

        if(zReg.test(attrType)){
            let directiveType = attrType.replace('-','');
            let expression = attrs[i].value;
            let scope = {
                node,
                model,
                expression
            };
            let Directive = directives[directiveType];

            new Directive(scope);
        }
    }
}

export default compileTemplate;
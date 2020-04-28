window.addEventListener('fullscreenchange',() =>{
    const body = document.querySelector('body');
    let output = [];

    function rec(elem) {
        elem.childNodes.forEach(node => {
            
            if(node.className === "question-content") 
            {
                console.log(node.childNodes[0].textContent);
                return("done");
            }
            else
            {
                rec(node);
            }
        });
    }

    rec(body);

})

WindowOrWorkerGlobalScope.setInterval(() =>
{
    const body = document.querySelector('body');
    let output = [];

    function rec(elem) {
        elem.childNodes.forEach(node => {
            
            if(node.className === "question-content") 
            {
                console.log(node.childNodes[0].textContent);
                node.childNodes.forEach(inode => {
                output.push(inode.textContent);
                });
                console.log(output[0]);
            }
            else
            {
                rec(node);
            }
        });
    }

    rec(body);
},5000)
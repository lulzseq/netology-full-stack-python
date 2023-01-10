const nodeArray = (selector, parent=document) => [].slice.call(parent.querySelectorAll(selector));
const interestsMain = document.querySelector('.interests_main ul');
const allInterests = nodeArray('input', interestsMain);

addEventListener('change', e => {

    let check = e.target;

    if(allInterests.indexOf(check) === -1) return;

    const children = nodeArray('input', check.parentNode.parentNode);
    
    children.forEach(child => child.checked = check.checked);
    
    while(check){

        const parent = (check.closest(['ul']).parentNode).querySelector('input');
        const siblings = nodeArray('input', parent.closest('li').querySelector(['ul']));
        const checkStatus = siblings.map(check => check.checked);
        const every  = checkStatus.every(Boolean);
        const some = checkStatus.some(Boolean);   
        
        parent.checked = every;   
        parent.indeterminate = !every && every !== some;
        check = (check != parent) ? parent : 0;
    }
})
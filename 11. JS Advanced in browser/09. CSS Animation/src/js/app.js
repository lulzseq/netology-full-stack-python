/* eslint no-param-reassign: "error" */

const button = document.querySelector('.btn');
const message = document.querySelector('.msg');

function expandElement(elem) {
    const isExpanded = elem.classList.contains('expanded');

    if (isExpanded) {
        elem.classList.remove('expanded');

        setTimeout(() => {
            elem.style.padding = '0';
            elem.style.border = 'none';
        }, 500);
    } else {
        elem.style.padding = '20px';
        elem.style.border = '1px dashed black';
        elem.classList.add('expanded');
        elem.style.maxHeight = '1000px';
    }

    elem.style.maxHeight = isExpanded ? '0' : '1000px';
}

button.addEventListener('click', () => {
    expandElement(message);
});

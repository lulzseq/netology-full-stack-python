const ACTIVE_TOOLTIP = 'tooltip_active';
const MARGIN = 2;
const aTooltips = document.querySelectorAll('.has-tooltip');

function createDivTooltip(elementForHint) {
    
    const hintElement = document.createElement('div');
    
    hintElement.textContent = elementForHint.title;
    hintElement.className = 'tooltip';
    elementForHint.insertAdjacentElement('afterEnd', hintElement);    
}

function positionChange(hintElement, elementForHint, margin=0) {
    
    const dataSet = elementForHint.dataset.position ? elementForHint.dataset.position : "bottom";
    const coordElement = elementForHint.getBoundingClientRect();
    const coordHintElement = hintElement.getBoundingClientRect();

    switch (dataSet) {

        case "bottom":
            hintElement.style.left = `${coordElement.left}px`;
            hintElement.style.top = `${coordElement.bottom + margin}px`;
            break;
        case "top":
            hintElement.style.left = `${coordElement.left}px`;
            hintElement.style.top = `${coordElement.top - coordHintElement.height - margin}px`;
            break;
        case "right":
            hintElement.style.left = `${coordElement.left + coordElement.width + margin}px`;
            hintElement.style.top = `${coordElement.top}px`;
            break;
        case "left":
            hintElement.style.left = `${coordElement.left - coordHintElement.width - margin}px`;
            hintElement.style.top = `${coordElement.top}px`;
            break;
    }
}

aTooltips.forEach((aLink) => {
    
    createDivTooltip(aLink, MARGIN);
    aLink.addEventListener('click', (e) => {
        
        const tooltip = e.currentTarget.nextElementSibling;
        const activeTooltip = document.querySelector('.' + ACTIVE_TOOLTIP);

        if (activeTooltip != tooltip) {

            if (activeTooltip) {
                activeTooltip.classList.remove(ACTIVE_TOOLTIP);
            }

            tooltip.classList.add(ACTIVE_TOOLTIP);
            positionChange(tooltip, e.currentTarget, MARGIN);

        } else {
            tooltip.classList.remove(ACTIVE_TOOLTIP);
        }

        e.preventDefault();
    });
});

const windowEvents = ['scroll', 'resize'];

windowEvents.forEach((event) => {
    window.addEventListener(event, () => {

        const activeTooltip = document.querySelector('.' + ACTIVE_TOOLTIP);
        
        if (activeTooltip) {
            activeTooltip.classList.remove(ACTIVE_TOOLTIP);        
        }
    })    
});
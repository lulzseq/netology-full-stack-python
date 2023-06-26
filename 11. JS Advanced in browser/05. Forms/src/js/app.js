import Tooltip from './tooltip';

const tooltipFactory = new Tooltip();

const button = document.querySelector('.btn');

button.addEventListener('click', (e) => {
  e.preventDefault();
  const isTooltip = document.querySelector('.popover');

  if (!isTooltip) {
    tooltipFactory.showTooltip(document.querySelector('.container'));
  } else {
    tooltipFactory.removeTooltip(isTooltip);
  }
});

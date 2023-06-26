export default class Tooltip {
  constructor() {
    this.tooltip = [];
  }

  showTooltip(element) {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('popover');
    element.appendChild(tooltipContainer);

    const tooltipElementTitle = document.createElement('h3');
    const tooltipElementBody = document.createElement('div');

    tooltipElementTitle.classList.add('popover-title');
    tooltipElementTitle.textContent = 'Popover title';

    tooltipElementBody.classList.add('popover-body');
    tooltipElementBody.textContent = 'I am Popover';

    this.tooltip.push({
      title: tooltipElementTitle,
      body: tooltipElementBody,
    });

    tooltipContainer.appendChild(tooltipElementTitle);
    tooltipContainer.appendChild(tooltipElementBody);
  }

  /* eslint-disable class-methods-use-this */
  removeTooltip(element) {
    element.remove();
  }
  /* eslint-enable class-methods-use-this */
}

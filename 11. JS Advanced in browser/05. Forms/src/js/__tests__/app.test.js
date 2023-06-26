import Tooltip from '../tooltip';

describe('Tooltip', () => {
  let tooltipFactory;
  let container;
  let button;

  beforeEach(() => {
    tooltipFactory = new Tooltip();

    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    button = document.createElement('button');
    button.classList.add('btn');
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(button);
  });

  test('clicking the button adds a tooltip to the container', () => {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('popover');
    jest.spyOn(tooltipFactory, 'showTooltip').mockImplementation(() => {
      container.appendChild(tooltipContainer);
    });

    button.click();

    expect(tooltipFactory.showTooltip).toHaveBeenCalledTimes(0);
    expect(container.contains(tooltipContainer)).toBe(false);
  });

  test('clicking the button removes the tooltip from the container', () => {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('popover');
    container.appendChild(tooltipContainer);
    jest.spyOn(tooltipFactory, 'removeTooltip').mockImplementation(() => {
      container.removeChild(tooltipContainer);
    });

    button.click();

    expect(tooltipFactory.removeTooltip).toHaveBeenCalledTimes(0);
    expect(container.contains(tooltipContainer)).toBe(true);
  });
});

import Tooltip from '../tooltip';

describe('Tooltip', () => {
  let tooltip;

  beforeEach(() => {
    tooltip = new Tooltip();
  });

  afterEach(() => {
    // Clean up any tooltip elements after each test
    document.body.innerHTML = '';
  });

  test('showTooltip should add tooltip elements to the element', () => {
    // Arrange
    const element = document.createElement('div');

    // Act
    tooltip.showTooltip(element);

    // Assert
    expect(element.childNodes.length).toBe(1);
    expect(element.firstChild.classList.contains('popover')).toBe(true);
    expect(element.firstChild.childNodes.length).toBe(2);
    expect(element.firstChild.firstChild.classList.contains('popover-title')).toBe(true);
    expect(element.firstChild.firstChild.textContent).toBe('Popover title');
    expect(element.firstChild.lastChild.classList.contains('popover-body')).toBe(true);
    expect(element.firstChild.lastChild.textContent).toBe('I am Popover');
  });

  test('removeTooltip should remove the tooltip element from the DOM', () => {
    // Arrange
    const element = document.createElement('div');
    tooltip.showTooltip(element);
    const tooltipContainer = element.firstChild;

    // Act
    tooltip.removeTooltip(tooltipContainer);

    // Assert
    expect(element.childNodes.length).toBe(0);
  });
});

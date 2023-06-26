/* eslint-disable class-methods-use-this */
export default class Validator {
  constructor() {
    this.onBtnClick = this.onBtnClick.bind(this);
    this.luhnCheck = this.luhnCheck.bind(this);
    this.cardCheck = this.cardCheck.bind(this);
    this.submit = document.querySelector('.submit');
    this.input = document.querySelector('.form-control');
    this.submit.addEventListener('click', this.onBtnClick);
  }

  onBtnClick(e) {
    e.preventDefault();

    const { value } = this.input;

    const cardLogos = document.querySelectorAll('.card');

    cardLogos.forEach((element) => {
      if (!element.className.includes(this.cardCheck(value))) {
        element.classList.add('cdisabled');
      }
    });

    if (this.luhnCheck(value)) {
      document.querySelector('.status').innerHTML = 'VALID';
    } else {
      document.querySelector('.status').innerHTML = 'INVALID';
    }
  }

  luhnCheck(value) {
    const arr = (`${value}`)
      .split('')
      .reverse()
      /* eslint-disable-next-line */
      .map((x) => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
      /* eslint-disable-next-line */
      (acc, x, i) => (i % 2 !== 0 ? acc + x : acc + ((x *= 2) > 9 ? x - 9 : x)),
      0,
    );
    sum += lastDigit;
    return sum % 10 === 0;
  }

  cardCheck(value) {
    if (value.startsWith('4')) {
      return 'visa';
    } if (value.startsWith('6011')) {
      return 'discover';
    } if (value.startsWith('34') || value.startsWith('37')) {
      return 'amex';
    } if (value.startsWith('36') || value.startsWith('38') || value.startsWith('300') || value.startsWith('301') || value.startsWith('302') || value.startsWith('303') || value.startsWith('304') || value.startsWith('305')) {
      return 'diners_club';
    } if (value.startsWith('35')) {
      return 'jcb';
    } if (value.startsWith('51') || value.startsWith('52') || value.startsWith('53') || value.startsWith('54') || value.startsWith('55')) {
      return 'master';
    } if (value.startsWith('2')) {
      return 'mir';
    }
    return '';
  }
}

/* eslint-enable class-methods-use-this */

// 4485275742308327

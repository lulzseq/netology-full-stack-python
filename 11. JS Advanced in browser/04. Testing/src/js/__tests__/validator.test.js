import Validator from '../validator';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="submit"></div>
      <input type="text" class="form-control">
      <div class="card visa"></div>
      <div class="card discover"></div>
      <div class="status"></div>
    `;

    validator = new Validator();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('onBtnClick', () => {
    test('should add "cdisabled" class to card logos not matching the card type', () => {
      validator.input.value = '4111111111111111';
      validator.onBtnClick(new Event('click'));

      const cardLogos = document.querySelectorAll('.card');
      cardLogos.forEach((element) => {
        if (!element.className.includes('visa')) {
          expect(element.classList.contains('cdisabled')).toBe(true);
        }
      });
    });

    test('should set status to "VALID" if Luhn check passes', () => {
      validator.input.value = '4111111111111111';
      validator.onBtnClick(new Event('click'));

      const status = document.querySelector('.status');
      expect(status.innerHTML).toBe('VALID');
    });

    test('should set status to "INVALID" if Luhn check fails', () => {
      validator.input.value = '4111111111111112';
      validator.onBtnClick(new Event('click'));

      const status = document.querySelector('.status');
      expect(status.innerHTML).toBe('INVALID');
    });
  });

  describe('luhnCheck', () => {
    test('should return true for a valid credit card number', () => {
      const isValid = validator.luhnCheck('4111111111111111');
      expect(isValid).toBe(true);
    });

    test('should return false for an invalid credit card number', () => {
      const isValid = validator.luhnCheck('4111111111111112');
      expect(isValid).toBe(false);
    });
  });

  describe('cardCheck', () => {
    test('should return the VISA card type', () => {
      const cardType = validator.cardCheck('4111111111111111');
      expect(cardType).toBe('visa');
    });

    test('should return the MASTERCARD card type', () => {
      const cardType = validator.cardCheck('5213111111111111');
      expect(cardType).toBe('master');
    });

    test('should return the DISCOVER card type', () => {
      const cardType = validator.cardCheck('6011111111111111');
      expect(cardType).toBe('discover');
    });

    test('should return the AMERICAN EXPRESS card type', () => {
      const cardType = validator.cardCheck('3411111111111111');
      expect(cardType).toBe('amex');
    });

    test('should return the DINERS CLUB card type', () => {
      const cardType = validator.cardCheck('3611111111111111');
      expect(cardType).toBe('diners_club');
    });

    test('should return the JCB card type', () => {
      const cardType = validator.cardCheck('351111111111');
      expect(cardType).toBe('jcb');
    });

    test('should return the MIR card type', () => {
      const cardType = validator.cardCheck('2222222222222222');
      expect(cardType).toBe('mir');
    });

    test('should return an empty string if the card type is not recognized', () => {
      const cardType = validator.cardCheck('1234567890');
      expect(cardType).toBe('');
    });
  });
});

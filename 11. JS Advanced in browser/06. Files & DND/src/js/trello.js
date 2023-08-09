export default class Trello {
    constructor(storage) {
      this.todo = document.querySelector('.todo-in');
      this.progress = document.querySelector('.progress-in');
      this.done = document.querySelector('.done-in');
      this.addCardBtn = document.querySelectorAll('.add-card');
      this.card = document.querySelector('.card-block');
      this.textArea = document.querySelector('.card-text');
      this.text = null;
      this.storage = storage;
    }
  
    events() {
      this.renderDom();
      this.addAnotherCard();
      this.moveMouseRemoveDiv();
    }
  
    renderDom() {
      const card = this.storage.load();
  
      if (card) {
        if (card.todo) {
          card.todo.forEach((elem) => {
            Trello.createNewDiv(this.todo, elem);
          });
        }
        if (card.progress) {
          card.progress.forEach((elem) => {
            Trello.createNewDiv(this.progress, elem);
          });
        }
        if (card.done) {
          card.done.forEach((elem) => {
            Trello.createNewDiv(this.done, elem);
          });
        }
      }
    }
  
    addAnotherCard() {
      for (const i of this.addCardBtn) {
        i.addEventListener('click', (ev) => {
          ev.preventDefault();
          
          const cloneCard = this.card.cloneNode(true);
          cloneCard.classList.remove('none');
          i.closest('div').appendChild(cloneCard);
          i.classList.add('none');

          this.inputText(cloneCard.children[0]);
          this.addCardInDiv(cloneCard.children[1].children[0], i.closest('div').children[1], i, cloneCard);
          Trello.cancelAddCardInDiv(cloneCard.children[1].children[1], i, cloneCard);
          
          cloneCard.children[0].focus()
        });
      }
    }
  
    static createNewDiv(div, elem) {
      if (elem === null) return;

      const newDiv = document.createElement('div');
      newDiv.textContent = elem;
      newDiv.classList.add('new-div');
      div.appendChild(newDiv);

      const newDivRemove = document.createElement('span');
      newDivRemove.classList.add('new-div-remove');
      newDivRemove.classList.add('none');
      newDivRemove.textContent = '\u{00D7}';
      newDiv.appendChild(newDivRemove);
    }
  
    inputText(element) {
      element.addEventListener('input', (ev) => {
        this.text = ev.target.value;
      });
    }
  
    addCardInDiv(element, div, addLink, clone) {
      element.addEventListener('click', () => {
        Trello.createNewDiv(div, this.text);
        
        clone.remove();
        addLink.classList.remove('none');

        this.saveCards(div, this.text);
        this.moveMouseRemoveDiv();
      });
    }
  
    static cancelAddCardInDiv(element, addLink, clone) {
      element.addEventListener('click', () => {
        clone.remove();
        addLink.classList.remove('none');
      });
    }
  
    moveMouseRemoveDiv() {
      const divs = document.querySelectorAll('.new-div');
      for (const i of divs) {
        i.addEventListener('mouseover', () => {
          if (i.children[0].classList.contains('none')) {
            i.children[0].classList.remove('none');
          }
        });
        i.addEventListener('mouseout', () => {
          if (!i.children[0].classList.contains('none')) {
            i.children[0].classList.add('none');
          }
        });
      }
      for (const i of divs) {
        i.children[0].addEventListener('click', () => {
          i.remove();
          this.storage.updateCards(this.todo, this.progress, this.done);
        });
      }
    }
  
    saveCards(element, text) {
      if (element.contains(this.todo)) {
        this.storage.save({ todo: text });
      } else if (element.contains(this.progress)) {
        this.storage.save({ progress: text });
      } else if (element.contains(this.done)) {
        this.storage.save({ done: text });
      }
      if (this.text !== null) this.text = null;
    }
  }
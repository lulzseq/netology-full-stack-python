export default class Memory {
    constructor() {
      this.storage = localStorage;
    }
  
    save(object) {
      let card = JSON.parse(this.storage.getItem('card'));
      if (card === null) {
        card = {
          todo: [],
          progress: [],
          done: [],
        };
      }
  
      if (object.todo) {
        card.todo.push(object.todo);
      } else if (object.progress) {
        card.progress.push(object.progress);
      } else if (object.done) {
        card.done.push(object.done);
      }
      this.storage.setItem('card', JSON.stringify(card));
    }
  
    load() {
      try {
        const card = JSON.parse(this.storage.getItem('card'));
        return card;
      } catch (error) {
        throw new Error(error);
      }
    }
  
    clear() {
      this.storage.removeItem('card');
    }
  
    updateCards(todo, progress, done) {
      this.clear();
      for (const i of todo.children) {
        const text = i.textContent;
        this.save({ todo: text.slice(0, text.length - 1) });
      }
      for (const i of progress.children) {
        const text = i.textContent;
        this.save({ progress: text.slice(0, text.length - 1) });
      }
      for (const i of done.children) {
        const text = i.textContent;
        this.save({ done: text.slice(0, text.length - 1) });
      }
    }
  }
export default class DnD {
    constructor(storage) {
      this.container = document.querySelector('#container');
      this.todo = document.querySelector('.todo-in');
      this.progress = document.querySelector('.progress-in');
      this.dndIn = document.querySelectorAll('.dnd-in');
      this.done = document.querySelector('.done-in');
      this.cloneEl = null;
      this.draggedEl = null;
      this.storage = storage;
      this.grabX = null;
      this.grabY = null;
      this.osX = null;
      this.osY = null;
    }
  
    events() {
      this.dragMouseDown(this.dndIn);
      this.dragMouseMove(this.container);
      this.dragMouseLeave(this.container);
      this.dropElement(this.container);
    }
  
    dragMouseDown(element) {
      for (const i of element) {
        i.addEventListener('mousedown', (ev) => {
          ev.preventDefault();
          if (!ev.target.classList.contains('new-div')) {
            return;
          }
          this.draggedEl = ev.target;
          this.cloneEl = ev.target.cloneNode(true);
          this.cloneEl.classList.add('dragged');
          this.draggedEl.classList.add('opacity');
          document.body.appendChild(this.cloneEl);
          document.body.style.cursor = 'grabbing';
          this.grabX = ev.pageX;
          this.grabY = ev.pageY;
          this.osX = this.draggedEl.offsetLeft;
          this.osY = this.draggedEl.offsetTop;
          this.cloneEl.style.left = `${this.draggedEl.offsetLeft}px`;
          this.cloneEl.style.top = `${this.draggedEl.offsetTop}px`;
        });
      }
    }
  
    dragMouseMove(element) {
      element.addEventListener('mousemove', (ev) => {
        ev.preventDefault();

        if (!this.draggedEl) {
          return;
        }
        const closest = document.elementFromPoint(ev.clientX, ev.clientY);

        if (closest.parentElement.classList.contains('dnd-in')) {
          this.draggedEl.classList.add('opacity');
          if ((ev.clientY - (closest.offsetTop + (closest.offsetHeight / 2))) < 0) {
            closest.parentElement.insertBefore(this.draggedEl, closest);
          } else {
            closest.parentElement.insertBefore(this.draggedEl, closest.nextSibling);
          }
        }
        this.cloneEl.style.left = `${ev.pageX - (this.grabX - this.osX)}px`;
        this.cloneEl.style.top = `${ev.pageY - (this.grabY - this.osY)}px`;
      });
    }
  
    dragMouseLeave(element) {
      element.addEventListener('mouseleave', () => {
        if (!this.draggedEl) {
          return;
        }
        this.draggedEl.classList.remove('opacity');
        document.body.removeChild(this.cloneEl);
        this.cloneEl = null;
        this.draggedEl = null;
      });
    }
  
    dropElement(element) {
      element.addEventListener('mouseup', (ev) => {
        if (!this.draggedEl) {
          return;
        }
        const closest = document.elementFromPoint(ev.clientX, ev.clientY);

        if (closest.parentElement.classList.contains('dnd-in')) {
          closest.parentElement.insertBefore(this.draggedEl, closest);
        } else if (closest.classList.contains('dnd-in')) {
          closest.appendChild(this.draggedEl);
        } else if (closest.classList.contains('title')) {
          closest.nextElementSibling.appendChild(this.draggedEl)
        } else {
          closest.querySelector('.dnd-in').appendChild(this.draggedEl)
        }
        document.body.removeChild(this.cloneEl);
        document.body.style = '';
        this.draggedEl.classList.remove('opacity');
        this.cloneEl = null;
        this.draggedEl = null;
        this.storage.updateCards(this.todo, this.progress, this.done);
      });
    }
  }
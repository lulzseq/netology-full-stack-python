const book = document.getElementById('book');
const bookControls = Array.from(document.querySelectorAll('.book__controls'));

bookControls.forEach((bookControl) => {
    
    const controls = Array.from(bookControl.querySelectorAll('.book__control'));
    const CONTROLS_SETTINGS = [
        {
            nameClass: 'book__control_font-size',
            activeClass: 'font-size_active',
            style: 'size',
            styleClass: 'book_fs-',
        },
        {
            nameClass: 'book__control_color',
            activeClass: 'color_active',
            style: 'text-color',
            styleClass: 'book_color-',
        },
        {
            nameClass: 'book__control_background',
            activeClass: 'color_active',
            style: 'bg-color',
            styleClass: 'book_bg-',
        },
    ]
    controls.forEach((control, index) => {
        
        const buttons = control.querySelectorAll('a');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {                

                const buttonToDeactivate = control.querySelector('.' + CONTROLS_SETTINGS[index].activeClass);

                if (buttonToDeactivate != button) {

                    const attributeDeactivate = buttonToDeactivate.getAttribute('data-'+CONTROLS_SETTINGS[index].style)
                    if (attributeDeactivate) {
                        book.classList.remove(CONTROLS_SETTINGS[index].styleClass + attributeDeactivate);
                    }

                    buttonToDeactivate.classList.remove(CONTROLS_SETTINGS[index].activeClass);
                    button.classList.add(CONTROLS_SETTINGS[index].activeClass);
                    
                    const attributeActivate = button.getAttribute('data-'+CONTROLS_SETTINGS[index].style)
                    if (attributeActivate) {
                        book.classList.add(CONTROLS_SETTINGS[index].styleClass + attributeActivate);
                    }
    
                }

                event.preventDefault();
            });
        })
    });
})
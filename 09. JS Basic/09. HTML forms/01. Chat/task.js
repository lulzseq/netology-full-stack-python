class Chat {

    constructor(container, secondsToSleep = 30) {
        
        this.container = container;
        this.chatWidgetSide = container.querySelector('.chat-widget__side');
        this.chatWidgetMessages = container.querySelector('.chat-widget__messages-container');
        this.messages = container.querySelector( '.chat-widget__messages' );
        this.inputMessage = container.querySelector( '.chat-widget__input' );
        this.secondsToSleep = secondsToSleep * 1000;
        this.timerId = 0;
        this.timerOutId = 0;
        this.TEXT_FOR_SLEEP_USER = 'Я могу чем нибудь Вам еще помочь?';
        this.TEXTOUT_FOR_SLEEP_USER = 'Закрываю чат.';
        this.registerEvents();
    }
    
    sendMessage(textMessage, isClient=false) {
        
        const nowDateTime = new Date().toLocaleString();
        const html = `<div class="message${isClient ? ' message_client': ''}">
            <div class="message__time">${nowDateTime}</div>
            <div class="message__text">
              ${textMessage}
            </div>
          </div>
        `;
        
        this.messages.innerHTML += html;       
        this.chatWidgetMessages.scrollTo(0, this.chatWidgetMessages.scrollHeight);
    }

    getAnswer() {

        const messages = [
            'Доброе утро.',
            'Чем можем быть полезны?',
            'C таким не работаем.',
            'Это возможно.',
            'Повторите, пожалуйста.',
            'Это не возможно',
        ];

        const index = Math.floor(Math.random() * messages.length);
        
        return messages[index];
    }

    setTimerToSleep() {
        
        clearTimeout(this.timerId);
        clearTimeout(this.timerOutId);
        
        this.timerId = setTimeout(() => {
            this.sendMessage(this.TEXT_FOR_SLEEP_USER);
            this.timerOutId = (setTimeout(() => {
                this.sendMessage(this.TEXTOUT_FOR_SLEEP_USER);
                this.container.classList.remove('chat-widget_active');
            }, this.secondsToSleep));

        }, this.secondsToSleep);

      }
    
    registerEvents() {

        let chat = this;

        this.chatWidgetSide.addEventListener('click', () => {
            this.sendMessage(this.getAnswer());
            this.setTimerToSleep();
            this.container.classList.add('chat-widget_active');
        })
    
        this.inputMessage.addEventListener('keyup', function(event) {
            chat.setTimerToSleep();

            if (event.key == 'Enter' && chat.inputMessage.value.trim().length > 0) {
                chat.sendMessage(chat.inputMessage.value, true);
                chat.inputMessage.value = '';
                chat.sendMessage(chat.getAnswer());
            }
        });

    }
} 

new Chat(document.querySelector('.chat-widget'), 30);
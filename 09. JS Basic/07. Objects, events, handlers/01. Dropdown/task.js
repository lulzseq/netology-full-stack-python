const dropdownButtons = Array.from(document.querySelectorAll('.dropdown'));

dropdownButtons.forEach((item) => {
    const dropdownList = item.querySelector('.dropdown__list');
    const dropdownValue = item.querySelector('.dropdown__value');

    dropdownValue.addEventListener('click', () => {
        dropdownList.className = dropdownList.classList.contains('dropdown__list_active') ? 'dropdown__list': 'dropdown__list dropdown__list_active';
    });

    const dropdownItems = dropdownList.querySelectorAll('.dropdown__item');
    
    dropdownItems.forEach((linkItem) => {
        
        const aLinkItem = linkItem.getElementsByTagName('a')[0];
        aLinkItem.onclick = function () {
            return false;
        };

        linkItem.addEventListener('click', function () {
            const textContent = this.querySelector('.dropdown__link').textContent.trim();
            if (dropdownValue.textContent != textContent) {
                dropdownValue.textContent = textContent;
            }
            dropdownList.className = 'dropdown__list';
        });
    });
});
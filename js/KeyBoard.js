export class KeyBoard {
    constructor(keys, lang = 'en') {
        this.keyCodes = keys;
        this.virtualKeyboard = '';
        this.lang = lang;
        this.caps = false;
        this.shift = false;
    }

    generateVirtualKeyboard() {
        this.virtualKeyboard = document.createElement('div');
        this.virtualKeyboard.classList.add('virtual-keyboard');
        this.createVirtualRowButtons(this.virtualKeyboard);

        return this.virtualKeyboard;
    }

    createVirtualRowButtons(parent) {
        this.keyCodes
            .forEach(codes => {
                const vKeyboardRow = this.createDomElement('div', 'virtual-keyboard--row');
                codes
                    .forEach(code => {
                        let btn = this.createDomElement('div', 'virtual--key', code.className);
                        btn.innerHTML = `<span>${code.value || code[this.lang].value}</span>`;

                        vKeyboardRow.append(btn);
                    });
                parent.append(vKeyboardRow);
            });
    }

    createDomElement(node, ...classes) {
        const element = document.createElement(node);
        element.classList.add(...classes);
        return element;
    }

}
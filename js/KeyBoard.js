export class KeyBoard {
    constructor(keys, lang = 'en') {
        this.keyCodes = keys;
        this.virtualKeyboard = '';
        this.lang = lang;
        this.caps = false;
        this.shift = false;
        this.keyValue = {};
    }

    generateVirtualKeyboard() {
        this.virtualKeyboard = this._createDomElement('div', 'virtual-keyboard');
        this.virtualKeyboard.id = 'virtual-keyboard';
        this.createVirtualRowButtons(this.virtualKeyboard);

        return this.virtualKeyboard;
    }

    createVirtualRowButtons(parent) {
        this.keyCodes
            .forEach(codes => {
                const vKeyboardRow = this._createDomElement('div', 'virtual-keyboard--row');
                codes
                    .forEach(code => {
                        let btn = this._createDomElement('div', 'virtual--key', code.className);
                        btn.innerHTML = `<span>${code.value || code[this.lang].value}</span>`;

                        vKeyboardRow.append(btn);
                    });
                parent.append(vKeyboardRow);
            });
    }

    addActiveClass(code) {
        this._activeClass(code, 'active', 'add');
    }

    removeActiveClass(code) {
        if (code === 'CapsLock') return;
        this._activeClass(code, 'active', 'remove');
    }

    printValue(code) {
        let textArea = document.querySelector('.textarea');

        this._setLangToLocalStorage();
        return this._valueKey(code, textArea);
    }

    specialCharacters(code) {
        if (code !== "ShiftLeft" && code !== 'ShiftRight') {
            return;
        }

        const virtualRow = document.querySelectorAll('.virtual-keyboard--row');

        this.keyCodes.forEach((codes, index) => {
            const virtualRowChildren = virtualRow[index].children;

            codes.forEach((code, i) => {
                if (!code.special && code[this.lang].shift) {
                    if (this.shift) {
                        virtualRowChildren[i].innerText = code[this.lang].shift;
                        this.setCaps(true);
                    } else {
                        virtualRowChildren[i].innerText = code.value || code[this.lang].value;
                        this.setCaps(false);
                    }
                }
            });
        });
    }

    changeLowerCase() {
        const virtualRow = document.querySelectorAll('.virtual-keyboard--row');

        this.keyCodes.forEach((codes, index) => {
            const virtualRowChildren = virtualRow[index].children;

            codes.forEach((key, i) => {
                if (!key.special) {
                    let childValue = virtualRowChildren[i].innerText;
                    virtualRowChildren[i].innerText = `${this.caps ? childValue.toUpperCase() : childValue.toLowerCase()}`;
                }
            });
        });
    }

    setShift(isShift) {
        this.shift = isShift;
    }
    
    setCaps(isCaps) {
        this.caps = isCaps;
    }

    toggleCaps() {
        if (this._getCaps()) {
            this.changeLowerCase();
            return;
        }
        this.changeLowerCase();
    }

    clearKeyObject() {
        this.keyValue = {};
    }

    _getCaps() {
        this.caps = !this.caps;
        return this.caps;
    }

    _createDomElement(node, ...classes) {
        const element = document.createElement(node);
        element.classList.add(...classes);
        return element;
    }

    _activeClass(code, cls, action) {
        if (code === 'CapsLock') {
            document.querySelector('.' + code).classList.toggle(cls);
        } else {
            document.querySelector('.' + code).classList[action](cls);
        }
    }

    _setLangToLocalStorage() {
        localStorage.setItem('lang', JSON.stringify({ 'lang': this.lang }));
    }

    _valueKey(code, textArea) {

        switch (code) {
            case 'Backspace':
            case 'Delete':
                if (textArea.value != '') {
                    textArea.value = textArea.value.split('').splice(0, textArea.value.length - 1).join('');
                }
                break;
            case 'Enter':
                textArea.value += '\r';
                break;
            case 'Tab':
                textArea.value += '  ';
                break;
            case 'CapsLock':
                this.toggleCaps();
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.setShift(true);
                this.specialCharacters(code);
                this.changeLowerCase();
                return this.checkForSpecialKeys(code);
                break;
            case 'AltLeft' :
                return this.checkForSpecialKeys(code);
                break;    
            case 'MetaLeft':
            case 'ControlLeft':
            case 'ControlRight':
                null;
                break;
            case 'Space':
                textArea.value += ' ';
            default:
                const keyValue = document.querySelector('.' + code).innerText;
                textArea.value += keyValue;
        }
    }

    changeLang() {
        this.lang = this.lang == 'ru' ? 'en' : 'ru';
    }

    checkForSpecialKeys(code) {
        this.keyValue[code] = code;
        const specialKeys = ['AltLeft', 'ShiftLeft'];

        if (this.keyValue[specialKeys[0]] !== undefined && this.keyValue[specialKeys[1]] !== undefined) {
            this.changeLang();
            return true;
        }
    }
    
}
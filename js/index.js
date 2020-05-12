import { keyCodes } from './keys.js';
import { KeyBoard } from './KeyBoard.js';
import { Layout } from './Layout.js';



let lang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')).lang : 'ru';

const keyboard = new KeyBoard(keyCodes, lang);
const layout = new Layout(keyboard.generateVirtualKeyboard());
layout.renderToDom();

document.addEventListener('keydown', (event) => {
    event.preventDefault();

    keyboard.addActiveClass(event.code);

    if (keyboard.printValue(event.code)) {
        new Layout(keyboard.generateVirtualKeyboard()).renderToDom();
    }
});

document.addEventListener('keyup', (event) => {
    event.preventDefault();

    keyboard.removeActiveClass(event.code);
    keyboard.setShift(false);
    keyboard.specialCharacters(event.code);
    keyboard.changeLowerCase();
    keyboard.clearKeyObject();
});
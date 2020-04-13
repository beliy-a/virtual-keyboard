import { keyCodes } from './keys.js';
import { KeyBoard } from './KeyBoard.js';
import { Layout } from './Layout.js';

const keyboard = new KeyBoard(keyCodes, 'ru');
// console.log(keyboard.generateVirtualKeyboard());

const layout = new Layout(keyboard.generateVirtualKeyboard());
layout.renderToDom();
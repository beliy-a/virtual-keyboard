export class Layout {
    constructor(obj) {
        this.container = '';
        this.obj = obj;
    }

    generateLayout() {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.container.innerHTML = `
            <h1 class="virtual-key__title">RSS Виртуальная клавиатура</h1>
            <textarea class="textarea"></textarea>
        `;
        this.container.append(this.obj);

        return this.container;
    }

    renderToDom() {
        document.body.append(this.generateLayout());
    }
}

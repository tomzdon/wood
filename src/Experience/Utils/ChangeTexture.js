import EventEmitter from './EventEmitter.js'

export default class ChangeTexture extends EventEmitter {
    constructor() {
        super()

        const swatches = document.querySelectorAll('.tray__swatch');
        this.selectSwatch = this.selectSwatch.bind(this)

        for (const swatch of swatches) {
            swatch.addEventListener('click', this.selectSwatch);
        }
    }

    selectSwatch(e) {
        this.trigger('texture',[e])
    }
}

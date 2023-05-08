import EventEmitter from './EventEmitter.js'
import Main from "../Main.js";

export default class MakeHole extends EventEmitter {
    constructor() {
        super()
        this.experience = new Main();
        this.renderer = this.experience.canvas
        this.renderer.addEventListener('click', (e) =>
        {
            this.trigger('createHole', [e])
        })
    }


}

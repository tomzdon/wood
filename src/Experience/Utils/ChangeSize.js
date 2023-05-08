import EventEmitter from './EventEmitter.js'
import Main from "../Main.js";

export default class ChangeSize extends EventEmitter {
    constructor() {
        super()
        this.experience = new Main();

        this.widthWood = document.getElementById('widthBox')
        this.heightWood = document.getElementById('heightBox')
        this.thicknessWood = document.getElementById('thicknessBox')
        this.widthWood.addEventListener('change', (e) =>
        {
            this.trigger('changeWidthWood', [e])
        })
        this.heightWood.addEventListener('change', (e) =>
        {
            this.trigger('changeHeightWood', [e])
        })
        this.thicknessWood.addEventListener('change', (e) =>
        {
            this.trigger('changeThicknessWood', [e])
        })
    }


}

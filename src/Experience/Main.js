import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import Wood from "./World/Wood.js";
import ChangeTexture from "./Utils/ChangeTexture.js";
import ChangeSize from "./Utils/ChangeSize.js";
import MakeHole from "./Utils/MakeHole.js";
import Environment from "./World/Environment.js";

let instance = null

export default class Main {
    constructor(_canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()


        this.resources.on('ready', () => {
            new Environment()
            this.changeTexture = new ChangeTexture()
            this.changeSize = new ChangeSize()
            this.makeHole = new MakeHole()
            this.wood = new Wood()
        })

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}

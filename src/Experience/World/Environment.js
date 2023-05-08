import * as THREE from 'three'
import Main from '../Main.js'

export default class Environment {
    constructor() {
        this.experience = new Main()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight() {
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        this.scene.add(hemiLight);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        this.scene.add(dirLight);
    }

    setEnvironmentMap() {
        const tray = document.getElementById('js-tray-slide')
        for (let [i, color] of this.resources.sources.entries()) {
            let swatch = document.createElement('div');
            swatch.classList.add('tray__swatch');
            if (color.path) {
                swatch.style.backgroundImage = "url(" + color.path + ")";
            } else {
                swatch.style.background = "#" + color.color;
            }

            swatch.setAttribute('data-key', i);
            tray.append(swatch);

        }
    }
}

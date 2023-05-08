import * as THREE from 'three'
import Main from '../Main.js'

export default class Wood {
    constructor() {
        this.experience = new Main();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources
        this.mesh = null
        this.rectangleShape = null
        this.geometry = null
        this.update = this.update.bind(this)
        this.createHole = this.createHole.bind(this)
        this.updateWidth = this.updateWidth.bind(this)
        this.updateHeight = this.updateHeight.bind(this)
        this.updateThickness = this.updateThickness.bind(this)

        this.setModel();
        this.changeTexture = this.experience.changeTexture
        this.changeSize = this.experience.changeSize
        this.makeHole = this.experience.makeHole
        this.changeTexture.on('texture', this.update)
        this.changeSize.on('changeWidthWood', this.updateWidth)
        this.changeSize.on('changeHeightWood', this.updateHeight)
        this.changeSize.on('changeThicknessWood', this.updateThickness)
        this.makeHole.on('createHole', this.createHole)
        this.width = 1
        this.height = 1
        this.thickness = 1
    }

    setModel() {
        this.rectangleShape = new THREE.Shape();
        this.rectangleShape.moveTo(0, 0);
        this.rectangleShape.lineTo(0, 2);
        this.rectangleShape.lineTo(0.5, 2);
        this.rectangleShape.lineTo(0.5, 0);
        this.rectangleShape.lineTo(0, 0);

        const extrudeSettings = {
            depth: 0.1,
            bevelEnabled: false,
        };
        this.geometry = new THREE.ExtrudeGeometry(this.rectangleShape, extrudeSettings);

        let txt = this.resources.items.wood
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;

        let new_mtl = new THREE.MeshPhongMaterial({
            map: txt,
            shininess: 60
        });

        this.mesh = new THREE.Mesh(this.geometry, new_mtl);
        this.mesh.position.z = -0.6
        this.mesh.position.y = -0.6
        this.scene.add(this.mesh);
        this.mesh.rotation.x = 1


    }


    update(e) {
        const indexx = parseInt(e.target.dataset.key);
        let txt = Object.entries(this.resources.items).find((id, index) => index === indexx)
        txt[1].wrapS = THREE.RepeatWrapping;
        txt[1].wrapT = THREE.RepeatWrapping;

        let new_mtl = new THREE.MeshPhongMaterial({
            map: txt[1],
            shininess: 60
        });
        this.mesh.material = new_mtl
    }

    createHole(e) {
        const mouse = new THREE.Vector2();
        const rect =   this.renderer.instance.domElement.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

        const raycaster = new THREE.Raycaster(undefined, undefined, 0, undefined);
        raycaster.setFromCamera(mouse, this.camera.instance);
        const intersects = raycaster.intersectObject(this.mesh );

        if (intersects.length > 0) {
            const intersection = intersects[0];
            const face = intersection.point;
            const localPosition = new THREE.Vector3();
            this.mesh.worldToLocal(face, localPosition);
            const holeRadius = 0.05;
            const holeShape = new THREE.Shape();
            holeShape.absarc(face.x , face.y, holeRadius, 0, Math.PI * 2, false);
            holeShape.closePath()
            this.rectangleShape.holes.push(holeShape);
            const extrudeSettings = {
                depth: 0.1,
                bevelEnabled: false,
            };
            const geometry1 = new THREE.ExtrudeGeometry(this.rectangleShape, extrudeSettings);
            this.geometry.dispose()
            this.mesh.geometry = geometry1

            // Add the circle mesh to the scene
        }
    }

    updateWidth(e) {
        this.width = e.target.value
        this.mesh.scale.set(this.width, this.height, this.thickness)
    }
    updateHeight(e) {
        this.height = e.target.value
        this.mesh.scale.set(this.width, this.height, this.thickness)
    }
    updateThickness(e) {
        this.thickness = e.target.value
        console.log("-> this.thickness", this.thickness);
        this.mesh.scale.set(this.width, this.height, this.thickness)
    }
}

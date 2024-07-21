import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.image('left-cap', 'assets/images/health_bar/barHorizontal_green_left.png')
        this.load.image('middle', 'assets/images/health_bar/barHorizontal_green_mid.png')
        this.load.image('right-cap', 'assets/images/health_bar/barHorizontal_green_right.png')

        this.load.image('left-cap-shadow', 'assets/images/health_bar/barHorizontal_shadow_left.png')
        this.load.image('middle-shadow', 'assets/images/health_bar/barHorizontal_shadow_mid.png')
        this.load.image('right-cap-shadow', 'assets/images/health_bar/barHorizontal_shadow_right.png')
        this.load.image('background', 'assets/images/background.png');


        this.load.image('tiles', 'assets/tileset/tx/TX Tileset Grass.png');

        this.load.image("tiles_wall", "assets/tileset/tx/TX Tileset Wall.png");
        this.load.image("tiles_props", "assets/tileset/tx/TX Props.png");
        this.load.image("tiles_shadows", "assets/tileset/tx/TX Shadow Plant.png");
        this.load.image("tiles_structs", "assets/tileset/tx/TX Struct.png");
        this.load.image("tiles_trees", "assets/tileset/tx/TX Plant.png");

        this.load.spritesheet('mySpritesheet', 'assets/tileset/tx/TX Player.png', {
            frameWidth: 32,
            frameHeight: 64
        });
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tx/level1.json');
    }


    create() {
        this.scene.start("Boot");
    }

}
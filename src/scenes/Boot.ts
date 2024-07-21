import { Scene } from 'phaser';

export class Boot extends Scene {
    cursors: any;
    player: Phaser.GameObjects.Sprite;

    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tx_grass', 'tiles');

        //platform
        if (tileset) {
            // 创建静态图层
            const platforms = map.createLayer('Platforms', tileset, 0, 0);
            if (platforms) {
                // 设置碰撞属性
                platforms.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(platforms, { label: 'floor' });
            } else {
                console.log("platforms is null")
            }

        } else {
            console.log("tileset is null")
        }

        const tileset_wall = map.addTilesetImage('tx_wall', 'tiles_wall');

        //wall
        if (tileset_wall) {
            const walls = map.createLayer('Walls', tileset_wall, 0, 0);
            if (walls) {
                // 设置碰撞属性
                walls.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(walls, { label: 'walls' });
            } else {
                console.log("walls is null")
            }
        }

        const tileset_props = map.addTilesetImage('tx_props', 'tiles_props');

        //props
        if (tileset_props) {
            const props = map.createLayer('Props', tileset_props, 0, 0);
            if (props) {
                // 设置碰撞属性
                props.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(props, { label: 'props' });
            } else {
                console.log("props is null")
            }
        }

        const tileset_shadows = map.addTilesetImage('Shadow_plants', 'tiles_shadows');

        //shadows
        if (tileset_shadows) {
            const shadows = map.createLayer('Shadows', tileset_shadows, 0, 0);
            if (shadows) {
                // 设置碰撞属性
                shadows.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(shadows, { label: 'shadows' });
            } else {
                console.log("shadows is null")
            }
        }

        const tileset_structs = map.addTilesetImage('tx_struct', 'tiles_structs');

        //structs
        if (tileset_structs) {
            const structs = map.createLayer('Structs', tileset_structs, 0, 0);
            if (structs) {
                // 设置碰撞属性
                structs.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(structs, { label: 'structs' });
            } else {
                console.log("structs is null")
            }
        }
        const tileset_trees = map.addTilesetImage('tx_plant', 'tiles_trees');

        //trees
        if (tileset_trees) {
            const trees = map.createLayer('Trees', tileset_trees, 0, 0);
            if (trees) {
                // 设置碰撞属性
                trees.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(trees, { label: 'trees' });
            } else {
                console.log("trees is null")
            }
        }

        const object_layer = map.getObjectLayer('Object Layer');

        if (object_layer) {
            const playerStart = object_layer.objects.find(obj => obj.name === 'playerStart');

            this._createSprite(playerStart);
        }
    }

    _createSprite(playerStart: any) {
        // 创建阴影精灵
        const shadow = this.add.sprite(0, 0, 'mySpritesheet', 3); // 第0帧为阴影

        // 创建走路动画的帧
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('mySpritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        // 创建走路动画的帧
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('mySpritesheet', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        // 创建走路动画的帧
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mySpritesheet', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        // 创建角色精灵并播放动画
        const character = this.add.sprite(0, 0, 'mySpritesheet').play('walk');

        character.setOrigin(0.5, 1);
        // 创建一个容器，将阴影和角色精灵添加到容器中
        const container = this.add.container(100, 100, [shadow, character]);

        container.setPosition(playerStart.x, playerStart.y);
        // container.setDepth(100);
        // 调整阴影和角色精灵的位置
        shadow.setPosition(10, -8); // 根据需要调整阴影的位置
        character.setPosition(0, 32);

        //添加果冻晃动效果
        this._createJellyEffect(character);
        this.player = character;

        this._createCursorKeys();

    }

    _createJellyEffect(sprite: Phaser.GameObjects.Sprite) {
        // 缩放效果
        this.tweens.add({
            targets: sprite,
            // scaleX: 1.3,
            scaleY: 1.02,
            yoyo: true,
            repeat: -1,
            duration: 400,
            // ease: 'Sine.easeInOut'
            ease: 'Cubic.easeIn'
        });
    }
    _createCursorKeys() {
        this.cursors = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) || null;
    }
    update() {
        // 重置玩家速度
        let speed = 32;
        let playerVelocity = { x: 0, y: 0 };

        if (this.cursors) {
            // 检查按键输入并设置玩家速度
            if (this.cursors.left.isDown) {
                playerVelocity.x = -speed;
                this.player.play("left");

            } else if (this.cursors.right.isDown) {
                playerVelocity.x = speed;
                this.player.setFlipX(true);
            }

            if (this.cursors.up.isDown) {
                playerVelocity.y = -speed;
                this.player.play("up");
            } else if (this.cursors.down.isDown) {
                playerVelocity.y = speed;
                this.player.play("down");
            }

            // 更新玩家位置
            this.player.x += playerVelocity.x * this.game.loop.delta / 1000;
            this.player.y += playerVelocity.y * this.game.loop.delta / 1000;
        }

    }
}

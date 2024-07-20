import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('background', 'assets/bg.png');
    }

    create ()
    {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tx_grass', 'tiles');

        const tileset_wall = map.addTilesetImage('tx_wall','tiles_wall');

        if(tileset){
            // 创建静态图层
            const platforms = map.createLayer('Platforms', tileset, 0, 0);
            if(platforms){
                // 设置碰撞属性
                platforms.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(platforms, { label: 'floor' });
            }else{
                console.log("platforms is null")
            }

        }else{
         console.log("tileset is null")
        }

        if(tileset_wall){
            const walls = map.createLayer('Walls',tileset_wall,0,0);
if(walls){
                // 设置碰撞属性
                walls.setCollisionByProperty({ collides: true });
                this.matter.world.convertTilemapLayer(walls, { label: 'walls' });
            }else{
                console.log("walls is null")
            }
        }
    }
}

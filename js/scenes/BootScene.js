import { WIDTH, HEIGHT, COLORS } from '../config.js';
export function addBackdrop(scene,title,subtitle='NEXUS RESEARCH FACILITY'){
  const g=scene.add.graphics();g.fillStyle(COLORS.bg).fillRect(0,0,WIDTH,HEIGHT);g.lineStyle(1,COLORS.cyan,.12);for(let x=0;x<WIDTH;x+=64)g.lineBetween(x,0,x,HEIGHT);for(let y=0;y<HEIGHT;y+=64)g.lineBetween(0,y,WIDTH,y);g.fillStyle(COLORS.red,.06).fillRect(0,0,WIDTH,8).fillRect(0,HEIGHT-8,WIDTH,8);
  scene.add.text(64,55,title,{fontFamily:'monospace',fontSize:'46px',fontStyle:'bold',color:'#eaffff',stroke:'#0a7580',strokeThickness:5});scene.add.text(68,112,subtitle,{fontFamily:'monospace',fontSize:'17px',color:'#6fffea',letterSpacing:3});
}
export function addButton(scene,x,y,label,callback,width=330){
  const bg=scene.add.rectangle(x,y,width,48,0x0b2636,.95).setStrokeStyle(2,COLORS.cyan,.75).setInteractive({useHandCursor:true});const text=scene.add.text(x,y,label,{fontFamily:'monospace',fontSize:'20px',fontStyle:'bold',color:'#dffffa'}).setOrigin(.5);bg.on('pointerover',()=>{bg.setFillStyle(0x17485b);bg.setScale(1.03);scene.game.audio?.playSfx('hover');}).on('pointerout',()=>bg.setFillStyle(0x0b2636).setScale(1)).on('pointerdown',()=>{scene.game.audio?.playSfx('click');callback();});return scene.add.container(0,0,[bg,text]);
}
export class BootScene extends Phaser.Scene{
  constructor(){super('BootScene');}
  create(){const g=this.make.graphics({x:0,y:0,add:false});g.fillStyle(0xffffff).fillCircle(8,8,8);g.generateTexture('orb',16,16);g.clear().fillStyle(0xff365f).fillCircle(6,6,6).lineStyle(2,0xffffff).strokeCircle(6,6,5);g.generateTexture('enemyProjectile',12,12);g.destroy();document.getElementById('loading')?.setAttribute('hidden','');this.scene.start('MenuScene');}
}

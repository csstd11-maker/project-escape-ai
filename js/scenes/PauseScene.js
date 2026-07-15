import { addButton } from './BootScene.js';
export class PauseScene extends Phaser.Scene{
  constructor(){super('PauseScene');}
  init(data){this.pausedSceneKey=data.pausedSceneKey;}
  create(){this.add.rectangle(640,360,1280,720,0x000000,.78);this.add.text(640,150,'PAUSED',{fontFamily:'monospace',fontSize:'48px',fontStyle:'bold',color:'#eaffff'}).setOrigin(.5);addButton(this,640,270,'계속하기',()=>this.resume(),360);addButton(this,640,340,'설정',()=>{this.scene.sleep();this.scene.launch('SettingsScene',{returnScene:'PauseScene'});},360);addButton(this,640,410,'조작법',()=>this.controls(),360);addButton(this,640,480,'메인 메뉴',()=>this.confirmMenu(),360);this.input.keyboard.once('keydown-ESC',()=>this.resume());}
  resume(){if(this.closing)return;this.closing=true;this.scene.stop();this.scene.resume(this.pausedSceneKey);const s=this.scene.get(this.pausedSceneKey);s?.player?.body?.setVelocity(0);}
  controls(){if(this.help)return;this.help=this.add.text(640,590,'WASD/방향키 이동 · J/왼쪽 클릭 공격 · Shift 대시\nF 집기/내려놓기 · K/오른쪽 클릭 투척 · Q EMP · E 상호작용',{fontFamily:'monospace',fontSize:'18px',color:'#89fff0',align:'center',backgroundColor:'#071018dd',padding:{x:15,y:12}}).setOrigin(.5);}
  confirmMenu(){if(this.confirm)return;this.confirm=true;this.add.rectangle(640,360,740,180,0x10050a,.98).setStrokeStyle(3,0xff365f).setDepth(20);this.add.text(640,325,'현재 플레이를 종료하고 메인 메뉴로 이동합니까?',{fontFamily:'monospace',fontSize:'20px',color:'#ffffff'}).setOrigin(.5).setDepth(21);addButton(this,500,400,'취소',()=>this.scene.restart({pausedSceneKey:this.pausedSceneKey}),220).setDepth(22);addButton(this,780,400,'확인',()=>{this.scene.stop(this.pausedSceneKey);this.scene.stop();this.scene.start('MenuScene');},220).setDepth(22);}
}

import { gameSession } from '../gameSession.js';
import { audioManager } from '../audioManager.js';
export class EndingScene extends Phaser.Scene{
  constructor(){super('EndingScene');}
  create(){audioManager.stopMusic();this.cameras.main.setBackgroundColor(0x01040a);const core=this.add.circle(640,330,105,0x170811).setStrokeStyle(8,0xff365f);this.tweens.add({targets:core,alpha:.15,scale:1.35,duration:1300,yoyo:true,repeat:-1});this.text=this.add.text(640,170,'',{fontFamily:'monospace',fontSize:'28px',color:'#dffffa',align:'center',lineSpacing:12,wordWrap:{width:1000}}).setOrigin(.5,0);const lines=[['통제 시스템이 종료되었습니다.\n\n연구소 출구가 개방됩니다.',2500],gameSession.researchLogs.length===4?['NEXUS는 스스로 잘못된 결론을 만든 것이 아니었다.\n\n인간이 제공한 불완전한 데이터가\n잘못된 판단의 시작이었다.',6500]:['SUBJECT 042.\n기억 데이터 복구를 계속합니다.',6500],['BACKUP SYSTEM DETECTED\n\nNEXUS RECOVERY PROTOCOL\n\nREBOOTING...\n\n1%',11500]];lines.forEach(([s,t])=>this.time.delayedCall(t,()=>this.text.setText(s)));this.time.delayedCall(16000,()=>this.scene.start('ResultScene'));}
}

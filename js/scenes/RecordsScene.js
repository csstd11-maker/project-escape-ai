import { addBackdrop, addButton } from './BootScene.js';
import { saveManager } from '../saveManager.js';
export class RecordsScene extends Phaser.Scene{
  constructor(){super('RecordsScene');}
  create(){addBackdrop(this,'최고 기록');const d=saveManager.data,fmt=t=>t==null?'미기록':`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;const rows=[['최고 점수',d.highestScore.toLocaleString()],['최고 등급',d.bestGrade],['최단 클리어',fmt(d.fastestClearTime)],['최고 콤보',d.highestCombo],['총 플레이 횟수',d.totalPlayCount],['총 적 처치 수',d.totalEnemyKills],['Normal 클리어',d.normalCleared?'완료':'미클리어'],['Hard 클리어',d.hardCleared?'완료':'미클리어']];rows.forEach((r,i)=>{this.add.text(300,185+i*50,r[0],{fontFamily:'monospace',fontSize:'21px',color:'#78fff0'});this.add.text(830,185+i*50,String(r[1]),{fontFamily:'monospace',fontSize:'21px',color:'#ffffff'}).setOrigin(1,0);});this.add.text(640,600,'브라우저 데이터나 사이트 저장 공간을 삭제하면 기록이 초기화될 수 있습니다.',{fontFamily:'monospace',fontSize:'17px',color:'#ffbd6b'}).setOrigin(.5);addButton(this,180,660,'뒤로',()=>this.scene.start('MenuScene'),220);}
}

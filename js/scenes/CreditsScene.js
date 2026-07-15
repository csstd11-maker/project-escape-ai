import { addBackdrop, addButton } from './BootScene.js';
export class CreditsScene extends Phaser.Scene{
  constructor(){super('CreditsScene');}
  create(){addBackdrop(this,'PROJECT: ESCAPE.AI','학교 AI 창작제 제출 작품');this.add.text(640,340,'기획 및 개발 보조\nChatGPT와 Codex\n\n게임 엔진\nPhaser 3\n\nAI 적응 시스템\n플레이어의 공격, 투척, 대시, EMP 사용 데이터를\n규칙 기반으로 분석하여 적과 보스 패턴을 변경',{fontFamily:'monospace',fontSize:'22px',color:'#dffffa',align:'center',lineSpacing:9}).setOrigin(.5);addButton(this,180,660,'뒤로',()=>this.scene.start('MenuScene'),220);}
}

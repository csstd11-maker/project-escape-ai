import { DIFFICULTIES } from './config.js';
import { gameSession } from './gameSession.js';
class ScoreManager{
  comboMultiplier(){ const c=gameSession.currentCombo; return c>=30?1.6:c>=20?1.4:c>=10?1.2:c>=5?1.1:1; }
  award(eventType,baseScore,uniqueEventId,isCombatScore=false){ if(gameSession.processedScoreEvents.includes(uniqueEventId))return 0; gameSession.processedScoreEvents.push(uniqueEventId); const diff=DIFFICULTIES[gameSession.difficulty]?.score||1, data=1+.15*gameSession.stats.dataCollectorStacks, combo=isCombatScore?this.comboMultiplier():1; const points=Math.round(baseScore*diff*data*combo); gameSession.score+=points; return points; }
  damagePenalty(amount){ gameSession.score=Math.max(0,gameSession.score-amount); }
  hit(){ gameSession.currentCombo++; gameSession.bestCombo=Math.max(gameSession.bestCombo,gameSession.currentCombo); gameSession.comboExpiresAt=performance.now()+2000; }
  update(){ if(gameSession.currentCombo&&performance.now()>gameSession.comboExpiresAt)gameSession.currentCombo=0; }
  grade(score){ return score>=6000?'S':score>=4800?'A':score>=3500?'B':score>=2200?'C':'D'; }
}
export const scoreManager=new ScoreManager();

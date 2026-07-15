import { PLAYER, SCENE_ORDER } from './config.js';

const freshAI = () => ({ meleeUses:0, successfulMeleeHits:0, throwUses:0, successfulThrowHits:0, dashUses:0, empUses:0, empChargeCompletedCount:0, empUsesWithin8Seconds:0, damageTaken:0, standingStillTime:0, combatTime:0, combatEncounterCount:0, totalCombatEncounterDuration:0, enemyKills:0, meleeKills:0, throwKills:0, lastEmpChargeCompletedAt:-999 });
const baseStats = () => ({ maxHealth:PLAYER.maxHealth, speed:PLAYER.speed, dashSpeed:PLAYER.dashSpeed, dashCooldown:PLAYER.dashCooldown, meleeMultiplier:1, throwDamageMultiplier:1, throwSpeedMultiplier:1, empRange:PLAYER.empRange, empDuration:PLAYER.empDuration, selfRepair:false, dataCollectorStacks:0 });
const fresh = difficulty => ({ difficulty, currentStage:'ResearchLabScene', health:PLAYER.maxHealth, maxHealth:PLAYER.maxHealth, stats:baseStats(), score:0, currentCombo:0, bestCombo:0, comboExpiresAt:0, upgrades:[], upgradeCounts:{ exoskeleton:0, impact:0, throwAssist:0, dashModule:0, empExpander:0, selfRepair:0, dataCollector:0 }, researchLogs:[], ai:freshAI(), temporaryProfile:'balanced', finalProfile:'balanced', deathCount:0, totalDamageTaken:0, playTime:0, enemyKills:0, throwKills:0, checkpoint:null, resultCommitted:false, processedScoreEvents:[], throwHitScoreCount:0, newlyUnlocked:[], completed:true });

class GameSession {
  constructor(){ Object.assign(this, fresh('Normal')); }
  newGame(difficulty='Normal'){ Object.assign(this, fresh(difficulty)); }
  setStage(sceneKey){ this.currentStage=sceneKey; }
  addEmp(amount){ const before=this.empGauge??0; this.empGauge=Math.min(PLAYER.empMax,before+amount); if(before<100&&this.empGauge===100){ this.ai.empChargeCompletedCount++; this.ai.lastEmpChargeCompletedAt=this.playTime; } }
  saveCheckpoint(){ this.checkpoint=structuredClone(this.snapshot()); }
  snapshot(){ const copy={}; for(const [k,v] of Object.entries(this)) if(k!=='checkpoint') copy[k]=v; return copy; }
  restartStage(){ const deaths=this.deathCount; const stage=this.currentStage; if(this.checkpoint) Object.assign(this,structuredClone(this.checkpoint)); this.currentStage=stage; this.deathCount=deaths; this.score=Math.max(0,this.score-500); this.playTime+=10; this.currentCombo=0; }
  nextScene(){ const i=SCENE_ORDER.indexOf(this.currentStage); return SCENE_ORDER[Math.min(i+1,SCENE_ORDER.length-1)]; }
  collectLog(id){ if(this.researchLogs.includes(id)) return false; this.researchLogs.push(id); return true; }
  applyUpgrade(id){
    const c=++this.upgradeCounts[id]; this.upgrades.push(id);
    if(id==='exoskeleton'){ this.maxHealth=100+25*c; this.stats.maxHealth=this.maxHealth; this.health=Math.min(this.maxHealth,this.health+25); }
    if(id==='impact') this.stats.meleeMultiplier=1+.2*c;
    if(id==='throwAssist'){ this.stats.throwDamageMultiplier=1+.25*c; this.stats.throwSpeedMultiplier=1+.1*c; }
    if(id==='dashModule') this.stats.dashCooldown=800;
    if(id==='empExpander'){ this.stats.empRange=PLAYER.empRange*1.25; this.stats.empDuration=PLAYER.empDuration+500; }
    if(id==='selfRepair'){ this.stats.selfRepair=true; this.health=Math.min(this.maxHealth,this.health+20); }
    if(id==='dataCollector') this.stats.dataCollectorStacks=c;
  }
}
export const gameSession = new GameSession();

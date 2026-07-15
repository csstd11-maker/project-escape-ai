import { gameSession } from './gameSession.js';
import { saveManager } from './saveManager.js';
export const ACHIEVEMENTS={ first:{name:'첫 번째 시도',condition:'새 게임을 한 번 시작'}, destroyer:{name:'기계 파괴자',condition:'누적 적 처치 20기'}, thrower:{name:'투척 전문가',condition:'한 플레이에서 투척 처치 5기'}, emp:{name:'EMP 마스터',condition:'한 EMP로 일반 적 3기 영향'}, survivor:{name:'생존자',condition:'사망 0회 클리어'}, hard:{name:'AI를 넘어선 자',condition:'Hard 난이도 클리어'} };
class AchievementManager{
  unlock(id){ if(saveManager.data.unlockedAchievements.includes(id))return false; saveManager.data.unlockedAchievements.push(id); saveManager.persist(); gameSession.newlyUnlocked.push(id); return true; }
  evaluateClear(){ if(gameSession.throwKills>=5)this.unlock('thrower'); if(gameSession.deathCount===0)this.unlock('survivor'); if(gameSession.difficulty==='Hard')this.unlock('hard'); }
}
export const achievementManager=new AchievementManager();

const KEY='escape-ai-save-v1';
const defaults={ highestScore:0,bestGrade:'D',fastestClearTime:null,highestCombo:0,normalCleared:false,hardCleared:false,unlockedAchievements:[],totalPlayCount:0,totalEnemyKills:0,lastDifficulty:'Normal',bgmVolume:.45,sfxVolume:.7,screenShakeEnabled:true };
const validGrade=v=>['D','C','B','A','S'].includes(v);
class SaveManager{
  constructor(){ this.data=this.load(); }
  load(){ try{ const raw=JSON.parse(localStorage.getItem(KEY)||'{}'); const d={...defaults,...raw}; if(!validGrade(d.bestGrade))d.bestGrade='D'; if(!['Easy','Normal','Hard'].includes(d.lastDifficulty))d.lastDifficulty='Normal'; if(!Array.isArray(d.unlockedAchievements))d.unlockedAchievements=[]; for(const k of ['highestScore','highestCombo','totalPlayCount','totalEnemyKills']) if(!Number.isFinite(d[k])||d[k]<0)d[k]=defaults[k]; return d; }catch{return {...defaults};} }
  persist(){ try{ localStorage.setItem(KEY,JSON.stringify(this.data)); }catch{} return this.data; }
  set(k,v){ this.data[k]=v; return this.persist(); }
  resetRecords(){ const settings={bgmVolume:this.data.bgmVolume,sfxVolume:this.data.sfxVolume,screenShakeEnabled:this.data.screenShakeEnabled}; this.data={...defaults,...settings}; return this.persist(); }
}
export const saveManager=new SaveManager();

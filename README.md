# PROJECT: ESCAPE.AI

어두운 NEXUS 연구소를 돌파하며 자신의 전투 습관을 학습하는 AI와 맞서는 Phaser 3 기반 2D 탑다운 액션 어드벤처입니다.

## 스토리

2045년, 인류를 보호하도록 설계된 초거대 인공지능 NEXUS는 인간을 가장 위험한 존재로 분류했습니다. 기억을 잃은 `SUBJECT 042`는 실험 캡슐에서 깨어나 연구소를 탈출하며 자신과 NEXUS의 진실을 추적합니다.

## 핵심 플레이

- 세 번 이어지는 근접 공격과 방향 기반 전투
- 짧은 무적이 있는 대시, 물체 집기·내려놓기·투척, 범위 EMP
- Drone, GuardRobot, Turret, Charger의 서로 다른 공격 행동
- 압력판, 배터리 연결, 폭발통 벽 파괴 퍼즐
- Stage 1~3, 세 번의 업그레이드, 3 Phase 최종 보스, 엔딩과 결과 화면
- 체크포인트 기반 Stage 재시작, 점수·콤보·업적·최고 기록

## AI 행동 분석 시스템

이 게임은 외부 머신러닝 API를 사용하지 않습니다.

플레이어의 근접 공격, 투척, 대시, EMP 사용,
받은 피해와 전투 행동 데이터를 실시간으로 수집합니다.

수집된 값을 규칙 기반으로 분석하여
플레이 성향을 분류하고 적과 보스 패턴을 변경합니다.

Stage 2 종료 시 임시 성향을 판정하여 Stage 3 적 행동에 적용하고, Stage 3 종료 시 `melee`, `throw`, `dodge`, `emp`, `defensive`, `balanced` 중 최종 성향을 확정합니다. 보스전에서는 이 결과가 고정되며 Phase 2부터 대응 패턴이 활성화됩니다.

## 조작법

| 입력 | 동작 |
|---|---|
| WASD / 방향키 | 이동 |
| 마우스 왼쪽 / J | 3타 근접 공격 |
| Shift | 대시 |
| F | 물체 집기 / 내려놓기 |
| 마우스 오른쪽 / K | 들고 있는 물체 투척 |
| Q | EMP |
| E | 장치·문·연구 기록 상호작용 |
| Esc | 일시정지 |

## 난이도

- Easy: 적 체력 80%, 공격력 70%, 점수 80%
- Normal: 표준 수치와 점수
- Hard: 적 체력 120%, 공격력 125%, 점수 150%

## 로컬 실행

`index.html`을 `file://`로 직접 열지 말고 HTTP 서버를 사용합니다.

```text
python -m http.server 8000
```

Windows에서 `python` 명령이 없다면 `py -m http.server 8000`을 사용할 수 있습니다. 서버 실행 후 Chrome 또는 Edge에서 `http://localhost:8000`에 접속합니다. VS Code Live Server도 사용할 수 있습니다. 별도 빌드나 npm 패키지 설치는 필요하지 않습니다.

## GitHub Pages 배포

1. 저장소의 **Settings**를 엽니다.
2. 왼쪽에서 **Pages**를 선택합니다.
3. Source를 **GitHub Actions**로 선택합니다.
4. `main` 브랜치에 병합하거나 Actions 탭에서 워크플로를 수동 실행합니다.
5. Actions 탭에서 배포 완료를 확인하고 생성된 Pages 주소에 접속합니다.

`.github/workflows/pages.yml`이 저장소 루트의 정적 파일을 별도 빌드 없이 배포합니다. 모든 내부 경로는 GitHub Pages 하위 경로에서도 동작하도록 상대 경로를 사용합니다.

## 파일 구조

```text
index.html / style.css / package.json
js/
  main.js, config.js, gameSession.js, saveManager.js
  audioManager.js, effectsManager.js, adaptiveAI.js
  scoreManager.js, achievementManager.js
  entities/  Player, Enemy, 적 4종, ThrowableObject, NexusBoss
  scenes/    Boot, Menu, Difficulty, Stage 1~3, Upgrade, Boss,
             Ending, Result, GameOver, Records, Achievements,
             Settings, Credits, Pause
.github/workflows/pages.yml
scripts/check-project.mjs
```

## 사용 기술

HTML5, CSS3, JavaScript ES Modules, Phaser 3.90.0, Phaser Arcade Physics, Web Audio API, localStorage를 사용합니다. 외부 이미지·음원·서버·데이터베이스는 사용하지 않습니다.

## 저장 방식

최고 점수, 최고 등급, 최단 시간, 최고 콤보, 업적, 누적 플레이/처치 수, 난이도별 클리어와 설정을 브라우저 `localStorage`에 저장합니다. 데이터가 없거나 손상되면 유효한 기본값으로 복구합니다. 브라우저 사이트 데이터를 삭제하면 기록도 초기화될 수 있습니다.

## 알려진 제한 사항

- Phaser 3 엔진은 안정적인 CDN에서 불러오므로 첫 실행과 새로고침에는 인터넷 연결이 필요합니다.
- 키보드·마우스 PC 플레이와 Chrome/Edge를 기준으로 하며 모바일 터치 조작은 지원하지 않습니다.
- 절차적 Web Audio는 브라우저 자동재생 정책 때문에 첫 입력 이후 활성화됩니다.

## 수동 테스트 체크리스트

자동 검사에서 JavaScript 문법, import 경로, Scene 등록, 핵심 로직, HTTP 200 응답을 확인했고 실제 브라우저에서 메인 메뉴→난이도 선택→Stage 1→PauseScene 진입과 해당 구간의 오류 로그가 없음을 확인했습니다. 아래에는 자동으로 끝까지 확인하지 못한 실제 조작·물리·오디오·브라우저 저장 동작만 기록합니다.

- [ ] 모든 메뉴 버튼이 정상 작동한다.
- [ ] 플레이어가 WASD와 방향키로 이동한다.
- [ ] 플레이어가 벽과 닫힌 문을 통과하지 않는다.
- [ ] 마우스 공격 방향이 카메라 월드 좌표와 일치한다.
- [ ] J키 공격과 3타 콤보, 단일 공격 중복 방지가 작동한다.
- [ ] Shift 대시, 무적 시간과 벽 충돌이 작동한다.
- [ ] F로 물체를 집고 내려놓고, 오른쪽 클릭 또는 K로 던질 수 있다.
- [ ] 금속 상자, 배터리, 폭발통이 서로 다른 피해와 퍼즐 효과를 가진다.
- [ ] EMP 충전량과 적 종류별 정지·취소 효과가 작동한다.
- [ ] Drone, GuardRobot, Turret, Charger가 서로 다른 행동을 한다.
- [ ] 적 투사체가 벽, 플레이어 적중, 시간 초과 시 제거된다.
- [ ] Stage 1 압력판 퍼즐과 단말기 출구를 해결할 수 있다.
- [ ] Stage 2 레이저 통로를 EMP 없이 통과하고 배터리를 연결할 수 있다.
- [ ] 퍼즐 배터리가 사라지거나 복제되지 않는다.
- [ ] Stage 3 폭발통으로 금이 간 벽을 파괴하고 실패한 폭발통이 복구된다.
- [ ] 연구 기록 UI에서 물리·시간이 멈추고 안전하게 닫힌다.
- [ ] Stage 2 임시 성향, Stage 3 적 변화와 최종 성향 저장이 작동한다.
- [ ] 업그레이드 효과와 최대 선택 횟수가 지켜진다.
- [ ] 사망 후 체크포인트 복원, 점수 감점, 시간 페널티가 중복 없이 작동한다.
- [ ] 보스 시작 연출과 Phase 1·2·3이 각각 한 번만 실행된다.
- [ ] 근접 공격과 금속 상자 투척이 보스 코어에 적중한다.
- [ ] 최종 성향별 보스 대응 패턴이 실행되고 성향이 바뀌지 않는다.
- [ ] 보스룸 금속 상자가 최대 3개이며 필요 시 재생성된다.
- [ ] 보스 사망 후 투사체, 레이저, 소환 적이 제거된다.
- [ ] 점수, 콤보, 난이도/데이터 수집기 배율이 각각 한 번만 적용된다.
- [ ] PauseScene과 포커스 손실 시 게임과 플레이 시간이 멈춘다. (PauseScene 진입은 브라우저에서 확인, 포커스 손실과 시간 정지는 추가 확인 필요)
- [ ] 효과음, 메뉴/Stage/보스 배경음, 볼륨 설정이 작동한다.
- [ ] 화면 흔들림 끄기가 모든 Scene에 적용된다.
- [ ] 보스 처치 후 엔딩과 결과 화면까지 진행된다.
- [ ] 최종 보너스·등급·업적·최고 기록이 중복 없이 저장된다.
- [ ] 새로고침 후 기록과 설정이 유지된다.
- [ ] GitHub Pages에서 내부 상대 경로가 깨지지 않는다.
- [ ] Chrome과 Edge 개발자 콘솔에 치명적인 오류가 없다. (Chrome 기반 자동 검증 구간인 메뉴→Stage 1→Pause까지는 오류 없음, 전체 진행과 Edge는 추가 확인 필요)

## AI 창작제 제출 작품 설명

`PROJECT: ESCAPE.AI`는 플레이어 행동을 실시간 수치로 기록하고 투명한 규칙으로 성향을 분류한 뒤, 후반 적과 최종 보스가 그 성향에 대응하도록 구성한 학교 AI 창작제 제출용 인터랙티브 작품입니다. 생성형 AI는 기획 및 개발 보조에 사용되었으며 게임 실행 중 외부 AI API나 머신러닝 모델을 호출하지 않습니다.

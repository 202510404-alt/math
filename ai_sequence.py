import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
import platform
from matplotlib import rc

# 1. 환경별 한글/폰트 깨짐 방지 기본 셋팅
if platform.system() == 'Windows':
    rc('font', family='Malgun Gothic')
elif platform.system() == 'Darwin':
    rc('font', family='AppleGothic')
else:
    # 리눅스/크롬북에서 폰트 문제로 깨지지 않도록 기본 고딕 순위 지정
    rc('font', family=['NanumGothic', 'NanumBarunGothic', 'DejaVu Sans'])

plt.rcParams['axes.unicode_minus'] = False # 마이너스 부호 깨짐 방지

# 2. 초기 기본 변수 설정 (10년 기간)
YEARS = 10  

init_labor_count = 5       # 고용 인원 (명)
init_labor_wage = 300      # 1인당 연간 임금 (만원)
init_labor_time = 8        # 인간 일일 작업 시간 (시간)
init_labor_efficiency = 2  # 인간 시간당 작업량

init_auto_cost = 5000      # 자동화 초기 비용 (만원)
init_auto_power = 200      # 연간 로봇 전기세/유지비 (만원)
init_auto_time = 20        # 로봇 일일 작업 시간 (시간)
init_auto_efficiency = 5   # 로봇 시간당 작업량

# 3. UI 창 크기 대폭 확대 및 여백 밸런스 조정
# left를 0.45로 넓혀서 왼쪽 슬라이더 텍스트 공간을 완벽하게 확보함
fig, ax = plt.subplots(figsize=(15, 8))
plt.subplots_adjust(left=0.45, bottom=0.15)  

# 4. 데이터 계산 함수 (누적 등차수열)
def calculate_production(labor_count, labor_wage, labor_time, labor_eff,
                         auto_cost, auto_power, auto_time, auto_eff):
    
    labor_years = [0] * YEARS
    auto_years = [0] * YEARS
    
    # 인간 중심 공장 계산 (매년 누적되는 등차수열의 공차)
    labor_annual_profit = (labor_count * labor_time * labor_eff * 100) - (labor_count * labor_wage)
    
    # 자동화 공장 계산 (매년 누적되는 등차수열의 공차)
    auto_annual_profit = (auto_time * auto_eff * 100) - auto_power
    
    for i in range(YEARS):
        if i == 0:
            labor_years[i] = labor_annual_profit
            # 자동화 첫해: 초기 비용 반영 및 셋팅 기간 생산성 조절
            auto_years[i] = (auto_annual_profit * 0.3) - auto_cost  
        else:
            labor_years[i] = labor_years[i-1] + labor_annual_profit
            auto_years[i] = auto_years[i-1] + auto_annual_profit
            
    return labor_years, auto_years

# 초기 데이터 생성 및 그래프 플롯
l_data, a_data = calculate_production(
    init_labor_count, init_labor_wage, init_labor_time, init_labor_efficiency,
    init_auto_cost, init_auto_power, init_auto_time, init_auto_efficiency
)

line_labor, = ax.plot(range(1, YEARS+1), l_data, 'ro-', label='Labor-Centered Factory (등차수열)')
line_auto, = ax.plot(range(1, YEARS+1), a_data, 'bo-', label='Automated Smart Factory (등차수열)')
ax.axhline(0, color='black', linewidth=0.8, linestyle='--') 

ax.set_title('Smart Factory Optimization (Labor vs Automation)')
ax.set_xlabel('Years')
ax.set_ylabel('Cumulative Profit (10,000 Won)')
ax.grid(True)
ax.legend()

# 5. [중요] 슬라이더 위치 및 너비 전면 리디자인 (글자 안 잘리게 조정)
# slider_x를 오른쪽으로 당기고 width를 좁혀 텍스트 라벨 공간 확보
slider_x = 0.18
slider_width = 0.18
ax_color = 'lightgoldenrodyellow'

# Y축 세로 위치를 미세 조정하여 컴팩트하게 배치
ax_l_count = plt.axes([slider_x, 0.85, slider_width, 0.03], facecolor=ax_color)
ax_l_wage  = plt.axes([slider_x, 0.77, slider_width, 0.03], facecolor=ax_color)
ax_l_time  = plt.axes([slider_x, 0.69, slider_width, 0.03], facecolor=ax_color)
ax_l_eff   = plt.axes([slider_x, 0.61, slider_width, 0.03], facecolor=ax_color)

ax_a_cost  = plt.axes([slider_x, 0.38, slider_width, 0.03], facecolor=ax_color)
ax_a_power = plt.axes([slider_x, 0.30, slider_width, 0.03], facecolor=ax_color)
ax_a_time  = plt.axes([slider_x, 0.22, slider_width, 0.03], facecolor=ax_color)
ax_a_eff   = plt.axes([slider_x, 0.14, slider_width, 0.03], facecolor=ax_color)

# 5. 슬라이더 라벨 직관적 수정 (한글+영문 폴백 결합)
# 일반인도 어떤 수치인지 명확히 알 수 있도록 명칭을 상세하게 정돈했습니다.
s_l_count = Slider(ax_l_count, 'Labor Count (노동자 수: 명)', 1, 20, valinit=init_labor_count, valfmt='%d')
s_l_wage  = Slider(ax_l_wage, 'Labor Wage (1인당 연봉: 만원)', 100, 600, valinit=init_labor_wage, valfmt='%d')
s_l_time  = Slider(ax_l_time, 'Labor Time (하루 근무: 시간)', 4, 12, valinit=init_labor_time, valfmt='%d')
s_l_eff   = Slider(ax_l_eff, 'Labor Eff (인간 작업효율)', 1, 10, valinit=init_labor_efficiency, valfmt='%d')

s_a_cost  = Slider(ax_a_cost, 'Auto Cost (로봇 초기투자비: 만원)', 1000, 15000, valinit=init_auto_cost, valfmt='%d')
s_a_power = Slider(ax_a_power, 'Auto Power (로봇 연간유지비: 만원)', 50, 1000, valinit=init_auto_power, valfmt='%d')
s_a_time  = Slider(ax_a_time, 'Auto Time (로봇 가동시간: 시간)', 12, 24, valinit=init_auto_time, valfmt='%d')
s_a_eff   = Slider(ax_a_eff, 'Auto Eff (기계 작업효율)', 2, 20, valinit=init_auto_efficiency, valfmt='%d')
# 6. 값 업데이트 함수
def update(val):
    l_years, a_years = calculate_production(
        s_l_count.val, s_l_wage.val, s_l_time.val, s_l_eff.val,
        s_a_cost.val, s_a_power.val, s_a_time.val, s_a_eff.val
    )
    line_labor.set_ydata(l_years)
    line_auto.set_ydata(a_years)
    
    # 변화 추이에 맞춰 Y축 스케일 동적 최적화
    ax.set_ylim(min(min(l_years), min(a_years)) - 1000, max(max(l_years), max(a_years)) + 1000)
    fig.canvas.draw_idle()

# 슬라이더 리스너 연결
s_l_count.on_changed(update)
s_l_wage.on_changed(update)
s_l_time.on_changed(update)
s_l_eff.on_changed(update)
s_a_cost.on_changed(update)
s_a_power.on_changed(update)
s_a_time.on_changed(update)
s_a_eff.on_changed(update)

plt.show()
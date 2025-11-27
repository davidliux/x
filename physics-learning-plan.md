# 高中物理学习计划

## VibeCoding + 费曼学习法 融合教学方案

---

## 核心理念

### VibeCoding 风格
- **直觉优先**: 先感受物理现象，再理解公式
- **代码即思考**: 用编程模拟物理过程，让抽象概念可视化
- **玩中学**: 像玩游戏一样探索物理世界
- **即时反馈**: 写代码、运行、看结果、调整、再运行

### 费曼学习法四步骤
1. **选择概念** - 确定要学习的物理知识点
2. **教给小白** - 用最简单的话解释，假装教给完全不懂的人
3. **发现漏洞** - 哪里解释不清楚？回去重学
4. **简化再简化** - 用类比和故事让概念更易懂

---

## 学习模块设计

### 模块一: 力学基础 (第1-4周)

#### Week 1: 运动的描述
**VibeCoding项目**: 制作一个"小球运动模拟器"

```python
# 位移、速度、加速度的直观理解
class Ball:
    def __init__(self):
        self.position = 0      # 位置 (m)
        self.velocity = 0      # 速度 (m/s)
        self.acceleration = 0  # 加速度 (m/s²)

    def move(self, dt=0.1):
        # 核心公式的代码化
        self.velocity += self.acceleration * dt
        self.position += self.velocity * dt
        return self.position

# 玩一玩：改变加速度看看会发生什么？
ball = Ball()
ball.velocity = 10
ball.acceleration = -2  # 减速运动
```

**费曼任务**:
> "假设你的奶奶问你：什么是加速度？用她能听懂的话解释"

**参考答案**: 加速度就是"速度变化的快慢"。想象你骑自行车，加速度大就是你猛踩脚蹬的感觉，加速度小就是你慢慢加速的感觉。

---

#### Week 2: 牛顿运动定律
**VibeCoding项目**: "太空中推箱子"游戏

```python
# F = ma 的游戏化
class SpaceBox:
    def __init__(self, mass):
        self.mass = mass
        self.velocity = 0

    def apply_force(self, force, time=1):
        # 牛顿第二定律: F = ma → a = F/m
        acceleration = force / self.mass
        self.velocity += acceleration * time
        print(f"施加 {force}N 的力，箱子速度变为 {self.velocity} m/s")

# 实验：同样的力，不同质量会怎样？
light_box = SpaceBox(mass=1)   # 1kg的箱子
heavy_box = SpaceBox(mass=10)  # 10kg的箱子

light_box.apply_force(10)  # 轻箱子
heavy_box.apply_force(10)  # 重箱子
# 观察：谁动得更快？为什么？
```

**费曼任务**:
> "牛顿第三定律说'力的作用是相互的'，那为什么我推墙，墙没动，我也没动？"

**思考引导**: 墙给你的反作用力和你给墙的力大小相等，但作用在不同物体上！你没动是因为地面给你的摩擦力平衡了。

---

#### Week 3: 摩擦力与受力分析
**VibeCoding项目**: "冰面滑行 vs 沙地滑行"

```python
# 不同材质的摩擦系数
surfaces = {
    "冰面": 0.03,
    "木地板": 0.3,
    "沙地": 0.6,
    "橡胶地": 0.8
}

def slide_distance(initial_velocity, surface, mass=1):
    """
    计算物体在不同地面上能滑多远
    摩擦力 f = μ * N = μ * m * g
    减速度 a = f/m = μ * g
    """
    mu = surfaces[surface]
    g = 10  # m/s²
    a = mu * g  # 减速度

    # v² = v0² - 2as → s = v0²/(2a)
    distance = (initial_velocity ** 2) / (2 * a)
    return distance

# 同样速度出发，哪个地面滑得最远？
for surface in surfaces:
    d = slide_distance(10, surface)
    print(f"{surface}: 滑行 {d:.1f} 米")
```

**费曼任务**:
> "为什么重的箱子更难推动，但滑动时的减速度和轻箱子一样？"

---

#### Week 4: 抛体运动
**VibeCoding项目**: "愤怒的小鸟物理引擎"

```python
import math

class Projectile:
    def __init__(self, v0, angle_deg):
        angle_rad = math.radians(angle_deg)
        self.vx = v0 * math.cos(angle_rad)  # 水平速度不变
        self.vy = v0 * math.sin(angle_rad)  # 竖直速度受重力影响
        self.x = 0
        self.y = 0
        self.g = 10

    def update(self, dt=0.1):
        self.x += self.vx * dt
        self.vy -= self.g * dt
        self.y += self.vy * dt
        return (self.x, self.y)

    def get_range(self):
        """计算射程"""
        # R = v0² * sin(2θ) / g
        # 最佳角度是45度
        pass

# 实验：什么角度飞得最远？
for angle in [15, 30, 45, 60, 75]:
    bird = Projectile(v0=20, angle_deg=angle)
    while bird.y >= 0:
        bird.update(0.01)
    print(f"角度 {angle}°: 射程 {bird.x:.1f} 米")
```

**费曼任务**:
> "为什么45度角射程最远？用最简单的话解释"

---

### 模块二: 能量与动量 (第5-8周)

#### Week 5: 功和功率
**VibeCoding项目**: "电梯能耗计算器"

```python
class Elevator:
    def __init__(self, mass_kg):
        self.mass = mass_kg
        self.g = 10

    def lift_work(self, height):
        """计算提升所需的功"""
        # W = F * s = m * g * h
        work = self.mass * self.g * height
        return work

    def power_needed(self, height, time):
        """计算所需功率"""
        work = self.lift_work(height)
        power = work / time
        return power

# 实际问题：电梯载5个人(共400kg)上升10层(30m)需要多少功？
elevator = Elevator(500)  # 电梯自重+乘客
work = elevator.lift_work(30)
print(f"需要做功: {work} J = {work/1000} kJ")

# 如果30秒完成，需要多大功率？
power = elevator.power_needed(30, 30)
print(f"需要功率: {power} W = {power/1000} kW")
```

**费曼任务**:
> "功和能量有什么关系？为什么单位都是焦耳？"

---

#### Week 6: 动能与势能
**VibeCoding项目**: "过山车能量转换模拟"

```python
class RollerCoaster:
    def __init__(self, mass, initial_height):
        self.mass = mass
        self.g = 10
        self.height = initial_height
        self.velocity = 0
        # 初始能量 = 势能
        self.total_energy = mass * self.g * initial_height

    def at_height(self, new_height):
        """
        能量守恒：Ep + Ek = 常数
        mgh + 0.5mv² = 常数
        """
        # 势能
        potential = self.mass * self.g * new_height
        # 动能 = 总能量 - 势能
        kinetic = self.total_energy - potential
        # 速度
        if kinetic >= 0:
            self.velocity = math.sqrt(2 * kinetic / self.mass)
        else:
            self.velocity = 0  # 到不了这个高度
        self.height = new_height
        return self.velocity

# 从30米高处下落
coaster = RollerCoaster(mass=100, initial_height=30)
for h in [30, 20, 10, 0]:
    v = coaster.at_height(h)
    print(f"高度 {h}m: 速度 {v:.1f} m/s")
```

**费曼任务**:
> "为什么过山车能爬上比出发点低的坡，但永远爬不上比出发点高的坡？（忽略摩擦）"

---

#### Week 7: 动量与冲量
**VibeCoding项目**: "碰撞模拟器"

```python
class Ball:
    def __init__(self, mass, velocity):
        self.mass = mass
        self.velocity = velocity

    @property
    def momentum(self):
        return self.mass * self.velocity

def elastic_collision(ball1, ball2):
    """
    完全弹性碰撞
    动量守恒: m1v1 + m2v2 = m1v1' + m2v2'
    能量守恒: 动能不变
    """
    m1, v1 = ball1.mass, ball1.velocity
    m2, v2 = ball2.mass, ball2.velocity

    # 碰撞后速度公式
    v1_new = ((m1-m2)*v1 + 2*m2*v2) / (m1+m2)
    v2_new = ((m2-m1)*v2 + 2*m1*v1) / (m1+m2)

    return v1_new, v2_new

# 实验：台球碰撞
ball_a = Ball(mass=1, velocity=10)  # 运动的球
ball_b = Ball(mass=1, velocity=0)   # 静止的球

print(f"碰撞前: A={ball_a.velocity}m/s, B={ball_b.velocity}m/s")
v1, v2 = elastic_collision(ball_a, ball_b)
print(f"碰撞后: A={v1}m/s, B={v2}m/s")
# 发现了什么？
```

**费曼任务**:
> "为什么安全气囊能救命？用动量和冲量的关系解释"

---

#### Week 8: 能量守恒综合
**VibeCoding项目**: "弹簧发射器"

```python
class SpringLauncher:
    def __init__(self, k, compression):
        """
        k: 弹簧劲度系数 (N/m)
        compression: 压缩量 (m)
        """
        self.k = k
        self.x = compression
        # 弹性势能 Ep = 0.5 * k * x²
        self.spring_energy = 0.5 * k * compression**2

    def launch(self, mass, angle_deg=90):
        """发射物体"""
        # 弹性势能 → 动能
        # 0.5*k*x² = 0.5*m*v²
        v = math.sqrt(self.k * self.x**2 / mass)

        # 如果竖直向上发射，能升多高？
        # 0.5*m*v² = m*g*h
        if angle_deg == 90:
            h = v**2 / (2 * 10)
            return v, h
        return v, None

# 弹簧玩具枪
launcher = SpringLauncher(k=200, compression=0.1)
v, h = launcher.launch(mass=0.05)  # 50克的球
print(f"发射速度: {v:.1f} m/s")
print(f"最高高度: {h:.1f} m")
```

---

### 模块三: 电学基础 (第9-12周)

#### Week 9: 电路基础
**VibeCoding项目**: "虚拟电路实验室"

```python
class Resistor:
    def __init__(self, resistance):
        self.R = resistance

class Circuit:
    def __init__(self, voltage):
        self.V = voltage
        self.resistors = []

    def add_series(self, *resistors):
        """串联电阻"""
        self.resistors.extend(resistors)

    def total_resistance_series(self):
        """串联总电阻 = R1 + R2 + ..."""
        return sum(r.R for r in self.resistors)

    def current(self):
        """欧姆定律: I = V/R"""
        R_total = self.total_resistance_series()
        return self.V / R_total

    def voltage_division(self):
        """串联分压"""
        I = self.current()
        for r in self.resistors:
            v = I * r.R
            print(f"R={r.R}Ω 两端电压: {v:.2f}V")

# 实验：串联电路分压
circuit = Circuit(voltage=12)
circuit.add_series(Resistor(2), Resistor(4), Resistor(6))
print(f"总电阻: {circuit.total_resistance_series()}Ω")
print(f"电流: {circuit.current():.2f}A")
circuit.voltage_division()
```

**费曼任务**:
> "为什么串联电路电流处处相等，而并联电路电压处处相等？"

---

#### Week 10: 电功与电功率
**VibeCoding项目**: "家庭用电计算器"

```python
class Appliance:
    def __init__(self, name, power_w):
        self.name = name
        self.power = power_w  # 功率(瓦)

    def daily_usage(self, hours):
        """计算每日耗电量(度)"""
        # 1度 = 1kWh
        kwh = (self.power / 1000) * hours
        return kwh

    def monthly_cost(self, hours_per_day, price_per_kwh=0.5):
        """计算月电费"""
        daily = self.daily_usage(hours_per_day)
        monthly = daily * 30 * price_per_kwh
        return monthly

# 家里的电器
appliances = [
    Appliance("空调", 2000),
    Appliance("冰箱", 150),
    Appliance("电脑", 200),
    Appliance("电灯", 20),
]

total_cost = 0
for app in appliances:
    # 假设每天使用时间
    hours = {"空调": 8, "冰箱": 24, "电脑": 6, "电灯": 5}
    cost = app.monthly_cost(hours[app.name])
    total_cost += cost
    print(f"{app.name}: 月电费 ¥{cost:.1f}")

print(f"\n总计: ¥{total_cost:.1f}/月")
```

**费曼任务**:
> "P = UI = I²R = U²/R，这三个公式什么时候用哪个？"

---

#### Week 11-12: 磁场与电磁感应
**VibeCoding项目**: "电动机/发电机原理演示"

```python
class EMSimulator:
    """电磁感应模拟器"""

    def __init__(self, B, L, n_turns=1):
        """
        B: 磁感应强度 (T)
        L: 导线长度 (m)
        n_turns: 线圈匝数
        """
        self.B = B
        self.L = L
        self.n = n_turns

    def motor_force(self, I):
        """电动机原理: 通电导线在磁场中受力"""
        # F = BIL
        F = self.B * I * self.L
        return F

    def generator_emf(self, v):
        """发电机原理: 切割磁感线产生电动势"""
        # ε = BLv
        emf = self.B * self.L * v
        return emf

    def faraday_law(self, delta_phi, delta_t):
        """法拉第电磁感应定律"""
        # ε = -n * ΔΦ/Δt
        emf = self.n * delta_phi / delta_t
        return emf

# 实验1: 电动机
motor = EMSimulator(B=0.5, L=0.1)
F = motor.motor_force(I=2)
print(f"电动机：通2A电流，导线受力 {F}N")

# 实验2: 发电机
generator = EMSimulator(B=0.5, L=0.1)
emf = generator.generator_emf(v=10)
print(f"发电机：导线以10m/s切割磁感线，产生电动势 {emf}V")
```

**费曼任务**:
> "电动机和发电机的原理有什么关系？为什么说它们是'互逆'的？"

---

### 模块四: 热学与光学 (第13-16周)

#### Week 13-14: 热力学
**VibeCoding项目**: "理想气体状态模拟"

```python
class IdealGas:
    """理想气体状态方程: PV = nRT"""

    R = 8.314  # 气体常数 J/(mol·K)

    def __init__(self, n_mol, T_celsius, V_liters):
        self.n = n_mol
        self.T = T_celsius + 273.15  # 转换为开尔文
        self.V = V_liters / 1000      # 转换为立方米
        self.P = self.calculate_pressure()

    def calculate_pressure(self):
        """计算压强"""
        P = (self.n * self.R * self.T) / self.V
        return P

    def isothermal_process(self, new_V_liters):
        """等温过程: P1V1 = P2V2"""
        new_V = new_V_liters / 1000
        new_P = (self.P * self.V) / new_V
        print(f"等温压缩/膨胀: V: {self.V*1000}L → {new_V_liters}L")
        print(f"压强变化: {self.P/1000:.1f}kPa → {new_P/1000:.1f}kPa")
        return new_P

    def isobaric_process(self, new_T_celsius):
        """等压过程: V1/T1 = V2/T2"""
        new_T = new_T_celsius + 273.15
        new_V = self.V * (new_T / self.T)
        print(f"等压加热/冷却: T: {self.T-273.15}°C → {new_T_celsius}°C")
        print(f"体积变化: {self.V*1000:.1f}L → {new_V*1000:.1f}L")
        return new_V

# 实验：气球在不同温度下的体积变化
gas = IdealGas(n_mol=1, T_celsius=20, V_liters=10)
print(f"初始状态: {gas.T-273.15}°C, {gas.V*1000}L, {gas.P/1000:.1f}kPa\n")

# 加热到100°C
gas.isobaric_process(100)
```

**费曼任务**:
> "为什么气体加热会膨胀？从微观角度（分子运动）解释"

---

#### Week 15-16: 光学
**VibeCoding项目**: "光的折射与全反射"

```python
import math

class OpticalMedium:
    # 常见介质的折射率
    REFRACTIVE_INDEX = {
        "真空": 1.0,
        "空气": 1.0003,
        "水": 1.33,
        "玻璃": 1.5,
        "钻石": 2.42,
    }

    def __init__(self, medium1, medium2):
        self.n1 = self.REFRACTIVE_INDEX[medium1]
        self.n2 = self.REFRACTIVE_INDEX[medium2]
        self.medium1 = medium1
        self.medium2 = medium2

    def snell_law(self, angle1_deg):
        """
        斯涅尔定律: n1*sin(θ1) = n2*sin(θ2)
        """
        angle1 = math.radians(angle1_deg)
        sin_angle2 = (self.n1 / self.n2) * math.sin(angle1)

        if abs(sin_angle2) > 1:
            return None  # 全反射

        angle2 = math.degrees(math.asin(sin_angle2))
        return angle2

    def critical_angle(self):
        """计算临界角（从光密到光疏介质）"""
        if self.n1 <= self.n2:
            return None  # 没有全反射

        sin_critical = self.n2 / self.n1
        return math.degrees(math.asin(sin_critical))

# 实验：光从水射入空气
water_air = OpticalMedium("水", "空气")
critical = water_air.critical_angle()
print(f"水→空气 临界角: {critical:.1f}°\n")

print("不同入射角的折射情况:")
for angle in [10, 30, 45, 48, 50]:
    result = water_air.snell_law(angle)
    if result is None:
        print(f"入射角 {angle}°: 全反射！")
    else:
        print(f"入射角 {angle}°: 折射角 {result:.1f}°")
```

**费曼任务**:
> "为什么光纤能传输信号？它利用了什么光学原理？"

---

## 学习方法总结

### VibeCoding 学习循环
```
[好奇] → [编码实现] → [运行观察] → [调参实验] → [发现规律] → [理解公式]
```

### 费曼学习检查清单
- [ ] 我能用3句话向小学生解释这个概念吗？
- [ ] 我能不看书写出主要公式吗？
- [ ] 我能举出生活中的3个例子吗？
- [ ] 我能解释公式中每个字母的物理意义吗？
- [ ] 我能说出这个知识点和其他知识点的联系吗？

### 每周学习模板
```markdown
## 本周主题: ___

### 1. 核心概念 (用自己的话)
-

### 2. 关键公式
-

### 3. VibeCoding 项目完成情况
- [ ] 代码能运行
- [ ] 理解每一行代码的物理意义
- [ ] 尝试了至少3种不同参数

### 4. 费曼教学
- 我向___解释了这个概念
- 他们的问题是:
- 我的回答是:

### 5. 还不清楚的地方
-
```

---

## 推荐工具

1. **Python环境**: 推荐使用 Jupyter Notebook 进行交互式学习
2. **可视化库**: matplotlib, pygame 用于动画演示
3. **物理模拟库**: pymunk (2D物理引擎)
4. **在线工具**: PhET 互动模拟 (phet.colorado.edu)

---

## 学习进度追踪

| 周次 | 主题 | VibeCoding项目 | 费曼任务 | 完成情况 |
|------|------|----------------|----------|----------|
| 1 | 运动描述 | 小球运动模拟器 | 解释加速度 | ⬜ |
| 2 | 牛顿定律 | 太空推箱子 | 解释作用力反作用力 | ⬜ |
| 3 | 摩擦力 | 冰面滑行模拟 | 解释摩擦力与质量关系 | ⬜ |
| 4 | 抛体运动 | 愤怒小鸟引擎 | 解释45度最远 | ⬜ |
| 5 | 功和功率 | 电梯能耗计算 | 解释功和能量关系 | ⬜ |
| 6 | 动能势能 | 过山车模拟 | 解释能量守恒 | ⬜ |
| 7 | 动量冲量 | 碰撞模拟器 | 解释安全气囊原理 | ⬜ |
| 8 | 能量综合 | 弹簧发射器 | 综合应用 | ⬜ |
| 9 | 电路基础 | 虚拟电路实验室 | 解释串并联特点 | ⬜ |
| 10 | 电功率 | 家庭用电计算 | 解释功率公式选择 | ⬜ |
| 11-12 | 电磁感应 | 电动机发电机 | 解释互逆原理 | ⬜ |
| 13-14 | 热力学 | 气体状态模拟 | 解释气体膨胀 | ⬜ |
| 15-16 | 光学 | 折射全反射模拟 | 解释光纤原理 | ⬜ |

---

> "如果你不能简单地解释一件事，说明你还没有真正理解它。" —— 理查德·费曼

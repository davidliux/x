"""
==============================================
   Week 1: 运动的描述
   VibeCoding 物理课堂
==============================================

今天我们要搞懂三个最基本的概念：
  - 位置 (position)
  - 速度 (velocity)
  - 加速度 (acceleration)

别急着背公式！先来"玩"一下，感受它们的关系。
"""

import time

# ============================================
# Part 1: 想象你在开车
# ============================================

print("=" * 50)
print("🚗 欢迎来到 VibeCoding 物理课堂！")
print("=" * 50)
print()

print("【场景】你在一条笔直的公路上开车")
print("  - 你的位置 = 你离出发点多远")
print("  - 你的速度 = 你跑得多快")
print("  - 你的加速度 = 你踩油门/刹车的力度")
print()

# ============================================
# Part 2: 用代码模拟一辆车
# ============================================

class Car:
    """一辆简单的车"""

    def __init__(self):
        self.position = 0      # 位置：米 (m)
        self.velocity = 0      # 速度：米/秒 (m/s)
        self.acceleration = 0  # 加速度：米/秒² (m/s²)
        self.time = 0          # 时间：秒 (s)

    def step(self, dt=1):
        """
        让时间流逝 dt 秒，看看车的状态变化

        核心公式（但先别背，看代码理解）：
        - 新速度 = 旧速度 + 加速度 × 时间
        - 新位置 = 旧位置 + 速度 × 时间
        """
        # 速度会因为加速度而改变
        self.velocity = self.velocity + self.acceleration * dt

        # 位置会因为速度而改变
        self.position = self.position + self.velocity * dt

        # 时间流逝
        self.time += dt

    def status(self):
        """打印当前状态"""
        print(f"  时间: {self.time:>3}s | 位置: {self.position:>6.1f}m | 速度: {self.velocity:>5.1f}m/s")


# ============================================
# Part 3: 实验 1 - 匀速运动
# ============================================

print("-" * 50)
print("【实验 1】匀速运动 - 速度不变")
print("-" * 50)
print()
print("设定：初速度 = 10 m/s，加速度 = 0（不踩油门也不刹车）")
print()

car1 = Car()
car1.velocity = 10      # 初始速度 10 m/s
car1.acceleration = 0   # 不加速也不减速

print("观察车的运动：")
for _ in range(5):
    car1.status()
    car1.step(1)

print()
print("💡 发现了什么？")
print("   → 速度一直是 10 m/s（因为加速度是 0）")
print("   → 每秒位置增加 10m（因为速度是 10 m/s）")
print()


# ============================================
# Part 4: 实验 2 - 匀加速运动
# ============================================

print("-" * 50)
print("【实验 2】匀加速运动 - 踩油门！")
print("-" * 50)
print()
print("设定：初速度 = 0，加速度 = 2 m/s²（持续踩油门）")
print()

car2 = Car()
car2.velocity = 0       # 从静止开始
car2.acceleration = 2   # 加速度 2 m/s²

print("观察车的运动：")
for _ in range(6):
    car2.status()
    car2.step(1)

print()
print("💡 发现了什么？")
print("   → 速度每秒增加 2 m/s（因为加速度是 2）")
print("   → 位置增加得越来越快（因为速度越来越大）")
print()


# ============================================
# Part 5: 实验 3 - 刹车！
# ============================================

print("-" * 50)
print("【实验 3】减速运动 - 踩刹车！")
print("-" * 50)
print()
print("设定：初速度 = 20 m/s，加速度 = -4 m/s²（踩刹车）")
print()

car3 = Car()
car3.velocity = 20      # 初始速度 20 m/s
car3.acceleration = -4  # 负加速度 = 减速！

print("观察车的运动：")
for _ in range(7):
    car3.status()
    if car3.velocity <= 0:
        print("  🛑 车停了！")
        break
    car3.step(1)

print()
print("💡 发现了什么？")
print("   → 加速度为负 = 速度在减小")
print("   → 5秒后速度变成 0，车停了")
print("   → 停下前走了多远？看位置！")
print()


# ============================================
# Part 6: 费曼时间！
# ============================================

print("=" * 50)
print("🎓 费曼学习法 - 检验你是否真的懂了")
print("=" * 50)
print()
print("尝试用最简单的话回答这些问题：")
print()
print("Q1: 什么是加速度？")
print('    （提示：不要说"速度的变化率"，用生活语言）')
print()
print("Q2: 加速度是负数代表什么？")
print("    （提示：想想刹车的感觉）")
print()
print("Q3: 为什么匀加速运动中，走过的距离越来越多？")
print("    （提示：和速度有什么关系？）")
print()

print("-" * 50)
print("参考答案（先自己想，再看！）")
print("-" * 50)
print()
print('A1: 加速度就是"速度变化的快慢"')
print("    → 踩油门猛 = 加速度大")
print("    → 慢慢加速 = 加速度小")
print()
print("A2: 负加速度 = 和运动方向相反的加速")
print("    → 实际效果就是在减速/刹车")
print("    → 速度会越来越小，直到停下或反向")
print()
print("A3: 因为速度在增大！")
print("    → 第1秒速度慢，走得少")
print("    → 第5秒速度快，走得多")
print("    → 所以每秒走的距离越来越多")
print()


# ============================================
# Part 7: 动手实验！
# ============================================

print("=" * 50)
print("🔧 动手实验 - 改改代码试试！")
print("=" * 50)
print()
print("试着修改下面的代码，观察结果：")
print()
print("实验 A: 把加速度改成 5，看看速度变化多快？")
print("实验 B: 初速度 30，加速度 -3，多久停下？")
print("实验 C: 加速度改成 0.5，模拟缓慢加速")
print()

# 你的实验区 - 修改这里的数值！
print("-" * 50)
print("【你的实验】")
print("-" * 50)

my_car = Car()
my_car.velocity = 0       # ← 改这里：初始速度
my_car.acceleration = 3   # ← 改这里：加速度

print(f"设定：初速度 = {my_car.velocity} m/s, 加速度 = {my_car.acceleration} m/s²")
print()
for _ in range(8):
    my_car.status()
    my_car.step(1)

print()
print("=" * 50)
print("第一课结束！你已经理解了运动的基本概念！")
print("=" * 50)

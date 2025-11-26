"""
==============================================
   运动可视化 - 用ASCII动画"看"物理
==============================================
"""

import time
import os

def clear_screen():
    """清屏"""
    os.system('cls' if os.name == 'nt' else 'clear')

def draw_car(position, max_pos=50, velocity=0, acceleration=0, t=0):
    """用ASCII画出车的位置"""
    # 缩放位置到屏幕宽度
    screen_pos = int(position / max_pos * 40) if max_pos > 0 else 0
    screen_pos = max(0, min(40, screen_pos))

    # 画道路
    road = "=" * 50
    car_line = " " * screen_pos + "🚗"

    print(f"┌{'─' * 50}┐")
    print(f"│{road}│")
    print(f"│{car_line.ljust(50)}│")
    print(f"│{road}│")
    print(f"└{'─' * 50}┘")
    print()
    print(f"  ⏱  时间: {t:.1f} s")
    print(f"  📍 位置: {position:.1f} m")
    print(f"  🏃 速度: {velocity:.1f} m/s")
    print(f"  ⚡ 加速度: {acceleration:.1f} m/s²")

class AnimatedCar:
    def __init__(self, v0=0, a=0):
        self.position = 0
        self.velocity = v0
        self.acceleration = a
        self.time = 0

    def update(self, dt=0.1):
        self.velocity += self.acceleration * dt
        self.position += self.velocity * dt
        self.time += dt

def animate_motion(v0, a, duration=5, title="运动演示"):
    """动画演示运动过程"""
    car = AnimatedCar(v0=v0, a=a)

    # 预计算最大位置用于缩放
    test_car = AnimatedCar(v0=v0, a=a)
    for _ in range(int(duration * 10)):
        test_car.update(0.1)
    max_pos = max(test_car.position, 1)

    print(f"\n{'='*50}")
    print(f"  {title}")
    print(f"  初速度: {v0} m/s | 加速度: {a} m/s²")
    print(f"{'='*50}\n")
    input("按 Enter 开始动画...")

    for i in range(int(duration * 10)):
        clear_screen()
        print(f"\n{'='*50}")
        print(f"  {title}")
        print(f"{'='*50}\n")

        draw_car(car.position, max_pos, car.velocity, car.acceleration, car.time)

        # 速度为0或负时停止（对于减速运动）
        if a < 0 and car.velocity <= 0:
            print("\n  🛑 车停了！")
            break

        car.update(0.1)
        time.sleep(0.1)

    print("\n" + "="*50)
    print("  动画结束！")
    print("="*50)

def main():
    while True:
        print("\n" + "="*50)
        print("  🎮 运动模拟器 - 选择要演示的场景")
        print("="*50)
        print()
        print("  1. 匀速运动 (v=10, a=0)")
        print("  2. 加速运动 (v=0, a=2)")
        print("  3. 刹车运动 (v=20, a=-4)")
        print("  4. 自定义参数")
        print("  5. 退出")
        print()

        choice = input("请选择 (1-5): ").strip()

        if choice == "1":
            animate_motion(v0=10, a=0, duration=5, title="匀速运动")
        elif choice == "2":
            animate_motion(v0=0, a=2, duration=6, title="匀加速运动")
        elif choice == "3":
            animate_motion(v0=20, a=-4, duration=6, title="刹车减速")
        elif choice == "4":
            try:
                v0 = float(input("输入初速度 (m/s): "))
                a = float(input("输入加速度 (m/s²): "))
                t = float(input("输入演示时间 (s): "))
                animate_motion(v0=v0, a=a, duration=t, title="自定义运动")
            except ValueError:
                print("输入无效，请输入数字！")
        elif choice == "5":
            print("\n再见！继续探索物理的奥秘！\n")
            break
        else:
            print("无效选择，请重试")

if __name__ == "__main__":
    main()

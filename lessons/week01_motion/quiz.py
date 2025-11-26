"""
==============================================
   第一课小测验 - 检验你的理解！
==============================================
"""

import random

def quiz():
    score = 0
    total = 5

    print("\n" + "="*50)
    print("  📝 运动学小测验")
    print("  （选择正确答案的序号）")
    print("="*50 + "\n")

    # Q1
    print("【第1题】")
    print("一辆车以 20 m/s 的速度匀速行驶，")
    print("5秒后它的位置在哪里？（假设从0开始）")
    print()
    print("  A. 20 米")
    print("  B. 100 米")
    print("  C. 25 米")
    print("  D. 4 米")
    print()
    ans = input("你的答案 (A/B/C/D): ").upper().strip()
    if ans == "B":
        print("✅ 正确！s = v × t = 20 × 5 = 100m\n")
        score += 1
    else:
        print("❌ 答案是 B。s = v × t = 20 × 5 = 100m\n")

    # Q2
    print("【第2题】")
    print("加速度的物理意义是什么？")
    print()
    print("  A. 速度的大小")
    print("  B. 位置变化的快慢")
    print("  C. 速度变化的快慢")
    print("  D. 时间的长短")
    print()
    ans = input("你的答案 (A/B/C/D): ").upper().strip()
    if ans == "C":
        print("✅ 正确！加速度描述的是速度变化的快慢\n")
        score += 1
    else:
        print("❌ 答案是 C。加速度 = 速度变化的快慢\n")

    # Q3
    print("【第3题】")
    print("一辆车从静止开始，加速度为 3 m/s²，")
    print("4秒后它的速度是多少？")
    print()
    print("  A. 3 m/s")
    print("  B. 7 m/s")
    print("  C. 12 m/s")
    print("  D. 4 m/s")
    print()
    ans = input("你的答案 (A/B/C/D): ").upper().strip()
    if ans == "C":
        print("✅ 正确！v = v0 + at = 0 + 3×4 = 12 m/s\n")
        score += 1
    else:
        print("❌ 答案是 C。v = v0 + at = 0 + 3×4 = 12 m/s\n")

    # Q4
    print("【第4题】")
    print("一辆车速度为 30 m/s，加速度为 -5 m/s²，")
    print("多长时间后会停下来？")
    print()
    print("  A. 6 秒")
    print("  B. 5 秒")
    print("  C. 150 秒")
    print("  D. 25 秒")
    print()
    ans = input("你的答案 (A/B/C/D): ").upper().strip()
    if ans == "A":
        print("✅ 正确！当 v=0 时，0 = 30 + (-5)t，所以 t = 6秒\n")
        score += 1
    else:
        print("❌ 答案是 A。当 v=0 时，0 = 30 - 5t，所以 t = 6秒\n")

    # Q5 - 费曼题
    print("【第5题 - 费曼挑战】")
    print("用最简单的一句话解释：")
    print("为什么刹车时，加速度是负的？")
    print()
    print("（这是开放题，输入你的答案后按回车）")
    print()
    ans = input("你的解释: ")
    print()
    print("参考答案：因为刹车时速度在减小，")
    print("加速度方向和运动方向相反，所以是负值。")
    print()
    print("如果你的答案表达了类似的意思，给自己加1分！")
    confirm = input("你答对了吗？(Y/N): ").upper().strip()
    if confirm == "Y":
        score += 1

    # 结果
    print("\n" + "="*50)
    print(f"  🎯 测验结束！你的得分: {score}/{total}")
    print("="*50)

    if score == total:
        print("  🏆 太棒了！你完全掌握了这节课的内容！")
    elif score >= 3:
        print("  👍 不错！基本概念掌握得很好，继续加油！")
    else:
        print("  📚 建议重新看一遍课程内容，多做实验！")

    print()
    print("💡 小建议：")
    print("   试着向你的朋友或家人解释今天学的内容")
    print("   如果能让他们听懂，说明你真的理解了！")
    print()

if __name__ == "__main__":
    quiz()

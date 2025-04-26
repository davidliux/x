import os
from app import create_app, db # 从 app 包导入工厂函数和 db 对象
# from app.models import User, Tool # 可以在这里导入模型，方便后续操作
from flask_migrate import Migrate

# 根据环境变量 FLASK_ENV 或默认值创建 app
app = create_app(os.getenv('FLASK_ENV') or 'default')
migrate = Migrate(app, db) # 将 migrate 关联到这里的 app 和 db

# 定义 shell 上下文，方便在 `flask shell` 中直接使用 app 和 db
@app.shell_context_processor
def make_shell_context():
    # return dict(db=db, User=User, Tool=Tool)
    return dict(db=db)

# 定义 CLI 命令，例如用于测试
@app.cli.command()
def test():
    """Run the unit tests."""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

if __name__ == '__main__':
    app.run() # 使用 Flask 内建服务器启动 
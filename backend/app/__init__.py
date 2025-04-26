from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import config # 从同级目录导入 config 字典

# 初始化扩展，但不传入 app 对象
db = SQLAlchemy()
migrate = Migrate()
cors = CORS()

def create_app(config_name='default'):
    """应用工厂函数"""
    app = Flask(__name__)
    # 从配置对象加载配置
    app.config.from_object(config[config_name])

    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)
    # 配置 CORS，允许来自前端源的请求 (根据需要调整 origins)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}}) # 暂时允许所有来源访问 /api/ 下的路由
    # 如果您的前端运行在 http://localhost:3000
    # cors.init_app(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # --- 注册蓝图 (Blueprints) --- START ---
    from .routes.product_checker import product_checker_bp # 导入工具蓝图
    app.register_blueprint(product_checker_bp, url_prefix='/api/tools/product_checker') # 注册蓝图并添加 URL 前缀

    # 可以在这里注册其他蓝图
    # from .api import api as api_blueprint
    # app.register_blueprint(api_blueprint, url_prefix='/api')
    # --- 注册蓝图 (Blueprints) --- END ---

    # 可以添加一个简单的根路由用于测试
    @app.route('/')
    def index():
        return 'Backend is running!'

    return app
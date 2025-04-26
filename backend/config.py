import os
from dotenv import load_dotenv

# 获取项目根目录的父目录，即 .env 文件所在的 backend 目录
basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
# 加载 .env 文件
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    """基础配置类"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess' # 提供一个默认值以防万一
    SQLALCHEMY_TRACK_MODIFICATIONS = False # 禁用追踪修改，减少开销
    # 可以添加其他通用配置

class DevelopmentConfig(Config):
    """开发环境配置"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app-dev.db') # 提供一个本地 sqlite 作为备选

class TestingConfig(Config):
    """测试环境配置"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'sqlite://' # 内存数据库
    WTF_CSRF_ENABLED = False # 测试时禁用 CSRF 保护

class ProductionConfig(Config):
    """生产环境配置"""
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    # 生产环境可以添加更多配置，如日志、安全设置等

# 配置字典，方便应用工厂根据环境变量选择配置
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
} 
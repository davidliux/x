from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import JSONB # 导入 PostgreSQL 特有的 JSONB 类型
from . import db # 从当前包导入 db 实例

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255))
    contact_person = db.Column(db.String(255))
    phone_number = db.Column(db.String(50))
    email = db.Column(db.String(255), unique=True)
    registration_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    last_login_date = db.Column(db.DateTime(timezone=True))
    currency_balance = db.Column(db.Numeric(10, 2), default=0.00)
    status = db.Column(db.String(50), default='active')

    # 关联关系 (反向引用)
    transactions = db.relationship('CurrencyTransaction', backref='user', lazy='dynamic')
    usage_logs = db.relationship('ToolUsageLog', backref='user', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Tool(db.Model):
    __tablename__ = 'tools'
    tool_id = db.Column(db.Integer, primary_key=True)
    tool_name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text)
    backend_endpoint = db.Column(db.String(255), nullable=False)
    currency_cost_per_use = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), default='active')
    created_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    updated_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关联关系 (反向引用)
    transactions = db.relationship('CurrencyTransaction', backref='tool', lazy='dynamic')
    usage_logs = db.relationship('ToolUsageLog', backref='tool', lazy='dynamic')

    def __repr__(self):
        return f'<Tool {self.tool_name}>'

class CurrencyTransaction(db.Model):
    __tablename__ = 'currency_transactions'
    transaction_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'))
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    transaction_type = db.Column(db.String(50), nullable=False) # 'top_up', 'tool_usage', 'adjustment'
    transaction_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    payment_method = db.Column(db.String(50))
    payment_status = db.Column(db.String(50))
    order_id = db.Column(db.String(255), unique=True)
    tool_id = db.Column(db.Integer, db.ForeignKey('tools.tool_id', ondelete='SET NULL'))
    notes = db.Column(db.Text)

    def __repr__(self):
        return f'<Transaction {self.transaction_id} for User {self.user_id}>'

class ToolUsageLog(db.Model):
    __tablename__ = 'tool_usage_logs'
    log_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'))
    tool_id = db.Column(db.Integer, db.ForeignKey('tools.tool_id', ondelete='SET NULL'))
    usage_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    currency_cost_incurred = db.Column(db.Numeric(10, 2), nullable=False)
    input_data = db.Column(JSONB) # 使用 PostgreSQL 的 JSONB 类型
    output_data = db.Column(JSONB)
    ai_call_logs = db.Column(JSONB)
    status = db.Column(db.String(50), nullable=False) # 'success', 'failed'
    error_message = db.Column(db.Text)

    def __repr__(self):
        return f'<UsageLog {self.log_id} for User {self.user_id}, Tool {self.tool_id}>' 

DATABASE = {
    'host': 'localhost',
    'database': 'db_world_guide',
    'user': 'postgres',
    'password': 'postgres',
    'port': 5432,
}
SQLALCHEMY_DATABASE_URI = (
    'postgresql://%(user)s:%(password)s@%(host)s:%(port)s/%(database)s' % DATABASE
)
SECRET_KEY = 'secret_key'
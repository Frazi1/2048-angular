from sqlalchemy import create_engine

dialect = "mysql+pymysql"

login = "test"
password = "test"
host = "localhost"
db_name = "2048"
options = ""

connection_string = "{dialect}://{login}:{password}@{host}/{db_name}{options}".format(dialect=dialect,
                                                                                      login=login,
                                                                                      password=password,
                                                                                      host=host,
                                                                                      db_name=db_name,
                                                                                      options=options)
print("Connection string: {}".format(connection_string))

ENGINE = create_engine(connection_string, echo=True, echo_pool=True, pool_recycle=1000, pool_size=30)
# Session = sessionmaker(ENGINE)

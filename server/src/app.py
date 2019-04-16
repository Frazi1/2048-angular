import json

from bottle import Bottle, run, response

from console_logger import ConsoleLogger
from controllers.auth_controller import AuthController
from controllers.business_exception import BusinessException
from controllers.game_controller import GameController
from plugins.sqlalchemy_session_manager_plugin.bottle_sqlalchemy_session_manager_plugin import \
    BottleSQLAlchemySessionPlugin
from services.auth.auth_service import AuthService
from plugins.controller_plugin.controller_plugin import ControllerPlugin
from plugins.plugins import JsonPlugin, EnableCors, AuthPlugin, ErrorFilterPlugin
from plugins.pyjson.pyjson import PyJsonConverter
from plugins.pyjson_plugin.pyjson_plugin import BottlePyJsonPlugin
from db import ENGINE
from services.game_service import GameService

app = Bottle(autojson=False)

auth_service = AuthService()
game_service = GameService()


app.install(JsonPlugin())
app.install(ErrorFilterPlugin())
app.install(BottleSQLAlchemySessionPlugin(engine=ENGINE, commit=False, create_session_by_default=True))
app.install(AuthPlugin(auth_service))
app.install(EnableCors())
converter = PyJsonConverter()
app.install(BottlePyJsonPlugin(converter))
app.install(ControllerPlugin())

logger = ConsoleLogger()

auth_controller = AuthController(app, logger, auth_service)
game_controller = GameController(app, game_service, logger)


@app.route('/<:re:.*>', method='OPTIONS')
def cors():
    print('After request hook.')
    response.headers['Access-Control-Allow-Origin'] = '*'

if __name__ == "__main__":
    run(app,
        host='localhost',
        port=8080,
        # reloader=True,
        debug=True,
        )


@app.error(500)
def error(err):
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, DELETE'
    response.headers['Access-Control-Allow-Headers'] = '*'
    if err is BusinessException:
        message_ = {"error": str(err)}
        response.status = 400
    else:
        message_ = {"code": err.status_code,
                    "exception": str(err.exception),
                    "message": str(err.exception),
                    "trace": err.traceback}

    dump = json.dumps(message_)
    return dump

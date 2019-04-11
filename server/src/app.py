from bottle import Bottle, run

from console_logger import ConsoleLogger
from controllers.auth_controller import AuthController
from services.auth.auth_service import AuthService
from src.plugins.controller_plugin.controller_plugin import ControllerPlugin
from src.plugins.plugins import JsonPlugin, EnableCors, AuthPlugin, ErrorFilterPlugin
from src.plugins.pyjson.pyjson import PyJsonConverter
from src.plugins.pyjson_plugin.pyjson_plugin import BottlePyJsonPlugin

app = Bottle(autojson=False)

auth_service = AuthService()
app.install(JsonPlugin())
app.install(ErrorFilterPlugin())
app.install(AuthPlugin(auth_service))
app.install(EnableCors())
converter = PyJsonConverter()
app.install(BottlePyJsonPlugin(converter))
app.install(ControllerPlugin())

logger = ConsoleLogger()
auth_controller = AuthController(app, logger, auth_service)

if __name__ == "__main__":
    run(app,
        host='localhost',
        port=8080,
        # reloader=True,
        debug=True,
        )

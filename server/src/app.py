from bottle import Bottle, run

from controllers.auth_controller import AuthController
from services.auth_service import AuthService
from src.plugins.controller_plugin.controller_plugin import ControllerPlugin
from src.plugins.plugins import JsonPlugin, EnableCors
from src.plugins.pyjson.pyjson import PyJsonConverter
from src.plugins.pyjson_plugin.pyjson_plugin import BottlePyJsonPlugin

app = Bottle(autojson=False)
app.install(JsonPlugin())
app.install(EnableCors())
converter = PyJsonConverter()
app.install(BottlePyJsonPlugin(converter))
app.install(ControllerPlugin())

auth_service = AuthService()
auth_controller = AuthController(app, None, auth_service)

if __name__ == "__main__":
    run(app,
        host='localhost',
        port=8080,
        # reloader=True,
        debug=True,
        )

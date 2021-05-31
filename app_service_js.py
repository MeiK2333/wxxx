from py_mini_racer import MiniRacer


def app_service(code: str):
    ctx = MiniRacer()
    text = (
        """const __global_result__ = {};
function require() {}
function definePlugin() {}
function requirePlugin() {}
function define(name, func) {
  const code = func.toString();
  __global_result__[name] = code;
}
    """
        + code
    )
    ctx.eval(text)
    return ctx.call("function () { return __global_result__ }")

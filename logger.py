import logging
import logging.handlers
import sys


def module_logger(module: str, level=logging.INFO):
    log = logging.getLogger(module)
    log.setLevel(level)
    formatter = logging.Formatter(
        "%(asctime)s [%(filename)s:%(lineno)d] [%(levelname)s]: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setLevel(logging.DEBUG)
    stdout_handler.setFormatter(formatter)

    log.addHandler(stdout_handler)
    return log


logger = module_logger("wxxx")

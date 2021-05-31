from pathlib import Path

from logger import logger


def write_file(filename: Path, body, mode: str = "w"):
    logger.debug(f"write file {filename.absolute()}")
    if not filename.parent.exists():
        filename.parent.mkdir(parents=True)
    with open(filename, mode) as fw:
        fw.write(body)

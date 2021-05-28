import pathlib

import fire
from pydantic import BaseModel

from logger import logger


class WXFile(BaseModel):
    file: pathlib.Path
    name: str
    offset: int
    size: int


def parse(file: pathlib.Path):
    logger.info(f"解析 {file.absolute()}")
    wx_files = []
    with open(file, "rb") as fr:
        mark1 = fr.read(1)
        mark2 = fr.read(4)
        info_length = int.from_bytes(fr.read(4), "big")
        data_length = int.from_bytes(fr.read(4), "big")
        mark3 = fr.read(1)
        if mark1 != b"\xbe" or mark3 != b"\xed":
            raise ValueError("Magic number is not correct!")

        file_count = int.from_bytes(fr.read(4), "big")
        logger.info(f"file_count = {file_count}")
        for i in range(file_count):
            name_length = int.from_bytes(fr.read(4), "big")
            name = fr.read(name_length).decode("utf-8")
            offset = int.from_bytes(fr.read(4), "big")
            size = int.from_bytes(fr.read(4), "big")
            wx_file = WXFile(file=file, name=name, offset=offset, size=size)
            wx_files.append(wx_file)
    return wx_files


def save_file(wx_file: WXFile, path: pathlib.Path):
    with open(wx_file.file, "rb") as fr:
        fr.seek(wx_file.offset)
        body = fr.read(wx_file.size)

    directory = path.parent
    if not directory.exists():
        directory.mkdir(parents=True)

    with open(path, "wb") as fw:
        fw.write(body)
    logger.info(f"解压 {wx_file.name} 至 {path.absolute()}")


def main(i: str = "./target", o: str = "output"):
    input_path = pathlib.Path(i)
    output_path = pathlib.Path(o)
    logger.info(f"源目录 = {input_path.absolute()}，输出目录 = {output_path.absolute()}")

    wxapkg_files = [file for file in input_path.iterdir() if file.suffix == ".wxapkg"]
    for file in wxapkg_files:
        wx_files = parse(file)
        for wx_file in wx_files:
            to_path = output_path.joinpath(wx_file.name[1:])
            save_file(wx_file, to_path)


if __name__ == "__main__":
    fire.Fire(main)

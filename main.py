import json
import re
from pathlib import Path

import fire
import jsbeautifier
from pydantic import BaseModel

from app_service_js import app_service
from logger import logger
from utils import write_file


class WXFile(BaseModel):
    file: Path
    name: str
    offset: int
    size: int


def parse(file: Path):
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
        logger.debug(f"file_count = {file_count}")
        for i in range(file_count):
            name_length = int.from_bytes(fr.read(4), "big")
            name = fr.read(name_length).decode("utf-8")
            offset = int.from_bytes(fr.read(4), "big")
            size = int.from_bytes(fr.read(4), "big")
            wx_file = WXFile(file=file, name=name, offset=offset, size=size)
            wx_files.append(wx_file)
    return wx_files


def save_file(wx_file: WXFile, path: Path):
    with open(wx_file.file, "rb") as fr:
        fr.seek(wx_file.offset)
        body = fr.read(wx_file.size)

    write_file(path, body, mode="wb")
    logger.debug(f"解压 {wx_file.name} 至 {path.absolute()}")


def process_app_config_json(path: Path):
    app_config_json_file = path.joinpath("app-config.json")
    if not app_config_json_file.exists():
        logger.warning(f"{app_config_json_file.absolute()} not found!")
        return

    with open(app_config_json_file) as fr:
        data = json.loads(fr.read())
    if "subPackages" in data:
        subpackages = data["subPackages"]
        logger.info(f"共有子包 {len(subpackages)} 个")

        for subpackage in subpackages:
            for page_path in subpackage["pages"]:
                write_file(
                    path.joinpath(page_path + ".js"),
                    f"// {page_path}.js\nPage({{data: {{}}}})",
                )
                write_file(
                    path.joinpath(page_path + ".wxml"),
                    f"<!--{page_path}.wxml--><text>{page_path}.wxml</text>",
                )
                write_file(
                    path.joinpath(page_path + ".wxss"), f"/* {page_path}.wxss */"
                )

    with open(app_config_json_file, "w") as fw:
        fw.write(json.dumps(data, indent=2, ensure_ascii=True))


def process_app_service_js(path: Path):
    app_service_js = path.joinpath("app-service.js")
    if not app_service_js.exists():
        logger.warning(f"{app_service_js.absolute()} not found!")
        return

    with open(app_service_js) as fr:
        data = fr.read()
    regex = r"\_\_wxAppCode\_\_\['[^\.]+\.json[^;]+\;"

    logger.info('解析 json 文件')
    result = re.findall(regex, data)
    for item in result:
        item: str
        idx = item.index(" = ")
        name = item[15 : idx - 2]
        jsn = json.loads(item[idx + 3 : -1])
        file_path = path.joinpath(name)
        write_file(file_path, json.dumps(jsn, ensure_ascii=False, indent=2))
        logger.info(file_path.absolute())

    logger.info('解析 js 文件')
    # 通过执行 JS，获取对应的函数内容
    code = data[data.find("define(") :]
    for name, source in app_service(code).items():
        source: str
        source = source[source.index("{") + 1 : source.rindex("}")].strip()
        if source.startswith('"use strict";') or source.startswith("'use strict';"):
            source = source[13:]

        source = jsbeautifier.beautify(source)
        write_file(path.joinpath(name), source)
        logger.info(path.joinpath(name).absolute())


def main(i: str = "./target", o: str = "output"):
    input_path = Path(i)
    output_path = Path(o)
    logger.info(f"源目录 = {input_path.absolute()}，输出目录 = {output_path.absolute()}")

    wxapkg_files = [file for file in input_path.iterdir() if file.suffix == ".wxapkg"]
    for file in wxapkg_files:
        wx_files = parse(file)
        for wx_file in wx_files:
            to_path = output_path.joinpath(wx_file.name[1:])
            save_file(wx_file, to_path)

    process_app_config_json(output_path)
    process_app_service_js(output_path)


if __name__ == "__main__":
    fire.Fire(main)

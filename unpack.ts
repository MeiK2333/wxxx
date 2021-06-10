import fs from 'fs';
import path from 'path';
import vm from 'vm';

const target = 'target';
const output = 'output';

class WXFile {
	file: string;
	name: string;
	offset: number;
	size: number;
	constructor(file: string, name: string, offset: number, size: number) {
		this.file = file;
		this.name = name;
		this.offset = offset;
		this.size = size;
	}

}

function parse() {
	const wxFiles: WXFile[] = [];
	fs.readdirSync(target).forEach(file => {
		if (!file.endsWith('.wxapkg')) {
			return;
		}
		console.log(file);
		const buffer = fs.readFileSync(path.join(target, file));
		const mark1 = buffer.readUInt8(0);
		const mark2 = buffer.readUInt32BE(1);
		const infoLength = buffer.readUInt32BE(5);;
		const dataLength = buffer.readUInt32BE(9);;
		const mark3 = buffer.readUInt8(13);;
		if (mark1 !== 0xbe || mark3 !== 0xed) {
			throw Error("Magic number is not correct!");
		}

		const fileCount = buffer.readUInt32BE(14);
		let offset = 18;
		console.log(`file count = ${fileCount}`);
		for (let i = 0; i < fileCount; i++) {
			const nameLength = buffer.readUInt32BE(offset);
			offset += 4;
			const name = buffer.toString('utf-8', offset, offset + nameLength);
			offset += nameLength;
			const ost = buffer.readUInt32BE(offset);
			offset += 4;
			const size = buffer.readUInt32BE(offset);
			offset += 4;
			wxFiles.push(new WXFile(file, name, ost, size));
		}
	});

	for (const wxFile of wxFiles) {
		console.log(wxFile);
		const filepath = path.join(output, wxFile.name);
		if (!fs.existsSync(path.dirname(filepath))) {
			fs.mkdirSync(path.dirname(filepath), {
				recursive: true
			})
		}
		const fd = fs.openSync(path.join(target, wxFile.file), 'r');
		const buffer = Buffer.alloc(wxFile.size);
		fs.readSync(fd, buffer, 0, wxFile.size, wxFile.offset);
		fs.writeFileSync(filepath, buffer);
	}
}

function appService() {
	const body = fs.readFileSync(path.join(output, 'app-service.js'));
	const script = new vm.Script(`var __global_result__ = {};
function define (name, func) {
	const code = func.toString();
	__global_result__[name] = code;
}
	` + body.toString());
	const context = {
		require: () => { },
		definePlugin: () => { },
		requirePlugin: () => { },
		__global_result__: {}
	};
	vm.createContext(context);
	script.runInContext(context);
	for (const [file, code] of Object.entries(context.__global_result__)) {
		const filepath = path.join(output, file);
		if (!fs.existsSync(path.dirname(filepath))) {
			fs.mkdirSync(path.dirname(filepath), {
				recursive: true
			})
		}
		let func = code as string;
		const l = func.indexOf('{');
		const r = func.lastIndexOf('}');
		func = func.slice(l + 1, r).trim();
		if (func.startsWith(`"use strict";`) || func.startsWith(`'use strict';`)) {
			func = func.slice(13).trim();
		}
		fs.writeFileSync(filepath, func);
	}
}

parse();
appService();
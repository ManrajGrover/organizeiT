#! /usr/bin/env node

const fs = require('fs'), mv = require('mv');

const getExtension = function (fileName) {
	let i = fileName.lastIndexOf('.');
	return (i < 0) ? '' : fileName.substr(i + 1);
}

const mkdir = function (path) {
	try {
		fs.mkdirSync(path);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw new Error("Error occurred while creating a new directory");
		}
	}
}

const organizeiT = function (fileName, type) {
	let path = process.cwd() + '/Organized_' + type;
	mkdir(path);
	mv(process.cwd() + '/' + fileName, path + '/' + fileName, function (err) {
		if (err) {
			throw new Error("Couldn't move " + fileName + " because of following error: " + err);
		}
	});
}

const audio = ["MP3", "WAV", "WMA", "MKA", "AAC", "MID", "RA", "RAM", "RM", "OGG"];
const code = ["CPP", "RB", "PY", "HTML", "CSS", "JS"];
const compressed = ["RAR", "JAR", "ZIP", "TAR", "MAR", "ISO", "LZ", "7ZIP", "TGZ", "GZ", "BZ2"];
const docs = ["DOC", "DOCX", "PPT", "PPTX", "PAGES", "PDF", "ODT", "ODP", "XLSX", "XLS", "ODS", "TXT", "IN", "OUT", "MD"];
const images = ["JPG", "JPEG", "GIF", "PNG", "SVG"];
const sys_files = ["DEB", "EXE", "SH", "BUNDLE"];
const video = ["FLV", "WMV", "MOV", "MP4", "MPEG", "3GP", "MKV"];

const formats = {
	"Music" : audio,
	"Codes" : code,
	"Compressed" : compressed,
	"Documents" : docs,
	"Images" : images,
	"System Files" : sys_files,
	"Video" : video
};

console.log('Scanning files..');

let fileNames = fs.readdirSync(process.cwd());

try {
	for (let i = 0; i < fileNames.length; i++) {
		let fileExtension = getExtension(fileNames[i]).toUpperCase();
		for (let type in formats) {
			if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
				organizeiT(fileNames[i], type);
			}
		}
	}
	console.log('Done!');
	process.exit();
} catch (err) {
	console.log(err);
	process.exit();
}

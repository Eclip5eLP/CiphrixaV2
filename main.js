const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

const { app, BrowserWindow, Menu, dialog, ipcMain } = electron;
let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		}
	});
	win.loadFile("index.html");

	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});

	//Build Menu
	//const mainMenu = Menu.buildFromTemplate(menuTemplate);
	//Menu.setApplicationMenu(mainMenu);
}

//Menu Template
const menuTemplate = [
	{
		label: "File",
		submenu: [
			{
				label: "Load File"
			},
			{
				label: "Label 2"
			},
			{
				label: "Quit",
				accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				}
			}
		]
	}
];

//App Behaviour
app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (win === null) createWindow();
});

//Event Listeners
ipcMain.on('request-mainprocess-action', (event, arg) => {
    if (arg.type == "saveFile") {
    	console.log("Saving File localy");
    	
    	let options = {
    		title: "Ciphrixa - Save File",
    		defaultPath: app.getPath('downloads') + '/' + arg.filename,
    		defaultPath: ".\\" + arg.filename,
    		buttonLabel: "Save file",
    		filters :[
			  	{name: 'Ciphrixa', extensions: [arg.allowed]},
			  	{name: 'All Files', extensions: ['*']}
			]
    	};
    	let content = arg.contents;
    	let filename = dialog.showSaveDialogSync(win, options);

		//Save file
		if (filename === undefined){
	        console.log("You didn't save the file");
	        return;
	    }

	    fs.writeFile(filename, content, (err) => {
	        if(err){
	            alert("An error ocurred creating the file " + err.message)
	        }
	        console.log("File Saved");
	    });
    }
});
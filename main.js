const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

const { autoUpdater } = require('electron-updater');
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

	win.on("closed", () => {
		win = null;
	});

	//Build Menu
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);

	win.once('ready-to-show', () => {
  		autoUpdater.checkForUpdatesAndNotify();
	});
}

//Menu Template
const menuTemplate = [
	{
		label: "Options",
		submenu: [
			{
				label: "Console",
				accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
				click() {
					win.webContents.openDevTools();
				}
			},
			{
				label: "Reload",
				accelerator: process.platform == "darwin" ? "Command+R" : "Ctrl+R",
				click() {
					win.webContents.reload();
				}
			},
			{ type: "separator" },
			{
				label: "Quit",
				accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: "Edit",
		submenu: [
			{
				label: "Undo",
				accelerator: process.platform == "darwin" ? "Command+Z" : "Ctrl+Z",
				click() {
					win.webContents.undo();
				}
			},
			{
				label: "Redo",
				accelerator: process.platform == "darwin" ? "Command+Y" : "Ctrl+Y",
				click() {
					win.webContents.redo();
				}
			},
			{ type: "separator" },
			{
				label: "Cut",
				accelerator: process.platform == "darwin" ? "Command+X" : "Ctrl+X",
				click() {
					win.webContents.cut();
				}
			},
			{
				label: "Copy",
				accelerator: process.platform == "darwin" ? "Command+C" : "Ctrl+C",
				click() {
					win.webContents.copy();
				}
			},
			{
				label: "Paste",
				accelerator: process.platform == "darwin" ? "Command+V" : "Ctrl+V",
				click() {
					win.webContents.paste();
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

autoUpdater.on('update-available', () => {
  	win.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  	win.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  	autoUpdater.quitAndInstall();
});
const { ipcRenderer, remote } = require('electron');
const Cryptr = require('cryptr');
dialog = remote.dialog;

function encryptString() {
	var inp = document.getElementById("enc_str_input").value;
	var key = document.getElementById("enc_str_input_key").value;
	var out = document.getElementById("enc_str_output");

	if (inp == "" || key == "") {
		M.toast({html: "<i class='material-icons left'>warning</i> String and Key cant be empty!"});
		return false;
	}

	var cr = new Cryptr(key);
    var enc = cr.encrypt(inp);
	out.innerHTML = enc;
	M.toast({html: "String Encrypted"});
}

function decryptString() {
	var inp = document.getElementById("dec_str_input").value;
	var key = document.getElementById("dec_str_input_key").value;
	var out = document.getElementById("dec_str_output");

	if (inp == "" || key == "") {
		M.toast({html: "<i class='material-icons left'>warning</i> String and Key cant be empty!"});
		return false;
	}

	var cr = new Cryptr(key);
    try {
    	var dec = cr.decrypt(inp);
    } catch(e) {
    	M.toast({html: "<i class='material-icons left'>error</i> String failed to Decrypt: Wrong Key"});
    	return;
    }
	out.innerHTML = dec;
	M.toast({html: "String Decrypted"});
}

function encryptFile() {
	var inp = document.getElementById("enc_file_input").files[0];
	var key = document.getElementById("enc_file_input_key").value;

	if (inp.length == 0 || key == "") {
		M.toast({html: "<i class='material-icons left'>warning</i> File and Key cant be empty!"});
		return false;
	}

	var reader = new FileReader();
    reader.readAsText(inp, "UTF-8");
    reader.onload = function (evt) {
    	var txt = evt.target.result;
    	var cr = new Cryptr(key);
        var enc = cr.encrypt(txt);

        let Data = {
    		type: "saveFile",
    		filename: inp.name + ".enc",
    		contents: enc,
    		allowed: "enc"
		};

		ipcRenderer.send('request-mainprocess-action', Data);
		M.toast({html: "File Encrypted"});

    }
    reader.onerror = function (evt) {
        M.toast({html: "<i class='material-icons left'>error</i> Failed to read file"});
		return false;
    }
}

function decryptFile() {
	var inp = document.getElementById("dec_file_input").files[0];
	var key = document.getElementById("dec_file_input_key").value;

	if (inp.length == 0 || key == "") {
		M.toast({html: "<i class='material-icons left'>warning</i> File and Key cant be empty!"});
		return false;
	}

	var reader = new FileReader();
    reader.readAsText(inp, "UTF-8");
    reader.onload = function (evt) {
    	var txt = evt.target.result;
        var cr = new Cryptr(key);
        try {
        	var dec = cr.decrypt(txt);
        } catch(e) {
        	M.toast({html: "<i class='material-icons left'>error</i> File failed to Decrypt: Wrong Key"});
        	return;
        }

        let Data = {
    		type: "saveFile",
    		filename: inp.name + ".dec",
    		contents: dec,
    		allowed: "dec"

		};

		ipcRenderer.send('request-mainprocess-action', Data);
		M.toast({html: "File Decrypted"});

    }
    reader.onerror = function (evt) {
        M.toast({html: "<i class='material-icons left'>error</i> Failed to read file"});
		return false;
    }
}
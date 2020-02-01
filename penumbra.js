/// --- PENUMBRA --- ///
//  Made by Eclip5e   //
//  ©Penumbra Games   //
/// ---------------- ///

penumbra = {
	//Penumbra Cipher
	cipher: {
		encrypt: function(input, key) {
			//Cipher
			var cipher = "";
			var len = input.length - 1;
			var ochar, nchar, pos;

			//Create Seed
			var n = "";
			for (var i = 0; i <= key.length - 1; i++) {
				char = key.substring(i, i + 1);
				n = n + char.charCodeAt();
			}
			key = n;
			penumbra.cipher.setSeed(key);

			//Encrypt
			for (var i = 0; i <= len; i++) {
				ochar = input.substring(i, i + 1);
				pos = penumbra.cipher.alph32.indexOf(ochar);
				if (pos != -1) {
					var randAdd = penumbra.cipher.randomseed();
					pos = pos + randAdd;
					if (pos > penumbra.cipher.alph32.length - 1) pos -= penumbra.cipher.alph32.length;
					if (pos < 0) pos = penumbra.cipher.alph32.length - (pos * -1);
					nchar = penumbra.cipher.alph64[pos];
				} else {
					nchar = ochar;
				}
				cipher = cipher + nchar;
			}
			penumbra.cipher.seed = penumbra.cipher.getRandomInt(1000000, 99999999);
			return cipher;
		},

		decrypt: function(input, key) {
			//Decipher
			var cipher = "";
			var len = input.length - 1;
			var ochar, nchar, pos;

			//Create Seed
			var n = "";
			for (var i = 0; i <= key.length - 1; i++) {
				char = key.substring(i, i + 1);
				n = n + char.charCodeAt();
			}
			key = n;
			penumbra.cipher.setSeed(key);

			//Decrypt
			for (var i = 0; i <= len; i += 7) {
				ochar = input.substring(i, i + 7);
				pos = penumbra.cipher.alph64.indexOf(ochar);
				if (pos != -1) {
					var randAdd = penumbra.cipher.randomseed();
					pos -= randAdd;
					if (pos > penumbra.cipher.alph64.length - 1) pos -= penumbra.cipher.alph64.length;
					if (pos < 0) pos = penumbra.cipher.alph64.length - (pos * -1);
					nchar = penumbra.cipher.alph32[pos];
				} else {
					nchar = ochar;
				}
				cipher = cipher + nchar;
			}
			penumbra.cipher.seed = penumbra.cipher.getRandomInt(1000000, 99999999);
			return cipher;
		},

		setSeed: function(seed) {
			penumbra.cipher.seed = seed;
		},

		seedAdvance: function() {
			penumbra.cipher.seed = (parseInt(penumbra.cipher.seed) + 1);
		},

		seedBack: function() {
			penumbra.cipher.seed -= 1;
		},

		alph32: [ //105 Characters
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '?', '_',
			'=', ':', '.', ',', '#', '\'', '"', '+', '-', ' ', '', '\\', '$',
			'%', '&', '(', ')', '[', ']', '{', '}', '*', ';', '/', '<', '>',
			'@', '^', '`', '´', '|', '~', 'ü', 'Ü', 'ä', 'Ä', 'ö', 'Ö', '°',
			'\n'
		],

		alph64: [ //105 Characters
			'K1x92iH', 'sHCxknj', '9onzMUS', 'uuufycE', '6SbzVmU', 'j6KHRXu', 'ZjX4Mjq', 't3wrwab', 'AOvBzPX', 'SpJEXWp', 'tcU5Q8I', 'nX5CmQ5', 'NZSInUD',
			'mPRKqqP', 'AWfWQMn', '5BfGeOV', 'LTMNEy2', '4OycbDz', 'IaCgdrg', 'CegIbIj', 'VQcezsQ', 'NPnXPDL', 'Q8Hy9Is', 'cPga3M5', 'RFjVLwt', 'aQNghME',
			'qtwQAnH', 'IsNO9jE', 'eCDFv5l', 'MVwF2tu', 'joYPugk', 'h5zI7nm', 'tIbO42Z', 'ETCuaqO', 'A1txQDl', 'n4fqlum', 'A8GKNsy', 'cAPvhN4', 'EZj7fbm',
			'k24BTgN', 'FQz1OXr', '6cAQFId', 'EEHFi6X', 'WVVjAR1', 'fnYiY6A', 'XnydcQp', '5lNHhJO', '9djKfWl', 'zZNc8tG', 'zj73VGY', 'vdxSs5K', 'eiMz6pz',
			'Um22km8', '79OzDgl', 'bmCsRVJ', 'XTcoiZR', 'QtNkHc3', 'B6NxZ6i', 'kppGy1Q', 'Goj6asD', '0EhzFeV', 'A9UaNvn', 'U6Xxp0f', 'R68GBY0', 'mckIKa0',
			'1yW9R58', 'TCmbLhy', 'TrYztMy', 'rU6HTc6', 'xYo8YqB', '0Tr2C6A', 'P42OoVE', 'ydp3W7S', 'WeEX4Ww', 'yjjHcep', 'DM3k5p5', 'BgWHrpz', 'HIXiSB4',
			'n4RDOHH', '2FIhRuw', 'I5mY1KV', 'zZ2IAnO', '11DsLZs', 'TrddoqA', 'pf1Uiy5', 'STWPRcb', 'L737Zdo', 'Q4DkPFG', 'Eyq57e6', 'bVAvz5Y', 'bhVfuL7',
			'WEyOSFe', 'FHdgWkg', 'iHKAjNL', '22egLBv', 'PXp9ftx', 'fq9VRMC', 'cMiiOB0', 'PAHaNis', 'ocG4USq', '1q9GZ2G', 'az9F70I', '4u4RX6i', 'aTROxEZ',
			'Whf7WhL'
		],

		getRandomInt: function(min, max) {
		    min = Math.ceil(min);
		    max = Math.floor(max);
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		randomseed: function() {
		    var x = Math.sin(penumbra.cipher.seed) * 10000;
		    penumbra.cipher.seedAdvance();
		    return Math.floor((x - Math.floor(x)) * 100);
		},

		trace: {
			clear: function() {
				penumbra.cipher.alph32 = [];
				penumbra.cipher.alph64 = [];
			}
		}
	},

	//Array Sorting
	arraySort: {
		ascending: function(array) {
			//Define Variables
			var narr = [];
			var len = array.length - 1;
			var skey, s;
			var skip = [];

			//Setup Skip Array
			for (var i = 0; i <= len; i++) {
				skip[i] = false;
			}

			//For every entry in Array
			for (var i = 0; i <= len; i++) {
				s = undefined;
				//Loop all entries once
				for (var j = 0; j <= len; j++) {
					if (s == undefined || array[j] <= s) {
						//Check if it has been sorted already
						if (skip[j] == false) {
							s = array[j];
							skey = j;
						}
					}
				}
				//Add Skip Key and add to Sorted Array
				narr[i] = s;
				skip[skey] = true;
			}

			//Return Array
			return narr;
		},
		
		descending: function(array) {
			//Define Variables
			var narr = [];
			var len = array.length - 1;
			var skey, s;
			var skip = [];

			//Setup Skip Array
			for (var i = 0; i <= len; i++) {
				skip[i] = false;
			}

			//For every entry in Array
			for (var i = 0; i <= len; i++) {
				s = undefined;
				//Loop all entries once
				for (var j = 0; j <= len; j++) {
					if (s == undefined || array[j] >= s) {
						//Check if it has been sorted already
						if (skip[j] == false) {
							s = array[j];
							skey = j;
						}
					}
				}
				//Add Skip Key and add to Sorted Array
				narr[i] = s;
				skip[skey] = true;
			}

			//Return Array
			return narr;
		}
	},

	//Caesar Cipher
	caesar: {
		encrypt: function(input, key) {
			//Make Cipher
			var cipher = "";
			var len = input.length - 1;
			var ochar, nchar, pos;
			for (var i = 0; i <= len; i++) {
				ochar = input.substring(i, i + 1);
				pos = caesar.alph.indexOf(ochar);
				if (pos != -1) {
					pos = parseInt(pos) + parseInt(key);
					if (pos > caesar.alph.length - 1) pos -= caesar.alph.length;
					if (pos < 0) pos = caesar.alph.length - 1;
					nchar = caesar.alph[pos];
				} else {
					nchar = ochar;
				}
				cipher = cipher + nchar;
			}
			return cipher;
		},

		decrypt: function(input, key) {
			//Make Cipher
			var cipher = "";
			var len = input.length - 1;
			var ochar, nchar, pos;
			for (var i = 0; i <= len; i++) {
				ochar = input.substring(i, i + 1);
				pos = caesar.alph.indexOf(ochar);
				if (pos != -1) {
					pos = parseInt(pos) - parseInt(key);
					if (pos > caesar.alph.length - 1) pos -= caesar.alph.length;
					if (pos < 0) pos += caesar.alph.length;
					nchar = caesar.alph[pos];
				} else {
					nchar = ochar;
				}
				cipher = cipher + nchar;
			}
			return cipher;
		},

		alph: [ //52 Characters
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '?', '_',
			'_', ':', '.', ',', '#', '\'', '"', '+', '-', ' '
		]
	},

	//Binary Operations
	binary: {
		decode: function(num) {
			//Vars
			num = num.toString();
			var len = num.length;
			var deci = 0, c = 1;

			//Core Algorithm
			for (var i = len; i > 0; i -= 1) {
				var at = num.substring(i - 1, i);
				if (parseInt(at) == 1) {
					deci += c;
					c *= 2;
				} else {
					c *= 2;
				}
			}

			return deci;
		},

		encode: function(num) {
			//Vars
			var pow2 = 1, bin = "", check = 0;

			//Core Algorithm
			pow2 = parseInt(num);
			while (pow2 != 0) {
				if (pow2 == 1) {
					bin = "1" + bin;
					pow2 = 0;
				} else {
					check = pow2 % 2;
					bin = check.toString() + bin;
					pow2 = (pow2 - check) / 2;
				}
			}

			return bin;
		},

		halfAdder: function(a, b){
		  	const sum = xor(a,b);
		  	const carry = and(a,b);
		  	return [sum, carry];
		},

		fullAdder: function(a, b, carry){
		  	halfAdd = penumbra.binary.halfAdder(a,b);
		  	const sum = xor(carry, halfAdd[0]);
		  	carry = and(carry, halfAdd[0]);
		  	carry = or(carry, halfAdd[1]);
		  	return [sum, carry];
		},

		add: function(a, b) {
			let sum = '';
			let carry = '';
			for (var i = a.length-1;i>=0; i--){
			    if (i == a.length-1){
			      	//half add the first pair
			      	const halfAdd1 = penumbra.binary.halfAdder(a[i],b[i]);
			      	sum = halfAdd1[0]+sum;
			      	carry = halfAdd1[1];
			    } else {
			      	//full add the rest
			      	const fullAdd = penumbra.binary.fullAdder(a[i],b[i],carry);
			      	sum = fullAdd[0]+sum;
			      	carry = fullAdd[1];
			    }
			}

			return carry ? carry + sum : sum;
		},

		sub: function(a, b) {
			return "ERROR: function not implemented yet!";
		}
	},

	//aaencode
	aaencode: function(text) {
	    var t;
	    var b = [
			"(c^_^o)",
			"(ﾟΘﾟ)",
			"((o^_^o) - (ﾟΘﾟ))",
			"(o^_^o)",
			"(ﾟｰﾟ)",
			"((ﾟｰﾟ) + (ﾟΘﾟ))",
			"((o^_^o) +(o^_^o))",
			"((ﾟｰﾟ) + (o^_^o))",
			"((ﾟｰﾟ) + (ﾟｰﾟ))",
			"((ﾟｰﾟ) + (ﾟｰﾟ) + (ﾟΘﾟ))",
			"(ﾟДﾟ) .ﾟωﾟﾉ",
			"(ﾟДﾟ) .ﾟΘﾟﾉ",
			"(ﾟДﾟ) ['c']",
			"(ﾟДﾟ) .ﾟｰﾟﾉ",
			"(ﾟДﾟ) .ﾟДﾟﾉ",
			"(ﾟДﾟ) [ﾟΘﾟ]"
	        ];
		var r = "ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻   //*´∇｀*/ ['_']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); "; 
		
		if (/ひだまりスケッチ×(365|３５６)\s*来週も見てくださいね[!！]/.test(text)){
			r += "X=_=3; ";
			r += "\r\n\r\n    X / _ / X < \"来週も見てくださいね!\";\r\n\r\n";
		}
	    r += "(ﾟДﾟ) =(ﾟΘﾟ)= (o^_^o)/ (o^_^o);"+
	        "(ﾟДﾟ)={ﾟΘﾟ: '_' ,ﾟωﾟﾉ : ((ﾟωﾟﾉ==3) +'_') [ﾟΘﾟ] "+
	        ",ﾟｰﾟﾉ :(ﾟωﾟﾉ+ '_')[o^_^o -(ﾟΘﾟ)] "+
	        ",ﾟДﾟﾉ:((ﾟｰﾟ==3) +'_')[ﾟｰﾟ] }; (ﾟДﾟ) [ﾟΘﾟ] =((ﾟωﾟﾉ==3) +'_') [c^_^o];"+
	        "(ﾟДﾟ) ['c'] = ((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ) ];"+
	        "(ﾟДﾟ) ['o'] = ((ﾟДﾟ)+'_') [ﾟΘﾟ];"+
	        "(ﾟoﾟ)=(ﾟДﾟ) ['c']+(ﾟДﾟ) ['o']+(ﾟωﾟﾉ +'_')[ﾟΘﾟ]+ ((ﾟωﾟﾉ==3) +'_') [ﾟｰﾟ] + "+
	        "((ﾟДﾟ) +'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ ((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+"+
	        "((ﾟｰﾟ==3) +'_') [(ﾟｰﾟ) - (ﾟΘﾟ)]+(ﾟДﾟ) ['c']+"+
	        "((ﾟДﾟ)+'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ (ﾟДﾟ) ['o']+"+
	        "((ﾟｰﾟ==3) +'_') [ﾟΘﾟ];(ﾟДﾟ) ['_'] =(o^_^o) [ﾟoﾟ] [ﾟoﾟ];"+
	        "(ﾟεﾟ)=((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟДﾟ) .ﾟДﾟﾉ+"+
	        "((ﾟДﾟ)+'_') [(ﾟｰﾟ) + (ﾟｰﾟ)]+((ﾟｰﾟ==3) +'_') [o^_^o -ﾟΘﾟ]+"+
	        "((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟωﾟﾉ +'_') [ﾟΘﾟ]; "+
	        "(ﾟｰﾟ)+=(ﾟΘﾟ); (ﾟДﾟ)[ﾟεﾟ]='\\\\'; "+
	        "(ﾟДﾟ).ﾟΘﾟﾉ=(ﾟДﾟ+ ﾟｰﾟ)[o^_^o -(ﾟΘﾟ)];"+ 
			"(oﾟｰﾟo)=(ﾟωﾟﾉ +'_')[c^_^o];"+//TODO
	        "(ﾟДﾟ) [ﾟoﾟ]='\\\"';"+ 
	        "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (ﾟεﾟ+";
	    r += "(ﾟДﾟ)[ﾟoﾟ]+ ";
	    for (var i = 0; i < text.length; i++){
	        n = text.charCodeAt( i );
	        t = "(ﾟДﾟ)[ﾟεﾟ]+";
			if( n <= 127 ){
				t += n.toString( 8 ).replace( /[0-7]/g, function(c){ return b[ c ] + "+ "; } );
			}else{
				var m = /[0-9a-f]{4}$/.exec( "000" + n.toString(16 ) )[0];
				t += "(oﾟｰﾟo)+ " + m.replace( /[0-9a-f]/gi, function(c){ return b[ parseInt( c,16 ) ] + "+ "; } );
			}
	        r += t;

	    }
	    r += "(ﾟДﾟ)[ﾟoﾟ]) (ﾟΘﾟ)) ('_');";
	    return r;
	},

	//jjencode
	jjencode: function(gv, text) {
	    var r="";
	    var n;
	    var t;
	    var b=[ "___", "__$", "_$_", "_$$", "$__", "$_$", "$$_", "$$$", "$___", "$__$", "$_$_", "$_$$", "$$__", "$$_$", "$$$_", "$$$$", ];
	    var s = "";
	    for (var i = 0; i < text.length; i++){
	        n = text.charCodeAt( i );
	        if (n == 0x22 || n == 0x5c){
	            s += "\\\\\\" + text.charAt( i ).toString(16);
	        } else if( (0x20 <= n && n <= 0x2f) || (0x3A <= n == 0x40) || ( 0x5b <= n && n <= 0x60 ) || ( 0x7b <= n && n <= 0x7f ) ){
	            s += text.charAt( i );
	        } else if( (0x30 <= n && n <= 0x39 ) || (0x61 <= n && n <= 0x66 ) ){
	            if( s ) r += "\"" + s +"\"+";
	            r += gv + "." + b[ n < 0x40 ? n - 0x30 : n - 0x57 ] + "+";
	            s="";
	        } else if( n == 0x6c ){ // 'l'
	            if( s ) r += "\"" + s + "\"+";
	            r += "(![]+\"\")[" + gv + "._$_]+";
	            s = "";
	        } else if( n == 0x6f ){ // 'o'
	            if( s ) r += "\"" + s + "\"+";
	            r += gv + "._$+";
	            s = "";
	        } else if( n == 0x74 ){ // 'u'
	            if( s ) r += "\"" + s + "\"+";
	            r += gv + ".__+";
	            s = "";
	        } else if( n == 0x75 ){ // 'u'
	            if( s ) r += "\"" + s + "\"+";
	            r += gv + "._+";
	            s = "";
	        } else if( n < 128 ){
	            if( s ) r += "\"" + s;
	            else r += "\"";
	            r += "\\\\\"+" + n.toString( 8 ).replace( /[0-7]/g, function(c){ return gv + "."+b[ c ]+"+" } );
	            s = "";
	        } else{
	            if( s ) r += "\"" + s;
	            else r += "\"";
	            r += "\\\\\"+" + gv + "._+" + n.toString(16).replace( /[0-9a-f]/gi, function(c){ return gv + "."+b[parseInt(c,16)]+"+"} );
	            s = "";
	        }
	    }
	    if( s ) r += "\"" + s + "\"+";

	    r = 
	    gv + "=~[];" + 
	    gv + "={___:++" + gv +",$$$$:(![]+\"\")["+gv+"],__$:++"+gv+",$_$_:(![]+\"\")["+gv+"],_$_:++"+
	    gv+",$_$$:({}+\"\")["+gv+"],$$_$:("+gv+"["+gv+"]+\"\")["+gv+"],_$$:++"+gv+",$$$_:(!\"\"+\"\")["+
	    gv+"],$__:++"+gv+",$_$:++"+gv+",$$__:({}+\"\")["+gv+"],$$_:++"+gv+",$$$:++"+gv+",$___:++"+gv+",$__$:++"+gv+"};"+
	    gv+".$_="+
	    "("+gv+".$_="+gv+"+\"\")["+gv+".$_$]+"+
	    "("+gv+"._$="+gv+".$_["+gv+".__$])+"+
	    "("+gv+".$$=("+gv+".$+\"\")["+gv+".__$])+"+
	    "((!"+gv+")+\"\")["+gv+"._$$]+"+
	    "("+gv+".__="+gv+".$_["+gv+".$$_])+"+
	    "("+gv+".$=(!\"\"+\"\")["+gv+".__$])+"+
	    "("+gv+"._=(!\"\"+\"\")["+gv+"._$_])+"+
	    gv+".$_["+gv+".$_$]+"+
	    gv+".__+"+
	    gv+"._$+"+
	    gv+".$;"+
	    gv+".$$="+
	    gv+".$+"+
	    "(!\"\"+\"\")["+gv+"._$$]+"+
	    gv+".__+"+
	    gv+"._+"+
	    gv+".$+"+
	    gv+".$$;"+
	    gv+".$=("+gv+".___)["+gv+".$_]["+gv+".$_];"+
	    gv+".$("+gv+".$("+gv+".$$+\"\\\"\"+" + r + "\"\\\"\")())();";

	    return r;
	}
}

function xor(a, b){return (a === b ? 0 : 1);}
function and(a, b){return a == 1 && b == 1 ? 1 : 0;}
function or(a, b){return (a || b);}

penumbra.cipher.seed = penumbra.cipher.getRandomInt(1000000, 99999999);
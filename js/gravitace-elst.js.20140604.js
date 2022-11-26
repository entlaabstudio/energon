/////////////////////////////////////
/////////////////////////////////////
////                             ////
////     Energenon 3D            ////
////     ------------------      ////
////     Autor: Robert Rajs      ////
////     www.rajs.info           ////
////     3.6.2014                ////
////     verze: 0.9.5.1          ////
////                             ////
/////////////////////////////////////
/////////////////////////////////////

var verze_programu = "0.9.5.1";
$("title").html("Robert Rajs - Energenon 3D v" + verze_programu);

var steny = false;

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
$( window ).resize(function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(renderer.domElement);

var objekty = new Array();
var pocet_objektu = 20;

/* +++ Objekty +++ */
var pozice_x;
var pozice_y;
var pozice_z;
var hmotnost;
var hmotnostni_rozpeti = 7; // nejtezsi objekt muze byt maximalne Nx tezsi nez nejlehci
var rotace_x;
var rotace_y;
var rotace_z;
var cenergie;
var perspectivecam = 45;
var viditelnost_dalka = 0.00000000001;
var viditelnost_blizko = 100000000000;
var interval_animace = 5; // ms
var rozliseni_raw = 10;
var transpozice_cd = 0;
var polarita_cd = 1;
var cislo_energonu = Date.now();
$(".info h1").html("Energon " + cislo_energonu + " (verze " + verze_programu + ")");

var puvodni_hmotnost_cd = 0;
var posun_cd = false;
var kreslit = false;
var malovat = false;
var viditelnost_objektu = true;
var vykreslovani = true;

var zaznamenavani = false;
var record = new Array();
var record_id = 0;
var record_res = 1;
var record_per = 51200;
var record_rezim = 1;
var csv_record = "";
var csv_oddelovac = ";";
var csv_odradkovani = String.fromCharCode(13) + String.fromCharCode(10);
var csv_charset = "utf-8";
var csv_mime = "application/csv";
var record_estimate_1 = 0;
var record_estimate_2 = 0;
var record_estimate_latency = false;
var record_estimate_cache = new Array();
var record_estimate_cache_res = 1800; // délka zpřesňování časového odhadu [vteřin]: nyní 30 minut
var snd = new Array();
var g_engine = 1;

var benchmark = false;
var benchmark_cache = new Array;
var benchmark_sum = 0;
var benchmark_res = 600; // délka zpřesňování časového odhadu [vteřin]: nyní 10 minut
var velikost_objektu = 1;
var velikost_objektu_trs = 0;
var nasobek_pritazlivosti_objektu = 1;
var nasobek_pritazlivosti_objektu_trs = 0;
var transpozice_tihy = 0;

pocet_objektu++;

var rozliseni_raw_i = 1;


objekty[0] = new Array();
objekty[0]["definice"] = new THREE.Mesh(
	new THREE.SphereGeometry(0.2,147,147),
	new THREE.MeshBasicMaterial()
);
objekty[0]["definice"].position.x = 0;
objekty[0]["definice"].position.y = 0;
objekty[0]["definice"].position.z = 0;
objekty[0]["hmotnost"] = puvodni_hmotnost_cd;
objekty[0]["hmotnost_puvodni"] = puvodni_hmotnost_cd;
objekty[0]["rotaceX"] = 0;
objekty[0]["rotaceY"] = 0;
objekty[0]["rotaceZ"] = 0;
objekty[0]["zrychleniX"] = 0;
objekty[0]["zrychleniY"] = 0;
objekty[0]["zrychleniZ"] = 0;
objekty[0]["raw"] = new Array();
objekty[0]["raw"]["pos_x"] = new Array();
objekty[0]["raw"]["pos_y"] = new Array();
objekty[0]["raw"]["pos_z"] = new Array();
objekty[0]["drawcolor"] = 0xffffff;
objekty[0]["pan_lr"] = 0;
objekty[0]["pan_fb"] = 0;
objekty[0]["pan_topbot"] = 0;
scene.add(objekty[0]["definice"]);

var matcolor;
for (var i = 1; i < pocet_objektu; i++) {
	matcolor = Math.random() * 0xffffff;

	pozice_x = (Math.random() - 0.5) * 160;
	pozice_y = (Math.random() - 0.5) * 90;
	pozice_z = (Math.random() - 0.5) * 90;
	hmotnost = Math.pow(hmotnostni_rozpeti,Math.random()) * 50000;
	koeficient_rotace = Math.random() * 2;
	rotace_x = 0.001 * koeficient_rotace;
	rotace_y = 0.01 * koeficient_rotace;
	rotace_z = 0.1 * koeficient_rotace;

	objekty[i] = new Array();
	objekty[i]["definice"] = new THREE.Mesh(
		new THREE.SphereGeometry(hmotnost / 30000,Math.random() * 7,Math.random() * 7),
		new THREE.MeshBasicMaterial({
			color: matcolor,
			wireframe: true
		})
	);
	objekty[i]["definice"].position.x = pozice_x;
	objekty[i]["definice"].position.y = pozice_y;
	objekty[i]["definice"].position.z = pozice_z;
	objekty[i]["hmotnost"] = hmotnost;
	objekty[i]["hmotnost_puvodni"] = hmotnost;
	objekty[i]["rotaceX"] = rotace_x;
	objekty[i]["rotaceY"] = rotace_y;
	objekty[i]["rotaceZ"] = rotace_z;
	objekty[i]["zrychleniX"] = 0;
	objekty[i]["zrychleniY"] = 0;
	objekty[i]["zrychleniZ"] = 0;
	objekty[i]["raw"] = new Array();
	objekty[i]["raw"]["pos_x"] = new Array();
	objekty[i]["raw"]["pos_y"] = new Array();
	objekty[i]["raw"]["pos_z"] = new Array();
	objekty[i]["drawcolor"] = matcolor;
	objekty[i]["pan_lr"] = Math.random();
	objekty[i]["pan_fb"] = Math.random();
	objekty[i]["pan_topbot"] = Math.random();
	scene.add(objekty[i]["definice"]);
}

var camera = new THREE.PerspectiveCamera(perspectivecam, window.innerWidth/window.innerHeight, viditelnost_blizko, viditelnost_dalka);

camera.position.z = 1500;
camera.position.x = 0;
camera.position.y = 0;
var kamera = new Array();
kamera["x"] = 0;
kamera["y"] = 0;
kamera["z"] = 250;
kamera["rotation_x"] = 0;
kamera["rotation_y"] = 0;
kamera["relativni_cd"] = true;
kamera["rychlost_posuvu"] = 0;

var g_koeficient = 1;
var g_koeficient_trs = 0;
var pauza = false;
var cerna_dira = true;

var odpuzovani = 1;
var real_g_koeficient = 0.001;
var real_g_koeficient_trs = 0;
var velikost_mistnosti = 200;
var velikost_mistnosti_trn = 0;
var kamera_nasobek = kamera_nasobek = (Math.pow(2,(kamera["rychlost_posuvu"] / 12)));

$( "body" ).on( "keydown", function( event ) {
	if (!benchmark) {
		// šipka nahoru
		if (event.which == 38) {
			kamera["y"] += kamera_nasobek * 5;
		}
		// šipka dolů
		if (event.which == 40) {
			kamera["y"] -= kamera_nasobek * 5;
		}
		// šipka doleva
		if (event.which == 37) {
			kamera["x"] -= kamera_nasobek * 5;
		}
		// šipka doprava
		if (event.which == 39) {
			kamera["x"] += kamera_nasobek * 5;
		}
		// plus
		if (event.which == 107) {
			kamera["z"] += kamera_nasobek * 5;
		}
		// minus
		if (event.which == 109) {
			kamera["z"] -= kamera_nasobek * 5;
		}

		// space
		if (event.which == 32) {
			if (steny) {
				if (benchmark == false) {
					steny = false;
				}
			} else {
				steny = true;
			}
		}
		// "a"
		if (event.which == 65) {
			kamera["rotation_y"] += .03;
		}
		// "d"
		if (event.which == 68) {
			kamera["rotation_y"] -= .03;
		}
		// "w"
		if (event.which == 87) {
			kamera["rotation_x"] += .03;
		}
		// "s"
		if (event.which == 83) {
			kamera["rotation_x"] -= .03;
		}
		// "t"
		if (event.which == 84) {
			velikost_objektu_trs += 1;
			velikost_objektu = (Math.pow(2,(velikost_objektu_trs / 12)));
		}
		// "g"
		if (event.which == 71) {
			velikost_objektu_trs -= 1;
			velikost_objektu = (Math.pow(2,(velikost_objektu_trs / 12)));
		}
		// "r"
		if (event.which == 82) {
			g_koeficient_trs += 1;
			g_koeficient = (Math.pow(2,(g_koeficient_trs / 12)));
		}
		// "f"
		if (event.which == 70) {
			g_koeficient_trs -= 1;
			g_koeficient = (Math.pow(2,(g_koeficient_trs / 12)));
		}
		// "ctrl"
		if (event.which == 17) {
			for (var key in objekty) {
				objekty[key]["zrychleniX"] = 0;
				objekty[key]["zrychleniY"] = 0;
				objekty[key]["zrychleniZ"] = 0;
			}
		}
		// "shift"
		if (event.which == 16 && benchmark == false) {
			if (!pauza) {
				pauza = true;
			} else {
				pauza = false;
			}
		}
		// "esc"
		if (event.which == 27) {
			if (objekty[0]["hmotnost"] == 0) {
				objekty[0]["hmotnost"] = puvodni_hmotnost_cd;
			} else {
				puvodni_hmotnost_cd = objekty[0]["hmotnost"];
				objekty[0]["hmotnost"] = 0;
			}
		}
		// "enter"
		if (event.which == 13) {
			if (polarita_cd == -1) {
				polarita_cd = 1;
			} else {
				polarita_cd = -1;
			}
			objekty[0]["hmotnost"] *= -1;
		}
		// "i"
		if (event.which == 73) {
			if (odpuzovani == -1) {
				odpuzovani = 1;
			} else {
				odpuzovani = -1;
			}
		}
		// "p"
		if (event.which == 80 && benchmark == false) {
			velikost_mistnosti_trn += 1;
			velikost_mistnosti = 40 * (Math.pow(2,(velikost_mistnosti_trn)));
		}
		// "l"
		if (event.which == 76 && benchmark == false) {
			velikost_mistnosti_trn -= 1;
			velikost_mistnosti = 40 * (Math.pow(2,(velikost_mistnosti_trn)));
		}
		// "*"
		if (event.which == 106) {
			if (posun_cd) {
				posun_cd = false;
			} else {
				posun_cd = true;
			}
		}
		// "o"
		if (event.which == 79) {
			real_g_koeficient_trs += 1;
			real_g_koeficient = 0.001 * (Math.pow(2,(real_g_koeficient_trs / 12)));
		}
		// "k"
		if (event.which == 75) {
			real_g_koeficient_trs -= 1;
			real_g_koeficient = 0.001 * (Math.pow(2,(real_g_koeficient_trs / 12)));
		}
		// "0"
		if (event.which == 96) {
			objekty[0]["definice"].position.x += (0 - objekty[0]["definice"].position.x) / 10;
			objekty[0]["definice"].position.y += (0 - objekty[0]["definice"].position.y) / 10;
			objekty[0]["definice"].position.z += (0 - objekty[0]["definice"].position.z) / 10;
		}
		// "5"
		if (event.which == 101) {
			if (kamera["relativni_cd"]) {
				kamera["relativni_cd"] = false;
			} else {
				kamera["relativni_cd"] = true;
			}
		}
		// "1"
		if (event.which == 97) {
			kamera["rotation_x"] = 0;
			kamera["rotation_y"] = 0;
		}
		// "2"
		if (event.which == 98) {
			kamera["x"] = 0;
			kamera["y"] = 0;
			kamera["z"] = 0;
		}
		// "x"
		if (event.which == 88) {
			perspectivecam += 1;
			kamera["z"] -= 50;
		}
		// "k"
		if (event.which == 67 && perspectivecam >= 1) {
			perspectivecam -= 1;
			kamera["z"] += 50;
		}
		// "v"
		if (event.which == 86) {
			if ($("div.info").css("display") == "block") {
				$("div.info, div.info2").css("display","none");
			} else {
				$("div.info, div.info2").css("display","block");
			}
		}
		// "."
		if (event.which == 190) {
			if (malovat) {
				malovat = false;
			} else {
				malovat = true;
			}
		}
		// ","
		if (event.which == 188 || event.which == 110) {
			if (kreslit) {
				kreslit = false;
			} else {
				kreslit = true;
			}
		}
		// "3"
		if (event.which == 99) {
			if (viditelnost_objektu) {
				viditelnost_objektu = false;
			} else {
				viditelnost_objektu = true;
			}
		}
		// "7"
		if (event.which == 103) {
			kamera["rychlost_posuvu"] -= 1;
			kamera_nasobek = (Math.pow(2,(kamera["rychlost_posuvu"] / 12)));
			//kamera_nasobek = kamera_nasobek_vypocet(kamera["rychlost_posuvu"]);
		}
		// "8" 
		if (event.which == 104) {
			kamera["rychlost_posuvu"] += 1;
			kamera_nasobek = (Math.pow(2,(kamera["rychlost_posuvu"] / 12)));
			//kamera_nasobek = kamera_nasobek_vypocet(kamera["rychlost_posuvu"]);
		}
		// "6"
		if (event.which == 102 && benchmark == false) {
			if (zaznamenavani) {
				zaznamenavani = false;
			} else {
				record_vymazat();
				zaznamenavani = true;
			}
		}
		// "4"
		if (event.which == 100 && benchmark == false) {
			uloz_zaznam();
		}
		// "b"
		if (event.which == 66 && record_res > 1) {
			record_vymazat();
			record_res -= 1;
		}
		// "n"
		if (event.which == 78) {
			record_vymazat();
			record_res += 1;
		}
		// "h"
		if (event.which == 72 && record_per > 512) {
			record_per -= 512;
		}
		// "j"
		if (event.which == 74) {
			record_per += 512;
		}
		// "u"
		if (event.which == 85) {
			record_vymazat();
			if (record_rezim == 6) {
				record_rezim = 1;
			} else {
				record_rezim++;
			}
		}
		// "m"
		if (event.which == 77) {
			if (vykreslovani == true) {
				vykreslovani = false;
				interval_animace = 0;
			} else {
				if (!benchmark) {
					vykreslovani = true;
					interval_animace = 5;
				}
			}
		}
		// "pg up"
		if (event.which == 33) {
			transpozice_cd += 1;
			objekty[0]["hmotnost"] = polarita_cd * (440 * (Math.pow(2,(transpozice_cd / 12))));
		}
		// "pg dn"
		if (event.which == 34) {
			transpozice_cd -= 1;
			objekty[0]["hmotnost"] = polarita_cd * (440 * (Math.pow(2,(transpozice_cd / 12))));
		}
		// "home"
		if (event.which == 36) {
			transpozice_cd += 12;
			objekty[0]["hmotnost"] = polarita_cd * (440 * (Math.pow(2,(transpozice_cd / 12))));
		}
		// "end"
		if (event.which == 35) {
			transpozice_cd -= 12;
			objekty[0]["hmotnost"] = polarita_cd * (440 * (Math.pow(2,(transpozice_cd / 12))));
		}
		// "+"
		if (event.which == 49) {
			transpozice_tihy -= 1;
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * (Math.pow(Math.pow(2,(transpozice_tihy / 12)),(objekty[key]["hmotnost_puvodni"] / 10000)));
				}
			}
		}
		// "ě"
		if (event.which == 50) {
			transpozice_tihy += 1;
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * (Math.pow(Math.pow(2,(transpozice_tihy / 12)),(objekty[key]["hmotnost_puvodni"] / 10000)));
				}
			}
		}
		// "č"
		if (event.which == 52) {
			nasobek_pritazlivosti_objektu_trs -= 1;
			nasobek_pritazlivosti_objektu = Math.pow(2,(nasobek_pritazlivosti_objektu_trs / 12));
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * nasobek_pritazlivosti_objektu;
				}
			}
		}
		// "ř"
		if (event.which == 53) {
			nasobek_pritazlivosti_objektu_trs += 1;
			nasobek_pritazlivosti_objektu = Math.pow(2,(nasobek_pritazlivosti_objektu_trs / 12));
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * nasobek_pritazlivosti_objektu;
				}
			}
		}
		// "ž"
		if (event.which == 54) {
			nasobek_pritazlivosti_objektu_trs -= 12;
			nasobek_pritazlivosti_objektu = Math.pow(2,(nasobek_pritazlivosti_objektu_trs / 12));
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * nasobek_pritazlivosti_objektu;
				}
			}
		}
		// "ý"
		if (event.which == 55) {
			nasobek_pritazlivosti_objektu_trs += 12;
			nasobek_pritazlivosti_objektu = Math.pow(2,(nasobek_pritazlivosti_objektu_trs / 12));
			for (var key in objekty) {
				if (key != 0) {
					objekty[key]["hmotnost"] = objekty[key]["hmotnost_puvodni"] * nasobek_pritazlivosti_objektu;
				}
			}
		}
		// "ě"
		if (event.which == 51) {
			bit_clip = 0;
		}
		// "á"
		if (event.which == 56) {
			if (g_engine == 2) {
				g_engine = 1;
			} else {
				g_engine++;
			}
		}
	}
	// "q"
	if (event.which == 81) {
		if (benchmark) {
			clearInterval(benchmark_interval);
			benchmark = false;
			vykreslovani = true;
		} else {
			zaznamenavani = false;
			record_vymazat();
			vykreslovani = false;
			benchmark_cache = new Array();
			velikost_mistnosti = 400;
			steny = true;
			interval_animace = 0;
			benchmark = true;
			transpozice_cd = 0;
			$("#info_zaznam_odhad").html("");
			$("#info_zaznam_odhad_per_cas").html("");
			objekty[0]["hmotnost"] = polarita_cd * (440 * (Math.pow(2,(transpozice_cd / 12))));
			benchmark_interval = setInterval(cpu_benchmark,1000);
		}
	}
});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function uloz_zaznam() {
	// pauza = true;
	
	if (record_rezim == 1) {
		var blob = new Blob([csv_record], {
			type: csv_mime + ";charset=" + csv_charset + ";",
		});
		saveAs(blob, "energonon-data-" + cislo_energonu + "-" + Date.now() + ".csv");
	}
	
	if (record_rezim == 2) {
		var zip = new JSZip();
		var cas = Date.now();
		var data = new Array();
		
		for (var key in objekty) {
			data[key] = new Array();
			//console.log(objekty[key]["raw"]["pos_x"]);

			data[key]["x"] = new Uint8Array(objekty[key]["raw"]["pos_x"]);
			data[key]["y"] = new Uint8Array(objekty[key]["raw"]["pos_y"]);
			data[key]["z"] = new Uint8Array(objekty[key]["raw"]["pos_z"]);

			zip.file("energonon-data-" + cislo_energonu + "-" + cas + "-object-" + ((key < 10) ? "0" + key : key) + "-posX-" + (record_res * 8) + "bit.snd", data[key]["x"]);
			zip.file("energonon-data-" + cislo_energonu + "-" + cas + "-object-" + ((key < 10) ? "0" + key : key) + "-posY-" + (record_res * 8) + "bit.snd", data[key]["y"]);
			zip.file("energonon-data-" + cislo_energonu + "-" + cas + "-object-" + ((key < 10) ? "0" + key : key) + "-posZ-" + (record_res * 8) + "bit.snd", data[key]["z"]);
		}
		var content = zip.generate({type:"blob"});
		saveAs(content, "energonon-data-" + cislo_energonu + "-" + cas + "-" + (record_res * 8) + "bit" + ".snd.zip");
	}

	if (record_rezim == 3) {
		var cas = Date.now();
		var data = new Uint8Array(snd);
		var blob = new Blob([data], {
			type: "audio/basic;",
		});
		saveAs(blob, "energonon-data-" + cislo_energonu + "-" + cas + "-" + (record_res * 8) + "bit-mono" + ".snd");
	}

	if (record_rezim == 4) {
		var cas = Date.now();
		var data = new Uint8Array(snd);
		var blob = new Blob([data], {
			type: "audio/basic;",
		});
		saveAs(blob, "energonon-data-" + cislo_energonu + "-" + cas + "-" + (record_res * 8) + "bit-stereo" + ".snd");
	}

	if (record_rezim == 5) {
		var cas = Date.now();
		var data = new Uint8Array(snd);
		var blob = new Blob([data], {
			type: "audio/basic;",
		});
		saveAs(blob, "energonon-data-" + cislo_energonu + "-" + cas + "-" + (record_res * 8) + "bit-quattro" + ".snd");
	}

	if (record_rezim == 6) {
		var cas = Date.now();
		var data = new Uint8Array(snd);
		var blob = new Blob([data], {
			type: "audio/basic;",
		});
		saveAs(blob, "energonon-data-" + cislo_energonu + "-" + cas + "-" + (record_res * 8) + "bit-6ch" + ".snd");
	}
	
	record_vymazat();
}

function kamera_nasobek_vypocet(vstup) {
	return Math.log(vstup) * vstup * 5;
}


var stopa = new Array();
var stopa_id = 0;
var geometrie_stopy = new THREE.SphereGeometry(0.2,0,0);
var material_stopy = new THREE.MeshNormalMaterial();

var record_res_step = 1;
var bit_clip = 0;

for (var key in objekty) {
	if (Math.abs(objekty[key]["definice"].position.x * 2) > bit_clip) {
		bit_clip = Math.abs(objekty[key]["definice"].position.x * 2);
	}
	if (Math.abs(objekty[key]["definice"].position.y * 2) > bit_clip) {
		bit_clip = Math.abs(objekty[key]["definice"].position.y * 2);
	}
	if (Math.abs(objekty[key]["definice"].position.z * 2) > bit_clip) {
		bit_clip = Math.abs(objekty[key]["definice"].position.z * 2);
	}		
}

var line_material = new THREE.LineBasicMaterial({
	color: 0xff0000
});
var render = function () {


	var info_nejtezsi_objekt = 0;
	var info_nejlehci_objekt = Infinity;

	for (var i = 1; i < objekty.length; i++) {
		if (objekty[i]["hmotnost"] > info_nejtezsi_objekt) {
			info_nejtezsi_objekt = objekty[i]["hmotnost"];
		}
		if (objekty[i]["hmotnost"] < info_nejlehci_objekt) {
			info_nejlehci_objekt = objekty[i]["hmotnost"];
		}
	}
	$("#info_nejtezsi_objekt").html(Math.round(info_nejtezsi_objekt));
	$("#info_nejlehci_objekt").html(Math.round(info_nejlehci_objekt));

	var line_geometry = new THREE.Geometry();

	camera.projectionMatrix.makePerspective( perspectivecam, window.innerWidth / window.innerHeight,  viditelnost_blizko, viditelnost_dalka )
	//requestAnimationFrame(render);


	if (!pauza) {
		/* +++ Nahrávání SND +++ */
		if (record_rezim == 3) {
			snd_raw_sum = 0;
			for (var i = 1; i < objekty.length; i++) {
				snd_raw_sum += objekty[i]["definice"].position.x;
				snd_raw_sum += objekty[i]["definice"].position.y;
				snd_raw_sum += objekty[i]["definice"].position.z;
			}
			if (zaznamenavani) {
				var snd_raw_bytes = raw_bytes(snd_raw_sum);

				if (rozliseni_raw_i == rozliseni_raw) {
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytes["hodnota"][i];
					}
				}
				record_id++;
				if ((objem_exportnich_dat() / 1024) >= record_per) {
					uloz_zaznam();
				}				
			}
		}
		if (record_rezim == 4) {
			snd_raw_sum_L = 0;
			snd_raw_sum_R = 0;
			for (var i = 1; i < objekty.length; i++) {
				var pan_l = 1 - objekty[i]["pan_lr"];
				var pan_r = objekty[i]["pan_lr"];
				snd_raw_sum_L += objekty[i]["definice"].position.x * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.y * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.z * pan_l;
				snd_raw_sum_R += objekty[i]["definice"].position.x * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.y * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.z * pan_r;
			}
			if (snd_raw_sum_L > snd_raw_sum_R) {
				snd_raw_sum = snd_raw_sum_L;
			} else {
				snd_raw_sum = snd_raw_sum_R;
			}
			if (zaznamenavani) {
				var snd_raw_bytesL = raw_bytes(snd_raw_sum_L);
				var snd_raw_bytesR = raw_bytes(snd_raw_sum_R);

				if (rozliseni_raw_i == rozliseni_raw) {
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesL["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesR["hodnota"][i];
					}
				}
				record_id++;
				if ((objem_exportnich_dat() / 1024) >= record_per) {
					uloz_zaznam();
				}				
			}
		}
		if (record_rezim == 5) {
			snd_raw_sum_L = 0;
			snd_raw_sum_R = 0;
			snd_raw_sum_F = 0;
			snd_raw_sum_B = 0;
			for (var i = 1; i < objekty.length; i++) {
				var pan_l = 1 - objekty[i]["pan_lr"];
				var pan_r = objekty[i]["pan_lr"];
				var pan_f = 1 - objekty[i]["pan_fb"];
				var pan_b = objekty[i]["pan_fb"];
				snd_raw_sum_L += objekty[i]["definice"].position.x * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.y * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.z * pan_l;
				snd_raw_sum_R += objekty[i]["definice"].position.x * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.y * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.z * pan_r;
				snd_raw_sum_F += objekty[i]["definice"].position.x * pan_f;
				snd_raw_sum_F += objekty[i]["definice"].position.y * pan_f;
				snd_raw_sum_F += objekty[i]["definice"].position.z * pan_f;
				snd_raw_sum_B += objekty[i]["definice"].position.x * pan_b;
				snd_raw_sum_B += objekty[i]["definice"].position.y * pan_b;
				snd_raw_sum_B += objekty[i]["definice"].position.z * pan_b;
			}
			if (snd_raw_sum_L > snd_raw_sum_R) {
				snd_raw_sum1 = snd_raw_sum_L;
			} else {
				snd_raw_sum1 = snd_raw_sum_R;
			}
			if (snd_raw_sum_F > snd_raw_sum_B) {
				snd_raw_sum2 = snd_raw_sum_F;
			} else {
				snd_raw_sum2 = snd_raw_sum_B;
			}
			if (snd_raw_sum1 > snd_raw_sum2) {
				snd_raw_sum = snd_raw_sum1;
			} else {
				snd_raw_sum = snd_raw_sum2;
			}
			if (zaznamenavani) {
				var snd_raw_bytesL = raw_bytes(snd_raw_sum_L);
				var snd_raw_bytesR = raw_bytes(snd_raw_sum_R);
				var snd_raw_bytesF = raw_bytes(snd_raw_sum_F);
				var snd_raw_bytesB = raw_bytes(snd_raw_sum_B);

				if (rozliseni_raw_i == rozliseni_raw) {
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesL["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesR["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesF["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesB["hodnota"][i];
					}
				}
				record_id++;
				if ((objem_exportnich_dat() / 1024) >= record_per) {
					uloz_zaznam();
				}				
			}
		}
		if (record_rezim == 6) {
			snd_raw_sum_L = 0;
			snd_raw_sum_R = 0;
			snd_raw_sum_F = 0;
			snd_raw_sum_B = 0;
			snd_raw_sum_TOP = 0;
			snd_raw_sum_BOT = 0;
			for (var i = 1; i < objekty.length; i++) {
				var pan_l = 1 - objekty[i]["pan_lr"];
				var pan_r = objekty[i]["pan_lr"];
				var pan_f = 1 - objekty[i]["pan_fb"];
				var pan_b = objekty[i]["pan_fb"];
				var pan_top = 1 - objekty[i]["pan_topbot"];
				var pan_bot = objekty[i]["pan_topbot"];
				snd_raw_sum_L += objekty[i]["definice"].position.x * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.y * pan_l;
				snd_raw_sum_L += objekty[i]["definice"].position.z * pan_l;
				snd_raw_sum_R += objekty[i]["definice"].position.x * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.y * pan_r;
				snd_raw_sum_R += objekty[i]["definice"].position.z * pan_r;
				snd_raw_sum_F += objekty[i]["definice"].position.x * pan_f;
				snd_raw_sum_F += objekty[i]["definice"].position.y * pan_f;
				snd_raw_sum_F += objekty[i]["definice"].position.z * pan_f;
				snd_raw_sum_B += objekty[i]["definice"].position.x * pan_b;
				snd_raw_sum_B += objekty[i]["definice"].position.y * pan_b;
				snd_raw_sum_B += objekty[i]["definice"].position.z * pan_b;
				snd_raw_sum_TOP += objekty[i]["definice"].position.x * pan_top;
				snd_raw_sum_TOP += objekty[i]["definice"].position.y * pan_top;
				snd_raw_sum_TOP += objekty[i]["definice"].position.z * pan_top;
				snd_raw_sum_BOT += objekty[i]["definice"].position.x * pan_bot;
				snd_raw_sum_BOT += objekty[i]["definice"].position.y * pan_bot;
				snd_raw_sum_BOT += objekty[i]["definice"].position.z * pan_bot;
			}
			if (snd_raw_sum_L > snd_raw_sum_R) {
				snd_raw_sum1 = snd_raw_sum_L;
			} else {
				snd_raw_sum1 = snd_raw_sum_R;
			}
			if (snd_raw_sum_F > snd_raw_sum_B) {
				snd_raw_sum2 = snd_raw_sum_F;
			} else {
				snd_raw_sum2 = snd_raw_sum_B;
			}
			if (snd_raw_sum_TOP > snd_raw_sum_BOT) {
				snd_raw_sum3 = snd_raw_sum_TOP;
			} else {
				snd_raw_sum3 = snd_raw_sum_BOT;
			}
			if (snd_raw_sum1 > snd_raw_sum2) {
				snd_raw_sum01 = snd_raw_sum1;
			} else {
				snd_raw_sum01 = snd_raw_sum2;
			}
			if (snd_raw_sum01 > snd_raw_sum3) {
				snd_raw_sum = snd_raw_sum01;
			} else {
				snd_raw_sum = snd_raw_sum3;
			}
			if (zaznamenavani) {
				var snd_raw_bytesL = raw_bytes(snd_raw_sum_L);
				var snd_raw_bytesR = raw_bytes(snd_raw_sum_R);
				var snd_raw_bytesF = raw_bytes(snd_raw_sum_F);
				var snd_raw_bytesB = raw_bytes(snd_raw_sum_B);
				var snd_raw_bytesTOP = raw_bytes(snd_raw_sum_TOP);
				var snd_raw_bytesBOT = raw_bytes(snd_raw_sum_BOT);

				if (rozliseni_raw_i == rozliseni_raw) {
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesL["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesR["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesF["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesB["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesTOP["hodnota"][i];
					}
					for (var i = 1; i <= record_res; i++) {
						snd[snd.length] = snd_raw_bytesBOT["hodnota"][i];
					}
				}
				record_id++;
				if ((objem_exportnich_dat() / 1024) >= record_per) {
					uloz_zaznam();
				}				
			}
		}

		/* --- Nahrávání SND --- */
		cenergie = 0;
		for (var key in objekty) {
 			objekty[key]["definice"].scale.x = objekty[key]["definice"].scale.y = objekty[key]["definice"].scale.z = velikost_objektu;
			objekty[key]["definice"].visible = viditelnost_objektu;
			for (var key2 in objekty) {
				if (key == 0 && objekty[0]["hmotnost"] == 0) {
				} else {
					if (key2 != key) {
						objekty[key]["vzdalenost"] = Math.pow(Math.pow(objekty[key]["definice"].position.x - objekty[key2]["definice"].position.x,2) + Math.pow(objekty[key]["definice"].position.y - objekty[key2]["definice"].position.y,2) + Math.pow(objekty[key]["definice"].position.z - objekty[key2]["definice"].position.z,2),(1/3));
						objekty[key]["vzdalenostX"] = Math.abs(objekty[key]["definice"].position.x - objekty[key2]["definice"].position.x);
						objekty[key]["vzdalenostY"] = Math.abs(objekty[key]["definice"].position.y - objekty[key2]["definice"].position.y);
						objekty[key]["vzdalenostZ"] = Math.abs(objekty[key]["definice"].position.z - objekty[key2]["definice"].position.z);

						if (g_engine == 1) {
							if (objekty[key2]["definice"].position.x > objekty[key]["definice"].position.x) {
								objekty[key]["zrychleniX"] += odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}
							if (objekty[key2]["definice"].position.x < objekty[key]["definice"].position.x) {
								objekty[key]["zrychleniX"] -= odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}

							if (objekty[key2]["definice"].position.y > objekty[key]["definice"].position.y) {
								objekty[key]["zrychleniY"] += odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}
							if (objekty[key2]["definice"].position.y < objekty[key]["definice"].position.y) {
								objekty[key]["zrychleniY"] -= odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}

							if (objekty[key2]["definice"].position.z > objekty[key]["definice"].position.z) {
								objekty[key]["zrychleniZ"] += odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}
							if (objekty[key2]["definice"].position.z < objekty[key]["definice"].position.z) {
								objekty[key]["zrychleniZ"] -= odpuzovani * (real_g_koeficient / objekty[key]["vzdalenost"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"]);
							}
						}

						if (g_engine == 2) {
							if (objekty[key2]["definice"].position.x > objekty[key]["definice"].position.x) {
								objekty[key]["zrychleniX"] += odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostX"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}
							if (objekty[key2]["definice"].position.x < objekty[key]["definice"].position.x) {
								objekty[key]["zrychleniX"] -= odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostX"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}

							if (objekty[key2]["definice"].position.y > objekty[key]["definice"].position.y) {
								objekty[key]["zrychleniY"] += odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostY"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}
							if (objekty[key2]["definice"].position.y < objekty[key]["definice"].position.y) {
								objekty[key]["zrychleniY"] -= odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostY"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}

							if (objekty[key2]["definice"].position.z > objekty[key]["definice"].position.z) {
								objekty[key]["zrychleniZ"] += odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostZ"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}
							if (objekty[key2]["definice"].position.z < objekty[key]["definice"].position.z) {
								objekty[key]["zrychleniZ"] -= odpuzovani * real_g_koeficient * .001 * objekty[key]["vzdalenostZ"] * (objekty[key]["hmotnost"] + objekty[key2]["hmotnost"]) / objekty[key]["hmotnost"];
							}
						}
					}
				}
				if (record_rezim < 3) {
					if (Math.abs(objekty[key2]["definice"].position.x * 2) > bit_clip) {
						bit_clip = Math.abs(objekty[key2]["definice"].position.x * 2);
					}
					if (Math.abs(objekty[key2]["definice"].position.y * 2) > bit_clip) {
						bit_clip = Math.abs(objekty[key2]["definice"].position.y * 2);
					}
					if (Math.abs(objekty[key2]["definice"].position.z * 2) > bit_clip) {
						bit_clip = Math.abs(objekty[key2]["definice"].position.z * 2);
					}
				} else {
					if (snd_raw_sum * 2 > bit_clip) {
						bit_clip = Math.abs(snd_raw_sum * 2);
					}
				}
			}

			if (steny) {

				if (objekty[key]["definice"].position.x > (velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.x = (velikost_mistnosti / 2)
				}
				if (objekty[key]["definice"].position.y > (velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.y = (velikost_mistnosti / 2)
				}
				if (objekty[key]["definice"].position.z > (velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.z = (velikost_mistnosti / 2)
				}

				if (objekty[key]["definice"].position.x < (-1 * velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.x = (-1 * velikost_mistnosti / 2)
				}
				if (objekty[key]["definice"].position.y < (-1 * velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.y = (-1 * velikost_mistnosti / 2)
				}
				if (objekty[key]["definice"].position.z < (-1 * velikost_mistnosti / 2)) {
					objekty[key]["definice"].position.z = (-1 * velikost_mistnosti / 2)
				}

				if (
					(objekty[key]["definice"].position.x > (velikost_mistnosti / 2)) ||
					(objekty[key]["definice"].position.x < (-1 * velikost_mistnosti / 2))
				) {
					objekty[key]["zrychleniX"] *= -1;
				}
				if (
					(objekty[key]["definice"].position.y > (velikost_mistnosti / 2)) ||
					(objekty[key]["definice"].position.y < (-1 * velikost_mistnosti / 2))
				) {
					objekty[key]["zrychleniY"] *= -1;
				}
				if (
					(objekty[key]["definice"].position.z > (velikost_mistnosti / 2)) ||
					(objekty[key]["definice"].position.z < (-1 * velikost_mistnosti / 2))
				) {
					objekty[key]["zrychleniZ"] *= -1;
				}
			}

			/* +++ Posun objektů +++ */
			if (key != 0 || posun_cd == true) {
				if (kreslit) {
					var matlinecolor = (objekty[key]["drawcolor"]).toString(16);
					
					line_material.color.set(123456);
					line_geometry.vertices.push(new THREE.Vector3(
						objekty[key]["definice"].position.x,
						objekty[key]["definice"].position.y,
						objekty[key]["definice"].position.z
					));
				}
				objekty[key]["definice"].position.x += objekty[key]["zrychleniX"] * g_koeficient;
				objekty[key]["definice"].position.y += objekty[key]["zrychleniY"] * g_koeficient;
				objekty[key]["definice"].position.z += objekty[key]["zrychleniZ"] * g_koeficient;
				objekty[key]["definice"].rotation.x += objekty[key]["rotaceX"] * g_koeficient;
				objekty[key]["definice"].rotation.y += objekty[key]["rotaceY"] * g_koeficient;
				objekty[key]["definice"].rotation.z += objekty[key]["rotaceZ"] * g_koeficient;
				if (kreslit) {
					line_geometry.vertices.push(new THREE.Vector3(
						objekty[key]["definice"].position.x,
						objekty[key]["definice"].position.y,
						objekty[key]["definice"].position.z
					));
				}
			}
			
			if (kreslit) {
				line = new THREE.Line(line_geometry, line_material, THREE.LinePieces);
				scene.add(line);
			}
			if (malovat) {
				stopa[stopa_id] = new THREE.Mesh(geometrie_stopy, material_stopy);
				stopa[stopa_id].position.x = objekty[key]["definice"].position.x;
				stopa[stopa_id].position.y = objekty[key]["definice"].position.y;
				stopa[stopa_id].position.z = objekty[key]["definice"].position.z;
			}

			scene.add(stopa[stopa_id]);

			/* +++ Nahrávání +++ */
			if (zaznamenavani && record_res_step == 1 && record_rezim == 1) {
				if (csv_record.length == 0) {
					csv_record +=
						"id_rec" + csv_oddelovac +
						"id_castice" + csv_oddelovac +
						"hmotnost_castice" + csv_oddelovac +
						"castice_pozice_X" + csv_oddelovac +
						"castice_pozice_Y" + csv_oddelovac +
						"castice_pozice_Z" + csv_oddelovac +
						"castice_rotace_X" + csv_oddelovac +
						"castice_rotace_Y" + csv_oddelovac +
						"castice_rotace_Z" + csv_oddelovac +
						"castice_slozitost" + csv_oddelovac +
						"kamera_pozice_X" + csv_oddelovac +
						"kamera_pozice_Y" + csv_oddelovac +
						"kamera_pozice_Z" + csv_oddelovac +
						"kamera_rotace_X" + csv_oddelovac +
						"kamera_rotace_Y" + csv_oddelovac +
						"kamera_rotace_Z" + csv_oddelovac +
						"kamera_relativni_cd" + csv_oddelovac +
						"kamera_rychlost" + csv_oddelovac +
						"kamera_ubeznik" + csv_oddelovac +
						"kreslit" + csv_oddelovac +
						"malovat" + csv_oddelovac +
						"skok_zrychleni" + csv_oddelovac +
						"real_zrychleni" + csv_oddelovac +
						"rezim_pritazlivosti" + csv_oddelovac +
						"velikost_mistnosti" + csv_oddelovac +
						"rezim_mistnosti" + csv_oddelovac +
						"energie_vesmiru" + csv_oddelovac +
						"viditelnost_objektu" + csv_oddelovac +
						"rozliseni_zaznamu" + csv_oddelovac +
						"cas_zaznamu" +
						csv_odradkovani
					;	
				}
				csv_record +=
					record_id + csv_oddelovac +
					key + csv_oddelovac +
					objekty[key]["hmotnost"] + csv_oddelovac +
					objekty[key]["definice"].position.x + csv_oddelovac +
					objekty[key]["definice"].position.y + csv_oddelovac +
					objekty[key]["definice"].position.z + csv_oddelovac +
					objekty[key]["definice"].rotation.x + csv_oddelovac +
					objekty[key]["definice"].rotation.y + csv_oddelovac +
					objekty[key]["definice"].rotation.z + csv_oddelovac +
					objekty[key]["definice"].geometry.boundingSphere.radius + csv_oddelovac +
					camera.position.x + csv_oddelovac +
					camera.position.y + csv_oddelovac +
					camera.position.z + csv_oddelovac +
					camera.rotation.x + csv_oddelovac +
					camera.rotation.y + csv_oddelovac +
					camera.rotation.z + csv_oddelovac +
					kamera["relativni_cd"] + csv_oddelovac +
					kamera_nasobek + csv_oddelovac +
					perspectivecam + csv_oddelovac +
					kreslit + csv_oddelovac +
					malovat + csv_oddelovac +
					g_koeficient + csv_oddelovac +
					real_g_koeficient + csv_oddelovac +
					odpuzovani + csv_oddelovac +
					velikost_mistnosti + csv_oddelovac +
					steny + csv_oddelovac +
					((key == (objekty.length - 1)) ? cenergie : "N/A") + csv_oddelovac +
					viditelnost_objektu + csv_oddelovac +
					"1:" + record_res + csv_oddelovac +
					Date.now() +
					csv_odradkovani
				;

				record_id++;
				if ((csv_record.length / 1024) >= record_per) {
					uloz_zaznam();
				}
			}

			if (zaznamenavani && record_rezim == 2) {
				var x_raw_bytes = raw_bytes(objekty[key]["definice"].position.x);
				var y_raw_bytes = raw_bytes(objekty[key]["definice"].position.y);
				var z_raw_bytes = raw_bytes(objekty[key]["definice"].position.z);

				if (rozliseni_raw_i == rozliseni_raw) {
					for (var i = 1; i <= record_res; i++) {
						objekty[key]["raw"]["pos_x"][objekty[key]["raw"]["pos_x"].length] = x_raw_bytes["hodnota"][i];
						objekty[key]["raw"]["pos_y"][objekty[key]["raw"]["pos_y"].length] = y_raw_bytes["hodnota"][i];
						objekty[key]["raw"]["pos_z"][objekty[key]["raw"]["pos_z"].length] = z_raw_bytes["hodnota"][i];
					}
				}

				record_id++;
				if ((objem_exportnich_dat() / 1024) >= record_per) {
					uloz_zaznam();
				}
			}

			/* --- Nahrávání --- */
			
			stopa_id++;

			if (benchmark) {
				benchmark_sum++;
			}

			/* --- Posun objektů --- */

			/* +++ Výpočet celkové energie +++ */
			cenergie += (Math.abs(objekty[key]["zrychleniX"] * g_koeficient) + Math.abs(objekty[key]["zrychleniY"] * g_koeficient) + Math.abs(objekty[key]["zrychleniZ"] * g_koeficient)) / 3;
			/* --- Výpočet celkové energie --- */

		}
		if (record_res_step < record_res) {
			record_res_step++;
		} else {
			record_res_step = 1;
		}

		
	} else {
		record_estimate_2 = record_estimate_1;
	}
	if (zaznamenavani && (record_rezim >= 2 && record_rezim < Infinity)) {
		if (rozliseni_raw_i == rozliseni_raw) {
			rozliseni_raw_i = 0;
		}
		rozliseni_raw_i++;
	}
	/* +++ Automatický posun kamery +++ */
	var puvodni_pozice_pruzoru_x = camera.position.x;
	var puvodni_pozice_pruzoru_y = camera.position.y;
	var puvodni_pozice_pruzoru_z = camera.position.z;

	var nova_pozice_pruzoru_x = objekty[0]["definice"].position.x + kamera["x"];
	var nova_pozice_pruzoru_y = objekty[0]["definice"].position.y + kamera["y"];
	var nova_pozice_pruzoru_z = objekty[0]["definice"].position.z + 150 + kamera["z"];
/*
	var nova_pozice_pruzoru_x = ((objekty[0]["hmotnost"] != 0) ? objekty[0]["definice"].position.x + kamera["x"] : puvodni_pozice_pruzoru_x + kamera["x"]);
	var nova_pozice_pruzoru_y = ((objekty[0]["hmotnost"] != 0) ? objekty[0]["definice"].position.y + kamera["y"] : puvodni_pozice_pruzoru_x + kamera["y"]);
	var nova_pozice_pruzoru_z = ((objekty[0]["hmotnost"] != 0) ? objekty[0]["definice"].position.z + 150 + kamera["z"] : puvodni_pozice_pruzoru_x + 150 + kamera["z"]);
*/
	var puvodni_rotace_pruzoru_x = camera.rotation.x;
	var puvodni_rotace_pruzoru_y = camera.rotation.y;

	var nova_rotace_pruzoru_x = objekty[0]["definice"].rotation.x + kamera["rotation_x"];
	var nova_rotace_pruzoru_y = objekty[0]["definice"].rotation.y + kamera["rotation_y"];
	
	if (kamera["relativni_cd"]) {
		camera.position.x += (nova_pozice_pruzoru_x - puvodni_pozice_pruzoru_x) / 20;
		camera.position.y += (nova_pozice_pruzoru_y - puvodni_pozice_pruzoru_y) / 20;
		camera.position.z += (nova_pozice_pruzoru_z - puvodni_pozice_pruzoru_z) / 20;
	}

	camera.rotation.x += (nova_rotace_pruzoru_x - puvodni_rotace_pruzoru_x) / 20;
	camera.rotation.y += (nova_rotace_pruzoru_y - puvodni_rotace_pruzoru_y) / 20;
	/* --- Automatický posun kamery --- */

	function raw_bytes(hodnota) {
		var bytes = new Array();
		var max = Math.pow(2,(record_res * 8)) - 1;
		//hodnota *= 200;
		if (hodnota < 0) {
			hodnota = max - Math.abs(hodnota);
		}
		var clip = false;
		
		if (hodnota > max) {
			hodnota = max;
			clip = true;
		}
		if (hodnota < 0) {
			hodnota = 0;
			clip = true;
		}
		
		for (var i = record_res; i >= 1; i--) {
			bytes[i] = hodnota & (255);
			hodnota = hodnota >> 8;
		}
		var vystup = new Array();
		vystup["hodnota"] = new Array();
		
		var i2 = 1;
		for (var i = record_res; i >= 1; i--) {
			vystup["hodnota"][i2] = bytes[i];
			i2++;
		}
		vystup["clip"] = clip;
		
		return vystup;
	}

	xround = function xround(cislo,pocet_mist) {
		return Math.round(cislo * Math.pow(10,pocet_mist)) / Math.pow(10,pocet_mist);
	}

	if (vykreslovani) {
		renderer.render(scene, camera);
	}
	
	$("#info_nazev_hodnoty").html("Pozice černé díry");
	$("#info_cerna_dira").html(("X: " + Math.round(objekty[0]["definice"].position.x * 10) / 10) + "<br>Y: " + (Math.round(objekty[0]["definice"].position.y * 10) / 10) + "<br>Z: " + (Math.round(objekty[0]["definice"].position.z * 10) / 10));
	$("#info_pruzor").html(("X: " + Math.round(camera.position.x * 10) / 10) + "<br>Y: " + (Math.round(camera.position.y * 10) / 10) + "<br>Z: " + (Math.round(camera.position.z * 10) / 10) + "<br>Natočení X: " + (Math.round(radInDeg(camera.rotation.y) * 1000) / 1000) + "°" + "<br>Natočení Y: " + (Math.round(radInDeg(camera.rotation.x) * 1000) / 1000) + "°");
	$("#info_g_koeficient").html(xround(g_koeficient,7));
	$("#info_cd_hmotnost").html(xround(objekty[0]["hmotnost"],7));
	$("#info_obj_rezim").html(((odpuzovani == -1) ? "odpuzování" : "přitahování"));
	$("#info_zdi_velikost").html(velikost_mistnosti);
	$("#info_zdi_rezim").html(((steny) ? "zapnuto" : "vypnuto"));
	$("#info_cd_rezim").html(((posun_cd) ? "pohyblivá" : "statická"));
	$("#info_celkova_energie").html(xround(cenergie,1));
	$("#info_anim_rychlost").html(real_g_koeficient);
	$("#info_kamera_relativni_cd").html(((kamera["relativni_cd"]) ? "zapnuto" : "vypnuto"));
	$("#info_kamera_perspektiva").html(xround(perspectivecam,3));
	$("#info_malovani").html(((malovat) ? "zapnuto" : "vypnuto"));
	$("#info_kresleni").html(((kreslit) ? "zapnuto" : "vypnuto"));
	$("#info_bench_stav").html(((benchmark) ? "zapnuto" : "vypnuto"));
	$("#info_viditelnost_objektu").html(((viditelnost_objektu) ? "viditelné" : "skryté"));
	$("#info_kamera_nasobek").html(xround(kamera_nasobek,7));
	$("#info_zaznam_kroky").html(bkm_konvertor(objem_exportnich_dat(), true));
	if (record_rezim == 1) {
		$("#info_zaznam_rozliseni").html("1:" + record_res);
	}
	if (record_rezim >= 2 && record_rezim < Infinity) {
		$("#info_zaznam_rozliseni").html((record_res * 8) + " bit");
	}
	$("#info_zaznam_perioda").html(record_per + " kB");
	if (record_rezim == 1) {
		$("#info_zaznam_rezim").html("CSV (Excel)");
	}
	if (record_rezim == 2) {
		$("#info_zaznam_rezim").html("ZIP / SND / RAW (multitrack)");
	}
	if (record_rezim == 3) {
		$("#info_zaznam_rezim").html("SND / RAW mono");
	}
	if (record_rezim == 4) {
		$("#info_zaznam_rezim").html("SND / RAW stereo");
	}
	if (record_rezim == 5) {
		$("#info_zaznam_rezim").html("SND / RAW quattro");
	}
	if (record_rezim == 6) {
		$("#info_zaznam_rezim").html("SND / RAW 6ch");
	}
	$("#info_zaznam_stav").html(((zaznamenavani) ? "zapnuto" : "vypnuto"));
	$("#info_vykreslovani").html(((vykreslovani) ? "zapnuto" : "vypnuto"));
	$("#info_transpozice_cd").html(transpozice_cd);
	$("#info_transpozice_tihy").html(transpozice_tihy);
	$("#info_bit_clip").html((Math.ceil(bit_clip).toString(2)).length + " bit");
	if (record_rezim >= 2 && record_rezim <= Infinity) {
		var bit_clip_procento = Math.round(100 - (((Math.pow(2,(record_res * 8)) - 1) - bit_clip) / (Math.pow(2,(record_res * 8)) - 1)) * 100);
		if (bit_clip_procento > 100) {
			$("#info_bit_clip").append(" <span class='red big'>(" + bit_clip_procento + "% RAW)</span>");
		} else {
			$("#info_bit_clip").append(" (" + bit_clip_procento + "% RAW)");
		}
	}
	$("#info_bit_clip_bin").html((bit_odsazeni(Math.ceil(bit_clip).toString(2))));
	$("#info_pauza").html(((pauza) ? "ano" : "ne"));
	$("#info_npo").html(nasobek_pritazlivosti_objektu);
	if (g_engine == 1) {
		$("#info_engine").html("Energonon LIVE");
	}
	if (g_engine == 2) {
		$("#info_engine").html("Konvenční gravitace");
	}
	
	setTimeout(render,interval_animace);
};
render();
export_cas_odhad_timer = setInterval(export_cas_odhad,1000);
bit_clip_rep_timer = setInterval(bit_clip_rep,125);

function export_cas_odhad() {
	if (!pauza) {
		if (zaznamenavani && record_estimate_latency) {
			record_estimate_2 = objem_exportnich_dat();
			
			var Bps = record_estimate_2 - record_estimate_1;
			
			if (record_estimate_cache.length < record_estimate_cache_res) {
				record_estimate_cache[record_estimate_cache.length] = Bps;
			} else {
				var reccc = new Array();
				for (var i = 1; i < record_estimate_cache.length; i++) {
					reccc[i - 1] = record_estimate_cache[i];
				}
				reccc[reccc.length] = Bps;
				record_estimate_cache = reccc;
			}

			var Bpss = 0;
			if (record_estimate_cache.length > 0) {
				for (var i = 0; i < record_estimate_cache.length; i++) {
					Bpss += record_estimate_cache[i];
				}
			} else {
				Bpss = record_estimate_cache[0];
			}
			Bps = Bpss / record_estimate_cache.length;

			var zbyvajici_objem = (record_per * 1024) - record_estimate_2;
			
			var vterin_do_konce = Math.round(zbyvajici_objem / Bps);
			var minut_do_konce = Math.floor(vterin_do_konce / 60);
			var hodin_do_konce = Math.floor(vterin_do_konce / 3600);

			minut_do_konce -= hodin_do_konce * 60;
			vterin_do_konce -= (minut_do_konce * 60) + (hodin_do_konce * 3600);
			
			if (hodin_do_konce != "Infinity") {
				$("#info_zaznam_odhad").html(
					((hodin_do_konce < 10) ? "0" + hodin_do_konce : hodin_do_konce) + ":" +
					((minut_do_konce < 10) ? "0" + minut_do_konce : minut_do_konce) + ":" +
					((vterin_do_konce < 10) ? "0" + vterin_do_konce : vterin_do_konce)
				);

				var cas_per_ms = 
				(
					(
					(hodin_do_konce * 3600) +
					(minut_do_konce) * 60 +
					(vterin_do_konce)
					) * 1000
				) + (60 * 60 * 1000 * 2);

				//var timestamp = 1293683278;
				var date = new Date(cas_per_ms + Date.now());
				var iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
				// console.log(iso[1] + " " + iso[2]);

				// console.log(Date.now() + cas_per_ms);
				
				$("#info_zaznam_odhad_per_cas").html(iso[1] + " " + iso[2]);
			}
			record_estimate_1 = record_estimate_2;
		}
		record_estimate_latency = true;
	}
}

function objem_exportnich_dat() {
	var objem_dat = 0;
	if (record_rezim == 1) {
		objem_dat = Math.round(csv_record.length);
	}
	if (record_rezim == 2) {
		for (var key in objekty) {
			objem_dat += objekty[key]["raw"]["pos_x"].length;
			objem_dat += objekty[key]["raw"]["pos_y"].length;
			objem_dat += objekty[key]["raw"]["pos_z"].length;
		}
	}
	if (record_rezim >= 3) {
		objem_dat += snd.length;
	}
	return objem_dat;
}

function record_vymazat() {
	record_estimate_1 = 0;
	record_estimate_2 = 0;
	record_estimate_latency = false;
	csv_record = "";
	for (var key in objekty) {
		objekty[key]["raw"]["pos_x"] = new Array();
		objekty[key]["raw"]["pos_y"] = new Array();
		objekty[key]["raw"]["pos_z"] = new Array();
	}
	snd = new Array();
}

function degInRad(deg) {
    return deg * Math.PI / 180;
}

function radInDeg(rad) {
	return rad / Math.PI * 180;
}

function bit_clip_rep() {
	var bit_clip_rep = 0;
	if (record_rezim < 3) {
		for (var key in objekty) {
			if (Math.abs(objekty[key]["definice"].position.x * 2) > bit_clip_rep) {
				bit_clip_rep = Math.abs(objekty[key]["definice"].position.x * 2);
			}
			if (Math.abs(objekty[key]["definice"].position.y * 2) > bit_clip_rep) {
				bit_clip_rep = Math.abs(objekty[key]["definice"].position.y * 2);
			}
			if (Math.abs(objekty[key]["definice"].position.z * 2) > bit_clip_rep) {
				bit_clip_rep = Math.abs(objekty[key]["definice"].position.z * 2);
			}		
		}
	} else {
		bit_clip_rep = Math.abs(snd_raw_sum * 2);
	}

	$("#info_bit_clip_rep").html((Math.ceil(bit_clip_rep).toString(2)).length + " bit");
	if (record_rezim >= 2 && record_rezim <= Infinity) {
		var bit_clip_procento = Math.round(100 - (((Math.pow(2,(record_res * 8)) - 1) - bit_clip_rep) / (Math.pow(2,(record_res * 8)) - 1)) * 100);
		if (bit_clip_procento > 100) {
			$("#info_bit_clip_rep").append(" <span class='red big'>(" + bit_clip_procento + "% RAW)</span>");
		} else {
			$("#info_bit_clip_rep").append(" (" + bit_clip_procento + "% RAW)");
		}
	}
	$("#info_bit_clip_rep_bin").html((bit_odsazeni(Math.ceil(bit_clip_rep).toString(2))));

	return bit_clip_rep;
}

function bit_odsazeni(hodnota) {
	String.prototype.insert = function (index, string) {
	  if (index > 0)
	    return this.substring(0, index) + string + this.substring(index, this.length);
	  else
	    return string + this;
	};
	var delka_retezce = hodnota.length;
	for (var i = 0; i < Math.ceil(delka_retezce / 8); i++) {
		hodnota = hodnota.insert((hodnota.length - i * 8) - i," ");
	}
	return hodnota;
}

function bkm_konvertor(hodnota, velicina) {
	if (hodnota < 1024) {
		navrat = hodnota + ((velicina) ? " B" : "");
	}
	if (hodnota > 1024) {
		navrat = xround(hodnota / 1024,2) + ((velicina) ? " kB" : "");
	}
	// console.log (hodnota / 1024);
	return navrat;
}

function cpu_benchmark() {
	for (var key in objekty) {
		objekty[key]["zrychleniX"] = 0;
		objekty[key]["zrychleniY"] = 0;
		objekty[key]["zrychleniZ"] = 0;
	}

	pauza = false;
	g_koeficient = 1;
	g_koeficient_trs = 0;
	odpuzovani = 1;
	real_g_koeficient = 0.001;
	real_g_koeficient_trs = 0;
	polarita_cd = 1;
	
	if (objekty[0]["hmotnost"] < 0) {
		objekty[0]["hmotnost"] *= -1;
	}

	if (vykreslovani == true) {
		clearInterval(benchmark_interval);
		benchmark = false;
	}

	if (!vykreslovani) {
		if (benchmark_cache.length < benchmark_res) {
			benchmark_cache[benchmark_cache.length] = benchmark_sum;
		} else {
			var bench_prumer = new Array();
			for (var i = 1; i < benchmark_cache.length; i++) {
				bench_prumer[i - 1] = benchmark_cache[i];
			}
			bench_prumer[bench_prumer.length] = benchmark_sum;
			benchmark_cache = bench_prumer;
		}

		var bench_presnost_q = 0;
		if (benchmark_cache.length > 0) {
			for (var i = 0; i < benchmark_cache.length; i++) {
				bench_presnost_q += benchmark_cache[i];
			}
		} else {
			bench_presnost_q = benchmark_cache[0];
		}
		benchmark_result = bench_presnost_q / benchmark_cache.length;

		var benchmark_presnost = Math.round(benchmark_cache.length / (.01 * benchmark_res));

		$("#info_bench_vysledek").html(Math.round(benchmark_result / 100));
		$("#info_bench_presnost").html(benchmark_presnost + "%");
		benchmark_sum = 0;

		if (benchmark_presnost == 100) {
			clearInterval(benchmark_interval);
			benchmark = false;
			vykreslovani = true;
			interval_animace = 5;
			pauza = true;
		}
	}
}

/* +++ Design 2D +++ */

/* +++ Animace ZOOM efekt +++ */
$(document).on("mouseover",".zoomefekt",function() {
	$(this).stop().transition({
		scale: 3
		},50
	)
});
$(document).on("mouseout",".zoomefekt",function() {
	$(this).stop().transition({
		scale: 1
		},150
	)
});
/* --- Animace ZOOM efekt --- */

/* --- Design 2D --- */
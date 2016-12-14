// Slideshow mit iPhone
//=====================================================================
var version = "Version 0.9";
var anzDurchlaeufe = 1 ;  // bezogen auf 360 Grad Drehung
var isStereo = false; // Wenn false, dann linke Haelfte des Bildschirms GLEICH rechte Haelfte

var flgTest = false; // Im Testmodus wird Anzeige/Ausgabe sichtbar
var flgStopAndGo = false; // true: Beim Drehen Zwangs-Pausen

var introAudioSrc = "medien/intro_lautstaerke_verstaendlich_01.mp3"
var audioBackground = "medien/background_01.mp3"   // Dateiname Audio, Hintergrund
var text_01 = "";

var arrPicture_L = new Array(); // Dateiname der Bilder;
var arrDialog = new Array(); // Dateiname Audiofile
var arrDuration = new Array(); // der der Szene
// vor den Text wird bei der Ausgabe ein <p> eingefuegt
var arrText = new Array(); //Text auf weissen Flaechen

//=====================================================================
// Umlaute: Stichwort UNICOUDE
text_01 = "Bitte Kopfh&ouml; anschlie&szlig;en und Lautst&auml;rke einstellen: "
// Content ===================================================================
// Bezeichnung der Bilder beliebig - keine Konvention einzuhalten; aber gleiche Groesse

arrPicture_L[1] = "pic/gelb_mit_pfeil_400 x 290_01.jpg";
arrDialog[1] = "medien/background_01.mp3"
arrDuration[1]= "2000";

arrPicture_L[2] = "pic/weiss_mit_pfeil_400 x 290_01.jpg";
arrDialog[2] = "medien/background_01.mp3";
arrDuration[2]= "2000";

arrPicture_L[3] = "pic/dummy_goehle.jpg";
arrDialog[3] = "medien/dialog_02.mp3";
arrDuration[3]= "2000";

arrPicture_L[4] = "pic/weiss_mit_pfeil_400 x 290_01.jpg";
arrDialog[4] = "medien/background_01.mp3";
arrDuration[4]= "2000";

arrText[1] = '' +
'<h1><font color="white"><b>' +
'Geschichte 1933 - 1945 </b><br><br></h1>' +
'<font></p>'

arrText[2] = '' +
'<p>DUMMY GESCHIHTE<br><br></p>'

arrText[3] = '' +
'<pCaption>DUMMY GESCHICHTE</pCaption>';

arrText[4] = ''
arrText[2] = '' +
'<p>DUMMY GESCHIHTE<br><br></p>'
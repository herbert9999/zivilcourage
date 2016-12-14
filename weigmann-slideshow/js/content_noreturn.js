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
var arrDialog = new Array(); // Dateiname Audiofile, Dauer der Anzeige der Szene
var arrDuration = new Array(); // Dauer der der Szene

// vor den Text wird bei der Ausgabe ein <p> eingefuegt
var arrText = new Array(); //Text auf weissen Flaechen

//=====================================================================
// Umlaute: Stichwort UNICOUDE
text_01 = "Bitte Kopfh&ouml; anschlie&szlig;en und Lautst&auml;rke einstellen: "
// Content ===================================================================
// Bezeichnung der Bilder beliebig - keine Konvention einzuhalten; aber gleiche Groesse

arrPicture_L[1] = "pic/gelb_mit_pfeil_400 x 290_01.jpg";
arrDialog[1] = "medien/background_01.mp3";
arrDuration[1] = "2000";

arrPicture_L[2] = "pic/weiss_mit_pfeil_400 x 290_01.jpg";
arrDialog[2] = "medien/background_01.mp3";
arrDuration[2] = "2000";

arrPicture_L[3] = "pic/dummy_goehle.jpg";
arrDialog[3] = "medien/dialog_02.mp3";
arrDuration[3] = "2000";

arrPicture_L[4] = "pic/weiss_mit_pfeil_400 x 290_01.jpg";
arrDialog[4] = "medien/background_01.mp3";
arrDuration[4] = "2000";

arrPicture_L[5] = "pic/hdr_bahnhof_neustadt_02.jpg";
arrDialog[5] = "medien/dialog_04.mp3";
arrDuration[5] = "2000";

arrPicture_L[6] = "pic/weiss_mit_pfeil_400 x 290_01.jpg";
arrDialog[6] = "medien/background_01.mp3";
arrDuration[6] = "2000";

arrPicture_L[7] = "pic/dummy_hellerberg.jpg";
arrDialog[7] = "medien/dialog_06.mp3";
arrDuration[7] = "2000";

arrPicture_L[8] = "pic/weiss_400 x 290_01.jpg";
arrDialog[8] = "medien/background_01.mp3";
arrDuration[8] = "2000";

arrPicture_L[9] = "pic/dummy_friedhof.jpg";
arrDialog[9] = "medien/dialog_08.mp3";
arrDuration[9] = "2000";

arrPicture_L[10] = "pic/weiss_400 x 290_01.jpg";
arrDialog[10] = "medien/background_01.mp3";
arrDuration[10] = "2000";

arrPicture_L[11] = "pic/dummy_polizei.jpg";
arrDialog[11] = "medien/dialog_10.mp3";
arrDuration[11] = "2000";

arrPicture_L[12] = "pic/weiss_400 x 290_01.jpg";
arrDialog[12] = "medien/background_01.mp3";
arrDuration[12] = "2000";

arrPicture_L[13] = "pic/dummy_zwangsarbeit.jpg";
arrDialog[13] = "medien/dialog_10.mp3";
arrDuration[13] = "2000";

arrPicture_L[14] = "pic/weiss_400 x 290_01.jpg";
arrDialog[14] = "medien/background_01.mp3";
arrDuration[14] = "2000";

arrPicture_L[15] = "pic/hdr_gestapo_01.jpg";
arrDialog[15] = "medien/background_01.mp3";
arrDuration[15] = "2000";

arrPicture_L[16] = "pic/weiss_400 x 290_01.jpg";
arrDialog[16] = "medien/background_01.mp3";
arrDuration[16] = "2000";

arrPicture_L[17] = "pic/dummy_strassenbahn.jpg";
arrDialog[17] = "medien/background_01.mp3";
arrDuration[17] = "2000";

arrPicture_L[18] = "pic/weiss_400 x 290_01.jpg";
arrDialog[18] = "medien/background_01.mp3";
arrDuration[18] = "2000";

arrPicture_L[19] = "pic/dummy_judenhaus.jpg";
arrDialog[19] = "medien/background_01.mp3";
arrDuration[19] = "2000";

arrPicture_L[20] = "pic/weiss_400 x 290_01.jpg";
arrDialog[20] = "medien/background_01.mp3";
arrDuration[20] = "2000";

arrPicture_L[21] = "pic/horst _weigmann_400x290.JPG";
arrDialog[21] = "medien/background_01.mp3";
arrDuration[21] = "2000";


arrText[1] = '' +
'<h1><font color="white"><b>' +
'Von dort ist noch niemand zur&uuml;ckgekommen.</h1>' +
'<p><br><br><br><br><br><br>Texte nach Victor Klemperer:<br>' +
'Tageb&uuml;cher 1942 - 1945' +
'<font></p>'

arrText[2] = '' +
'<p>12. Februar 1943<br><br>' +
'Herbert Eisenmann berichtete:<br>' +
'Von der Arbeit (Zwangsarbeit) weg sei vorgestern Friedrich verhaftet worden.<br>' +
'Sie scheinen jetzt Kopfpr&auml;mien f&uuml;r jeden Juden zu erhalten.</p>'

arrText[3] = '' +
'<pCaption>Zwangsarbeit im G&ouml;hle-Werk <br>Gro&szlig;enhainer Stra&szlig;e</pCaption>';

arrText[4] = '' +
'<p>27. Februar 1943<br><br>' +
'Heute kam eine Karte zur&uuml;ck: ' +
'&bdquo;Abgewandert&rdquo;. ' +
'Harmloses Wort f&uuml;r &bdquo;vertreiben&rdquo;, &bdquo;in den Tod schicken&rdquo;.<br><br>' +
'Es ist nicht mehr anzunehmen, da&szlig; irgendwelche Juden lebend aus Polen zur&uuml;ckkehren.</p>'

arrText[5] = "" +
"<pCaption>Bahnhof Neustadt: Abfahrt der Z&uuml;ge nach Auschwitz.</pCaption>";

arrText[6] = '' +
'<p>28. Februar 1943<br><br>' +
'Alle Nicht-Mischehlinge, die bisher au&szlig;erhalb des Lagers wohnten, ' +
'buchst&auml;blich alle, sind seit gestern im Lager. ' +
'Man wird keinen von ihnen wiedersehen.</p>';

arrText[7] = '' +
'<pCaption>ehemaliges "Judenlager Hellerberg"</pCaption>';

arrText[8] = '' +
'<p>10. M&auml;rz 1943<br><br>' +
'Frau Bein, Nicht-J&uuml;din, kommt t&auml;glich auf den Friedhof. <br><br>' +
'Man hat ihren j&uuml;dischen Mann und ihren als &bdquo;j&uuml;dischen Mischling&rdquo; ' +
'deklarierten Sohn aus unbekannten Gr&uuml;nden verhaftet ' +
'und ein paar Wochen sp&auml;ter bei &bdquo;Fluchtversuch&rdquo; erschossen.</p>'

arrText[9] = " " +
"<pCaption>J&uuml;discher Friedhof</pCaption>";

arrText[10] = '' +
'<p>8. April 1943<br><br>' +
'Johannes M&uuml;ller: Er wurde vorige Woche verhaftet - Grund unbekannt. ' +
'Zwei Tage sp&auml;ter hat er sich im Polizeipr&auml;sidium angeblich erh&auml;ngt.<br><br> ' +
'Hirschel und Kahlenbergs, Mutter und Sohn, befinden sich bereits ' +
'seit Donnerstag im Polizeipr&auml;sidium.</p>'


arrText[11] = '' +
'<pCaption>Polizeipr&auml;sidium</pCaption>';

arrText[12] = '' +
'<p>25. April 1943<br><br>' +
'Die Todesdrohungen immer n&auml;her und w&uuml;rgender: ' +
'Juliusburger, am Mittwoch verhaftet, am Freitag tot. ' +
'Meinhard ... verhaftet und tot - und gestern Abend ' +
'die Nachricht von Conradis Verhaftung. ' +
'Damit f&auml;llt der letzte in meiner Einbildung bisher noch ' +
'vorhandene Wall zwischen dem Tod und mir.<br><br>'

arrText[13] = '' +
'<pCaption>Fr&uuml;her: Fabrik, Zwangsarbeit</pCaption>';

arrText[14] = '' +
'<p>26. April 1943<br><br>' +
'Frau Hirschel zur Gestapo am Bismarckplatz bestellt. ' +
'Sie wusste nicht mehr, welcher S&uuml;nde halber.<br><br> ' +
'Solche Bestellung bedeutet in neunundneunzig von ' +
'hundert F&auml;llen den Gang in Gef&auml;ngnis und Tod. ' +
'Das ist wahrhaftig keine &Uuml;bertreibung.'

arrText[15] = '' +
'<pCaption>Hier stand fr&uuml;her das Geb&auml;ude der Gestapo</pCaption>';

arrText[16] = '' +
'<p>31. Oktober 1943<br><br>' +
'Sondergenehmigung die Stra&szlig;enbahn zu benutzen. <br><br>' +
'Mittags, im Gedr&auml;nge des &uuml;berm&auml;&szlig;igen Verkehrs, schutzloser als ein Hund. ' +
'Einmal zupfte mich ein SS-Offizier im Aufsteigen am &Auml;rmel: "Ihr looft!" <br>';

arrText[17] = ' ' +
'<pCaption>Fahrt mit Stra&szlig;enbahn</pCaption>';

arrText[18] = '' +
'<p>17. Januar 1944 <br><br>' +
'Gespr&auml;ch im Judenhaus. <br><br>' +
'Frau Steinitz hat ma&szlig;lose Angst vor Luftangriff ' +
'(ihre Schwester z&auml;hlt zu den Leipziger Ausgebombten). <br><br>' +
'Ich f&uuml;rchte nur die Gestapo.</p>';

arrText[19] = ' ' +
'<pCaption>Fr&uuml;her: Judenhaus Zeughausstra&szlig;e</pCaption>';

arrText[20] = '' +
'<p>23. Januar 1944<br><br>' +
'&Uuml;berschrift in Klemperers Tagebuch:<br><br>' +
'Heroische K&ouml;penikiade<br><br>' +
'Klemperer berichtet wie Horst Weigmann, Sohn von Toni Weigmann, ' +
'als angeblicher Gestapo-Schmidt seine Mutter vor der Deportation retten wollte.</p>';

arrText[21] = ' ' +
'<pCaption>Horst Weigmann</pCaption>';
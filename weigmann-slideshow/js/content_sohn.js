// Slideshow mit iPhone
//=====================================================================
var version = "Version 0.9";
var anzDurchlaeufe = 1 ;     // bezogen auf 360 Grad Drehung
var isStereo = false; // Wenn false, dann linke Haelfte des Bildschirms GLEICH rechte Haelfte

var flgStopAndGo = true; // true: Beim Drehen Zwangs-Pausen

var srcCheckVolume = "medien/intro_lautstaerke_verstaendlich_01.mp3"

var arrPicture_L = new Array(); // Dateiname der Bilder;
var arrDialog = new Array(); // Dateiname Audiofile
// vor den Text wird bei der Ausgabe ein <p> eingefuegt
var arrText = new Array(); //Text auf weissen Flaechen

//=====================================================================
// Umlaute: Stichwort UNICOUDE
// Content ===================================================================
// Bezeichnung der Bilder beliebig - keine Konvention einzuhalten; aber gleiche Groesse

arrPicture_L[1] = "pic/bg_titel_rot.jpg";
arrDialog[1] = "medien/bg_intro_ende_01.mp3"; // Bild

arrPicture_L[2] = "pic/weiss_400 x 290_01.jpg";
arrDialog[2] = "medien/wahre_geschichte_01.mp3"; // Bild  ;

arrPicture_L[3] = "pic/schmidt_kopf_01.jpg";
arrDialog[3] = "medien/schmidt_gefuerchtet_01.mp3"; // Bild, Dauer der Veruoegerung

arrPicture_L[4] = "pic/mutter_sohn_strasse_01.jpg";
arrDialog[4] = "medien/mutter_sohn_strasse_01.mp3";

arrPicture_L[5] = "pic/weiss_400 x 290_01.jpg";
arrDialog[5] = "medien/gefahr_kommt_naeher_01.mp3";

arrPicture_L[6] = "pic/kueche_01.jpg";
arrDialog[6] = "medien/kueche_01.mp3";

arrPicture_L[7] = "pic/weiss_400 x 290_01.jpg";
arrDialog[7] = "medien/abholung_juden_01.mp3";

arrPicture_L[8] = "pic/mitkommen_01.jpg";
arrDialog[8] = "medien/mitkommen_01.mp3";

arrPicture_L[9] = "pic/weiss_400 x 290_01.jpg";
arrDialog[9] = "medien/wie_retten_01.mp3";

arrPicture_L[10] = "pic/sonne_verwundet_01.jpg";
arrDialog[10] = "medien/bg_intro_ende_01.mp3";

arrPicture_L[11] = "pic/weiss_400 x 290_01.jpg";
arrDialog[11] = "medien/horst_wagt_01.mp3";

arrPicture_L[12] = "pic/horst_baut_01.jpg";
arrDialog[12] = "medien/horst_baut_01.mp3";

arrPicture_L[13] = "pic/weiss_400 x 290_01.jpg";
arrDialog[13] = "medien/zum_praesidium_01.mp3";

arrPicture_L[14] = "pic/flucht_01.jpg";
arrDialog[14] = "medien/flucht_01.mp3";

arrPicture_L[15] = "pic/weiss_400 x 290_01.jpg";
arrDialog[15] = "medien/pfoertner_01.mp3";

arrPicture_L[16] = "pic/schmidt_kommt_01.jpg";
arrDialog[16] = "medien/schmidt_kommt_01.mp3";

arrPicture_L[17] = "pic/weiss_400 x 290_01.jpg";
arrDialog[17] = "medien/bericht_sohn_tot_01.mp3";

arrPicture_L[18] = "pic/weiss_400 x 290_01.jpg";
arrDialog[18] = "medien/mutter_ueberlebt_01.mp3";

arrPicture_L[19] = "pic/weiss_400 x 290_01.jpg";
arrDialog[19] = "medien/bg_intro_ende_01.mp3";

arrText[1] = "" +
"<br><pLarge><font color='white'><b>"         +
"Die Geschiche vom Sohn,<br><br><br>" +
"der seine Mutter zu retten versuchte." +
"<font></pLarge>"

arrText[2] = "" +
"<p>Nach einer wahren Geschichte.<br>" +
"Dresden, Januar 1944.<p>";

arrText[3] = "";

arrText[4] = "";

arrText[5] = "" +
"<p>Die Gefahr kommt n&auml;her:<br>" +
"Auch die Familie Herzl hat man abgeholt und nie wieder etwas von ihnen geh&ouml;rt.<br>" +
"Wohin hat man sie gebracht? Ob sie noch leben? Und was ist aus ihren Kindern geworden?<p>";

arrText[6] = "";

arrText[7] = "" +
"<p>Am kommenden Tag l&auml;sst Gestapo-Schmidt mehrere Dresdner Juden abholen " +
"und in das Polizeipr&auml;sidium bringen. Jetzt kommt auch die Mutter dran - es gibt kein Entrinnen.</p>";

arrText[8] = "";

arrText[9] = "" +
"<p>Von dort ist noch niemand zur&uuml;ck gekommen. <br>" +
"Was kann ich nur tun?<br>" +
"Gibt es keine Hilfe?<br>" +
"Wie kann ich die Mutter retten?</p>";

arrText[10] = "";

arrText[11] = "" +
"<p>Ich wage es!<br> " +
"Ich gebe mich als Gestapo-Schmidt aus und verlange die Herausgabe der Mutter.<br><br>" +
"Wer nicht handelt, hat schon verloren.</p>";

arrText[12] = "";

arrText[13] = "" +
"<p>Der Sohn eilt in das Polizeipr&auml;sidium:<br>" +
"Kann das gut gehen? Aber hat er denn eine Wahl?<br><br>" +
"Jetzt oder nie: Als Gestapo-Schmidt werden sie ihm schon die Mutter herausgeben.</p>";

arrText[14] = "";

arrText[15] = "" +
"<p>Der Pf&ouml;rtner ist unsicher und sucht Gewissheit. Er ruft Gestapo-Schmidt an. <br><br>" +
"Gestapo-Schmidt eilt in das Polizeipr&auml;sidium.</p>";

arrText[16] = "";

arrText[17] = "" +
"<p>Der Sohn Horst Weigmann ist am n&auml;chsten Morgen tot. <br><br>" +
"Gestapo-Schmidt behauptet, dass er sich in der Zelle erh&auml;ngt habe.";

arrText[18] = "" +
"<p>Die Mutter kommt in das Konzentrationslager Theresienstadt. Sie &uuml;berlebt.<br>" +
"Nach ihrer Befreiung im April 1945 schreibt sie die Ereignisse auf.<br><br>" +
"Gestapo-Schmidt wird 1987 in Dresden zu lebensl&auml;nglicher Haft verurteilt.</p>";

arrText[19] = "" +
"<p><b><small>SCHOENE-GRAFIK.DE</b><br>" +
"Johannes G&auml;rtner und Sprecher<br>" +
"Alexander Atanassow<br>" +
"Martin Herzberg<br>" +
"Franziska Mellentin<br>" +
"Herbert Lappe<br>" +
"Regine Rose<br>" +
"Ein Projekt der Gesellschaft f&uuml;r Christlich-J&uuml;dische Zusammenarbeit Dresden.<br>" +
"Gef&ouml;rdert vom Freistaat Sachsen.</small></p>"
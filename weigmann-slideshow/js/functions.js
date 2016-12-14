// Klammern suchen: [Strg][Alt][Cursor runter]
// Drehrichtung für richtigen Szenenablauf: Im UZS
// Breite Bild: 1/2 Bildschirm - 1/2 Trenner. Höhe folgt daraus automatisch.

// globale Konstante
var font = 16; // Ausangsgroesse fuer Body:

// globale Variable
var merker = 0; //Segment merken, damit nicht  zweimal hintereinander der selbe Audio-Dialog aufgerufen wird

var amountOfPics = 0;
var winkel = 0; // Durch DeviceOrientation ausgeloest; Zaehlt gegen UZS
var winkelOld = 0
var winkelAtAudioLoadingStarted = 0;
var winkelAtAudioLoadingEnded   = 0;
var diffWinkel = 0;

var segment = 0.00; // Abschnitt mit aktuellem Bild/Szene/Dialog
var nrSegmentFloor = 0; // Vor-Komma (Integer) von segment = Nr. des Bildes
var nrSegmentOld = 0; // zur Ermittlung der Drehrichtung; das zeitlich vorgergehende Segment
var nrSegmentSave = 0;
var  nrSegmentCeilOld = 0;
var  nrSegmentCeil = 0;


var nrPic = 0; // Nr. des Bildes (links)
var picHeight = 0; // Hoehe eines Bildes, die sich nach CCS ergibt
var picWidth = 0; // Breite eines Bildes, die sich nach CCS ergibt

var flgAudioIsLoading = false;
var objAudio = document.createElement("AUDIO");

window.onerror = function (msg, url, lineNo, columnNo, error) {
         alert(msg + "\n"  + url + "\n" + "\n" + "Line: " + lineNumber + "\n" + "Column:" + columnNo + "\n" + "Error: " + error)
         return false;
}

objAudio.oncanplay = function() {
         fnSwitchIconPreload("HIDDEN")
         flgAudioIsLoading = false;
         winkelAtAudioLoadingEnded = winkel
};

objAudio.onended = function() {
        if( $('#imgAudioPlay').attr('src') == "pic/btn_pause.jpg" ){
            $('#imgAudioPlay').attr('src','pic/btn_play.jpg');
        };

};

//window.addEventListener('resize', fnFontResize() );

//==============================================================================================
var flgCalculationEnded = true;
// ausgeloest durch Click Drehen in Landscape-Mode
function fnStartSlideshow(){
         if(!flgStartSlideShow ){
            return;
         }
         amountOfPics = (arrPicture_L.length -1); //zaehlt von 0 an
         window.moveTo(0,0);
         objAudio.pause();

         if (!window.DeviceOrientationEvent) {
                 alert("Sorry, aber Dein Handy ist leider nicht für diese Wiedergabe geegnet. Schade!")
                 return;
         }
         // beim Drehen von Portrait <=> Landscape: SOFORT neu zentrieren
         $('#body').css('background','black');

         //Beim ersten Durchlauf mit erstem Bild anfangen!
                  winkel = 0;
                 winkelAtAudioLoadingStarted = 0;
                 winkelAtAudioLoadingEnded = 0;

                 fnSelectPicSources();
                 fnShiftPics();
                 fnCenterSlideShow();

                 if (flgStopAndGo){
                         fnStopAndGo();
                 }
                // window.addEventListener('deviceorientation', getDeviceOrientation);
         }

function getDeviceOrientation (){
        // laeuft immer mit, damit Start beim ersten Bild!
        var wDiff = 0
        winkel = event.alpha; // f&uuml;r iPhone und MS-Edge; Nach-Komma-Stellen werden spaeter noch gebraucht!
         // siehe Testprogramm: http://demos.peterfriese.de/gyro/gyro.html
         // Alpha-Winkel springt um 180 Grad, wenn iPhone in Landscape gekippt wird
         // Drehrichtung umgekehren
         winkel = 360 - winkel;

        //---------------------------------------------
        // so lange Audio geladen wird, weitere Verarbeitung sperren
         if(flgAudioIsLoading){
               return;
         }

        // Damit trotz Dreh-Bewegugen, waehrend die Anzeige blockiert ist, an der gleichen Stelle wieder
        // fortgesetzt wird
        diffWinkel = winkelAtAudioLoadingEnded - winkelAtAudioLoadingStarted
        winkel = winkel - diffWinkel;
        if (!flgStartSlideShow){
                 return;
        }

        // vorsichtshalber ...
        while (winkel >= 360){
              winkel = winkel -  360;
        }

        // vorsichtshalber ...
        while (winkel < 0 ){
                 winkel = winkel + 360;
        }

         fnSelectPicSources();
         fnShiftPics();
         // muss immer wieder neu ermittelt werden, falls Gerät zwischendurch gedreht wurde
         fnCenterSlideShow();
         if (flgStopAndGo){
                fnStopAndGo();
         }

}

function fnSelectPicSources() {
         // Quellen der Bilder ermitteln
         var srcImgLeft_1= "";
         var srcImgLeft_2= "";
         //var rotation = 0;
         var text_1 = "";
         var text_1 = "";

         // Segment beschreibt den Abschnitt der Bildfolge, in dem wir uns befinden. Beginnend mit Segment 1.
         // Segment besteht aus Ganzzahl[=nrSegmentFloor] + Nachkommastellen [= Position innerhalb eines Segmentes]
         //------------------------------------------------------
         segment = 1 + anzDurchlaeufe * amountOfPics * winkel/360;  // segment: 1 ....
         while (segment >= (1 + amountOfPics)){
                 segment = segment -  amountOfPics;
         }
         //------------------------------------------------------
          // Index für das Bild ganz links ermittteln
         nrSegmentFloor = Math.floor(segment); // floor => Ganzzahl vor dem Komma
          // um ganz sicher zu gehen ...
         if(nrSegmentFloor < 1){
                 nrSegmentFloor = 1;
         }
         if(nrSegmentFloor > amountOfPics){
                 nrSegmentFloor = amountOfPics;
         }

          // Linke Haelfte des Bildschirms zusammengesetzt aus zwei Bildern, die bei Rotation nach links wandern.
         // Verschieben - vor dem letzten Bild:
         srcImgLeft_1 = arrPicture_L [nrSegmentFloor];
         srcImgLeft_2 = arrPicture_L [nrSegmentFloor + 1];

         text_1 =  arrText[nrSegmentFloor];
         text_2 =  arrText[nrSegmentFloor + 1];

         // Sprung vom letzten auf erstes Bild:
         if ( nrSegmentFloor == amountOfPics ) {
             srcImgLeft_1 = arrPicture_L [amountOfPics];
             srcImgLeft_2 = arrPicture_L [1];

             text_1 = arrText[amountOfPics];
             text_2 = arrText[1] ;
         }

         $( '#imgLeft_1' ).attr( 'src' , srcImgLeft_1 );
         $( '#imgLeft_2' ).attr( 'src' , srcImgLeft_2 );

         $ ( '#divTextLeft_1' ).html(text_1);
         $ ( '#divTextLeft_2' ).html(text_2);

         // wenn nicht Flag für 3d (=stereo) gesetzt, dann gleiche Bilder f&uuml;r rechtes und linkes Auge
         // Muss fuer Stereo-Bilder noch ergaenzt werden.

         if(! isStereo){
                 $ ( '#imgRight_1' ).attr( 'src' ,srcImgLeft_1 );
                 $ ( '#imgRight_2' ).attr( 'src' ,srcImgLeft_2 );

                 $ ( '#divTextRight_1' ).html(text_1);
                 $ ( '#divTextRight_2' ).html(text_2);
         }
}

function fnShiftPics(){

          // Bilder entsprechend Drehung des Betrachters verschieben
         var nachKomma = 0; // nachKomma-Teil von segment
         var top        =  0;
         var right      =  2 * picWidth;
         var bottom     = picHeight;
         var left       = 0;
         var x = 0;
         var y = 0;

         var offsetRight = 0;

         var shiftLeft_1 = 0; // Verschiebung des Bildes nach Links
         var shiftLeft_2 = 0; // Verschiebung des Bildes nach Links
         var strClip_1 = "";
         var strClip_2 = "";

         // Linke BildschirmHaelfte: Bilder verschieben; shiftLeft_1 ist negativ!
         // Bild 1, der linken BS-Haelfte
         nachKomma = segment - nrSegmentFloor;
         shiftLeft_1 = -1 * nachKomma * picWidth; // ganze Zahl da Verschiebung nur in ganzen Pixeln möglich

         if (Math.abs(shiftLeft_1) > picWidth){
                 alert("shiftLeft_1" + shiftLeft_1)
         }

         // Bilder2, der linken BS-Haelfte
          shiftLeft_2 = picWidth -1 * nachKomma * picWidth;

          $( '#divLeft_1' ).css( 'left' , shiftLeft_1);
          $( '#divTextLeft_1').css( 'left' , shiftLeft_1);

          $( '#divLeft_2' ).css( 'left' , shiftLeft_2);
          $( '#divTextLeft_2' ).css( 'left' , shiftLeft_2);

         // Bilder der rechten  Haelfte verschieben
          // Das rechte Fenster ist um 1/2 Breite des Trennstriches verschoebn

          offsetRight = parseInt($( '#divTrenner' ).css('width'));

          $( '#divRight_1' ).css( 'left' , picWidth + offsetRight + shiftLeft_1);
          $( '#divTextRight_1' ).css( 'left' , picWidth + offsetRight + shiftLeft_1);

          $( '#divRight_2' ).css( 'left' , picWidth + offsetRight + shiftLeft_2);
          $( '#divTextRight_2' ).css( 'left' , picWidth + offsetRight + shiftLeft_2);

         // Anzeige der Bild-Nummern
          x = nrSegmentFloor;
          y = x + 1;

          if (nrSegmentFloor  ==  amountOfPics ) {
             x = amountOfPics;
             y = 1;
         }

          if ( parseInt( shiftLeft_2 ) < 0.5 * parseInt( picWidth )){
                 $( '#divNrSegmentLeft_1' ).html('\u00A0' + y + '\u00A0'); // Leerzeichen einfuegen fuer bessere Optik
                 $( '#divNrSegmentRight_1' ).html('\u00A0' + y + '\u00A0');
          }
          else {
                 $( '#divNrSegmentLeft_1' ).html('\u00A0' + x + '\u00A0');
                 $( '#divNrSegmentRight_1' ).html('\u00A0' + x + '\u00A0');
          }

          //------------------------------------------------------------------
          // Ausschnitte begrenzen, damit sich die Bilder nicht ueberlagern

          // Linke Bildschirmhaelfte, linkes Teilbild
          right = picWidth;
          left= nachKomma * picWidth;
          // top, right, bottom, left = y1, x2, y2, x1

          strClip_1 = "rect(" + top + "px" + " " + right + "px" + " " + bottom + "px" + " " + left + "px" + ")"
          $('#imgLeft_1').css('clip' , strClip_1);
          $('#divTextLeft_1').css('clip' , strClip_1);

          // Linke Bildschirmhaelfte, rechtes Teilbild
          right = nachKomma * picWidth;
          left= 0;

          strClip_2 = "rect(" + top + "px" + " " + right + "px" + " " + bottom + "px" + " " + left + "px" + ")"
          $('#imgLeft_2').css('clip' , strClip_2);
          $('#divTextLeft_2').css('clip' , strClip_2);
          //====================================================================

          // Desgl. fuer rechte Bildschirmaelfte
          // Ausschnitte begrenzen, damit sich die Bilder nicht ueberlagern
          // Rechte Bildschirmhaelfte, linkes Teilbild
          right = picWidth;
          left= nachKomma * picWidth;
          strClip_1 = "rect(" + top + "px" + " " + right + "px" + " " + bottom + "px" + " " + left + "px" + ")";
          $('#imgRight_1').css('clip' , strClip_1);
          $('#divTextRight_1').css('clip' , strClip_1);

          // Linke Bildschirmhaelfte, rechtes Teilbild
          right = nachKomma * picWidth;
          left= 0;
          strClip_2 = "rect(" + top + "px" + " " + right + "px" + " " + bottom + "px" + " " + left + "px" + ")";
          $('#imgRight_2').css('clip' , strClip_2);
          $('#divTextRight_2').css('clip' , strClip_2);
}

function fnStopAndGo(){
          // -----------------------------------------------------------------------
          // im Uhrzeiger-Sinn: Wenn Bild vollstaendig: Audio-Datei laden: Bewegung waehrend des Ladens sperren ...
          // ... Audio Play: Bewegung wieder frei geben
          // Gegen UZS: nix tun, nur Bilder anzeigen
          //Vom ersten zum letzten Bild => nix tun, alles ueberspringen
          if (!(( nrSegmentOld == 1 ) && ( nrSegmentFloor == amountOfPics )) ) {

                 // mitten drin:
                 if( nrSegmentFloor > nrSegmentOld ){
                     // nicht zweimal hintereinannder den gleichen Aufruf
                     if( merker !== nrSegmentFloor ) {
                         merker = nrSegmentFloor;
                         // Bilder im "Stillstand" exakt ausrichten...
                         fnAdjustPics(nrSegmentFloor);
                         fnAudioStart(nrSegmentFloor);
                     }
                 }

                 // vom letzten zum ersten Segment
                 if ((nrSegmentOld == amountOfPics) && (nrSegmentFloor == 1 )) {
                         if( merker !== nrSegmentFloor ){
                                 merker = nrSegmentFloor;
                                 //fnAdjustPics(nrSegmentFloor);
                                 fnAudioStart(nrSegmentFloor);
                         }
                 }
         }

         nrSegmentOld = nrSegmentFloor;
}

function fnCheckVolume(playPause) {
     if ( playPause.toUpperCase() == "PLAY"){
         fnSwitchIconPreload("VISIBLE");
         objAudio.src = srcCheckVolume; //"medien/intro_lautstaerke_verstaendlich_01.mp3"
         objAudio.play();
     }
     else {
         objAudio.pause();
     }
}

function fnAudioStart(nrIndex){
         var source = arrDialog[nrIndex];
         flgAudioIsLoading = true;
         winkelAtAudioLoadingStarted = winkel;

         fnSwitchIconPreload("VISIBLE");

         objAudio.src = source;
         if (objAudio.src == ""){
                 alert("Audio-Quelle " + source + "   nicht gefunden.")
         }

         objAudio.play();
}

function fnAdjustPics(nrIndex){
         // es wird der exakte Winkel für STOP "erzeugt":
         segment = nrIndex;
         fnShiftPics();
}

function fnCenterSlideShow(){

         var divSlideShowHeight = 0; // integer
         var divSlideShowTop = 0; // integer

         picHeight = parseInt($( '#imgLeft_1' ).css('height'));
         // und gleich fuer spaeter bereit stellen:
         picWidth = parseInt($( '#imgLeft_1' ).css('width'));

         $( '#divTrenner').css('height', picHeight);

         // lt. CSS: 100%. Gibt am PC die freie=verfuegbare Hoehe wieder
         divSlideShowHeight = parseInt(  $( '#divSlideShow' ).css('height')  );
         divSlideShowTop = 0.5 * ( divSlideShowHeight - picHeight );
         $ ( '#divSlideShow' ).css( 'top', divSlideShowTop );
}

function fnSwitchIconPreload(status){
         if (status == "VISIBLE"){
                 $('#divPreloadLeft').css('visibility','visible');
                 $('#divPreloadRight').css('visibility','visible');
         }
         else
         {
                 $('#divPreloadLeft').css('visibility','hidden');
                 $('#divPreloadRight').css('visibility','hidden');
         }
}
//==========================================================================
function fnAnzeige(txt){
         document.getElementById("anzeige").value = txt
}
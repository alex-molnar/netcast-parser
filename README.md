# Netcast Parser

Ez a Netcast Parser hivatalos oldala.

A program megkönnyíti a meccsek utáni tudósítás készítését, kigyűjtve a dobott pontokat/hárompontosokat, abból esetégesen a sablonnak megfelelő docx formátumú doksit generál.

    Legfrissebb verzió: 1.01
    Kiadás dátuma: 2020. január 24.

A szkript jelenleg a Firefox és Chrome böngészőkre telepíthető.
A telepítéssel elfogadod a használat feltételeit és az adatvédelmi nyilatkozatot

## Telepítés

### Firefox

1. Telepítsd a [TamperMonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) kiegészítőt.
2. Most már telepítheted a Netcast Parser szkriptet. Ehhez kattints [ide](https://github.com/alex-molnar/netcast-parser/raw/master/netcast_parser.user.js).
3. A megjelenő oldalon kattints az Install gombra.
4. Nyiss meg bármelyik meccs statisztikáját a https://netcasting.webpont.com/ címen, és használd (vagy épp ne :)) egészséggel.

### Chrome

1. Telepítsd a [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=hu) kiegészítőt.
2. Most már telepítheted a Netcast Parser szkriptet. Ehhez kattints [ide](https://github.com/alex-molnar/netcast-parser/raw/master/netcast_parser.user.js).
3. A megjelenő oldalon kattints az Install gombra.
4. Nyiss meg bármelyik meccs statisztikáját a https://netcasting.webpont.com/ címen, és használd (vagy épp ne :)) egészséggel.

## Features

### 2020.02.08
* További információk beírásának lehetősége webes felületen
* A Beírt információk is beíródnak a sablonba
* Az összefoglalón és az értékelésen kívül minden (kitöltött mező esetén) adat automatikusan generálódik 

### 2020.01.24
* .docx fromátum támogatása

### 2020.01.12.
* Initial commit
* README alapvető
* Működik Firefox és Chrome böngészőkkel
* .odt fileformátum támogatása
* A netes statisztika oldalról adatok kinyerése (csapatok nevei, eredmények, játékosok neve, dobott pontok/hárompontosból szerzett pontok, játékos típusa: kezdő/csere), azok beillesztése a sablon dokumentumba 

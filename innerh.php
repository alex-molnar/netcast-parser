<?php header("Access-Control-Allow-Origin: *"); ?>
<head>
    <link rel="stylesheet" href="https://people.inf.elte.hu/qbbwwd/netcast/modal.css">
</head>
<body>
    <div id="backgroundModal">

        <div id="modalContent">
            <div id="expandField">
                <div id="expandArrow"><p>&rtrif;</p></div> <!-- &rtrif -> black ;; drti -> down;-->
                <div id="expandLabel">
                    <p id="expandText">Fill in additional data</p>
                </div>
            </div>

            <div id="extraField">
                <div id="group" class="label group"><p class="label">Csoport: </p></div>
                <div id="group_input" class="input group"><input id="group_input_field" type="text"></div>

                <div id="round" class="label round"><p class="label">Forduló: </p></div>
                <div id="round_input" class="input round"><input id="round_input_field" type="text"></div>

                <div id="location" class="label location"><p class="label">Helyszín: </p></div>
                <div id="location_input" class="input location"><input id="location_input_field" type="text"></div>

                <div id="fans" class="label fans"><p class="label">Nézőszám: </p></div>
                <div id="fans_input" class="input fans"><input id="fans_input_field" type="text"></div>

                <div id="ref1" class="label ref1"><p class="label">Játévezető 1: </p></div>
                <div id="ref1_input" class="input ref1"><input id="ref1_input_field" type="text" class="referee-name"></div>

                <div id="ref2" class="label ref2"><p class="label">Játévezető 2: </p></div>
                <div id="ref2_input" class="input ref2"><input id="ref2_input_field" type="text" class="referee-name"></div>

                <div id="home_coach" class="label home_coach"><p class="label">Hazai Edző: </p></div>
                <div id="home_coach_input" class="input home_coach"><input id="home_coach_input_field" type="text"></div>

                <div id="away_coach" class="label away_coach"><p class="label">Vendég Edző: </p></div>
                <div id="away_coach_input" class="input away_coach"><input id="away_coach_input_field" type="text"></div>

            </div>

            <button id="oldStyleButton">Download txt</button>
            <button id="redirectButton">Download docx</button>
            <span id="close">&times;</span>
        </div>

    </div>
</body>
    
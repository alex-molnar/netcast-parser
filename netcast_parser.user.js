// ==UserScript==
// @name         Netcast Parser
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Userscript to help automate certain tasks about writing summary of games.
// @author       alex.molnar
// @match        http://netcasting.webpont.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // global variables

    let originalHTML;

    let expanded = false;
    let expandables = [
        'modalContent',
        'expandField',
        'extraField',
        'oldStyleButton',
        'redirectButton'
    ];

    let additionalData = {};
    let dataCollectors = [
        'group_input_field',
        'round_input_field',
        'location_input_field',
        'fans_input_field',
        'ref1_input_field',
        'ref2_input_field',
        'home_coach_input_field',
        'away_coach_input_field'
    ];

    let cookieAbleFields = [
        'group_input_field',
        'location_input_field',
        'fans_input_field',
        'home_coach_input_field',
    ];

    let homeTeam;
    let awayTeam;
    let homeScore;
    let awayScore;
    let quarterScore;
    let homeStarters;
    let awayStarters;
    let homeBench;
    let awayBench;


    let cookieEnabled = true; // TODO: o be replaced by checkox

    // functional/higher order functions

    const an = (acc, elem) => acc + elem.attributes.rel.value;

    function folder(acc, el) {
        return acc + el;
    }

    function callBackHTML(){
        originalHTML = document.body.innerHTML;
        document.body.innerHTML = this.responseText;
        document.getElementById("backgroundModal").style.animation = "fadeIn 0.4s 1";
        document.getElementById("modalContent").style.animation = "fadeIn 1.0s 1";
        cookieAbleFields.forEach(function(item, index) {
            document.getElementById(item).value = getCookie(item);
        });
        sendRequest(`https://kingbrady.web.elte.hu/netcast/get_coach.php?team=${awayTeam}`, callBackJSON);
    }

    function callBackJSON() {
        document.getElementById("away_coach_input_field").value = JSON.parse(this.responseText).coach ? JSON.parse(this.responseText).coach : "";
    }

    function getReferees() {
        var doc = new DOMParser().parseFromString(this.responseText, 'text/html');
        Array.from(doc.getElementsByClassName("padding-left-twentyfive")).forEach(function(item, index){
            let teamName = item.innerHTML.split("</span>")[1];

            if (teamName === homeTeam + "</a>" && item.nextElementSibling.innerHTML.split("</span>")[1] === awayTeam + "</a>") {
                let referees = item.parentNode.nextElementSibling.firstElementChild.innerHTML.split("<b>")[1].slice(0, -4).split(",");
                Array.from(document.getElementsByClassName("referee-name")).forEach((item, index) => {
                    item.value = referees[index];
                });
            }
        });
    }

    // helper functions

    function sendRequest(url, callback){
        var oReq = new XMLHttpRequest();
        if(callback !== null){
            oReq.addEventListener("load", callback);
        }
        oReq.open("GET", url);
        oReq.send();
    }

    function connectEventListeners(){
        document.getElementById('redirectButton').addEventListener('click', redirectToNetcastServer);
        document.getElementById('oldStyleButton').addEventListener('click', buildDownloadableTXT);
        document.getElementById('close').addEventListener('click', function() { closeDialog(true); });
        document.getElementById('expandField').addEventListener('click', expandFields);
    }

    function converter(acc, item) {
        let pointsFromThree = 3 * parseInt(item.querySelector(".stat3pts").querySelector(".TT3m").innerHTML);
        let end = pointsFromThree == 0 ? "" : "/" + pointsFromThree;
        return acc +
            Array.from(item.querySelector(".statsquadraname").children)[0].innerHTML.split("&nbsp;").join(" ") +
            " " +
            Array.from(item.querySelector(".statpts").children)[0].innerHTML +
            end +
            ", ";
    }

    function isHomePlayer(home) {
        return function(elem) {
            return Array.from(elem.parentElement.parentElement.parentElement.classList).includes(home ? "hstat" : "astat");
        }
    }

    function isBenchPlayer(elem) {
        return !Array.from(elem.classList).includes("TTteam") && !Array.from(elem.classList).includes("TTtotal") && !Array.from(elem.classList).includes("starter");
    }

    function isStarter(elem) {
        return Array.from(elem.classList).includes("starter");
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // parser functions

    function getTeam(home) {
        return Array.from(
            document.getElementsByClassName("boxheadertext")
        ).filter(
            elem => Array.from(
                elem.parentNode.parentNode.classList
            ).includes(home? "hstat" : "astat")
        )[0].innerHTML;
    }

    function getScore(home) {
        return Array.from(
            Array.from(
                document.getElementsByClassName(home ? "hscore-numbers" : "ascore-numbers")
            )[0].children
        ).filter(
            elem => !Array.from(elem.classList).includes("hidden")
        ).reduce(an,"");
    }

    function buildQuarterScore() {
        let quarterScoreBuilder = "";
        for(let i = 1; i <= 4 ; i++) {
            quarterScoreBuilder += document.getElementById("hp" + i).innerHTML;
            quarterScoreBuilder += "-";
            quarterScoreBuilder += document.getElementById("ap" + i).innerHTML;
            quarterScoreBuilder += i == 4 ? "" : ", ";
        }
        return quarterScoreBuilder;
    }

    function getPlayers(home, starter) {
        var rawStarters = Array.from(document.getElementsByClassName("odd")).concat(Array.from(document.getElementsByClassName("even"))).filter(starter ? isStarter : isBenchPlayer);
        var starterNames = rawStarters.filter(isHomePlayer(home)).reduce(converter, "");
        return starterNames.substr(0, starterNames.length - 2);
    }

    function parseData(){
        homeTeam = getTeam(true);
        awayTeam = getTeam(false);
        homeScore = getScore(true);
        awayScore = getScore(false);
        quarterScore = buildQuarterScore();
        homeStarters = getPlayers(true, true);
        awayStarters = getPlayers(false, true);
        homeBench = getPlayers(true, false);
        awayBench = getPlayers(false, false);
    }

    //builder functions

    function buildTXTFile() {
        let header = "Nemzeti Egyetemi Kosárlabda Bajnokság, {csoport} csoport, {forduló}. forduló\n\n";
        let middle = `${homeTeam} - ${awayTeam} ${homeScore}-${awayScore} (${quarterScore})\n\n` +
            `{város}, {helyszín}, {nézőszám} néző. V.: {játékvezetők}.\n\n` +
            `${homeTeam}: ${homeStarters}. Csere: ${homeBench}. Edző: {edzőnév}\n` +
            `${awayTeam}: ${awayStarters}. Csere: ${awayBench}. Edző: {edzőnév}\n`;
        let end = "\ntudosítás helye\n\nedzői értékelések helye";
        return header + middle + end;
    }

    function buildAdditionalData() {
        dataCollectors.forEach(function(item, index) {
            let val = document.getElementById(item).value;
            if(val.trim() != '') {
                additionalData[item] = val;
            }
        });
    }

    // manipulating hmtl

    function closeDialog(close) {
        if (close) {
            document.getElementById("modalContent").style.animation = "fadeOut 0.4s 1";
            setTimeout(function() { closeDialog(false); }, 400);
        } else {
            document.body.innerHTML = originalHTML;
        }
    }

    function expandFields() {
        expandables.forEach(function(item, index) {
            if(!expanded) {
                document.getElementById(item).classList.add("expanded");
            } else {
                document.getElementById(item).classList.remove("expanded");
            }
        });
        expanded = !expanded;
    }

    // downloading

    function buildDownloadableTXT(){
        let a = document.createElement('a');
        let str = buildTXTFile();
        a.href = "data:application/octet-stream,"+encodeURIComponent(str);
        a.download = 'tudositas.txt';
        a.click();
    }

    function redirectToNetcastServer() {
        let address = "https://kingbrady.web.elte.hu/netcast/netcast_server.php";
        address += `?hometeam=${homeTeam}&awayteam=${awayTeam}`;
        address += `&homescore=${homeScore}&awayscore=${awayScore}`;
        address += `&quarterscore=${quarterScore}`;
        address += `&homestarters=${homeStarters}&awaystarters=${awayStarters}`;
        address += `&homebench=${homeBench}&awaybench=${awayBench}`;
        if(expanded) {
            dataCollectors.forEach(function(item, index) {
                let val = document.getElementById(item).value;
                if(val.trim() != '') {
                    address += `&${item}=${val}`;
                    if(cookieAbleFields.indexOf(item) > -1) {
                        document.cookie = item + "=" + val + "; expires=Thu, 27 May 2021 12:00:00 UTC;";
                    }
                    if(item === "away_coach_input_field"){
                        sendRequest(`https://kingbrady.web.elte.hu/netcast/update.php?team=${awayTeam}&coach=${val}`, null);
                    }
                }
            });
        }
        window.open(address, "_blank");
    }


    // main

    function main() {
        parseData();
        sendRequest(`http://kingbrady.web.elte.hu/netcast/curl.php`, getReferees);
        sendRequest("https://kingbrady.web.elte.hu/netcast/innerh.php", callBackHTML);
        setTimeout(connectEventListeners, 1000);
    }


    // entrypoint on page load

    window.addEventListener('load', function(){
        setTimeout(main, 1000);
    });
})();
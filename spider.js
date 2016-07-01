#!/usr/bin/env node
'use strict';
var styles = {
    'bold'          : ['\x1B[1m',  '\x1B[22m'],
    'italic'        : ['\x1B[3m',  '\x1B[23m'],
    'underline'     : ['\x1B[4m',  '\x1B[24m'],
    'inverse'       : ['\x1B[7m',  '\x1B[27m'],
    'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
    'white'         : ['\x1B[37m', '\x1B[39m'],
    'grey'          : ['\x1B[90m', '\x1B[39m'],
    'black'         : ['\x1B[30m', '\x1B[39m'],
    'blue'          : ['\x1B[34m', '\x1B[39m'],
    'cyan'          : ['\x1B[36m', '\x1B[39m'],
    'green'         : ['\x1B[32m', '\x1B[39m'],
    'magenta'       : ['\x1B[35m', '\x1B[39m'],
    'red'           : ['\x1B[31m', '\x1B[39m'],
    'yellow'        : ['\x1B[33m', '\x1B[39m'],
    'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
    'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG'       : ['\x1B[40m', '\x1B[49m'],
    'blueBG'        : ['\x1B[44m', '\x1B[49m'],
    'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
    'greenBG'       : ['\x1B[42m', '\x1B[49m'],
    'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
    'redBG'         : ['\x1B[41m', '\x1B[49m'],
    'yellowBG'      : ['\x1B[43m', '\x1B[49m']
};
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
function dota2Spider(url){
    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if(err){
                reject(err);
            }
            var a = res.body.toString();
            var $ = cheerio.load(a,{decodeEntities: false});
            var dota2Info = [];
            $('div.matchmain').each((idx, element) => {
                var info = {
                    'teamNameOne' : '',
                    'teamRateOne' : '',
                    'teamNameTwo' : '',
                    'teamRateTwo' : '',
                    'teamTime' : '',
                    'matchName': '',
                    'bo':'',
                }
                var $element = $(element);
                info.teamTime = $element.find('.whenm').text().trim();
                 info.matchName = $element.find('.eventm').text().trim();
                info.bo =  $element.find('.format').text().trim();
                info.teamNameOne = $element.find('b').eq(0).text().trim();
                info.teamRateOne = $element.find('i').eq(0).text().trim();
                info.teamNameTwo = $element.find('b').eq(1).text().trim();
                info.teamRateTwo = $element.find('i').eq(1).text().trim();
                dota2Info.push(info);
            });
            resolve(dota2Info);
        });
    })
}

dota2Spider('http://cdn.dota2lounge.com/').then((data) => {
    for(var x in data){
        console.log("                                                                                                                                      ");
        console.log("  matchTime:"+data[x].teamTime + "                      " + "matchName:"+data[x].matchName);
        console.log("                         "+data[x].teamNameOne+"    "+"  "+"VS"+"        "+data[x].teamNameTwo);
        console.log("                         "+data[x].teamRateOne+"        "+ data[x].bo+"            "+data[x].teamRateTwo);
        console.log("                                                                                                                                      ");
        console.log("*******************************************************************************");
    }
});
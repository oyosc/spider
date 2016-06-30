'use strict';
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
function dota2Spider(url){
      return new Promise((resolve, reject) => {
                   request(url, (err, res) => {
                              if(err){
                                 reject(err);
                              }
                              var $ = cheerio.load(res.body.toString());
                              var dota2Info = [];
                              $('.matchmain').each(() => {
                              	var info = {
                              		'teamName' : '',
                              		'teamRate' : '', 
                              	}
                              	var $teamList = $(this);
                              	var $teamName = $teamList.find('.teamtext');
                              	$teamName.each(() => {
                              		var $team = $(this);
                              		 info.teamName = $team.find('b');
                              		 info.teamRate = $team.find('i');
                              		 dota2Info.push(info);
                              	});
                              });
                              resolve(dota2Info);
                  });
      })
}

dota2Spider('http://cdn.dota2lounge.com/').then((data) => {
                     console.log(data);
});
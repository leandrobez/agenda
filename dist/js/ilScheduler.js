"use strict"
//const axios = require('axios');

let ilScheduler = (function(){
		function IlScheduler() {
			// No parameters
			if (arguments.length === 0) {
				// Do nothing
				return;
			}
			else {
				// Construct calendar
				this._construct(arguments);
			}
		}
		IlScheduler.schedulerInit  = function() {
			let options = [{item: 'soxorro'}];
			new ilScheduler(options);
			return 'to aqui'
		}
	});
/*const credentials = {
	client_id: 'eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B',
	client_secret: 'NlwebKrFptEf1vBKpGCU8pfx2m5lEpY3aLGtLhYnvwCuAGS5H_kKUzbiTQv_lYl-_SG1Yu4v8A_hD348D6TY6Q',
	grant_type: 'authorization_code',
  	code: '',
  	redirect_uri: 'http://127.0.0.1:5500/dist/callback.html'

}*/

/*var ilSheduler = {
	year: '2019',
	days_name: ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
	months: [{
		name: 'Janeiro',
		weeks: [{
				week: {
					id: 'week1',
					label: '01 a 06',
					init: 1,
					end: 6,
					days_name_key_init: 0
				}
			},
			{
				week: {
					id: 'week2',
					label: '08 a 13',
					init: 8,
					end: 13,
					days_name_key_init: 0
				}
			},
			{
				week: {
					id: 'week3',
					label: '15 a 20',
					init: 15,
					end: 20,
					days_name_key_init: 0
				}
			},
			{
				week: {
					id: 'week4',
					label: '22 a 27',
					init: 22,
					end: 27,
					days_name_key_init: 0
				}
			},
			{
				week: {
					id: 'week5',
					label: '29 a 31',
					init: 29,
					end: 31,
					days_name_key_init: 0
				}
					}
				]
		}]
}

var weekList = document.querySelector('ul#week-list');
var optionDay = document.querySelector('#options-day');
var schedulerDay = document.querySelector('#il-scheduler');

function getAccessCronofy(){

	//var urlBase = 'api.cronofy.com/';	
	//var url = urlBase+'/oauth/v2/authorize';
	var url = 'https://app.cronofy.com/oauth/v2/authorize?response_type=code&client_id=eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B&redirect_uri=http://127.0.0.1:5500/dist/callback.html&scope=read_events'
	//var params = '?response_type=code&client_id=eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B&redirect_uri=http://127.0.0.1:5500/dist/callback.html&scope=read_events';

	var cronofyWindow = {
    
		width: 550,

		height: 650

	}
		
	var left = screen.width / 2 - cronofyWindow.width / 2;

	var top = screen.height / 2 - cronofyWindow.height / 2;

			//vm = this;

		//aramzena a url Token no localStorage

		//localStorage.setItem("urlToken", urlToken);

		let wCronofy = window.open(

			url,

			"Login Spotify",

			"menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" + cronofyWindow.width +

			", height=" + cronofyWindow.height + ", top=" + top + ", left=" + left

		);

		wCronofy.onbeforeunload = e => {

			
			

		};

	
}

function getToken(){
	/*axios.post(endPoint,{headers: {'Access-Control-Allow-Origin':'*'},'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'},credentials).then( res => {
            console.log(res)
		})*
		var code = localStorage.getItem('code');
    var endPoint = 'https://api.cronofy.com/oauth/token';
    const credentials = {
        client_id: 'eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B',
        client_secret: 'NlwebKrFptEf1vBKpGCU8pfx2m5lEpY3aLGtLhYnvwCuAGS5H_kKUzbiTQv_lYl-_SG1Yu4v8A_hD348D6TY6Q',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://127.0.0.1:5500/dist/callback.html'
    
    }
        var invocation = new XMLHttpRequest();
        if(invocation){
            invocation.open('POST', endPoint, true);
            invocation.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            invocation.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            invocation.send(credentials);
        }
}

/*function getAuthCalendar(){
	var urlBase = 'api.cronofy.com/';
	var data = credentials;
//https://app.cronofy.com/oauth/v2/authorize?response_type=code&client_id=eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B&redirect_uri=http://127.0.0.1:5500/callback.html&scope=read_events&state=
	const getToken = function (){
		var url = urlBase+'/oauth/v2/authorize';
		var params = '?response_type=code&client_id=eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B&redirect_uri=http://127.0.0.1:5500/callback.html&scope=read_events'
		var auth = axios.get(url+params)
		.then( function (response) {
			console.log(response)
		})
		.catch( function (error) {
			console.error( function () {
				console.log(error)
			})
		});
	}
	//return exemple
	/*
	?response_type=code&client_id=eVPlWos7FDzG1fDiU4riWUWG8TE5kW2B&redirect_uri=http://127.0.0.1:5500/callback.html&scope=read_events&state=
	{
  "token_type": "bearer",
  "access_token": "P531x88i05Ld2yXHIQ7WjiEyqlmOHsgI",
  "expires_in": 3600,
  "refresh_token": "3gBYG1XamYDUEXUyybbummQWEe5YqPmf",
  "scope": "create_event delete_event",
  "account_id": "acc_567236000909002",
  "sub": "acc_567236000909002",
  "linking_profile": {
    "provider_name": "google",
    "profile_id": "pro_n23kjnwrw2",
    "profile_name": "example@cronofy.com"
  }
}
	
	*
	var auth = axios.post().then().catch();
}*

function resetCards(){
	var element = document.getElementsByClassName('il-scheduler--day');
	
	if(element.length>0){
		for(var i = element.length - 1; i >= 0; i--) {
			if(element[i] && element[i].parentElement) {
				element[i].parentElement.removeChild(element[i]);
			}
		}
	}
}

function genesisOptions(month_key){
	var months = calendar.months[month_key];
	var weeks = months.weeks;
	var content = '';
	weeks.forEach(function(item,index){
		var option = '<div class="il-field"><label for="'+item.week.id+'"><span class="il-item--work">Semana de '+item.week.label+'</span></label><input type="radio" name="week" id="'+item.week.id+'" value="'+index+'" onclick="showCards(0,'+index+')"></div>';
		content += option;
	})
	return content;
}

function genesisCalendar(month_key,week_key) {
	schedulerDay.classList.remove('il-scheduler--table__show')
	var months = calendar.months[month_key];
	var list = calendar.days_name;
	var mes = months.name;
	var content = '';
	var start_day = months.weeks[week_key].week.init;
	var li =  '';
	list.forEach( function (item,index) {
		
		if(index <= 4){
			li = '<li class="il-scheduler--day"><span class="il-sheduler--month-name">' + mes + '</span><span class="il-scheduler--mont-day">' + start_day + '</span><span class="il-scheduler--day-name">' + item + '</span><input type="radio" name="day" id="day_'+item+'" value="'+index+'" onclick="showScheduler('+index+')"></li>';

			content += li;
		}
		start_day++;
	});

	return content
}

function showCards(mont_key,week_key){
	resetCards();
	weekList.insertAdjacentHTML('beforeend', genesisCalendar(mont_key,week_key));
}

function showScheduler(scheduler_key){
	var days_name = calendar.days_name[scheduler_key];
	var elementTable = schedulerDay.firstElementChild;
	var newDay = elementTable.children[0].children[0].children[1];
	newDay.innerHTML = '';
	newDay.append(days_name);
	schedulerDay.classList.add('il-scheduler--table__show')
}

//optionDay.insertAdjacentHTML('beforeend',genesisOptions(0));*/
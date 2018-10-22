function cronofyStart(str){
    
    elem1 = str.split("code="),
    elem2 = elem1[1].split("&state="),
    code = elem2[0],
    state = elem2[1];
   // console.log("DOM completamente carregado e analisado");
    localStorage.setItem('code',code);
    cronofyToken();
}

cronofyToken = () => {
    var formData = document.querySelector("form#il-access")
    
    
    const getToken = () => {
        window.location ='agenda.html?gettoken=true'
    }
    if(code){
        getToken();
    }
    /*formData.setAttribute('action',endPoint);
    formData.children[0].setAttribute('value',credentials.client_id);
    formData.children[1].setAttribute('value',credentials.client_secret);
    formData.children[3].setAttribute('value',credentials.code);
   
    document.getElementById("il-access").submit();*/
    /*
    var code = localStorage.getItem('code');
		var data=credentials;
		data.code = code;
		var config = {
			headers: {'Access-Control-Allow-Origin': '*'},
			proxy: {
				host: '104.236.174.88',
				port: 3128
			  }
		};
		//axios.defaults.headers.post['Access-Control-Request-Headers'] = '*';
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		axios.post('https://api.cronofy.com/oauth/token',data,{ crossdomain: true }).then( res => {
			console.log(res)
		})
    
    */
}
        /*elem3 = elem2[1].split("&expires_in="),
        controls = {
            access_token: "",
            token_type: "",
            expires_in: "",
            end_time: ""
        };
    let time = calculateTime(elem3[1]),
        start_time = time.start_time,
        end_time = time.end_time;
    controls.access_token = elem2[0]
    controls.token_type = elem3[0]
    controls.expires_in = elem3[1];
    controls.start_time = +start_time;
    controls.end_time = +end_time;
    localStorage.setItem("controls", JSON.stringify(controls));
    //dá inicio a chamda dos dados do usuário logado
    //getAuth(elem2[0])*/
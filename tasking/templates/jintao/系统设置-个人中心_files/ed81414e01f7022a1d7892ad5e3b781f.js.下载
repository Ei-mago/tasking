/*2019-08-11 21:43:18.442 Cached*/
window.ewei_channel_config = '{"buttonBackgroundColor":"#f99b04","buttonTitle":"在线客服","channelUid":"ed81414e01f7022a1d7892ad5e3b781f","id":10,"position":"right","style":"fillet","windowTitle":"在线客服","windowTitleColor":"#f07f00"}';
window.ewei_autoinvite_config= '';
window.ewei_provider_domain = 'help.ewei.com';
window.ewei_provider_id = '216';
window.ewei_today_is_holiday = 'false';
window.ewei_work_time = '09:00,21:00';
var hasLoad;
window.ewei_web_sdk = {
	init: function(token, callback){
		this._token = token;
		hasLoad = callback;
	},
	config: null,
	container: null,
	initContainer: function(dom, config){
		this.container = dom;
		this.config = config;
	},
	setConfig: function(config){
		this.config = config;
	},
	_token: null
}; 
var script = document.createElement('script');
script.src = '//' + window.ewei_provider_domain + '/client/static/js/portal.js';
script.onload = function(){
	if (typeof  hasLoad === 'function' ) {
		hasLoad();
	}
}
document.body.appendChild(script);
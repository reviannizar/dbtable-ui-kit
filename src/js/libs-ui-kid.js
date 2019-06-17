
/*!
 *  libs dbtable bootstrap 4.x
 *  Copy Right (c)2019 
 *  author	: Abu Dzunnuraini
 *  email	: almprokdr@gmail.com
*/
$.fn.serializeObject=function(){var a={},b=this.serializeArray();return $.each(b,function(){a[this.name]?(a[this.name].push||(a[this.name]=[a[this.name]]),a[this.name].push(this.value||"")):a[this.name]=this.value||""}),a};
var msgInfo = (function() {
	"use strict";
	var elem, hideHandler, pub = {};
	pub.init = function(options){ $('body').append('<div id="msgInfo" class="msgInfo" style="display:none;"><span></span></div>'); elem = $('.msgInfo'); }
	pub.show = function(text){ clearTimeout(hideHandler); elem.find("span").html(text); elem.delay(50).fadeIn().delay(1000).fadeOut(); }
	return pub;
}());
var libs = (function (){
	"use strict";
	var pub = {dbtable:[]},count=0;
	pub.months = ['','Januari','Pebruari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Nopember','Desember'];
	pub.days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
	pub.dateFormat = function (opt,d){
		switch(typeof(opt)){
			case 'number': var dtm=d==undefined ? new Date(): new Date(d); if(isNaN(dtm)) return; else break;
			case 'object': 
			case 'string': var dtm=new Date(opt); opt=0; if(isNaN(dtm)) return; else break; 
			default: return;
		}
		var h=dtm.getHours(), m=dtm.getMinutes(), s=dtm.getSeconds(), a=dtm.getDay(), t=dtm.getDate(), b=dtm.getMonth()+1, y=dtm.getFullYear(),e,f; 
		h=h<10?'0'+h:h; m=m<10?'0'+m:m; s=s<10?'0'+s:s; e=b<10?'0'+b:b; f=t<10?'0'+t:t; 
		switch(opt){
			case 0: return y+'-'+e+'-'+f;
			case 1: return pub.days[a]+', '+t+' '+pub.months[b]+' '+y;
			case 2: return f+'/'+e+'/'+y;
			case 3: return pub.days[a]+', '+f+'/'+e+'/'+y;
			case 4: return pub.days[a]+', '+f+'/'+e+'/'+y+' '+h+':'+m+':'+s;
			case 5: return f+'/'+e+'/'+y+' '+h+':'+m;
			case 6: return f+'/'+e+' '+h+':'+m;
			case 7: return pub.months[b]+' '+y;
			case 8: return pub.days[a]+', '+t+' '+pub.months[b]+' '+y+' - '+h+':'+m+':'+s;
			case 9: return f;
			case 10: return y+'-'+e+'-'+f+' '+h+':'+m+':'+s;
			case 11: return y+''+e+''+f+''+h+''+m+''+s;
			case 12: return h+':'+m+':'+s;
		}
	}
	pub.launchFullscreen = function(o) { if(o.requestFullscreen) o.requestFullscreen(); else if(o.mozRequestFullScreen) o.mozRequestFullScreen(); else if(o.webkitRequestFullscreen) o.webkitRequestFullscreen(); else if(o.msRequestFullscreen) o.msRequestFullscreen()}
	pub.exitFullscreen = function() { if(document.exitFullscreen) document.exitFullscreen(); else if(document.mozCancelFullScreen) document.mozCancelFullScreen(); else if(document.webkitExitFullscreen) document.webkitExitFullscreen()}
	pub.displayPanel = function (a){ var o=$('#'+a); if(o.hasClass('hidden')){ o.removeClass('hidden'); o.addClass('show');	}else{ o.removeClass('show'); o.addClass('hidden'); }}
	pub.ajax_fail = function (e){ msgInfo.show(e==undefined?'Kesalah koneksi internet':'Error '+e.responseText); }
	pub.addSeparators = function (nStr, inD, outD, sep){
		if(typeof nStr=='undefined') return '';
		nStr += ''; var dpos = nStr.indexOf(inD), nStrEnd = '';
		if (dpos != -1) { nStrEnd = outD + nStr.substring(dpos + 1, nStr.length); nStr = nStr.substring(0, dpos); }
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(nStr)) { nStr = nStr.replace(rgx, '$1' + sep + '$2'); }
		return nStr + nStrEnd;
	};
	pub.formatNumber = function (val,row){ return (val!=0)?pub.addSeparators(val, '.', ',', '.'):''};
	pub.formatRp = function (val,row){  return (val!=0)?'<span style="float:left;">Rp.</span><span style="float:right;margin-right:5px">'+pub.addSeparators(val, '.', ',', '.')+'</span>':''};
	pub.formatNumberBold = function (val,row){ return (val!=0)?'<b style="margin-right:5px">'+pub.addSeparators(val, '.', ',', '.').replace(/,000/g, '')+'</b>':''};
	pub.formatTextBold = function (val,row){ return (val!='')?'<b style="margin-right:5px">'+val+'</b>':''};
	pub.formatRpBold = function (val,row){ return (val!=0)?'<span style="float:left;font-weight:bold;">Rp.</span><span style="float:right;font-weight:bold;margin-right:5px">'+pub.addSeparators(val, '.', ',', '.')+'</span>':''}	
	pub.formatBold = function (val,row){ return '<b>'+val+'</b>' }	
	pub.formatBoolean = function (val,row){ return val=val=='0'?'':'<i class="fa fa-fw fa-check-square-o"></i>' }	
	pub.number_format = function (number, decimals, dec_point, thousands_sep) {
		number=(number+'').replace(/[^0-9+\-Ee.]/g, '');
		var n=!isFinite(+number)?0:+number,
			prec=!isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep=(typeof thousands_sep === 'undefined')?',':thousands_sep,
			dec=(typeof dec_point === 'undefined')?'.':dec_point, s = '',
			toFixedFix=function(n, prec){ var k=Math.pow(10, prec); return ''+(Math.round(n*k)/k).toFixed(prec); };
		s = (prec?toFixedFix(n, prec):'' + Math.round(n)).split('.');
		if (s[0].length>3){ s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep); }
		if ((s[1]||'').length<prec){ s[1]=s[1] || ''; s[1] += new Array(prec-s[1].length+1).join('0'); }
		return s.join(dec);
	}
	pub.createCookie = function (name, value, t){ if (t){ var date=new Date(); date.setTime(date.getTime()+(t*864000000)); var expires='; expires='+date.toGMTString()}else var expires=''; document.cookie=name+'='+value+expires+'; path=/'; }
	pub.deleteCookie = function (name){ document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'; }
	pub.getCookie = function (c){var a=RegExp(""+c+"[^;]+").exec(document.cookie);return decodeURIComponent(!!a?a.toString().replace(/^[^=]+./,""):"");}
	pub.wait=function (t,s){ if(s) $('.'+t).append('<div class="'+t+'-over overlay"><i class="fa fa-refresh fa-spin"></i></div>'); else $('.'+t+'-over').remove()}
	pub.fieldNumber = function (e){var k; if(window.event) k=window.event.keyCode; else if(e) k=e.which; if((k>=48)&&(k<58)||(k==46)||(k==8)) return true; return false}
	pub.fieldNumberMask = function (o){ var a=$(o),b=a.val(),c=pub.number_format(b,0,',',' '); a.val(c)}
	pub.formatedFielsNumber = function (r,a){ $.each(a,function(k,v){ r[v]=pub.number_format(r[v],0,',',' ')}); return r}
	pub.removeRow = function (url,row,d,ext,e,z){ $.msg.confirmation('Confirm','<span style="color:#006">'+(e==undefined?'Apakah data akan dihapus?':e+' ')+'</span>',function(){ if (row){ pub.wait(d,true); var data=z==undefined?{id:row.id}:row; $.post(url,data,function(res){ if (res.success){ pub.wait(d,false); if(ext!=undefined) ext(res)} else { msgInfo.show(res.msg)}},'json').fail(function(e) { pub.wait(d,false); pub.ajax_fail(e)})}})}
	pub.saveData = function (url,data,d,ext){ pub.wait(d,true); $.post(url,data,function(res){ pub.wait(d,false); if(res.success){ if(ext!=undefined) ext(res)} else { msgInfo.show(res.msg)}},'json').fail(function(e) { pub.wait(d,false); pub.ajax_fail(e)})}
	//--------------
	pub.putLocal=function(key,val){ localStorage.setItem(key,JSON.stringify(val))}
	pub.getLocal=function(key){ return JSON.parse(localStorage.getItem(key))}
	pub.removePID = function(pid){ if(pub.dbtable.length==0) return; var a=pub.dbtable, i=0, j=a.length; do{ if(a[i].pid.indexOf(pid)==-1) i++; else{ a.splice(i,1); j=a.length } if(i>=j) return }while(true)}
	//================
	return pub;
}());

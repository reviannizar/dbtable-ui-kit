/*
dbtable bs4 ver 0.0.1.0

Copy Right (c)2018
author	: Abu Dzunnuraini
email	: almprokdr@gmail.com
*/
var dbrtop=(function(pid,obj,opt){
	"use strict";
	var pub={};
	pub.init=function (){ pub.render()}
	pub.render=function (){
		var a=pid+'-'+obj+'-head', o=$('.'+a),n='',b='';
		$.each(opt,function(k,v){
			var c=v.icon==undefined?'':'<i class="fa '+v.icon+'"></i>',k=v.action==undefined?'':' onclick="'+v.action+'"', l=v.link==undefined?'':' href="'+v.link+'"';
			n+=v.title[0]=='-'?'<span class="dbtable-toolbar-spc">&nbsp;</span>':'<a class="btn btn-sm btn-default" title="'+v.title+'"'+l+k+'>'+c+'</a> ';
		});
		b+='<div class="box-tools" style="top:10px;">'+n+'</div>';
		o.append(b);
	}
	pub.init();
	return pub;
})

var dbtool=(function(pid,obj,opt,tbar){
	"use strict";
	var pub={};
	pub.init=function (){ pub.render()}
	pub.render=function (){
		var a=pid+'-'+obj+'-head', o=$('.'+a),m='',n='',b='',title,dataopts=JSON.stringify({pid:pid,obj:obj});//
		$.each(tbar,function(k,v){
			var c=v.icon==undefined?'':'<i class="fa '+v.icon+'"></i>',k=v.action==undefined?'':' onclick="'+v.action+'"', l=v.link==undefined?'':' href="'+v.link+'"',q=typeof(v.btn)=='undefined'?'primary':v.btn;
			if((v.upload!=undefined)&&(v.upload)){
				var p=v.accept==undefined?'':' accept="'+v.accept+'"',u=pid+'-'+(v.id==undefined?'upload':v.id);
				n+='<div class="btn btn-icon btn-round btn-'+q+' btn-file" title="'+v.title+'">'+c+'<input id="'+u+'" type="file" name="files[]"'+p+'></div>';
			}else{
				if((typeof(v.hide)=='undefined')||(!v.hide)){
					m+=v.title[0]=='-'?'<div class="dropdown-divider"></div>':'<a class="dropdown-item" title="'+v.title+'"'+l+k+'>'+c+'<span style="margin-left:10px">'+v.title+'</span></a>';
					n+=v.title[0]=='-'?'<span class="dbtable-toolbar-spc">&nbsp;</span>':'<button class="btn btn-icon btn-round btn-'+q+'" title="'+v.title+'"'+l+k+'>'+c+'</button> ';
				}
			}
		});
		title=opt.title==''?'':'<h3 class="box-title dbtable-title d-none d-md-block" style="font-size:150%">'+opt.title+'</h3>';
		title+=typeof(opt.xs_title)=='undefined'?'':'<h3 class="box-title dbtable-title d-md-none" style="font-size:120%;float:right;margin-right:30px;">'+(opt.xs_title==''?opt.title:opt.xs_title)+'</h3>';
		b='<div class="dbtable-div-title '+pid+'-dbtable-'+obj+'-title">'+title+'</div><div class="btn-group d-md-none"><button class="btn btn-round btn-warning dropdown-toggle" data-toggle="dropdown"></button><div class="dropdown-menu" data-opts=\''+dataopts+'\'>';
		b+=m+'</div></div><div class="d-none d-md-block" data-opts=\''+dataopts+'\'>'+n+'</div>';
		o.append(b);
	}
	pub.init();
	return pub;
})

var dbfind=(function(pid,obj,opt){
	"use strict";
	var pub={'data':{searchtype:'',searchdata:'',searchvalue:''}};
	pub.init=function (){ pub.obj=pid+'-'+obj+'-head'; pub.render()}
	pub.render=function (){
		var i=pid+'.'+obj,a=pub.obj, o=$('.'+a), b='<input type="text" class="form-control input-sm pull-right '+a+'-find" onkeyup="'+i+'.findbar.keyup(this)" placeholder="Search">', c='';
		$.each(opt,function(k,v){ c+=k[0]=='-'?'<div class="dropdown-divider"></div>':'<a class="dropdown-item" onclick="'+i+'.findbar.start(\''+k+'\')">'+v+'</a>'});
		b+='<div class="input-group-btn" style="padding:0"><button class="btn btn-round btn-default dropdown-toggle" data-toggle="dropdown" style="margin:0"><i class="fa fa-search"></i></button><div class="dropdown-menu">'+c+'</div></div></div>';
		o.append('<div class="box-tools" style="top:10px;position:absolute;right:25px;"><div class="input-group"style="width:200px;">'+b+'</div></div>');
	}
	pub.start=function (o){
		if(pub.data.searchvalue==''){ msgInfo.show('kata kunci harus diisi dahulu...'); $('.'+pub.obj+'-find').focus(); return }
		var t=window[pid][obj];
		$.extend(pub.data,{searchtype:o.substr(0,3),searchdata:o.substr(4,100)});
		t.setPageBar(1); t.reload();
	}
	pub.keyup=function (o){
		var a=$(o).val(),t=window[pid][obj],key=window.event.keyCode; pub.data.searchvalue=a;
		if(a==''){
			$.extend(pub.data,{searchtype:'',searchdata:'',searchvalue:''});
			t.reload();
		}
	}
	pub.init();
	return pub;
})

var dbpage=(function(pid,obj,opt){
	"use strict";
	var pub={'data':{'rows':10,'page':1},'total':-1};
	pub.init=function (){ pub.render()}
	pub.render=function (){
		var a=pid+'-'+obj+'-foot', u=pid+'.'+obj,t=u+'.pagebar', o=$('.'+a), b='', s='', d=pub.data;
		b+='<div style="padding:10px 0 10px 10px">';
		b+='<select class="dbtable-page-list '+a+'-list" onchange="'+t+'.list(this)" style="float:left">';
		$.each(opt.pagelist,function(k,v){ b+='<option value="'+v+'">'+v+'</option>' });
		b+='</select>';
		b+='<ul class="pagination '+a+'-pagination" style="margin-bottom:5px">';
		b+='<li class="page-item"><a class="page-link" title="First" onclick="'+t+'.page(1)"><i class="fa fa-angle-double-left"></i></a></li>';
		b+='<li class="page-item"><a class="page-link" title="Previous" onclick="'+t+'.page(2)"><i class="fa fa-arrow-circle-left"></i></a></li>';
		b+='<li class="page-item"><a class="page-link" style="padding:0"><input type="text" class="dbtable-page-input '+a+'-input" onkeypress="return '+t+'.inkey(event)"/></a></li>';
		b+='<li class="page-item"><a class="page-link" title="Next" onclick="'+t+'.page(3)"><i class="fa fa-arrow-circle-right"></i></a></li>';
		b+='<li class="page-item"><a class="page-link" title="Last" onclick="'+t+'.page(4)"><i class="fa fa-angle-double-right"></i></a></li>';
		b+='<li class="page-item"><a class="page-link" title="Reload" onclick="'+t+'.page(5)"><i class="fa fa-refresh"></i></a></li>';
		b+='</ul>';
		b+='</div>';
		o.append(b); d.rows=opt.pagesize;
		$('.'+a+'-list').val(d.rows); $('.'+a+'-input').val(d.page); 
	}
	pub.list=function (o){ 
		var a=$(o).val(),b=pub.data,t=window[pid][obj]; b.rows=a; 
		var p=Math.round(pub.total/b.rows),d=$('.'+pid+'-'+obj+'-foot-input'); p=p==0?1:p;
		if(parseInt(d.val())>p){ d.val(p); b.page=p}
		t.reload()
	}
	pub.page=function (n){
		var a='.'+pid+'-'+obj+'-foot-input', b=pub.data,t=window[pid][obj],p=Math.ceil(pub.total/b.rows),d=$('.'+pid+'-'+obj+'-foot-input');
		switch(n){
			case 1: if(b.page==1)return; else b.page=1; break;
			case 2: b.page--; if(b.page<1){ b.page=1; return } break;
			case 3: b.page++; if(b.page>p){ b.page=p; return } break;
			case 4: if(b.page==p)return; else b.page=p; break;
			case 5: break;
		}
		d.val(b.page);
		t.reload();
	}
	pub.setTotal=function (i){ pub.total=parseInt(i)}
	pub.inkey=function (e){
		var k; if(window.event) k=window.event.keyCode; else if(e) k=e.which; if((k>=48)&&(k<57)) return true; 
		if(k==13){
			var b=pub.data,p=Math.round(pub.total/b.rows),d=$('.'+pid+'-'+obj+'-foot-input'),t=window[pid][obj],m=parseInt(d.val());
			if(m>p){ m=p; d.val(p)} if(b.page!=m){ b.page=m; t.reload()}
		}	
		return false;
	}
	pub.init();
	return pub;
})

var dbnopage=(function(pid,obj,url){
	"use strict";
	var pub={};
	pub.init=function (){ pub.render()}
	pub.render=function (){
		var a=pid+'-'+obj+'-foot', o=$('.'+a),t=pid+'.'+obj, b='';
		b+='<div style="padding:10px 0">';
		b+='<ul class="pagination '+a+'-pagination" style="">';
		b+='<li class="page-item"><a class="page-link" title="Reload" onclick="'+t+'.reload()"><i class="fa fa-refresh"></i></a></li>';
		b+='</ul>';
		b+='</div>';
		if((url!=undefined)&&(url!='')) o.append(b);
	}
	pub.init();
	return pub;
})

var dbcolresize=(function(pid,obj,opt){
	"use strict";
	var pub={},trg,startPos,newWidth,line,leftPos,sdrag,minWidth=15;
	pub.init=function (){ 
		trg=opt.trg; line=trg+'-rzdsp';
		$('.'+trg+'-rz').on('mousedown.'+trg+'-rz'+' touchstart.'+trg+'-rz', pub.startDragging)
	}
	pub.tcss=function (){ var o=''; $.each(opt.css,function(k,v){o+='.'+v.class+'{'+(v.width==0?'':'width:'+v.width+'px;')+(v.align==''?'':'text-align:'+v.align)+'}\n'}); return o}
	pub.noop=function (e) { e.stopPropagation(); e.preventDefault()}
	pub.startDragging=function (e) {
		if(e.preventDefault){ e.preventDefault()}	
		var el=$('.'+trg),id=trg+'-rz';
		startPos=pub.getMousePos(e);
		startPos.width=parseInt(el.width(), 10);
		$(document).on('mousemove.'+id, pub.doDrag);
		$(document).on('mouseup.'+id, pub.stopDragging);
		if (window.Touch || navigator.maxTouchPoints) {
			$(document).on('touchmove.'+id, pub.doDrag);
			$(document).on('touchend.'+id, pub.stopDragging);
		}
		$(document).on('selectstart.'+id, pub.noop); 
		sdrag=false;
		pub.rzdsp()
	}
	pub.rzdsp=function () {
		var a=$('.'+pid+'-'+obj+'-table-header'),
			b=$('.'+trg+'-rz'),
			h=a.parent().parent().height(),
			t=b.parent().position().left+b.width(),
			r=a.position().left,
			p=a.parent().position();
		leftPos=t+r+4;
		a.parent().append('<div class="'+line+'" style="height:'+h+'px;width:4px;background-color:grey;cursor:col-resize;position:absolute;top:'+p.top+'px;left:'+leftPos+'px;">&nbsp;</div>');
	}
	pub.doDrag=function (e) { 
		var pos=pub.getMousePos(e),px=pos.x-startPos.x,lp=leftPos+px; newWidth=startPos.width+px; 
		$('.'+line).css('left',lp+'px');
		sdrag=true;
	}
	pub.stopDragging=function (e) {
		var id=trg+'-rz';
		if(sdrag){ 
			opt.css[opt.key].width=newWidth<minWidth?minWidth:newWidth;
			$('.'+pid+'-'+obj+'-css').text(pub.tcss());
		}
		e.stopPropagation(); e.preventDefault();
		$(document).off('mousemove.'+id);
		$(document).off('mouseup.'+id);
		if (window.Touch || navigator.maxTouchPoints) {
			$(document).off('touchmove.'+id);
			$(document).off('touchend.'+id);
		}
		$(document).off('selectstart.' +id,pub.noop);
		$('.'+line).remove();
		return false;
	}
	pub.getMousePos=function (e) {
		var pos = { x: 0, y: 0, width: 0, height: 0 };
		if (typeof e.clientX === "number") {
			pos.x = e.clientX; pos.y = e.clientY;
		} else if (e.originalEvent.touches) {
			pos.x = e.originalEvent.touches[0].clientX; pos.y = e.originalEvent.touches[0].clientY;
		} else return null;
		return pos;
	}
	pub.init();
	return pub;
})

var dbtable=(function(opt){
	"use strict";
	const
		_M_TABLE_ = 1,
		_M_TILES_ = 2;
	var pub={},css=[],VERSION = '0.1.0',hpage=0,hbody,fresize=false,model;
	pub.init=function (){
		pub.nice=typeof(pub.nice)=='undefined'?false:pub.nice;
		$.extend(pub,opt);
		model=pub.options.table!=undefined?_M_TABLE_:(pub.options.tiles!=undefined?_M_TILES_:false);
		$.extend(pub,{'order':{'index':-1,'sts':0,'field':''},'table':{'index':-1,'obj':{},'width':0},'cols':[],'data':{}}); 
		pub.box();
		if(pub.toolbar!=undefined) pub.toolbar = new dbtool(pub.pid, pub.obj, pub.options, pub.toolbar);
		if(pub.rtopbar!=undefined) pub.rtopbar = new dbrtop(pub.pid, pub.obj, pub.rtopbar);
		if(pub.findbar!=undefined) pub.findbar = new dbfind(pub.pid, pub.obj, pub.findbar);
		if(pub.pagebar!=undefined) pub.pagebar = new dbpage(pub.pid, pub.obj, pub.pagebar); else new dbnopage(pub.pid, pub.obj, pub.options.url);
		pub.reload(); var u=pub.pid+'-'+pub.obj,a='.'+u; libs.dbtable.push({'pid':u,'hpage':hpage,'socketID':pub.options.socketID==undefined?false:pub.options.socketID});
		$(a+'-list').scroll(function(event){ 
			var b=$(this).scrollTop(),l=$(this).scrollLeft(); 
			$(a+'-table-header').css('left',(-l)+'px');
		});
		if(pub.pagebar!=undefined) {
			var w=$(window).width(),pi=$('.dbtable-page-input');
			if(w<992) pi.attr('disabled','disabled'); 
		}
		if(typeof(pub.options.footerInfo)!='undefined') pub.footerInfo(pub.options.footerInfo)
		//	console.log(model);
	}
	pub.box=function (){
		var p=((typeof(pub.pagebar)=='undefined')&&((typeof(pub.options.url)!='undefined')&&(pub.options.url=='')))?150:200;
		var r=((typeof(pub.options.height)!='undefined')&&(pub.options.height!='auto'))?pub.options.height:$(window).height();
		var a=pub.pid+'-'+pub.obj, m=(r<250?250:r)-p; hbody=m;
		var h='<div class="box-header '+a+'-head" style="margin-bottom:0;padding: 0 10px;"></div>',
			b='<div class="box-body dbtable-box" style="max-height:'+m+'px;overflow:hidden;"><div class="'+a+'-body dbtable-box-body" style="height:'+m+'px">'+pub.thead(pub.pid,pub.obj,pub.options)+'</div></div>',
			f='<div class="box-footer dbtable-footer '+a+'-foot"></div>',
			o=$('.'+a);
		o.append('<style type="text/css" class="'+a+'-css" dbtable="true">'+pub.tcss()+'</style>');
		o.append(h+b+f);
		var q=$('.'+a+'-list'); if(pub.nice) q.niceScroll(); else q.css('overflow','auto');
		if(model==_M_TABLE_) pub.resizeInit(pub.pid,pub.obj,pub.options.table);
	}
	pub.toTop=function (){ var a='.'+pub.pid+'-'+pub.obj+'-list',b=$(a),c=b.scrollTop(); if(c>0){ c-=35; if(c<0)c=0; b.scrollTop(c)}}
	pub.tcss=function (){ var o=''; $.each(css,function(k,v){o+='.'+v.class+'{'+(v.width==0?'':'width:'+v.width+'px;')+(v.align==''?'':'text-align:'+v.align)+'}\n'}); return o}
	pub.headcss=function (a){ var o=''; if(typeof(a)=='object'){ o+=' style="'; $.each(a,function(k,v){o+=k+':'+v+';'}); o+='"'} return o}
	pub.thead=function (pid,obj,t){ 
		switch(model){
			case _M_TABLE_: return pub.theadTable(pid,obj,t.table); break;
			case _M_TILES_: return pub.theadTiles(pid,obj,t.tiles); break;
			default: return '';
		}
	}
	pub.theadTiles=function (pid,obj,t){ var o='<div class="dbtable-tiles '+pid+'-'+obj+'-list" style="height:'+(hbody-(hpage+2))+'px;border-top: 1px solid #ddd;"></div>'; return o}
	//------------
	// Resize col
	//============
	pub.resizeInit=function (pid,obj,t){
		var i=0;
		$.each(t,function(c,d){
			if(d.length>0) $.each(d,function(k,v){
				if(typeof(v.field)!='undefined'){
					var a={}; $.extend(a,v,{key:i++,trg:pid+'-'+obj+'-cel-'+v.field,css:css});
					new dbcolresize(pid,obj,a)
				}
			})
		})
	}
	pub.theadTable=function (pid,obj,t){
		var o='',a=pid+'.'+obj,b='',idx=0,tid='',col=pub.cols,bd=((pub.options.border!=undefined)&&(pub.options.border))?' table-bordered':'',rs='',cs='',wh='',ss='',sc=1;
		b+='<tbody class="dbtable-header">';
		$.each(t,function(c,d){
			if(d.length>0){
				b+='<tr>'; var i=0,j=d.length-1;
				$.each(d,function(k,v){
					k=i==0?'border-left:none;':''; if(i==j)k='border-right:none;';
					cs=v.colspan==undefined?'':'colspan="'+v.colspan+'" '; rs=v.rowspan==undefined?'':'rowspan="'+v.rowspan+'" '; wh=v.width==undefined?'':'width:'+v.width+'px';
					ss=pid+'-'+obj+'-cel-'+(v.field==undefined?(sc++):v.field); 
					if(typeof(v.field)!='undefined') css.push({'class':ss,'width':(v.width==undefined?0:v.width),'align':(v.align==undefined?'':v.align)});
					tid=typeof(v.field)=='undefined'?'':'id="'+v.field+'" ';
					b+='<td class="'+ss+'-td" '+cs+rs+'onmouseover="'+a+'.mouse(this,1)" onmouseout="'+a+'.mouse(this,2)" style="'+k+'vertical-align:middle;padding:8px 4px 8px 8px;'+wh+'">';
					b+='<div class="dbtable-cel-resize '+ss+'-rz" style="'+(typeof(v.field)=='undefined'?'':'cursor:col-resize;')+'padding-right:4px">';
					b+='<div '+tid+'class="dbtable-cel '+ss+'"'+pub.headcss(v.title_style)+' onclick="'+a+'.shorts(this,'+(idx++)+')">'+v.title+'</div>';
					b+='</div>'; 
					b+='</td>'; i++;
					v.css=ss; col.push(v);;
				});
				b+='</tr>';
				hpage+=50;
			}
		});
		b+='</tbody>';
		o='<div style="overflow:hidden"><table class="table'+bd+' '+pid+'-'+obj+'-table-header dbtable-head-list">'+b+'</table></div>';
		o+='<div class="'+pid+'-'+obj+'-list" style="height:'+(hbody-(hpage))+'px" onkeydown="return '+pub.pid+'.'+pub.obj+'.panelKeyDown(event)"></div>';
		return o;
	}
	//==========
	//oooooooooo
	pub.tbody=function (pid,obj){ 
		switch(model){
			case _M_TABLE_: return pub.tbodyTable(pid,obj); break;
			case _M_TILES_: return pub.tbodyTiles(pid,obj); break;
			default: return '';
		}
	}
	pub.tbodyTiles=function (pid,obj){
		var a=pid+'.'+obj,b='',c=pub.options.tiles,d=pub.data.rows,s='',t='';
		if(d.length>0){
			$.each(d,function(g,h){
				var i=0,j=d.length-1; 
				b+='<div data=\'{"index":'+g+'}\' onclick="'+a+'.mouse(this,5)" oncontextmenu="return '+a+'.mouse(this,6)" class="dbtable-tile '+pid+'-'+obj+'-'+g+(g%2==0?'':' dbtable-cel-strip')+'">';
				s=c.image.style==undefined?'':' style="'+c.image.style+'"';
				t=c.image.action==undefined?'':' onclick="'+c.image.action+'('+g+')"';
				b+='<img src="'+h[c.image.field]+'" alt=""'+s+t+'>';
				if(c.action!=undefined){
					s=(typeof(c.action)=='string')? new Function('g','h','return '+c.action+'(g,h)')(g,h):c.action(g,h);
					b+='<div class="tile-action">'+s+'</div>';
				}
				b+='<div class="tile-contents">';
				$.each(c.content,function(m,n){
					s=n.style==undefined?'':' style="'+n.style+'"';
					t=n.action==undefined?'':' onclick="'+n.action+'('+g+')"';
					b+='<div class="tile-content'+(n.class==undefined?'':(' '+n.class))+'"'+s+t+'>'+h[n.field]+'</div>';
				});
				b+='</div></div>';
			});
		}
		if(pub.pagebar!=undefined) pub.pagebar.setTotal(pub.data.total);
		return c.html==undefined?b:c.html;
	}
	pub.tbodyTable=function (pid,obj){
		var a=pid+'.'+obj,b='',c=pub.cols,d=pub.data.rows,o='',s='',t='',bd=((pub.options.border!=undefined)&&(pub.options.border))?' table-bordered':'';
		var wrap=((typeof(pub.options.wrap)!='undefined')&&(pub.options.wrap))?'-wrap':'';
		if(d.length>0){
			$.each(d,function(g,h){
				var i=0,j=d.length-1,rs=pub.rowStyler==undefined?'':(' style="'+pub.rowStyler(g,h)+'"'); d[g].index=g;
				b+='<tr data=\'{"index":'+g+'}\' onclick="'+a+'.mouse(this,5)" oncontextmenu="return '+a+'.mouse(this,6)" class="'+pid+'-'+obj+'-'+g+(g%2==0?'':' dbtable-cel-strip')+'"'+rs+'>';
				$.each(c,function(k,v){
					s=h[v.field]; s=s==undefined?'':s; t=s;
					if(v.formatter!=undefined) s=(typeof(v.formatter)=='string')? new Function('s','h','return '+v.formatter+'(s,h)')(s,h):v.formatter(s,h);
					k=i==0?'border-left:none;':''; if(i==j)k='border-right:none;';
					b+=((v.field==undefined)||(v.field==''))?'':('<td style="'+k+'padding:5px 8px;"><div title="'+t+'"'+(v.field==undefined?'':' id="'+v.field+'"')+'" class="'+v.css+' dbtable-cel'+wrap+'">'+s+'</div></td>');
					//console.log(v); $('._c9f0-dg-cel-no').parent().css('width','30px');
				});
				b+='</tr>';
			});
		}
		if(pub.pagebar!=undefined) pub.pagebar.setTotal(pub.data.total);
		o='<table class="table table-hover'+bd+'" style="margin:0;width:100px">'+b+'</table>';
		return o;
	}
	pub.setPageBar=function(v){ if(pub.pagebar==undefined) pub.reload(); else pub.pagebar.page(v)}
	pub.loadajax=function (){
		var a={},b=pub.order,d=pub.pid+'-'+pub.obj,o='.'+d+'-list'; if(pub.pagebar!=undefined) $.extend(a,pub.pagebar.data);
		if(b.sts>0) $.extend(a,{sort:b.field,order:(b.sts==1?'asc':'desc')});
		if(pub.findbar!=undefined){ var f=pub.findbar.data; if((f.searchdata!='')&&(f.searchvalue!='')) $.extend(a,f)} libs.wait(d,true); 
		$.ajax({url:pub.options.url,data:a,type:'POST'}).done(function(data){ 
			libs.wait(d,false); pub.data=typeof(data)=='object'?data:JSON.parse(data); 
			$(o).html(pub.tbody(pub.pid,pub.obj));
			if(pub.onLoadSuccess!=undefined) pub.onLoadSuccess(pub.data);
		}).fail(function(jqXHR, textStatus){libs.wait(d,false);libs.ajax_fail()})
	}
	pub.reload=function (){ if((pub.options.url!=undefined)&&(pub.options.url!='')) pub.loadajax()}
	pub.clearData=function (){ pub.data={total:0,rows:[]}; pub.refresh()}
	pub.refresh=function (){ var d=pub.pid+'-'+pub.obj,o='.'+d+'-list'; $(o).html(pub.tbody(pub.pid,pub.obj))}
	pub.loadData=function (data){
		switch(typeof(data)){
			case 'object':
				var d=pub.pid+'-'+pub.obj,o='.'+d+'-list'; 
				pub.data=data; $(o).html(pub.tbody(pub.pid,pub.obj));
				if(pub.onLoadSuccess!=undefined) pub.onLoadSuccess(pub.data);
				break;
			case 'string':
				pub.options.url=data;
				pub.loadajax();
				break;
		}
	}
	pub.touch=function (e){}
	pub.mouse=function (a,s){
		var o=$(a);
		switch(s){
			case 1: o.addClass('dbtable-cel-head-hover');  break;
			case 2: o.removeClass('dbtable-cel-head-hover'); break;
			case 5: 
			case 6: 
				var d=JSON.parse(o.attr('data')),e=pub.table,i=d.index; 
				if(e.index!=-1) e.obj.removeClass('dbtable-cel-select');
				e.index=i; e.obj=o; e.obj.addClass('dbtable-cel-select');
				switch(s){
					case 5: if(pub.onSelect!=undefined) pub.onSelect(i,pub.data.rows[i]); break;
					case 6: if(pub.onContextMenu!=undefined){ pub.onContextMenu(i,pub.data.rows[i]); return false }else return true; break;
				}
				break;
		}
	}
	pub.panelKeyDown=function (e){ if((pub.onPanelKeyDown!=undefined)&&(typeof(pub.onPanelKeyDown)=='function')) pub.onPanelKeyDown(e,pub.table.index,pub.data.rows.length)}
	pub.getVersion=function (){ return VERSION }
	pub.getData=function (){ return pub.data }
	pub.getIndex=function (){ return pub.table.index }
	pub.getCount=function (){ return pub.data.rows.length }
	pub.getCurrentRow=function (){ return pub.data.rows[pub.table.index] }
	pub.getRow=function (i){ return pub.data.rows[i] }
	pub.selectRow=function (i){ $('.'+pub.pid+'-'+pub.obj+'-'+i).trigger('click')}
	pub.updateRow=function (i,r){ if(i<pub.data.rows.length){ pub.data.rows[i]=r; pub.refresh()}}
	pub.updateCurrentRow=function (r){ return pub.updateRow(pub.table.index,r)}
	pub.shorts=function (a,i){
		var b=pub.order,c=pub.cols[i],o=$(a); if(!c.sortable) return;
		if(b.index!=i){
			if(b.index!=-1) b.obj.html(b.title);
			b.index=i; b.sts=0; b.obj=o; b.title=c.title; b.field=c.field;
		}
		b.sts++; if(b.sts==3) b.sts=0;
		switch(b.sts){
			case 0: o.html(c.title); break;
			case 1: o.html(c.title+' <i class="fa fa-sort-amount-asc text-red"></i>'); break;
			case 2: o.html(c.title+' <i class="fa fa-sort-amount-desc text-blue"></i>'); break;
		}
		pub.reload();
	}
	//----------
	//!!!!!!!!!!
	pub.printContent = function (){
		var a=pub.pid+'-'+pub.obj,t=pub.options.table,s='',rs='',cs='',wh='',out='',th=0,zh=0,hdr='',stl='';
		$.each(t,function(c,d){
			if(d.length>0){
				hdr+='<tr>'; var i=0,j=d.length-1;
				$.each(d,function(k,v){
					k=i==0?'border-left:none;':''; if(i==j)k='border-right:none;';
					cs=v.colspan==undefined?'':'colspan="'+v.colspan+'" '; rs=v.rowspan==undefined?'':'rowspan="'+v.rowspan+'" '; 
					if(typeof(v.width)=='undefined'){ wh=''; }else{
						th+=v.width; zh++;
						wh='width:'+v.width+'px';
					}
					stl=(typeof(v.title_style)=='object')?pub.headcss(v.title_style):('style="'+wh+';'+(typeof(v.align)=='undefined'?'':('text-align:'+v.align+';font-size:13px;'))+'"');
					hdr+='<td '+cs+rs+'style="'+k+'vertical-align:middle;padding:8px 4px 8px 8px;'+wh+'">';
					hdr+='<div '+stl+'>'+v.title+'</div>';
					hdr+='</td>'; i++;
				});
				hdr+='</tr>';
			}
		});
		//
		out+='<center>';
		out+='<div style="padding:0 10px">';
		out+='<h3 class="box-title dbtable-title" style="font-size:150%">'+pub.options.title+'</h3>';
		out+='<div style="width:'+(th+(zh*17))+'px">';
		out+='<table class="table table-bordered table-striped '+a+'-print" style="margin:0;width:'+th+'px">'; // table-responsive
		out+='<thead>'+hdr+'</thead>';
		out+='<tbody>';
		var c=pub.cols,d=pub.data.rows;
		if(d.length>0){
			$.each(d,function(g,h){
				var i=0,j=d.length-1; d[g].index=g;
				out+='<tr>';
				$.each(c,function(k,v){
					s=h[v.field]; s=s==undefined?'':s;
					wh=v.width==undefined?'':'width:'+v.width+'px';
					if(v.formatter!=undefined) s=(typeof(v.formatter)=='string')? new Function('s','h','return '+v.formatter+'(s,h)')(s,h):v.formatter(s,h);
					out+=((v.field==undefined)||(v.field==''))?'':('<td style="padding:5px 8px;"><div style="'+wh+';'+(typeof(v.align)=='undefined'?'':('text-align:'+v.align+';'))+'">'+s+'</div></td>');
				});
				out+='</tr>';
			});
		}
		out+='';
		out+='</tbody>';
		out+='</table>';
		if(typeof(pub.options.footerInfo)!='undefined') out+='<div style="float:right;font-size:80%;margin:10px 0">'+pub.options.footerInfo.text+'</div>';
		out+='</div>';
		out+='</div>';
		out+='</center>';
		//console.log(pub.data)
		printPreview.show(out,pub.nice)
	}
	//----------
	pub.footerInfo=function (s){
		//console.log(s);
		var a=$('.'+pub.pid+'-'+pub.obj+'-foot-pagination'),color=typeof(s.color)=='undefined'?'#004':s.color;
		if(a.length>0){ 
			a.append('<li class="d-none d-md-block" style="width:100%;text-align:right;padding: 8px 10px 0 0;"><span style="font-size:80%;color:'+color+'">'+s.text+'</span></li>')
			a.parent().append('<span class="d-md-none" style="font-size:80%;float:right;color:'+color+'">'+s.text+'</span>')
		}else{
			$('.'+pub.pid+'-'+pub.obj+'-foot').append('<span style="padding-top:5px;font-size:80%;float:right;color:'+color+'">'+s.text+'</span>')
	}	}
	pub.init();
	return pub;
})
/*
var s=new Function('return {_drd:'+pub.onLoadSuccess+'}')(); s._drd(pub.data)
*/



!function(t,e,r,s,n){function a(e){e=e.split(")");var r,n,a,i=t.trim,o=-1,c=e.length-1,p=O?new Float32Array(6):[],l=O?new Float32Array(6):[],f=O?new Float32Array(6):[1,0,0,1,0,0];for(p[0]=p[3]=f[0]=f[3]=1,p[1]=p[2]=p[4]=p[5]=0;++o<c;){switch(r=e[o].split("("),n=i(r[0]),a=r[1],l[0]=l[3]=1,l[1]=l[2]=l[4]=l[5]=0,n){case Y+"X":l[4]=parseInt(a,10);break;case Y+"Y":l[5]=parseInt(a,10);break;case Y:a=a.split(","),l[4]=parseInt(a[0],10),l[5]=parseInt(a[1]||0,10);break;case j:a=u(a),l[0]=s.cos(a),l[1]=s.sin(a),l[2]=-s.sin(a),l[3]=s.cos(a);break;case H+"X":l[0]=+a;break;case H+"Y":l[3]=a;break;case H:a=a.split(","),l[0]=a[0],l[3]=a.length>1?a[1]:a[0];break;case $+"X":l[2]=s.tan(u(a));break;case $+"Y":l[1]=s.tan(u(a));break;case z:a=a.split(","),l[0]=a[0],l[1]=a[1],l[2]=a[2],l[3]=a[3],l[4]=parseInt(a[4],10),l[5]=parseInt(a[5],10)}f[0]=p[0]*l[0]+p[2]*l[1],f[1]=p[1]*l[0]+p[3]*l[1],f[2]=p[0]*l[2]+p[2]*l[3],f[3]=p[1]*l[2]+p[3]*l[3],f[4]=p[0]*l[4]+p[2]*l[5]+p[4],f[5]=p[1]*l[4]+p[3]*l[5]+p[5],p=[f[0],f[1],f[2],f[3],f[4],f[5]]}return f}function i(t){var e,r,n,a=t[0],i=t[1],o=t[2],c=t[3];return a*c-i*o?(e=s.sqrt(a*a+i*i),a/=e,i/=e,n=a*o+i*c,o-=a*n,c-=i*n,r=s.sqrt(o*o+c*c),o/=r,c/=r,n/=r,i*o>a*c&&(a=-a,i=-i,n=-n,e=-e)):e=r=n=0,[[Y,[+t[4],+t[5]]],[j,s.atan2(i,a)],[$+"X",s.atan(n)],[H,[e,r]]]}function o(e,r){var s,n,o,u,m={start:[],end:[]},x=-1;if(("none"==e||p(e))&&(e=""),("none"==r||p(r))&&(r=""),e&&r&&!r.indexOf("matrix")&&g(e).join()==g(r.split(")")[0]).join()&&(m.origin=e,e="",r=r.slice(r.indexOf(")")+1)),e||r){if(e&&r&&l(e)!=l(r))m.start=i(a(e)),m.end=i(a(r));else for(e&&(e=e.split(")"))&&(s=e.length),r&&(r=r.split(")"))&&(s=r.length);++x<s-1;)e[x]&&(n=e[x].split("(")),r[x]&&(o=r[x].split("(")),u=t.trim((n||o)[0]),f(m.start,c(u,n?n[1]:0)),f(m.end,c(u,o?o[1]:0));return m}}function c(t,e){var r,s=+!t.indexOf(H),n=t.replace(/e[XY]/,"e");switch(t){case Y+"Y":case H+"Y":e=[s,e?parseFloat(e):s];break;case Y+"X":case Y:case H+"X":r=1;case H:e=e?(e=e.split(","))&&[parseFloat(e[0]),parseFloat(e.length>1?e[1]:t==H?r||e[0]:s+"")]:[s,s];break;case $+"X":case $+"Y":case j:e=e?u(e):0;break;case z:return i(e?g(e):[1,0,0,1,0,0])}return[[n,e]]}function p(t){return v.test(t)}function l(t){return t.replace(/(?:\([^)]*\))|\s/g,"")}function f(t,e,r){for(;r=e.shift();)t.push(r)}function u(t){return~t.indexOf("deg")?parseInt(t,10)*(2*s.PI/360):~t.indexOf("grad")?parseInt(t,10)*(s.PI/200):parseFloat(t)}function g(t){return t=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(t),[t[1],t[2],t[3],t[4],t[5],t[6]]}for(var m,x,d,k,h=r.createElement("div"),y=h.style,b="Transform",I=["O"+b,"ms"+b,"Webkit"+b,"Moz"+b],M=I.length,O=("Float32Array"in e),X=/Matrix([^)]*)/,v=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,w="transform",F="transformOrigin",Y="translate",j="rotate",H="scale",$="skew",z="matrix";M--;)I[M]in y&&(t.support[w]=m=I[M],t.support[F]=m+"Origin");m||(t.support.matrixFilter=x=""===y.filter),t.cssNumber[w]=t.cssNumber[F]=!0,m&&m!=w?(t.cssProps[w]=m,t.cssProps[F]=m+"Origin",m=="Moz"+b?d={get:function(e,r){return r?t.css(e,m).split("px").join(""):e.style[m]},set:function(t,e){t.style[m]=/matrix\([^)p]*\)/.test(e)?e.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,z+"$1$2px,$3px"):e}}:/^1\.[0-5](?:\.|$)/.test(t.fn.jquery)&&(d={get:function(e,r){return r?t.css(e,m.replace(/^ms/,"Ms")):e.style[m]}})):x&&(d={get:function(e,r,s){var a,i,o=r&&e.currentStyle?e.currentStyle:e.style;return o&&X.test(o.filter)?(a=RegExp.$1.split(","),a=[a[0].split("=")[1],a[2].split("=")[1],a[1].split("=")[1],a[3].split("=")[1]]):a=[1,0,0,1],t.cssHooks[F]?(i=t._data(e,"transformTranslate",n),a[4]=i?i[0]:0,a[5]=i?i[1]:0):(a[4]=o?parseInt(o.left,10)||0:0,a[5]=o?parseInt(o.top,10)||0:0),s?a:z+"("+a+")"},set:function(e,r,s){var n,i,o,c,p=e.style;s||(p.zoom=1),r=a(r),i=["Matrix(M11="+r[0],"M12="+r[2],"M21="+r[1],"M22="+r[3],"SizingMethod='auto expand'"].join(),o=(n=e.currentStyle)&&n.filter||p.filter||"",p.filter=X.test(o)?o.replace(X,i):o+" progid:DXImageTransform.Microsoft."+i+")",t.cssHooks[F]?t.cssHooks[F].set(e,r):((c=t.transform.centerOrigin)&&(p["margin"==c?"marginLeft":"left"]=-(e.offsetWidth/2)+e.clientWidth/2+"px",p["margin"==c?"marginTop":"top"]=-(e.offsetHeight/2)+e.clientHeight/2+"px"),p.left=r[4]+"px",p.top=r[5]+"px")}}),d&&(t.cssHooks[w]=d),k=d&&d.get||t.css,t.fx.step.transform=function(e){var r,n,a,i,c=e.elem,p=e.start,l=e.end,f=e.pos,u="",g=1e5;for(p&&"string"!=typeof p||(p||(p=k(c,m)),x&&(c.style.zoom=1),l=l.split("+=").join(p),t.extend(e,o(p,l)),p=e.start,l=e.end),r=p.length;r--;)switch(n=p[r],a=l[r],i=0,n[0]){case Y:i="px";case H:i||(i=""),u=n[0]+"("+s.round((n[1][0]+(a[1][0]-n[1][0])*f)*g)/g+i+","+s.round((n[1][1]+(a[1][1]-n[1][1])*f)*g)/g+i+")"+u;break;case $+"X":case $+"Y":case j:u=n[0]+"("+s.round((n[1]+(a[1]-n[1])*f)*g)/g+"rad)"+u}e.origin&&(u=e.origin+u),d&&d.set?d.set(c,u,1):c.style[m]=u},t.transform={centerOrigin:"margin"}}(jQuery,window,document,Math);

!function(t){function a(a,n,o){if("touch"!==n.substr(0,5))return t(a).unbind(n,o);var d;for(d=0;d<e._binds.length;d++)e._binds[d].elem===a&&e._binds[d].type===n&&e._binds[d].func===o&&(document.addEventListener?a.removeEventListener(n,e._binds[d].fnc,!1):a.detachEvent("on"+n,e._binds[d].fnc),e._binds.splice(d--,1))}function e(a,n,o,d){if("touch"!==n.substr(0,5))return t(a).bind(n,d,o);var s;return e[n]?e[n].bind(a,n,o,d):(s=function(t){t||(t=window.event),t.stopPropagation||(t.stopPropagation=function(){this.cancelBubble=!0}),t.data=d,o.call(a,t)},document.addEventListener?a.addEventListener(n,s,!1):a.attachEvent("on"+n,s),void e._binds.push({elem:a,type:n,func:o,fnc:s}))}function n(t,a){var n={move:{x:0,y:0},offset:{x:0,y:0},position:{x:0,y:0},start:{x:0,y:0},affects:document.documentElement,stopPropagation:!1,preventDefault:!0,touch:!0};u(n,a),n.element=t,e(t,c,d,n),n.touch&&e(t,g,i,n)}function o(t){a(t,c,c)}function d(t){t.data.position.x=t.pageX,t.data.position.y=t.pageY,t.data.start.x=t.pageX,t.data.start.y=t.pageY,t.data.event=t,t.data.onstart&&t.data.onstart.call(t.data.element,t.data)||(t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.stopPropagation&&t.stopPropagation(),e(t.data.affects,v,s,t.data),e(t.data.affects,l,p,t.data))}function s(t){t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.preventDefault&&t.stopPropagation(),t.data.move.x=t.pageX-t.data.position.x,t.data.move.y=t.pageY-t.data.position.y,t.data.position.x=t.pageX,t.data.position.y=t.pageY,t.data.offset.x=t.pageX-t.data.start.x,t.data.offset.y=t.pageY-t.data.start.y,t.data.event=t,t.data.onmove&&t.data.onmove.call(t.data.element,t.data)}function p(t){t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.stopPropagation&&t.stopPropagation(),a(t.data.affects,v,s),a(t.data.affects,l,p),t.data.event=t,t.data.onfinish&&t.data.onfinish.call(t.data.element,t.data)}function i(t){t.data.position.x=t.touches[0].pageX,t.data.position.y=t.touches[0].pageY,t.data.start.x=t.touches[0].pageX,t.data.start.y=t.touches[0].pageY,t.data.event=t,t.data.onstart&&t.data.onstart.call(t.data.element,t.data)||(t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.stopPropagation&&t.stopPropagation(),e(t.data.affects,h,r,t.data),e(t.data.affects,m,f,t.data))}function r(t){t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.stopPropagation&&t.stopPropagation(),t.data.move.x=t.touches[0].pageX-t.data.position.x,t.data.move.y=t.touches[0].pageY-t.data.position.y,t.data.position.x=t.touches[0].pageX,t.data.position.y=t.touches[0].pageY,t.data.offset.x=t.touches[0].pageX-t.data.start.x,t.data.offset.y=t.touches[0].pageY-t.data.start.y,t.data.event=t,t.data.onmove&&t.data.onmove.call(t.data.elem,t.data)}function f(t){t.preventDefault&&t.data.preventDefault&&t.preventDefault(),t.stopPropagation&&t.data.stopPropagation&&t.stopPropagation(),a(t.data.affects,h,r),a(t.data.affects,m,f),t.data.event=t,t.data.onfinish&&t.data.onfinish.call(t.data.element,t.data)}var u=t.extend,c="mousedown",v="mousemove",l="mouseup",g="touchstart",h="touchmove",m="touchend";e._binds=[],t.fn.grab=function(t,a){return this.each(function(){return n(this,t,a)})},t.fn.ungrab=function(t){return this.each(function(){return o(this,t)})}}(jQuery);
/* Modernizr custom build of 1.7pre: csstransforms */
window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7pre",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.csstransforms=function(){return!!E(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document)
/* CirclePlayer for the jPlayer Plugin (jQuery) */
var CirclePlayer=function(s,e,t){var r=this,i={supplied:"mp3, m4a, oga ",cssSelectorAncestor:"#cp_container_1",cssSelector:{play:".cp-play",pause:".cp-pause"}},a={bufferHolder:".cp-buffer-holder",buffer1:".cp-buffer-1",buffer2:".cp-buffer-2",progressHolder:".cp-progress-holder",progress1:".cp-progress-1",progress2:".cp-progress-2",circleControl:".cp-circle-control"};this.cssClass={gt50:"cp-gt50",fallback:"cp-fallback"},this.spritePitch=104,this.spriteRatio=.24,this.player=$(s),this.media=$.extend({},e),this.options=$.extend(!0,{},i,t),this.cssTransforms=Modernizr.csstransforms,this.audio={},this.dragging=!1,this.eventNamespace=".CirclePlayer",this.jq={},$.each(a,function(s,e){r.jq[s]=$(r.options.cssSelectorAncestor+" "+e)}),this._initSolution(),this._initPlayer()};CirclePlayer.prototype={_createHtml:function(){},_initPlayer:function(){var s=this;this.player.jPlayer(this.options),this.player.bind($.jPlayer.event.ready+this.eventNamespace,function(e){e.jPlayer.html.used&&e.jPlayer.html.audio.available&&(s.audio=$(this).data("jPlayer").htmlElement.audio),$(this).jPlayer("setMedia",s.media)}),this.player.bind($.jPlayer.event.play+this.eventNamespace,function(s){$(this).jPlayer("pauseOthers")}),this.player.bind($.jPlayer.event.timeupdate+this.eventNamespace,function(e){s.dragging||s._timeupdate(e.jPlayer.status.currentPercentAbsolute)}),this.player.bind($.jPlayer.event.progress+this.eventNamespace,function(e){var t=0;if("object"==typeof s.audio.buffered&&s.audio.buffered.length>0){if(s.audio.duration>0){for(var r=0,i=0;i<s.audio.buffered.length;i++)r+=s.audio.buffered.end(i)-s.audio.buffered.start(i);t=100*r/s.audio.duration}}else t=0;s._progress(t)}),this.player.bind($.jPlayer.event.ended+this.eventNamespace,function(e){s._resetSolution()})},_initSolution:function(){this.cssTransforms?(this.jq.progressHolder.show(),this.jq.bufferHolder.show()):(this.jq.progressHolder.addClass(this.cssClass.gt50).show(),this.jq.progress1.addClass(this.cssClass.fallback),this.jq.progress2.hide(),this.jq.bufferHolder.hide()),this._resetSolution()},_resetSolution:function(){this.cssTransforms?(this.jq.progressHolder.removeClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate(0deg)"}),this.jq.progress2.css({transform:"rotate(0deg)"}).hide()):this.jq.progress1.css("background-position","0 "+this.spritePitch+"px")},_initCircleControl:function(){var s=this;this.jq.circleControl.grab({onstart:function(){s.dragging=!0},onmove:function(e){var t=s._getArcPercent(e.position.x,e.position.y);s.player.jPlayer("playHead",t).jPlayer("play"),s._timeupdate(t)},onfinish:function(e){s.dragging=!1;var t=s._getArcPercent(e.position.x,e.position.y);s.player.jPlayer("playHead",t).jPlayer("play")}})},_timeupdate:function(s){var e=3.6*s+"deg",t=(Math.floor(Math.round(s)*this.spriteRatio)-1)*-this.spritePitch;50>=s?this.cssTransforms?(this.jq.progressHolder.removeClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate("+e+")"}),this.jq.progress2.hide()):this.jq.progress1.css("background-position","0 "+t+"px"):100>=s&&(this.cssTransforms?(this.jq.progressHolder.addClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate(180deg)"}),this.jq.progress2.css({transform:"rotate("+e+")"}),this.jq.progress2.show()):this.jq.progress1.css("background-position","0 "+t+"px"))},_progress:function(s){var e=3.6*s+"deg";this.cssTransforms&&(50>=s?(this.jq.bufferHolder.removeClass(this.cssClass.gt50),this.jq.buffer1.css({transform:"rotate("+e+")"}),this.jq.buffer2.hide()):100>=s&&(this.jq.bufferHolder.addClass(this.cssClass.gt50),this.jq.buffer1.css({transform:"rotate(180deg)"}),this.jq.buffer2.show(),this.jq.buffer2.css({transform:"rotate("+e+")"})))},_getArcPercent:function(s,e){var t=this.jq.circleControl.offset(),r=s-t.left-this.jq.circleControl.width()/2,i=e-t.top-this.jq.circleControl.height()/2,a=Math.atan2(i,r);return a>-1*Math.PI&&a<-.5*Math.PI&&(a=2*Math.PI+a),(a+Math.PI/2)/2*Math.PI*10},setMedia:function(s){this.media=$.extend({},s),this.player.jPlayer("setMedia",this.media)},play:function(s){this.player.jPlayer("play",s)},pause:function(s){this.player.jPlayer("pause",s)},destroy:function(){this.player.unbind(this.eventNamespace),this.player.jPlayer("destroy")}};


function update() {
  $('#time, .msk').html(moment().utc().utcOffset(3).format('H:mm:ss'));
  $('.native').html(moment().format('H:mm:ss'));
  
  var time = moment().utc().hour();
  var past = moment().utc().subtract(1, 'hours').hour();
          
			$("[name = "+time+"]").addClass("info");
            $('#city').html($("[name = "+time+"]").find('td').first().text());
			if($("[name = "+past+"]").hasClass("info")) {
				$("[name = "+past+"]").removeClass("info");
			}
}




$(document).ready(function(){
	
setInterval(update, 1000);	
	
var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
	{
		mp3: "https://www.life3.ru/audio/pray/worship_music_hour8.mp3",
		m4a: "https://www.life3.ru/audio/pray/worship_music_hour8.m4a",
		oga: "https://www.life3.ru/audio/pray/worship_music_hour8.ogg"
	}, {
		cssSelectorAncestor: "#cp_container_1",
		loop: true,
		volume: 1,
		wmode: "window",
		keyEnabled: true
	});
	
	setTimeout(function(){
		
		$.post(
		  "/ajax/gettime",
		  {	mode: 'sec' },
		 function (data){
		
		$("#jquery_jplayer_1").jPlayer("play", parseInt(data) );
		
		});
		}, 200);
		
		$(".cp-play").click(function(){
		
		$.post(
		  "/ajax/gettime",
		  {	mode: 'sec' },
		 function (data){
		
		$("#jquery_jplayer_1").jPlayer("play", parseInt(data) );
		
		});
	})	
	
    
});

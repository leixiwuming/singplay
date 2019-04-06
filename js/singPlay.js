	//js多行变量有“\”连接,但歌词文件中存在换行
var lyc="[ar:初音ミク] \/n\
 [ti:千本樱] \/n\
 [00:04.27]呗：初音未来 \/n\
 [00:08.20]曲、词、编曲：黑うさp \/n\
 [00:13.71]翻译：欧丽维亚 \/n\
 [00:16.81]千本樱 \/n\
 [00:32.40]英勇无畏维新革命 \/n\
 [00:35.51]光明磊落反战国家 \/n\
 [00:38.89]乘着有日之丸印记的二轮车 \/n\
 [00:41.95]恶灵退散ICBM \/n\
 [00:44.94]疾行穿过环状线 \/n\
 [00:48.01]东奔西走在所不辞 \/n\
 [00:51.13]少年少女战国无双 \/n\
 [00:54.08]尘世若梦唯有随之沉浮 \/n\
 [00:56.97]千本樱夜中飞散 \/n\
 [01:00.09]你的声音亦无法传达 \/n\
 [01:03.33]铁牢之中宴请众人 \/n\
 [01:06.29]断头台上俯视众生 \/n\
 [01:09.47]大千世界桃园之暗 \/n\
 [01:12.55]悲叹之曲亦不可听闻 \/n\
 [01:15.65]那青蓝苍穹的遥远彼方 \/n\
 [01:18.85]就以那光线枪击穿吧 \/n\
 [01:34.80]百战磨练似是将校之人 \/n\
 [01:37.90]人来人往的花魁道中 \/n\
 [01:41.07]无论是谁全都集结起来 \/n\
 [01:44.13]圣者行进一二三四 \/n\
 [01:47.25]从佛门之地中穿过 \/n\
 [01:50.37]安乐净土消灾除厄 \/n\
 [01:53.23]终焉之幕定是大团圆 \/n\
 [01:56.20]在一片掌声之中 \/n\
 [01:59.22]千本樱夜中飞散 \/n\
 [02:02.45]你的声音亦传达不到 \/n\
 [02:05.54]铁牢之中宴请众人 \/n\
 [02:08.67]断头台上俯视众生 \/n\
 [02:11.76]大千世界桃园之闇 \/n\
 [02:14.89]悲叹之曲亦不可听闻 \/n\
 [02:18.04]朝着希望之丘遥远彼方 \/n\
 [02:21.16]将那闪光弹射上天空！ \/n\
 [02:56.03]疾行穿过环状线 \/n\
 [02:58.87]东奔西走在所不辞 \/n\
 [03:01.99]少年少女战国无双 \/n\
 [03:04.67]尘世若梦唯有随之沉浮 \/n\
 [03:07.95]千本樱夜中飞散 \/n\
 [03:10.99]你的声音亦传达不到 \/n\
 [03:14.14]铁牢之中宴请众人 \/n\
 [03:17.26]自那断头台上跳下！ \/n\
 [03:20.38]千本樱夜中飞散 \/n\
 [03:23.50]你放声歌唱我翩翩起舞 \/n\
 [03:26.57]铁牢之中宴请众人 \/n\
 [03:29.66]全力扣响光线枪的扳机吧";
	var cu=0;
	var ti=0;
	var audio=document.getElementsByTagName("audio")[0];
	
	
	
	
	
	
		var lycarr=lyc.split("/n");
		var timeZ=/\[\d+:\d+.\d+\]/;
		
		
		
		
		for(var i=0; i<lycarr.length;i++){
			//console.log(lycarr[i])
			var time =timeZ.exec(lycarr[i])
			if(timeZ.test(time)){
				var time1=timeZ.exec(lycarr[i])[0]
				var time12=dealtime(time1)
				//console.log(time12)	
			}
			
			var lyc=lycarr[i].replace(timeZ,"").replace("[","").replace("]","")
			//console.log(lyc)
			var li=$("<li></li>")
			var input=$("<input type='hidden'/> ")
			var span=$("<span></span>")
			span.html(lyc)
			input.val(time12);
			input.appendTo(li);
			span.appendTo(li);
			li.appendTo("#lrc")
		}
		function dealtime(time){
			time1= time.replace("[","").replace("]","")
			return time1.split(":")[0]*60+parseFloat(time1.split(":")[1]);
		}
	
	
	
		//$("audio").attr("src",address+"?"+Math.random())
	
	//document.getElementsByTagName("audio")[0].currentTime=90;
	
	//歌词滚动,歌曲结束
	document.getElementsByTagName("audio")[0].ontimeupdate=function(){
		if(audio.ended) $(".Btn img").eq(1).attr("src","images/playbtn.png");
		var au=document.getElementsByTagName("audio")[0];
		$("#lrc input").each(function(index, element) {
            if($(this).val()<=au.currentTime && $("#lrc input").eq(index+1).val()>au.currentTime){
				if($(this).next("span").html()!=""){
					$("#lrc li").removeClass("onlyc")
					$(this).parent("li").addClass("onlyc")
				}
				if($(this).parent("li").position().top>=150&&$(this).parent("li").position().top<=300)	{		
						$("#lrc").scrollTop(function(index,older) {
							if(older>$("#lrc li").length*30-580){
								$("<li></li>").appendTo("#lrc");
							}
							return older+30
						});}
				
				if($(this).parent("li").position().top<=0 ||$(this).parent("li").position().top>=300 ){
/*						var c=$(this).parent("li").position().top;
					 	var c1=c+$("#lrc").scrollTop()-180
						$("#lrc").scrollTop(c1)*/
					if(cu==0){
						cu++;
						setTimeout(function(){
							var c=$("#lrc .onlyc").position().top;
							
							var c1=c+$("#lrc").scrollTop()-120;
							$("#lrc").scrollTop(c1)
							cu--;
							},2000)}
				}
			}
 });
		
	}
$(".Btn img").eq(1).click(function(){
		if(audio.paused){
			audio.play()
			$(".Btn img").eq(1).attr("src","images/zanting.png")
			nowTime();
		}else{
			audio.pause()
			$(".Btn img").eq(1).attr("src","images/playbtn.png")
			clearTimeout(timefun)
		
			}
	})
//
//	$(".Btn").each(function(index, element) {
//        var height=$(this).height()/2;  //改成27px
//		var width=$(this).width()/2;
//		$(this).css({"top":"50%","marginTop":height})
//    });
//	$(".singIm").css({"top":"50%","marginTop":"20px"})
	

audio.onloadedmetadata=function(){	
				
				var ati=audio.duration;
				 ti=parseInt( ati);
				var m=(parseInt( ti/60))>=10?parseInt( ti/60):"0"+parseInt( ti/60);
				var s=(ti%60)>=10?ti%60:"0"+ti%60;
			
				$("#endTime").html(m+":"+s)
				nowTime()
			
		
	
	}
window.onload=function(){
	setTimeout(function(){audio.play()}, 700)
}


	
function nowTime(){
	  	var timeN=parseInt(audio.currentTime);
		$("#nowTime").html((timeN/60>=10?parseInt(timeN/60):"0"+parseInt(timeN/60))+":"+(timeN%60>=10?timeN%60:"0"+timeN%60));
		var wi=(370/ti*timeN).toFixed();
		$(".nowTimeDiv").width(wi)
		timefun=setTimeout(nowTime,500)
		if(timeN>=ti)
			clearTimeout(timefun)
	}	
	//滚动条美化
 //$(function(){ $("html").niceScroll();})
// $("#lrc").niceScroll({autohidemode:"cursor",
// 					 //hidecursordelay:1000,
// 					 cursorcolor: "#696969",
// 					 cursorborder: "1px solid #696969",
// 					 cursorwheight:"7px",
// 					
// })
$(".clickDiv").click(function(e){
		var e=e||window.event;
		var w=parseInt(e.offsetX);
		
		var t=parseInt((ti/370*w));
		
		audio.currentTime=t;
	})
$("#singSug li:first").html(function (index, older){
	return older.replace(".mp3","")
})
$(".clickDiv").mousemove(function(){
		var e=e||window.event;
		
		var w=parseInt(e.offsetX);
		var t=parseInt((ti/370*w));
		var t1=(t/60>=10?parseInt(t/60):"0"+parseInt(t/60))+":"+(t%60>=10?t%60:"0"+t%60)
		$(this).attr("title",t1)})
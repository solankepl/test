// JavaScript Document Creted By pavan solanke
//=====================================  Set config File For Crousal  Load Data=======================================

var xmlPath="configuration.xml"
var playlistId;	
var imageCount;
var fontSet;
var bacgrounImage;						
var crousalHeight;
var crousalWidth;
var crousalPostion;
var descriptionBackrounColor ;
var descriptionBackrounOpacity ;
var descriptionFontColor ;
var videoPlayerWidth;
var videoPlayerHeight;
var videoPlayerX;
var	videoPlayerY;
var imageBorderDefaultColor;
var imageBorderSelectedColor;

var broserType;

function browserTester(browserString) {
    return navigator.userAgent.toLowerCase().indexOf(browserString) > -1;
}


var myXmlLoader = function (path)
{
	this.main(path);
}
	
$.extend(myXmlLoader.prototype, {
   path: '',
   main: function(path) {
         this.path = path;		
   },
   
    xmlLoad: function ()
 	{
		 currentData=null;
		   $.ajax({
				type: "GET",
				url: this.path,
				dataType: "xml",
				success: loadData
			});
	}
});

// ========================= parce config.xml file ============================================================================
	
loadData = function(data) {
	   $(data).find('configuration').each(function(){
				playlistId = $(this).find('playlistId').text();	
				imageCount = $(this).find('imageCount').text();					
				fontSet = $(this).find('fontSet').text();
				backgrounImage = $(this).find('backgroundUrl').text();						
				crousalHeight = parseInt($(this).find('crousalHeight').text());
 				crousalWidth = parseInt($(this).find('crousalWidth').text());				
				crousalPostion = $(this).find('crousalPostion').text();
							
				descriptionBackrounColor = $(this).find('descriptionBackrounColor').text();
				descriptionBackrounOpacity = $(this).find('descriptionBackrounOpacity').text();
				descriptionFontColor = $(this).find('descriptionFontColor').text();
			
				videoPlayerWidth =$(this).find('videoPlayerWidth').text()+"px";//+"%";	
				videoPlayerHeight = $(this).find('videoPlayerHeight').text()+"px";//+"%";
				
				videoPlayerX =$(this).find('videoPlayerX').text();
				videoPlayerY =$(this).find('videoPlayerY').text();
				
				TweenMax.to( $("#videoDetails"), 1, {width:'100%'})
			
				imageBorderDefaultColor =$(this).find('imageBorderDefaultColor').text();
				imageBorderSelectedColor =$(this).find('imageBorderSelectedColor').text();	
			
				//player.setSize(width, height); 
				$("#player").css("margin-left",videoPlayerX+"%");
				$("#player").css("margin-top",videoPlayerY+"%");
			
				$("body").css("background", "#daeef9 url('"+backgrounImage+"') no-repeat center top");		
				
				var colorConvert = 	convertToHexColor(descriptionBackrounColor).split(")")[0]+","+descriptionBackrounOpacity+")";
				
				$("#videoDetails").css("background-color",colorConvert).css("color",descriptionFontColor);
				
				$('body').css('font-family', fontSet);
				
				if(crousalPostion=="left")
				{
					$("#playListThumb").css("float",crousalPostion);	
					$("#playListThumb").css("margin-left","-200px");
					$("#videoTitle").css("float","right");
					$("#videoDescription").css("float","right");
				}else
				{
					$("#playListThumb").css("margin-right","50px");					
				}
				
				//create crousal object 								
				var widget1 = new MyWidget(playlistId,crousalWidth,crousalHeight);
				widget1.createCrousal();
		
			});
}

	
//===============================  Convert color code hexadecimal to rgb==================================	
	
convertToHexColor = function (englishColor) {
	
	try
	  {
				var div = $('<div></div>').appendTo("body").css('background-color', englishColor);
				var computedStyle = window.getComputedStyle(div[0]);	
				var computedColor = computedStyle.backgroundColor;
				div.remove();		
				var convertrgba = computedColor.substring(0, 3)+ 'a' +computedColor.substring(3);	
				return convertrgba;
	  }
	catch(err)
	  {
			  txt="There was an error on this page.\n\n";
			  txt+="Error description: " + err.message + "\n\n";
			  txt+="Click OK to continue.\n\n";
			  convertrgba = "rgba(255,0,255)";
			  return convertrgba;
			 // alert(txt);
	  }
    
};	

//==============================Create  Crousal  ===========================

MyWidget = function(_playListID, _radiusX, _radiusY) {
  this.init(_playListID,_radiusX,_radiusY);
}

$.extend(MyWidget.prototype, {
   // object variables
   _playListID: '',
   _radiusX:'',
   _radiusY:'',
      
   init: function(_playListID, _radiusX, _radiusY) {
     // do initialization here
     this._playListID = _playListID;
	 this._radiusX = _radiusX;
	  this._radiusY = _radiusY;
   },
  
  createCrousal: function() 
   {
		var playListID =this._playListID; 
		var radiusX =this._radiusX ;
		var radiusY =this._radiusY ;
		   
		var playlistVideoId = new Array();
		var playlistVideoTitle = new Array();
		var playlistVideoDescription = new Array();
		
		var centerX = 0;
		var centerY = 300;
		var speed = -1;
		var currentHighestDepthId;
		   
		
//================================== video Load   ============================	  	  
		newVideoLoad = function (vaidoId)
		{
			if(broserType === "safari")
			{
				var path ="http://www.youtube.com/embed/"+vaidoId+"?autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost";
				$('#player').attr("src",path);	
			}else{
				player.stopVideo();
				player.loadVideoById(vaidoId, 0, "large");
			}
			
		}
				
//======================= Parse json  and  create img element ===================================================
		parseJson = function()
		{
			
			var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+playListID+'?v=2&alt=json&max-results='+imageCount+'&callback=?';
			var videoURL= 'http://www.youtube.com/watch?v=';
			
			$.getJSON(playListURL, function(data) {
				var list_data="";
				var depth = data.feed.entry.length;
				
				$.each(data.feed.entry, function(i, item) {
					
					var angle = i * (Math.PI*2) / data.feed.entry.length;
					var angleDegrees = angle * 180/Math.PI;
					//console.log(data.feed.entry.length);
					
					var left = centerX + Math.cos(angle) * radiusX;
					var top = centerY + Math.sin(angle) * radiusY;
					
					var feedTitle = item.title.$t; 
					playlistVideoTitle.push(feedTitle);
					
					var feedDescription = item.media$group.media$description.$t;
					playlistVideoDescription.push(feedDescription);
					
					var feedURL = item.link[1].href;
					var fragments = feedURL.split("/");
					var videoID = fragments[fragments.length - 2];
					playlistVideoId.push(videoID);
								
					var url = videoURL + videoID;
					var thumb = "http://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
				   
					var videoItems = $("<li class='videoItem' data-angle='"+angleDegrees+"' data-left='"+left+"px;' data-top='"+ +top+"px;'"+"id='item_"+ i+"'style='top:"+centerY+"px;'left:'"+centerX+"px;' z-index:'"+depth+";'><img id='"+videoID+"'height='150px' width='250px' src='"+thumb+"'/></li>")
					
					depth--;
					
					$("#playListThumb").append(videoItems);
				});
		
				$(".videoItem").each(function(index, element) {
					var valTop = parseFloat($(this).attr('data-top'));
					var valLeft = parseFloat($(this).attr('data-left'));
					$(element).animate({
						top:valTop,
						left:valLeft,
						}, 600 , function ()
						{	
							//var intervalID = setInterval(mover, 0);	
							 cheakMousePostion();
							 createjs.Ticker.setFPS(100);
							 createjs.Ticker.addEventListener("tick", mover);
						})
				 });
				
			});
		}
		
//========================== Rotet Imageg rouned circle ==========================
	
		mover = function ()
		{
			$(".videoItem").each(function(index, element) {
				
				var angDeg = parseFloat($(element).attr("data-angle"));
				angDeg+=speed;
		
				var angRad = angDeg * Math.PI/180;
				
				var left = centerX + Math.cos(angRad) * radiusX;
				var top = centerY + Math.sin(angRad) * radiusY;
				var zIndexNew = Math.round(Math.cos(angRad - Math.PI)*80);
				
				if(crousalPostion=="left")
					zIndexNew = Math.round(Math.cos(angRad - Math.PI*2)*80);
						   
				TweenLite.to($(element),0, {top:top, left:left,zIndex:zIndexNew});
				
				setBorderImage(zIndexNew,$(element));
				
				$(element).attr("data-angle",angDeg);
			
			 });
		
		}
//================================  Set the Border Of Higest Dept Image and Assien event Image ================================
		setBorderImage = function(getzIntex,elem){
			
			if(getzIntex===findHighestZIndex(".videoItem"))
				{
					$(elem).find('img').css({
						'border':'1px solid '+imageBorderSelectedColor,
						'cursor':'pointer',
					});	
					
					$(elem).css({
						'margin-top': '-4px'
					})
		
					var tempId =  ($(elem).attr('id')).split("_")[1];
					if(currentHighestDepthId=="" || currentHighestDepthId !=tempId)
					{
						$(elem).bind("click",onImageClickPlayVideo);
						$("#videoTitle").html(playlistVideoTitle[tempId]);
						$("#videoDescription").html(playlistVideoDescription[tempId]);
						
						var curHeight = $('#videoDetails').height();
						$('#videoDetails').css('height', 'auto');
						var autoHeight = parseInt($('#videoDetails').height())+20;
						//$('#videoDetails').height(curHeight).animate({height: autoHeight}, 100);
						$('#videoDetails').css('height', autoHeight);
						
					}
					currentHighestDepthId = tempId;
					
				}else
				{
					$(elem).unbind("click",onImageClickPlayVideo);
					$(elem).find('img').css({
						'border':'1px solid '+imageBorderDefaultColor,
						'cursor':'default'	
					});		
					
				}
			
		}
		
//========== Hight dept  Find ==========================================================
		findHighestZIndex = function(element) {
			var allObjects = $(element);
			var allObjectsArray = $.makeArray(allObjects);
			var zIndexArray = [0];
			var largestZindex = 0;
			for (var i = 0; i < allObjectsArray.length; i++) {
				  var zIndex = $(allObjectsArray[i]).css('z-index');
				  zIndexArray.push(zIndex);
			}
			var largestZindex = Math.max.apply(Math, zIndexArray);
			return largestZindex;
		};
		
//============================  On ThumbImage Click ===============================
		onImageClickPlayVideo = function ()
		{
			$("#videoPlayer").css("zIndex",9999);
			
			$("#player").css("margin-left",videoPlayerX+"%");
			$("#player").css("margin-top",videoPlayerY+"%");	
					
			imageOnClick($(this).find('img').attr('src'));	
			$(this).unbind("click",onImageClickPlayVideo);
			$("#videoPlayer").bind("click",closePlayer);			
		}
		
//========== Show Video popup and Remove All Event ==========================================================
		imageOnClick = function(path){
		  showPopup();
		  var currentVideoId =  path.split("/")[4];
		  newVideoLoad(currentVideoId);		
		  createjs.Ticker.removeEventListener("tick", mover);
		  
		}
		
//============================  close popup  ==================================================================
		closePlayer = function(){
			$("#videoPlayer").css("zIndex",0);
			if(broserType === "safari"){
				$('#player').attr("src","");	
				$("#videoPlayer").css("visibility","hidden");
				//$("#player").css("display","none");
				
			}else{
				player.stopVideo();
				$("#videoPlayer").hide();
				$("#player").hide();		
			}
			createjs.Ticker.addEventListener("tick", mover);
			$("#videoPlayer").unbind("click",closePlayer);
		}
//========================   event for window resize   ==========================================================
		$(window).resize(function() {
			cheakMousePostion()
		});
//===================== Cheak mouse postion =======================================================================
		cheakMousePostion = function ()
		{
			var mouseY = 0;
			var documnetHeight = parseInt($(window).height());
			var videoDetailsToppostion = documnetHeight*40 /100;
			var coursorStopPostion = videoDetailsToppostion + parseInt($('#videoDetails').height());
	       			
			$('#videoDetails').css('margin-top',videoDetailsToppostion);	
			
			var temp = ((documnetHeight-(radiusY*2))/2)-80;
						
			$('#playListThumb').css('margin-top',(temp));
			
			$(window).bind("mousemove",function(e){
				var newdocumnetHeight =  documnetHeight/2;
	
				var mainHeight = parseInt($('#Main').css('height'));
		
				var center = (mainHeight/2) - mouseY;
				
				if(videoDetailsToppostion>mouseY){
					speed = (mouseY/videoDetailsToppostion)-2 ;					
				}
				else if(mouseY >(videoDetailsToppostion) &&  mouseY < coursorStopPostion)
				{
					speed = 0;
				}else
				{
					var currentY = mouseY - coursorStopPostion;
					var currentHeight = documnetHeight -coursorStopPostion;
					speed = currentY/currentHeight+1;
				}
					mouseY = e.pageY;
			})
		}
		parseJson();
   }
});

//================================= You tube API  ======================================

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
onYouTubeIframeAPIReady = function () 
{ 
	player = new YT.Player('player', 
	{ 
		height:videoPlayerHeight ,
		width:videoPlayerWidth ,
		videoId: '', 
		playerVars: {'autoplay': 1,wmode: "opaque"}, 
		events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }  });

		if(browserTester('chrome')) {
			broserType ="chrome";
		} else if(browserTester('safari')) {
			broserType ="safari";
		}  
		if(broserType === "safari"){
				hidePopup();				
		}
}

onPlayerReady = function(event) 
{ 
//event.target.playVideo(); 
//alert('onPlayerReady');
event.target.stopVideo();
hidePopup();
}

onPlayerStateChange = function(event) 
{
//alert('onPlayerStateChange');
//if (event.data == YT.PlayerState.PLAYING) { window.external.notify('PLAYING');}
//else if (event.data == YT.PlayerState.ENDED) {window.external.notify('ENDED');}
}

setSize = function (width, height) 
{
	// player.setSize(width, height); 
}

//=============================== Show Video Popup  =========================

showPopup = function(){

			if(broserType === "safari"){
					$("#videoPlayer").css("visibility","visible");				
			}else{
					$("#videoPlayer").show();
					$("#player").show();
				}
}

//=============================== Hide Video Popup  First time =========================
hidePopup = function(){
			if(broserType === "safari"){
					$("#videoPlayer").css("visibility","hidden");
					$("#status").fadeOut();
					$("#preloader").delay(1500).fadeOut("slow"); 
			}else{	
					$("#videoPlayer").hide();
					$("#player").hide();
					$("#status").fadeOut();
					$("#preloader").delay(20).fadeOut("slow"); 
			}

}

//=========================  End   =================================

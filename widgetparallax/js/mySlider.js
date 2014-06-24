// JavaScript Document Creted By pavan solanke
//===============================================  Variable  ==================================================================
	var xmlPath="config.xml";
	var browserType;
	var playListID;
	var imageCount =50;
	var backgrounImage;	
	var gadgetWidth;
	var gadgetHeight;
	var galleryWidth;
	var galleryHeight;
	var galleryX;
	var galleryY;
	var thumbnailImageBGColor;
	var thumbnailTextColor;
	var videoPlayerWidth;
	var videoPlayerHeight;
	var fontSet;
	var parallaxSpeed;	
	//var playListID ="98149AD876B3ECF4";
	var totalwidth;
	var ypuTubeSlider =true;
	var imageWidth =100;
	var imageHeight =70;
	var showImages =6;
	var playlistWidth;
	var totalClick;
	var currentClick=0;
	var arrowImageWidth=28;
	var scrollNumImages=6;
	var liHeight =101;
	var imageLiPadding=5;
	var liWidth;
	var onthumbClick =true;

	var imageArr =new Array();	
	
	 // == Add local Machine images ===================================
	//imageArr =["thumb_1.gif","thumb_2.gif","thumb_3.gif","thumb_4.jpg","thumb_5.jpg","thumb_1.gif","thumb_2.gif","thumb_3.gif","thumb_4.jpg","thumb_4.jpg","thumb_4.jpg"];
	//var imageTitle=["image 1","image 2","image 3","image 4","image 5","image 6","image 7","image 8","image 9","image 10","image 11","image 12"];

//============     Animation Image Play Varible ===================================================================================
	var intervalShowImage;
	var intervalHideImage;
	var currentslectedThumb;
	var orgXClickedImage;
	var orgYClickedImage;
	var orgZindexClickedImage;
	var orgWidthClickedImage;
	var orgHeightClickedImage;
	
//======================================== show image next and back Varible ========================================================
	var direc ;
	var clickCounter=0;
	var directionMove = "up";		
	

//=================================  You tube API Veraible  =======================================================================

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;


//==================== Load config Xml ==============================================================================================	
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
	
loadData = function (data) {
	   $(data).find('configuration').each(function(){
				 playListID = $(this).find('playlistId').text();	
				//imageCount = $(this).find('imageCount').text();					
				fontSet = $(this).find('fontSet').text();
				backgrounImage = $(this).find('backgroundURL').text();						
				gadgetWidth = $(this).find('gadgetWidth').text();
 				gadgetHeight = $(this).find('gadgetHeight').text();
			
				parallaxSpeed =  parseInt($(this).find('parallaxSpeed').text());
			
				galleryWidth =  parseInt($(this).find('galleryWidth').text());
				
 				galleryHeight =  parseInt($(this).find('galleryHeight').text());
			
				
				galleryX = parseInt($(this).find('galleryX').text());
				galleryY = parseInt($(this).find('galleryY').text());
				
			
			
				videoPlayerWidth =parseInt($(this).find('videoPlayerWidth').text());	
				videoPlayerHeight =parseInt($(this).find('videoPlayerHeight').text());
				
				thumbnailImageBGColor =$(this).find('thumbnailImageBGColor').text();
				thumbnailTextColor =$(this).find('thumbnailTextColor').text();
			
				$("#subMain").css("background", "#daeef9 url('"+'images/'+backgrounImage+"') no-repeat center top");		
				
							
				$('body').css('font-family', fontSet);
				
				$('#imageMover').css({'width':galleryWidth+'px', 'height':galleryHeight,'margin-left':galleryX,'margin-top':galleryY});
				galleryY = galleryY+ 800;				
				//create crousal object 								
				galleryWidth = galleryWidth -300;				
				setSize(videoPlayerWidth,videoPlayerHeight);				
				init();
			});
}



var newXmlLoad = new myXmlLoader(xmlPath);	
newXmlLoad.xmlLoad();

//=============================================== load slider  ==================================================================	
init = function()
	{
		liWidth = parseInt(imageWidth)+parseInt(imageLiPadding);
		
		playlistWidth = (showImages*liWidth)+imageLiPadding*(showImages+1);
				
		$('#playlist').css('width',playlistWidth+"px");
		$('#playlist').css('height',liHeight);
		$('#playlist').css('margin-left',arrowImageWidth+"px");
		$('#next').css('margin-left',playlistWidth+arrowImageWidth+"px");
		$('.arrowImage').css('height',liHeight+"px");
		$('.arrowImage').css('width',arrowImageWidth+"px");
		
		if(ypuTubeSlider)
		{
		//var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+playListID+'?v=2&alt=json&callback=?';
			var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+playListID+'?v=2&alt=json&max-results='+imageCount+'&callback=?';
		var videoURL= 'http://www.youtube.com/watch?v=';
		imageArr =[];
		imageTitle=[];
		$.getJSON(playListURL, function(data) {
			var list_data="";
			$.each(data.feed.entry, function(i, item) {
				var feedTitle = item.title.$t;
				imageTitle.push(feedTitle);
				var feedURL = item.link[1].href;
				var fragments = feedURL.split("/");
				var videoID = fragments[fragments.length - 2];
				
				var url = videoURL + videoID;
				
			   var imgPath = "http://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
			   imageArr.push(imgPath);
			   
			   
			});
	      creaeImages(imageArr)
		});
	}else
	{
		creaeImages(imageArr);
	}
}

//===============================================  Create image in slider ========================================================
creaeImages = function(imageArr)
{
	$.each(imageArr, function(i, item) {
		
			var thumb 
			if(ypuTubeSlider){
				thumb = imageArr[i];	
			}else{
				thumb = "images/"+ imageArr[i];	
			}
			var imageNum =i+1;
			if(imageNum<10){
				imageNum ="0"+imageNum
			}
			var title= imageTitle[i].substr(0,25)+"...";
			
			var videoItems = $("<li class='thumbImage'><img  id='thumbImage_"+ i +"'width='"+imageWidth+"' height='"+imageHeight+"' src='"+ thumb+"'/><div class='imageNumber'>"+imageNum+"</div><div class='imageTitle'>"+title+"</div></li>");
			
			$("#addImages").append(videoItems);
			
			var imageThumbWidth = generateRandomInteger(200,300,3,5);
			var imageThumbHeight = generateRandomInteger(150,300,3,5);
			var imageMoveSpeed = generateRandomInteger(1,parallaxSpeed,1,1);				 
			var imageX =  generateRandomInteger(galleryX,galleryWidth,2,5);

			var imageY =generateRandomInteger(galleryY,7000,2,5);
				
			var mainImage= $("<div id='mainImage_"+i+ "' data-speed='"+imageMoveSpeed+"'class='maindivImage' style='color:#FFF; width:"+imageThumbWidth+"px; left:"+imageX +"px ;top:"+imageY+"px; background-color:"+thumbnailImageBGColor+";color:"+thumbnailTextColor+"'><div class='imageContainer'><img  id='thumbImg_"+ i +"'width='100%' src='"+ thumb+"'/><div class='imageThumbNum'>"+imageNum+"</div><div class='imageThumbTitle'>"+title+"</div></div>");
			
			$("#imageSplit").append(mainImage);	
			
		});
		
		
		
		$(".maindivImage").each(function(index, element) {
					
							//var intervalID = setInterval(mover, 500);	
							$(this).css("z-index",index);
							$(this).bind("click",animationImagePlay);
							// createjs.Ticker.setFPS(40);
							 //createjs.Ticker.addEventListener("tick", mover);
		 });
		
	
	$('.thumbImage').each(function(i, element) {
		$(element).bind("click",loadNewVideo);
	});
		
	totalwidth = ((liWidth+(imageLiPadding*2))*(imageArr.length));
	//totalClick = Math.ceil(totalwidth/playlistWidth)-1;
	 totalClick =  Math.ceil(imageArr.length/scrollNumImages)-1;
		
	$('#addImages').css('width',totalwidth+"px");
	$('#addImages li').css('width',liWidth+"px");
	//$('.slider li').css('padding',imageLiPadding+"px");
	$('#addImages li').css('margin-left',5+"px");
	$('#back').bind("click", showData);
	$('#next').bind("click", showData);	
	scrollNumImages =  scrollNumImages*(parseInt($('#addImages li').width())+(imageLiPadding));
	//$('#back').addClass('arrowImageDeActive');
	$('.slider li').css({'background-color':thumbnailImageBGColor,'color':thumbnailTextColor});
	
}



//==================================================== Mover =========================================================
mover = function()
{
	$('.maindivImage').each(function(i, element) {
				//console.log("sadsad"+$(element).attr('data-speed'));
				
				var speed =	$(element).attr('data-speed');	
				if(directionMove === "up"){
				
					var top = parseInt($(element).css('top').replace('px', ''))
					//var currentSpeed = $(element).attr("id").split("_")[1];
			
					top -= speed //generateRandomInteger(1,20,1,1);
					//alert(top+" >top <"+speed)
					//	console.log(top);
					if(top>-0.5){
						$(element).css({
								"top":top
						});
					}else{
						$(element).css({
								"top":generateRandomInteger(3000,6000,3,5)
						});
					}
					
				}
	 });
		
}



//================================================ animationImagePlay  ========================================================

animationImagePlay = function()
{
		intervalShowImage = setInterval(ocCompleteHandlerShowPopup, 1000);	
		$(".maindivImage").each(function(index, element) {
			$(this).unbind("click",animationImagePlay);							 
		 });
	
	//currentslectNum = $(this).attr("id").split("_")[1];
	//videoCId = $(this).find("img").attr("src");
	
	currentslectedThumb =  $(this);
	
	orgXClickedImage = $(currentslectedThumb).css('left');
	orgYClickedImage =  $(currentslectedThumb).css('top');
	orgWidthClickedImage = $(currentslectedThumb).css('width');
	orgHeightClickedImage = $(currentslectedThumb).css('height');
	orgZindexClickedImage= $(currentslectedThumb).css('z-index');
	
	//alert(orgXClickedImage+" >>> "+orgYClickedImage+" >> "+orgZindexClickedImage);
	
	createjs.Ticker.removeEventListener("tick", mover);
	$(this).css({
		"z-Index":999
	}); 
	TweenLite.to($(this), .7, {css:{scale:2 ,left:400,top:750}});
	//onComplete:ocCompleteHandlerShowPopup
}

ocCompleteHandlerShowPopup = function(){
	clearInterval(intervalShowImage);
	onthumbClick =true;
	$("#popup").show();
	$("#player").show();
	
	//TweenLite.to($(currentslectedThumb), .7, {css:{scale:1,left:300,top:800}});
	//showPopup();
	//alert(currentslectNum+" >> "+videoCId);	
	
	var currentslectNum = $(currentslectedThumb).attr("id").split("_")[1];
	
	
	$('#back').addClass('arrowImage');
	$('#next').addClass('arrowImage');
	$('#next').removeClass('arrowImageDeActive');
	$('#back').removeClass('arrowImageDeActive');
	
	if(currentslectNum<6){
		$('#back').removeClass('arrowImage');
		$('#back').addClass('arrowImageDeActive');
	}
	if(currentslectNum>imageArr.length-6)
	{
		$('#next').addClass('arrowImage');
			$('#next').removeClass('arrowImageDeActive');
	}
	var videoCId = $(currentslectedThumb).find("img").attr("src");
	newVideoLoad(videoCId);	
	setSelectedState($(currentslectedThumb).attr("id"));
	 $("#popup").bind("click",closePlayer);
	 $(".slider").bind('click', disableSliderEvent)
	 
	 
}


closePlayer = function(){	
	 //if (this.target !== this) return;
	$("#popup").hide();
	$("#player").hide();
	
	 TweenLite.to($(currentslectedThumb), .7, {css:{scale:1,left:orgXClickedImage,top:orgYClickedImage}});
	
	intervalHideImage = setInterval(ocCompleteHandlerHidePopup, 1000);	
	
	$("#popup").unbind("click",closePlayer);
}


ocCompleteHandlerHidePopup = function(){
	clearInterval(intervalHideImage);
	createjs.Ticker.addEventListener("tick", mover);
	$(".maindivImage").each(function(index, element) {
			$(this).bind("click",animationImagePlay);							 
		 });
		
	$(currentslectedThumb).css({
		"z-Index":orgZindexClickedImage
	});  
	
}

disableSliderEvent = function(event)
{
	event.stopImmediatePropagation();
	return false;
}


//=====================================================================================================================

/*function gamrateNum()
{
	
	 for (var  i = 0; i <imageArr.length; i++){
      var randomX = generateRandomInteger(50,600,2,5) //Math.floor(Math.random()*500);
	  imageXArr.push(randomX);
	  var randomY = generateRandomInteger(50,3000,2,5)//Math.floor(Math.random()*800);
	  imageYArr.push(randomY);	
     
	} 
}*/


generateRandomInteger = function(minNumber, maxNumber, minDigits, maxDigits) {
    var num, digits;
    do {
        num = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
        digits = Math.abs(num).toString().length;
    } while (digits > maxDigits || digits < minDigits);
    return num;
}


setFounsize = function()
{
		$(".imageThumbTitle").each(function() {
			var currentFontSize = $(this).css('font-size');
			var currentFontSizeNum = parseFloat(currentFontSize, 10);
			var newFontSize = currentFontSizeNum*0.8;
			$(this).css('font-size', newFontSize);
			return false;
		});
}


//======================================== show image next and back  ========================================================
showData = function()
{
	
	var cureentClick = $(this).attr("id");
	var currentPostion =parseInt($("#addImages").css('margin-left').replace('px', ''));
	
	var speed =1000;
	
	$('#back').unbind("click", showData);
	$('#next').unbind("click", showData);
	
	
	if(cureentClick==="back")
	{
		clickCounter--;
		if(clickCounter<=0)
		{
			currentPostion =0;
			clickCounter =0;
			$('#back').removeClass('arrowImage');
			$('#back').addClass('arrowImageDeActive');
			
		}else
		{
			$('#next').addClass('arrowImage');
			$('#next').removeClass('arrowImageDeActive');
			currentPostion = parseInt(currentPostion)+parseInt(scrollNumImages);				
		}		
		
	}else{
		
		if(clickCounter===totalClick)
		{
			currentPostion =currentPostion;
			clickCounter =totalClick;
		}else{
			$('#back').removeClass('arrowImageDeActive');
			$('#back').addClass('arrowImage');
			currentPostion =    currentPostion-parseInt(scrollNumImages);	
			clickCounter++;
		}		
	}
	
	$('#addImages').animate({
			"margin-left":currentPostion
		},speed,function(){
			$('#back').bind("click", showData);
			$('#next').bind("click", showData);	
			
		});
		
		if(clickCounter===totalClick)
		{
			$('#next').removeClass('arrowImage');
			$('#next').addClass('arrowImageDeActive');
		}

}
	
	
//==========================================================================================================
loadNewVideo = function ()
{
	onthumbClick =false;
	setSelectedState($(this).find('img').attr('id'));
	newVideoLoad($(this).find('img').attr('src'));
	
}
//===========================  ===================================

setSelectedState = function(currentImage){

	var currentImageId = currentImage.split("_")[1];	
	var currentselctedId = "#thumbImage_"+currentImageId;
	if(onthumbClick){
		var tes = Math.ceil((parseInt(currentImageId)+parseInt(1))/showImages)-1;
		clickCounter =tes;
		var movepos = tes*-scrollNumImages;
		$('#addImages').css({
			"margin-left":movepos
		});
		
		if(clickCounter<=0)
		{
			currentPostion =0;
			clickCounter =0;
			$('#back').removeClass('arrowImage');
			$('#back').addClass('arrowImageDeActive');			
		}
		if(clickCounter===totalClick)
		{	$('#back').removeClass('arrowImageDeActive');	
			$('#back').addClass('arrowImage');
			$('#next').removeClass('arrowImage');
			$('#next').addClass('arrowImageDeActive');
		}
		
	}
	setdiselectedState()	
	$(currentselctedId).css({
		'border':'1px solid #FF00FF',
		'cursor':'default'
	});
	
	$(currentImage).find('img').css({
		'border':'1px solid #FF00FF',
		'cursor':'default'
	});	
	
}

setdiselectedState = function()
{
	$('.thumbImage').each(function(i, element) {
			$(element).find('img').css({
						'border':'1px solid #FFFFFF',
						'cursor':'pointer'
			});	
			
	});	
}


//================================== video Load   ============================	  	  
		newVideoLoad = function (videoId)
		{
			var currentVideoId =  videoId.split("/")[4];
			//alert(currentVideoId);
			if(browserType === "safari")
			{
				var path ="http://www.youtube.com/embed/"+currentVideoId+"?autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost";
				$('#player').attr("src",path);	
			}else{
				player.stopVideo();
				player.loadVideoById(currentVideoId, 0, "large");
			}
			
		}
		
		
//=============================  Return the value of browserType; ======================================================

browserTester = function(browserString) {
    return navigator.userAgent.toLowerCase().indexOf(browserString) > -1;
}

//================================= You tube API  ======================================

onYouTubeIframeAPIReady = function () 
{ 
	player = new YT.Player('player', 
	{ 
		height: videoPlayerHeight,
		width:videoPlayerWidth,
		videoId: '', 
		playerVars: {'autoplay': 1,wmode: "opaque"}, 
		events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }  });

		if(browserTester('chrome')) {
			browserType ="chrome";
		} else if(browserTester('safari')) {
			browserType ="safari";
		}  
		if(browserType === "safari"){
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
	try{
	 player.setSize(width, height); 
	}catch(e){
			
	}
}

//=================== Video Player End========================	
	
//=============================== Show Video Popup  =========================

showPopup = function(){

			if(browserType === "safari"){
					//$("#popup").css("visibility","visible");				
			}else{
					$("#popup").show();
					$("#videoPlayer").show();
					$("#player").show();
				}
}

//=============================== Hide Video Popup  First time =========================
hidePopup = function(){
			if(browserType === "safari"){
					$("#popup").css("visibility","hidden");
					$("#status").fadeOut();
					$("#preloader").delay(1500).fadeOut("slow"); 
			}else{	
					$("#popup").hide();
					$("#player").hide();
					$("#status").fadeOut();
					$("#preloader").delay(20).hide(); 
			}
	createjs.Ticker.setFPS(40);
	createjs.Ticker.addEventListener("tick", mover);
}
	
//========================================== Arrow image Active and Deactive =================================

/* function fnHandleNavigationentrframe(e:Event):void 
		{
			var speed:int = 5;
			pageNavigationMc.holderMc.x += direc * speed;
			trace(pageNavigationMc.holderMc.x , pageNavigationMc.maskMc.x)
			if (pageNavigationMc.holderMc.x >= pageNavigationMc.maskMc.x)
			{
				pageNavigationMc.holderMc.x = pageNavigationMc.maskMc.x;
				pageNavigationMc.backMc.visible = false;
			}	
			
			if (pageNavigationMc.holderMc.x <= pageNavigationMc.maskMc.width - pageNavigationMc.holderMc.width)
			{
				pageNavigationMc.holderMc.x = pageNavigationMc.maskMc.width - pageNavigationMc.holderMc.width;
				pageNavigationMc.nextMc.visible = false;
			}
		}*/

//===============================================  end ========================================================
$(document).ready(function(){
	//init();	
});
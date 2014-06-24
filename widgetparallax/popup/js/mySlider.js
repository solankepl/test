// JavaScript Document Creted By pavan solanke

//===============================================  Variable  ==================================================================

	var imageArr =["thumb_1.gif","thumb_2.gif","thumb_3.gif","thumb_4.jpg","thumb_5.jpg","thumb_1.gif","thumb_2.gif","thumb_3.gif","thumb_4.jpg","thumb_4.jpg","thumb_4.jpg"];
	var imageTitle=["image 1","image 2","image 3","image 4","image 5","image 6","image 7","image 8","image 9","image 10","image 11","image 12"];
	
	var playListID ="98149AD876B3ECF4";
	var totalwidth;
	var ypuTubeSlider =true;
	var imageWidth =100;
	var imageHeight =70;
	var showImages =6;
	var playlistWidth;
	var totalClick;
	//var currentClick=0;
	var arrowImageWidth=25;
	var scrollNumImages=6;
	var liHeight =105;
	var imageLiPadding=5;
	var liWidth;
	
//=============================================== load slider  ==================================================================	
function init()
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
		var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+playListID+'?v=2&alt=json&callback=?';
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
function creaeImages(imageArr)
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
			var title= imageTitle[i].substr(0,20)+"...";
			
			var videoItems = $("<li class='thumbImage'><img  id='thumbImage_"+ i +"'width='"+imageWidth+"' height='"+imageHeight+"' src='"+ thumb+"'/><div class='imageNumber'>"+imageNum+"</div><div class='imageTitle'>"+title+"</div></li>");
			
			$("#addImages").append(videoItems);
		});
		
		$('.thumbImage').each(function(i, element) {
			$(element).bind("click",loadNewVideo);
		});
		
		
		
	totalwidth = ((liWidth+(imageLiPadding*2))*(imageArr.length));
	totalClick = Math.ceil(totalwidth/playlistWidth)-1;
	$('#addImages').css('width',totalwidth+"px");
	$('#addImages li').css('width',liWidth+"px");
	//$('.slider li').css('padding',imageLiPadding+"px");
	$('#addImages li').css('margin-left',5+"px");
	$('#back').bind("click", showData);
	$('#next').bind("click", showData);	
	scrollNumImages =  scrollNumImages*(parseInt($('#addImages li').width())+(imageLiPadding));
	$('#back').addClass('arrowImageDeActive');
}


//======================================== show image next and back  ========================================================
var direc ;
var remaingImages=0;
var temp =0;
function showData()
{
	var cureentClick = $(this).attr("id");
	var currentPostion =parseInt($("#addImages").css('margin-left').replace('px', ''));
	
	var speed =1000;
	
	$('#back').unbind("click", showData);
	$('#next').unbind("click", showData);
	
	if(cureentClick==="back")
	{
		
		if(currentPostion>=0){
				currentPostion =temp;
		}
		else{
			$('#next').addClass('arrowImage');
			$('#next').removeClass('arrowImageDeActive');
			currentPostion =    parseInt(currentPostion)+parseInt(scrollNumImages);	
		}
	}else	
	{
		remaingImages =  parseInt(imageArr.length)%showImages;
		
		if(remaingImages==0)
		{
			remaingImages =2;
		}else
		{
			remaingImages =1;
		}
		
		if (currentPostion <= (playlistWidth*remaingImages)- totalwidth) // playlistWidth - totalwidth
		{
			currentPostion = temp//lastPostion//1*totalwidth;			
		}else{
			$('#back').removeClass('arrowImageDeActive');
			$('#back').addClass('arrowImage');
			currentPostion =    currentPostion-parseInt(scrollNumImages);	
			
		}
	}
	
	$('#addImages').animate({
			"margin-left":currentPostion
		},speed,function(){
			$('#back').bind("click", showData);
			$('#next').bind("click", showData);	
			
		});
		
		
		if (currentPostion <= (playlistWidth*remaingImages)- totalwidth) // playlistWidth - totalwidth
		{
			$('#next').removeClass('arrowImage');
			$('#next').addClass('arrowImageDeActive');
			temp =	currentPostion;
			
		}
		
		if(currentPostion>=0){
			temp =0;
			$('#back').removeClass('arrowImage');	
			$('#back').addClass('arrowImageDeActive');	
				
		}
		
	}
	
	
//==========================================================================================================
function loadNewVideo()
{
	setSelectedState($(this));
	newVideoLoad($(this).find('img').attr('src'));
	
}
//===========================  ===================================

function setSelectedState(currentImage){
	setdiselectedState()	
	$(currentImage).find('img').css({
						'border':'1px solid #FF00FF',
						'cursor':'default'
	});	
	
}

function setdiselectedState()
{
	$('.thumbImage').each(function(i, element) {
			$(element).find('img').css({
						'border':'1px solid #FFFFFF',
						'cursor':'pointer'
			});	
	});	
}


//================================== video Load   ============================	  	  
		newVideoLoad = function (vaidoId)
		{
			var currentVideoId =  vaidoId.split("/")[4];
			alert(currentVideoId);
			if(broserType === "safari")
			{
				var path ="http://www.youtube.com/embed/"+currentVideoId+"?autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost";
				$('#player').attr("src",path);	
			}else{
				player.stopVideo();
				player.loadVideoById(currentVideoId, 0, "large");
			}
			
		}
//=============================================================================================================
var broserType;

function browserTester(browserString) {
    return navigator.userAgent.toLowerCase().indexOf(browserString) > -1;
}

var videoPlayerHeight =370;
var videoPlayerWidth =716;

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
								
		}
}

onPlayerReady = function(event) 
{ 
//event.target.playVideo(); 
//alert('onPlayerReady');
event.target.stopVideo();

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

//=================== Video Player End========================	
	

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
	init();	
});
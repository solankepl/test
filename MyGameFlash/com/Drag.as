package com {
	
	import fl.motion.easing.Elastic;
	import fl.transitions.easing.Regular;
	import fl.transitions.easing.Strong;
	import fl.transitions.Tween;
	import fl.transitions.TweenEvent;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.sampler.NewObjectSample;
	import flash.utils.getDefinitionByName;
	
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	
	public class Drag extends MovieClip {
		
		public var drag_:Drag;
		public var drop__:MovieClip;
		public var mcHolder:MovieClip;
		
		private var orgX:Number;
		private var orgY:Number;
		private var droped:Boolean;
		
		private var tab_1Arr:Array = new Array();		
		private var tab_2Arr:Array = new Array();		
		private var tab_3Arr:Array = new Array();	
		private var currentTab:String = "1";
		
		private var foodname:String
		private var calorie:uint;
		private var calcium:uint;
		private var protin:uint;
		private var minirals:uint;
		private var vitmin:uint;
		private var fat:uint;
		
		private var foodNameArr:Array =["Apple","Apricot","Banana","Figs","Chickoo","Dates","Grapes","Guavas","Mango"] 
			
		private var calArr:Array = [100, 120, 50, 90, 120, 80, 40, 30, 10];	
		
		private var calciumArr:Array = [15, 12, 5, 8, 18, 22, 4, 6, 10];	
		
		private var potassiumArr:Array = [10, 15, 18, 9, 32, 1, 5, 3, 7];	
		
		private var mineralsArr:Array = [3, 20, 5, 2, 40, 7, 2, 1, 20];	
		
		private var vitminArr:Array = [10, 15, 18, 9, 32, 1, 5, 3, 7];	
		
		private var fatArr:Array = [3, 20, 5, 2, 40, 7, 2, 1, 20];	
		
		
		public function Drag() {
			// constructor code
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			trace("afasd");
		}
		
		public function showFoodItem(drop_Mc:MovieClip,value:String):void
		{
			hideFoodItem(drop_Mc, value);			
			drop__ = drop_Mc;
			drop__.visible = true;
			var showFood:String = value;
			currentTab = value;
			for(var i:Number = 0; i <9; i++)
					{
						//trace(this["tab_" + j + "Arr"][i]);
						//trace(this["tab_" + showFood + "Arr"][i].name);
						if (this["tab_" + showFood + "Arr"][i].droped == false)
						{
						 this["tab_" + showFood + "Arr"][i].visible = true; 
						}
							
					}
					assienEvent();
						
		}
		
		public function  hideFoodItem(drop_Mc:MovieClip,value:String):void 
		{
			
			drop__ = drop_Mc;
			//drop__.visible = false;
			var currentTab:uint = uint(value);
			
			for(var j:Number = 1; j <= 3; j++)
			{
				for(var i:Number = 0; i <9; i++)
					{
											
						if (currentTab != j )
							{
								if(this["tab_" + j + "Arr"][i]!=undefined)
								this["tab_" + j + "Arr"][i].visible = false;								
							}
					}	
			}			
		}
		
		public function  createFoodItems(drag_Mc:MovieClip,tabNo:String):void 
		{
			var drag_X:Number = 250;
			var drag_y:Number = 340;
			drop__ = drag_Mc;
			currentTab = tabNo;
			var assinName:Number=0;
			
			for(var i:Number = 1; i <= 3; i++)
			{
				 for(var j:Number = 1; j <= 3; j++)
				 {
					assinName++;
					drag_ = new Drag();
					drag_.name = "drag_" + assinName;
					addChild(drag_);
					
					var foodImage : Class = getDefinitionByName ("Food_" + assinName) as Class;	
					
					var imgBD:BitmapData= new foodImage();
					var fruteImg:Bitmap=new Bitmap(imgBD);
					drag_.addChild(fruteImg);
					fruteImg.x=15;
					fruteImg.y = 5;	
					fruteImg.height = 80;
					
					
					this["tab_"+tabNo+"Arr"].push(drag_);
					drag_.x = drag_X;
					drag_.y = drag_y;
					drag_X += drag_.width + 25;
					drag_.orgX = drag_.x;
					drag_.orgY = drag_.y;
					drag_.droped = false;
					drag_.visible = true;
					drag_.foodname = foodNameArr[assinName-1]
					drag_.calorie = calArr[assinName-1];					
					drag_.calcium = calciumArr[assinName-1];
					drag_.protin = potassiumArr[assinName-1];
					drag_.minirals = mineralsArr[assinName-1];
					drag_.vitmin = vitminArr[assinName-1];
					drag_.fat = fatArr[assinName-1];
					
					//trace(this["tab_"+tabNo+"Arr"][assinName-1].name);
					//drag_.addEventListener(MouseEvent.MOUSE_DOWN, _startDrag);
					//drag_.addEventListener(MouseEvent.MOUSE_UP, _stopDrag);					
				 }	
					 drag_X =250;
					 drag_y += drag_.height + 40;
			}
			assienEvent();
		}
		
		
		public function assienEvent():void
		{
			for(var i:Number = 0; i <9; i++)
					{
						if (this["tab_" + currentTab + "Arr"][i].droped == false)
						{
						 this["tab_" + currentTab + "Arr"][i].addEventListener(MouseEvent.MOUSE_DOWN, _startDrag);
						}							
					}			
		}

		public function removeEvent():void
		{
			for(var i:Number = 0; i <9; i++)
					{
						if (this["tab_" + currentTab + "Arr"][i].droped == false)
						{
						 this["tab_" + currentTab + "Arr"][i].removeEventListener(MouseEvent.MOUSE_DOWN, _startDrag);
						}							
					}
		}
		
		private function _startDrag(e:MouseEvent):void 
		{
			var currentDragItem:MovieClip = e.currentTarget as Drag;
			var rectangle:Rectangle = new Rectangle(250, 100, 850, 530);
			
			addChild(currentDragItem); 	
			currentDragItem.startDrag(false, rectangle);		
			currentDragItem.addEventListener(MouseEvent.MOUSE_UP, _stopDrag);
			removeEvent();
			//trace(stage);
			//stage.addEventListener(MouseEvent.MOUSE_UP, _stopDrag);
		}
		
		private function _stopDrag(e:MouseEvent):void 
		{
			var currentDragItem = e.currentTarget as Drag;
			currentDragItem.removeEventListener(MouseEvent.MOUSE_DOWN, _startDrag);
			//currentDragItem.removeEventListener(MouseEvent.MOUSE_UP, _stopDrag);
			var hitObject:MovieClip = drop__ as MovieClip;
			if (currentDragItem.hitTestObject(hitObject))
			{
				currentDragItem.droped = true;
				removeChild(currentDragItem);
				assienEvent();
				//dispatchEvent(new Event("itemisAccepted", true, true));
				dispatchEvent(new CustomEvent(CustomEvent.ITEMISACCEPTED,true,true, currentDragItem.foodname.toUpperCase(), currentDragItem.calorie, currentDragItem.calcium, currentDragItem.protin, currentDragItem.minirals, currentDragItem.vitmin, currentDragItem.fat));				
			}else
			{
				returnPostion(currentDragItem);
			}
			stopDrag();				
		}
		
		private function returnPostion(_mc:MovieClip):void 
		{
			var myTweenX = new Tween(_mc, "x", Regular.easeIn, _mc.x, _mc.orgX, 0.3, true);
			var myTweenY = new Tween(_mc, "y", Regular.easeIn, _mc.y,  _mc.orgY, 0.3, true);
			myTweenX.addEventListener(TweenEvent.MOTION_FINISH,motionFinish);
			//_mc.addEventListener(MouseEvent.MOUSE_DOWN, _startDrag);
			//_mc.addEventListener(MouseEvent.MOUSE_UP, _stopDrag);
					
		}
		
		private function motionFinish(e:TweenEvent):void 
		{
			assienEvent();
		}
		
		private function setTween(_mc:MovieClip,p1:Number,p2:Number):void 
		{
			var myTweenX = new Tween(_mc, "x", Regular.easeIn, _mc.x, p1, 1, true);
			var myTweenY = new Tween(_mc, "y", Regular.easeIn, _mc.y,  p2, 1, true);
			//var myTweenAlpha = new Tween(_mc, "alpha", Elastic.easeOut, _mc.alpha,  0, 0.2, true);
			removeChild(_mc);
			assienEvent();
			//full_tween.addEventListener(TweenEvent.MOTION_FINISH, tweenFinished);					
		}
		
	}
	
}

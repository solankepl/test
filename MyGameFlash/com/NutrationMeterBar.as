package com {
	
	import fl.transitions.Tween;
	//import fl.transitions.easing.*;
	import fl.motion.easing.Elastic;
	import fl.transitions.easing.Strong;
	import flash.display.MovieClip;
	//import mx.transitions.easing;
	
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	
	public class NutrationMeterBar extends MovieClip {
		
		
		public function NutrationMeterBar() {
			// constructor code
			this.height = 0;
			
		}
		
		public function  initBarHight(val:Number):void 
		{
			this.scaleY = val;
		}
		
		public function setHight(value:Number):void 
		{
			
			//this.height = this.height+value;
			var currentHeight = this.height + value;
			if (currentHeight<135 && currentHeight>0)
			{
				var myTween:Tween = new Tween(this, "scaleY", Elastic.easeOut, this.scaleY, this.scaleY + (value / 100), 1, true);
			}
		}
				
	}
	
}

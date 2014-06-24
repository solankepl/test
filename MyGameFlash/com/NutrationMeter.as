package com {
	
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	public class NutrationMeter extends MovieClip {
		
		public var bar_1:NutrationMeterBar;
		public var bar_2:NutrationMeterBar;
		public var bar_3:NutrationMeterBar;
		public var bar_4:NutrationMeterBar;
		public var bar_5:NutrationMeterBar;
		
		public function NutrationMeter() {
			// constructor code
			startHeight();		
			
		}
		
		private function startHeight():void 
		{
			bar_1.initBarHight(0);
			bar_2.initBarHight(0);
			bar_3.initBarHight(0);
			bar_4.initBarHight(0);
			bar_5.initBarHight(1);	
		
		}
		
		public function  updateNurationMeter(c:Number, p:Number,m:Number,v:Number,f:Number):void 
		{
			bar_1.setHight(c);
			bar_2.setHight(p);
			bar_3.setHight(m);
			bar_4.setHight(v);
			bar_5.setHight(f);
			
		}
	}
	
}
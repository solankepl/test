package com
{
	
	import fl.motion.easing.Elastic;
	import fl.transitions.easing.Regular;
	import fl.transitions.Tween;
	import flash.display.MovieClip;
	import flash.events.TimerEvent;
    import flash.utils.Timer;	
	
	public class TimerCount extends MovieClip {
		
		private var timer:Timer;
		private var totalTime:Number = 60;
		public function TimerCount() {
			// constructor code			
		   timer = new Timer(1000,totalTime);			 
		   timer.addEventListener(TimerEvent.TIMER, onTimer);
		   timer.addEventListener(TimerEvent.TIMER_COMPLETE, onComplate);		   
           timer.start();
		   timePattiMc.width = 0; 	
		}
		
		private function onComplate(e:TimerEvent):void 
		{
			trace("timeUp");
			this.dispatchEvent(new CustomEvent(CustomEvent.TIMEFINISH, true, true));
		}
		
		public function onTimer(e:TimerEvent):void
        {			
            var currentWidth:Number = Math.floor(timer.currentCount / totalTime * 100) * 2;
			var myTween:Tween = new Tween(timePattiMc, "width", Regular.easeOut, timePattiMc.width, currentWidth, 1, true);
        }
	}	
}

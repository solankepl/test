package com {
	
	import flash.display.MovieClip;	
	import flash.text.TextField;
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	public class FoodTab extends MovieClip {
		
		public var tabTxt:TextField;
		private var _tabValue:String;
		private var _visted:Boolean;
		
		
		public function FoodTab() {
			// constructor code
			this._visted = false;
			this.stop();
		}
		
		public function get visted():Boolean 
		{
			return _visted;
		}
		
		public function set visted(value:Boolean):void 
		{
			_visted = value;
		}
		
		public function get tabValue():String 
		{
			return _tabValue;
		}
		
		public function set tabValue(value:String):void 
		{
			_tabValue = value;
			tabTxt.text = _tabValue;
		}
		
	
		
		
	}
	
}

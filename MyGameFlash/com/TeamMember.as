package com {
	
	import flash.display.MovieClip;
	import flash.text.TextField;
	
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	
	public class TeamMember extends MovieClip {
		
		public var teamMemberBg:MovieClip;
		public var userFace:UserFace;
		public var nameTxt:TextField;
		public var listItemTxt:TextField;
		public var totalCalTxt:TextField;
		public var nurationMeter:NutrationMeter;
			
		private var _playerNameTxt:String;
		private var _itemTxt:String;
		private var _totalCal:uint;
		private var totalAccetedFood:uint=0;
		
		public function TeamMember() {
			// constructor code			
		}
			
		public function setTeamMemberBg(value:Number):void 
		{
			teamMemberBg.gotoAndStop(value);
			
		}
		
		public function get playerNameTxt():String 
		{
			return _playerNameTxt;
		}
		
		public function set playerNameTxt(value:String):void 
		{
			_playerNameTxt = value;
			nameTxt.text = _playerNameTxt;
		}
		
		public function updateMeter(c:Number, p:Number,m:Number,v:Number,f:Number):void
		{
			nurationMeter.updateNurationMeter(c,p,m,v,f);
			
		}
		
		public function get itemTxt():String 
		{
			return _playerNameTxt;
		}
		
		public function set itemTxt(value:String):void 
		{
			_itemTxt = value;
			listItemTxt.text = listItemTxt.text + "* " + _itemTxt + "\n";
			totalAccetedFood++
			if (totalAccetedFood == 7)
			this.dispatchEvent(new CustomEvent(CustomEvent.PLAYERFULL, true, true));
		}
		
	
		public function get totalCal():uint 
		{
			return _totalCal;
		}
		
		public function set totalCal(value:uint):void 
		{
			_totalCal = value;
			totalCalTxt.text = String(_totalCal);		
			
		}
		
		public function  reaminingCalarry(val:Number):void 
		{
			if(_totalCal>val)
			_totalCal = _totalCal - val;
			totalCalTxt.text = String(_totalCal);
			
		}
	}	
}

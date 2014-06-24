package  {
	
	import com.Drag;
	import com.Drop;
	import com.FoodTab;
	import com.MassageBox;
	import com.TeamMember;
	import com.CustomEvent;
	import com.TimerCount;
	import flash.display.MovieClip;
	import flash.events.DataEvent;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.SampleDataEvent;
		
	/**
	 * ...
	 * @author Pavan Solnake
	 */
	
	public class Main extends MovieClip {
		
		public var loaderMc:LoaderMc;
		public var teamMember_1:TeamMember;
		public var teamMember_2:TeamMember;
		public var teamMember_3:TeamMember;
		public var currentMember:TeamMember;
		public var timerMc:TimerCount;
		public var massageBoxMc:MassageBox;
		public var disableMc:MovieClip;
		
		
		public var tab_1:FoodTab;
		public var tab_2:FoodTab;
		public var tab_3:FoodTab;
		
		public var drag_:Drag;
		public var drop_:Drop;
		
		private var member:Array = ["teamMember_1", "teamMember_2", "teamMember_3"];
		private var tabArr:Array=  ["tab_1", "tab_2", "tab_3"];
		
		public function Main() {
			// constructor code
			this.addEventListener(Event.ENTER_FRAME,loading)		
		}
		
		
		private function loading(e:Event):void 
		{
			var total:Number = this.stage.loaderInfo.bytesTotal;
			var loaded:Number =  this.stage.loaderInfo.bytesLoaded;
			
			loaderMc.pattiMc.scaleX = loaded / total;			
			loaderMc.loaderTxt.text = String((loaded / total) * 100) + "%";
			
			if (total == loaded){
				loaderMc.visible = false;	
				init();
				this.removeEventListener(Event.ENTER_FRAME, loading);
				}
		}
		
		
		private function init()
		{
			disableMc.visible = false;
			teamMember_1.addEventListener(MouseEvent.CLICK, clickHandler);
			teamMember_1.addEventListener(CustomEvent.PLAYERFULL, plaerHandle); 
			teamMember_1.playerNameTxt = "Player 1";
			teamMember_1.totalCal = 1000;
			
			
			teamMember_2.addEventListener(MouseEvent.CLICK, clickHandler);
			teamMember_2.addEventListener(CustomEvent.PLAYERFULL, plaerHandle); 
			teamMember_2.playerNameTxt = "Player 2";
			teamMember_2.totalCal = 500;
			
			teamMember_3.addEventListener(MouseEvent.CLICK, clickHandler);
			teamMember_3.addEventListener(CustomEvent.PLAYERFULL, plaerHandle); 
			teamMember_3.playerNameTxt = "Player 3";
			teamMember_3.totalCal = 800;
			
			
			currentMember = teamMember_1;
			currentMember.setTeamMemberBg(2);
			
			stage.addEventListener(CustomEvent.ITEMISACCEPTED, updateMemberdata);
			
			currentMember = teamMember_1 as TeamMember;
			
			addEventTab();
			tab_1.tabValue = "Tab 1";			
			tab_2.tabValue = "Tab 2";		
			tab_3.tabValue = "Tab 3";
			
			timerMc.addEventListener(CustomEvent.TIMEFINISH, endGame);			
			drag_.createFoodItems(drop_, "1");			
			tab_1.visted = true;
			tab_1.gotoAndStop(2);
		}
		
		private function plaerHandle(e:CustomEvent):void 
		{
			trace("player Full" + e.currentTarget.name);
			currentMember.removeEventListener(MouseEvent.CLICK, tabClickHandler);
			currentMember.mouseChildren = false;
			currentMember.mouseEnabled = false;
			currentMember.teamMemberBg.gotoAndStop(1);
			removeEventsAll(1)
			
		}
		
		private function endGame(e:CustomEvent):void 
		{
			trace("timeFinish");
			disableMc.visible = true;
		}
		
		private function updateMemberdata(e:CustomEvent):void 
		{
			currentMember.updateMeter(e.arg[2], e.arg[3], e.arg[4], e.arg[5], e.arg[6]*-1);
			currentMember.itemTxt = e.arg[0];
			currentMember.reaminingCalarry(e.arg[1]);
		}
		
		private function tabClickHandler(e:MouseEvent):void 
		{
			deselctTab();
			var currenTab = e.currentTarget as FoodTab;
			currenTab.gotoAndStop(2);
			var temp:String = String(currenTab.name).split("_")[1];
			if (currenTab.visted == false)
			{
			drag_.createFoodItems(drop_, temp);
			drag_.hideFoodItem(drop_,temp);
			currenTab.visted = true;			
			}else {
				drag_.showFoodItem(drop_, temp);				
			}
		}
		
				
		private function deselctTab():void
		{
			for (var i = 0; i < 3; i++)
			{
				this[tabArr[i]].gotoAndStop(1);
			}	
		}
		
		private function addEventTab():void {
			for (var i = 0; i < 3; i++)
			{
				this[tabArr[i]].addEventListener(MouseEvent.CLICK, tabClickHandler);
			}
		}
		
		private function removeEventTab():void {
			for (var i = 0; i < 3; i++)
			{
				this[tabArr[i]].removeEventListener(MouseEvent.CLICK, tabClickHandler);
			}
		}
		
		
		private function clickHandler(e:MouseEvent):void 
		{
			deselctMember();
			currentMember = e.currentTarget as TeamMember;
			currentMember.setTeamMemberBg(2);	
			addEventsAll(1);
		}		
		
		private function deselctMember():void
		{
			for (var i = 0; i < 3; i++)
			{
				this[member[i]].teamMemberBg.gotoAndStop(1);
			}	
		}
		
		private function  removeEventsAll(val:Number):void 
		{
			switch (val) 
			{
				case 1:
					drag_.removeEvent();
					removeEventTab();	
				break;
				
				case 2:
					trace(2);
				break;
				
				default:
					trace(2);
				break;
			}
		}
		
		private function  addEventsAll(val:Number):void 
		{
			switch (val) 
			{
				case 1:
					drag_.assienEvent();
					addEventTab();	
				break;
				
				case 2:
					trace(2);
				break;
				
				default:
					trace(2);
				break;
			}
		}
		
		
	}
	
}

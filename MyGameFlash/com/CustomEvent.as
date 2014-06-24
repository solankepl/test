package com
{
    import flash.events.Event;
    public class CustomEvent extends Event
    {
        public var arg:*;
        public var properties:Object;
		
		public static const ITEMISACCEPTED:String = "itemisAccepted"; 
		public static const TIMEFINISH:String = "timeFinesh";
		public static const PLAYERFULL:String = "palyerFull";

        public function CustomEvent( type:String,
                                   bubbles:Boolean = false, 
                                   cancelable:Boolean = false, 
                                   ... a:* ):void
        {
            super( type, bubbles, cancelable );
            arg = a;
        }
        
        // Override clone
        override public function clone():Event
        {
            return new CustomEvent( type, bubbles, cancelable, arg );
        };
    }
}
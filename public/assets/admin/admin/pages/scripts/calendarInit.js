var     CalendarInit = function () {

  
    	 var initCal1 =function init() {
		//Styling 
        
        scheduler.templates.event_class=function(start, end, event){
				var css = "";

				if(event.event_type) // if event has subject property then special class should be assigned
					css += "event_"+event.event_type;

				if(event.id == scheduler.getState().select_id){
					css += " selected";
				}
				return css; // default return

				/*
					Note that it is possible to create more complex checks
					events with the same properties could have different CSS classes depending on the current view:

					var mode = scheduler.getState().mode;
					if(mode == "day"){
						// custom logic here
					}
					else {
						// custom logic here
					}
				*/
			};
        
        
		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.config.prevent_cache = true;
		
		scheduler.config.lightbox.sections=[	
			{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
            {name: "Type", height: 21, map_to: "event_type", type: "select",
					options: scheduler.serverList("event_type")},
			{name:"location", height:43, type:"textarea", map_to:"details" },
			{name:"time", height:72, type:"time", map_to:"auto"}
		];
		scheduler.config.first_hour = 4;
		scheduler.config.limit_time_select = true;
		scheduler.locale.labels.section_location="Location";
		//scheduler.config.details_on_create=true;
		//scheduler.config.details_on_dblclick=true;


		
		scheduler.init('scheduler_here',new Date(2014,10,1),"month");
		scheduler.setLoadMode("month")
		scheduler.load("data/events.php");
		
		var dp = new dataProcessor("data/events.php");
		dp.init(scheduler);

	}

    

    

    return {

        //main function to initiate the module
        init: function () {
            

            initCal1();
            
        }

    };

}();
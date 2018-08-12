function init() {
    // Coloring --------------------------------------------------------
    scheduler.templates.event_class = function (start, end, event) {
        var css = "";

        if (event.subject) // if event has subject property then special class should be assigned
            css += "event_" + event.subject;

        if (event.id == scheduler.getState().select_id) {
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

    var subject = [
        {
            key: '',
            label: 'Appointment'
        },
        {
            key: 'color1',
            label: 'Color1'
        },
        {
            key: 'color2',
            label: 'Color2'
        },
        {
            key: 'color3',
            label: 'Color3'
        }
			];
    // starting hour  ---------------------------------------------------
    scheduler.config.first_hour = 6;
    // Touch support ---------------------------------------------------
    scheduler.config.touch = "force";
    // Y- Axis Format  ----------------------------------------------------
    scheduler.config.start_on_monday = false;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.config.hour_date = "%h:%i %A";
    //scheduler.config.hour_size_px=25;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(2015, 3, 20), "week");
    scheduler.parse([
        {
            start_date: "2015-04-18 09:00",
            end_date: "2015-04-18 12:00",
            text: "Color1 lesson",
            subject: 'color1'
        },
        {
            start_date: "2015-04-20 10:00",
            end_date: "2015-04-21 16:00",
            text: "Color2 exam",
            subject: 'color2'
        },
        {
            start_date: "2015-04-21 10:00",
            end_date: "2015-04-21 14:00",
            text: "Color3 lesson",
            subject: 'color3'
        },
        {
            start_date: "2015-04-23 16:00",
            end_date: "2015-04-23 17:00",
            text: "Color1 lesson",
            subject: 'color1'
        },
        {
            start_date: "2015-04-24 09:00",
            end_date: "2015-04-24 17:00",
            text: "Usual event"
        }
			], "json");

}

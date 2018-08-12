
    $("#phone").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "FIXED_LINE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });
    $("#fax").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "FIXED_LINE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });
    $("#mobile").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });

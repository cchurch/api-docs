$(function () {
    var swaggerUi = new SwaggerUi({
        url: apiDocsUrl,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
        onComplete: function(swaggerApi, swaggerUi){
            if(console) {
                console.log("Loaded SwaggerUI")
            }
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
            // Copy title into the header
            $('#een-title').text($('.info_title').text());
            // Copy contact link into the header
            $('#een-contact').html($(".info_contact a").clone().text('Contact Us'));
            $('#show_authenticate').off('click').on('click', showAuthenticate);
            $('#show_authorize').off('click').on('click', showAuthorize);
            // Make logo link to public api docs page
            $('#een-logo').off('click').on('click', function(){
                // Strip off anything past the base url+path
                window.location.href = window.location.pathname.split('/').slice(0,-1).join('/');
            });
        },
        onFailure: function(data){
            if(console) {
                console.log("Unable to Load SwaggerUI");
                console.log(data);
            }
        },
        docExpansion: "none"
    });

    function showAuthenticate(e){
        e.preventDefault();
        if(!$($('a[href*="aaa/authenticate"]').get(0)).is(':visible')){
            $($('a[href*="aaa"]').get(0)).trigger('click');
        }
        if(!$($('div[id*="aaa_authenticate"]').get(0)).is(':visible')){
            $($('a[href*="aaa/authenticate"]').get(0)).trigger('click');
        }
    }

    function showAuthorize(e){
        e.preventDefault();
        if(!$($('a[href*="aaa/authenticate"]').get(0)).is(':visible')){
            $($('a[href*="aaa"]').get(0)).trigger('click');
        }
        if(!$($('div[id*="aaa_authorize"]').get(0)).is(':visible')){
            $($('a[href*="aaa/authorize"]').get(0)).trigger('click');
        }
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function checkSession(){
        var cookie = readCookie('videobank_sessionid');
        if(cookie){
            // Show the session ID in the header
            $('#een-session').text('Session ID: '+cookie);
            $('#een-session').append($("<span></span>"));
            $('#een-session span').html(" (<a href='#'>clear</a>)");
            $('#een-session span a').on('click', function(){
                // Clear out existing session
                document.cookie = "videobank_sessionid=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.eagleeyenetworks.com; path=/";
            });
        }else{
            // We don't have a session ID
            $('#een-session').text('Session ID: None');
        }
    }

    // Populate session ID in header now
    checkSession();

    // Monitor the session ID and display it if we ever get one (after authenticate/authorize calls)
    window.setInterval(checkSession, 2000);

    // Load GUI
    swaggerUi.load();
});
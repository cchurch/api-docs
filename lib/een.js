$(function () {
    var Workspace = Backbone.Router.extend({
        routes: {
            "info/:resource":     "info_resource"
        },

        info_resource: function(resource) {
            var elem = $('#resource_'+resource);
            var isLoaded = elem.find('.endpoints .endpoint').size()>0;
            if(!isLoaded){
                return false;
            }
            if(!elem.hasClass('active')){
                $($('a[href*="'+resource+'"]').get(0)).trigger('click');
            }
            if(elem.find('.info-resource').size()===0){
                var infoResource = $('<div class="info-resource"></div>').insertAfter($(elem.find('.heading')[0]));
                infoResource.load(apiDocsUrl+resource+'/info.html', function() {
                    if($.trim(infoResource.text())){
                        infoResource.prepend('<h2 class="info-resource-heading">More Information</h2>');
                    }else{
                        infoResource.hide();
                    }
                });
            }
        }
    });
    if(window.location != window.parent.location){
        $('#header').hide();
    }
    new Workspace();
    Backbone.history.start({pushState: false});
    var completed = false;
    var swaggerUi = new SwaggerUi({
        url: window.location.pathname.split('/').slice(0,-1).join('/') + '/'+apiDocsUrl,
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
            $('#een-contact').html($(".info_contact a").clone().text('Contact Us').attr('href', 'http://www.eagleeyenetworks.com/company/contact/'));
            $('#show_terms').off('click').on('click', showTerms);
            $('#show_start').off('click').on('click', showStart);
            // Make logo link to public api docs page
            $('#een-logo').off('click').on('click', function(){
                // Strip off anything past the base url+path
                window.location.href = window.location.pathname.split('/').slice(0,-1).join('/');
            });
            _.each($('.resource > .heading > .options'), function(item){
                var elem = $(item);
                var resource = elem.closest('.resource').attr('id').replace('resource_','');
                $('<li><a href="#/info/'+resource+'">More Info</a></li>').insertAfter($(elem.find('li')[0]));
            });
            completed = true;
            window.setTimeout(initRoute, 1000);
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
        try{
            $('html, body').scrollTop($("#aaa_authenticate_post_0").offset().top);
        }catch(e){
            // do nothing
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
        try{
            $('html, body').scrollTop($("#aaa_authorize_post_1").offset().top);
        }catch(e){
            // do nothing
        }
    }

    function showStart(e, toggle){
        e.preventDefault();
        if(typeof toggle == 'undefined'){
            showTerms(e, false);
        }
        var elem = $('#show_start');
        var start = $('#api_start');
        if(start.size()===0){
            start = $('<div id="api_start"></div>').insertAfter($(elem.closest('.info_description')));
            start.load(apiDocsUrl+'start.html', function() {
                if($.trim(start.text())){
                    start.prepend('<h2 class="info-resource-heading">Getting Started</h2>');
                }
                if($.trim(start.text()) && toggle!==false){
                    start.show();
                    elem.text('Getting Started (hide)');
                }else{
                    start.hide();
                    elem.text('Getting Started');
                }
                $('#show_authenticate').off('click').on('click', showAuthenticate);
                $('#show_authorize').off('click').on('click', showAuthorize);
            });
        }else if(start.is(':visible') || toggle===false){
            start.hide();
            elem.text('Getting Started');
        }else{
            start.show();
            elem.text('Getting Started (hide)');
        }
    }

    function showTerms(e, toggle){
        e.preventDefault();
        if(typeof toggle == 'undefined'){
            showStart(e, false);
        }
        var elem = $('#show_terms');
        var terms = $('#api_terms');
        if(terms.size()===0){
            terms = $('<div id="api_terms"></div>').insertAfter($(elem.closest('.info_description')));
            terms.load(apiDocsUrl+'terms.html', function() {
                if($.trim(terms.text())){
                    terms.prepend('<h2 class="info-resource-heading">Definition of Terms</h2>');
                }
                if($.trim(terms.text()) && toggle!==false){
                    terms.show();
                    elem.text('Definition of Terms (hide)');
                }else{
                    terms.hide();
                    elem.text('Definition of Terms');
                }
            });
        }else if(terms.is(':visible') || toggle===false){
            terms.hide();
            elem.text('Definition of Terms');
        }else{
            terms.show();
            elem.text('Definition of Terms (hide)');
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

    function initRoute(){
        if(completed && $('#resources_container').size()===1 && Backbone.history.fragment){
            Backbone.history.loadUrl(Backbone.history.fragment);
            try{
                // Try to scroll down to the service
                $('html, body').scrollTop($("#resource_"+Backbone.history.fragment.split('/')[1]).offset().top);
            }catch(e){
                // do nothing
            }
        }else{
            if(Backbone.history.fragment){
                window.setTimeout(initRoute, 1000);
            }
        }
    }

    // Populate session ID in header now
    checkSession();

    // Monitor the session ID and display it if we ever get one (after authenticate/authorize calls)
    window.setInterval(checkSession, 2000);

    // Load GUI
    swaggerUi.load();
});
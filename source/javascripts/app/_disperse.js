//= require ./_modal

// Make elements go away with super click-away fun
var huntDocu_enable = false;

var huntTitleON =    'Docu Hunt: Enabled',
    huntMsgON =      'Super click-away fun has been enabled!'
                   + '<br><small>(Click on any object in the body to make it disappear | Press <key>F9</key> to disable)</small>',
    huntTitleOFF =   'Docu Hunt: Disabled',
    huntMsgOFF =     'Super click-away fun has been disabled!';


$(document).ready(
    function huntDocu() {

        // Press 'F9' to toggle huntDocu()
        $(document).on("keydown" || "keyup", function(event) {    //Multifold triggers [ preventDefault() works only with 'keydown', but 'keyup' is supported across more browsers ]

            if (event.which === 120 || event.keyCode == 120) {    // Multifold event listeners [ 'which' is supported across more browsers, 'keyCode' is for older browsers ]

                // Prevent Default 'key_' behavior
                event.preventDefault();

                // Switch the value to opposite
                huntDocu_enable = !huntDocu_enable

                // Hunt stuff from the docu
                if (huntDocu_enable === true) {

                    $("p, li, code, aside, h1, h2, h3, table, tr, th, thead, tbody, pre, blockquote")
                    .on('click', function clickAway() {

                            $(this).addClass("eaten");
                            $(this).toggle(
                                // Idk, keep this channel open
                            );

                    });

                    // Use the Modal to relay the enable message
                    $(".modal").css("display", "block");
                    $(".modal-title").html(huntTitleON);
                    $(".modal-paragraph").html(huntMsgON);

                } else if (huntDocu_enable === false) {

                    // Return the hunten
                    $('.eaten').toggle(200);
                    $('.eaten').removeClass("eaten");

                    // Don't hunt them again! | Somehow .on() cancells the same .on() out, whereas .off() does nothing
                    $("p, li, code, aside, h1, h2, h3, table, tr, th, thead, tbody, pre, blockquote")
                    .on('click', function() {

                            $(this).toggle(
                                // Idk, keep this channel open
                            );

                    });

                    // Use the Modal to relay the disable message
                    $(".modal").css("display", "block");
                    $(".modal-title").html(huntTitleOFF);
                    $(".modal-paragraph").html(huntMsgOFF);

                }

            }

        });

    }

);

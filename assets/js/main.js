(function ($) {

    $(document).ready(function () {

        /*-----------------------------------/
        /* NAVIGATION
        /*----------------------------------*/

        // init scroll-to effect navigation, adjust the scroll speed in milliseconds
        $('#main-nav').localScroll(1000);
        $('#header').localScroll(1000);

        /*-----------------------------------/
        /* NAVBAR
        /*----------------------------------*/
        $navbar = $('.navbar');
        // auto hide
        $navbar.addClass('auto-hiding-initialized navbar-fixed-top').autoHidingNavbar();
        $navbar.parents('.wrapper').css('padding-top', $navbar.outerHeight());

        /*-----------------------------------/
        /* SKILLS
        /*----------------------------------*/

        var chart = $('.pie-chart');

        if ($('.pie-chart').length > 0) {
            chart.easyPieChart({
                size: 180,
                barColor: '#cf5037',
                trackColor: '#545454',
                scaleColor: false,
                lineWidth: 3,
                lineCap: "square",
                animate: 2000
            });
        }


        /*-----------------------------------/
        /* GOOGLE MAPS
        /*----------------------------------*/

        if ($('.map-canvas').length > 0) {

            var address = 'Chaville, France';
            var contentString = '<div class="map-detail"><p>' + address + '</p></div>';

            jQuery('.map-canvas').gmap().bind('init', function (ev, map) {
                jQuery(this).gmap('addMarker', {
                    'position': '48.8090959,2.1734399',
                    'bounds': true
                }).click(function () {
                    jQuery('.map-canvas').gmap('openInfoWindow', {'content': contentString}, this);
                });
                jQuery('.map-canvas').gmap('option', 'zoom', 11);
            });
        }


        /*-----------------------------------/
        /* AJAX CONTACT FORM
        /*----------------------------------*/

        if ($('#contact-form').length > 0) {
            $('#contact-form').parsley();

            $('#contact-form').submit(function (e) {

                e.preventDefault();

                $theForm = $(this);
                $btn = $(this).find('#submit-button');
                $btnText = $btn.text();
                $(this).parent().append('<div class="alert"></div>');
                $alert = $(this).parent().find('.alert');

                $btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
                $btn.prop('disabled', true).find('span').text("Sending...");

                $url = "contact.php";

                $attr = $(this).attr('action');
                if (typeof $attr !== typeof undefined && $attr !== false) {
                    if ($(this).attr('action') != '') $url = $(this).attr('action');
                }

                $.post($url, $(this).serialize(), function (data) {

                    $message = data.message;

                    if (data.result == true) {
                        $theForm.slideUp('medium', function () {
                            $alert.removeClass('alert-danger');
                            $alert.addClass('alert-success').html($message).slideDown('medium');
                        });
                    } else {
                        $alert.addClass('alert-danger').html($message).slideDown('medium');
                    }

                    $btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
                    $btn.prop('disabled', false).find('span').text($btnText);

                })
                    .fail(function () {
                        console.log('AJAX Error');
                    });

            });
        }

    });

})(jQuery);
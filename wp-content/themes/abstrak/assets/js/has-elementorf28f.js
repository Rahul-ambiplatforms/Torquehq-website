(function() {
    'use strict';

    var $ = jQuery;

    function _typeof(obj) {
        "@babel/helpers - typeof";

        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    var ThemeHelper = {

    };

    var Theme = {

        countdown: function countdown() {
            if (typeof $.fn.countdown == 'function') {
                try {

                    var day = abstrakObj.day == 'Day' ? 'Day%!D' : abstrakObj.day,
                        hour = abstrakObj.hour == 'Hour' ? 'Hour%!D' : abstrakObj.hour,
                        minute = abstrakObj.minute == 'Minute' ? 'Minute%!D' : abstrakObj.minute,
                        second = abstrakObj.second == 'Second' ? 'Second%!D' : abstrakObj.second;

                    $('.coming-soon-area').each(function() {

                        var $CountdownSelector = $(this).find('.countdown');

                        var eventCountdownTime = $CountdownSelector.attr('data-countdown');

                        $CountdownSelector.countdown(eventCountdownTime).on('update.countdown', function(event) {
                            $(this).html(event.strftime('' + '<div class="countdown-section"><div><div class="countdown-number">%D</div><div class="countdown-unit">' + day + '</div></div></div>' + '<div class="countdown-section"><div><div class="countdown-number">%H</div><div class="countdown-unit">' + hour + '</div></div></div>' + '<div class="countdown-section"><div><div class="countdown-number">%M</div><div class="countdown-unit">' + minute + '</div></div></div>' + '<div class="countdown-section"><div><div class="countdown-number">%S</div><div class="countdown-unit">' + second + '</div></div></div>'));
                        }).on('finish.countdown', function(event) {
                            $(this).html(event.strftime(''));
                        });
                    });

                } catch (err) {
                    console.log('Countdown : ' + err.message);
                }
            }
        },
        sameHeightFunction: function() {
            function sameHeight() {
                var elements = $('.blog-list');
                var max_height = 0;
                elements.each(function(index, el) {
                    var height = $(el).height();
                    var index = index;
                    // console.log(index);
                    if (height > max_height) {
                        max_height = height;
                    }
                });
                elements.height(max_height);
            }
            sameHeight();
        },

        pricingPlan: function() {
            var yearlySelectBtn = $('#yearly-plan-btn'),
                monthlySelectBtn = $('#monthly-plan-btn'),
                monthlyPrice = $('.monthly-pricing'),
                yearlyPrice = $('.yearly-pricing'),
                buttonSlide = $('#pricing-checkbox');

            $(monthlySelectBtn).on('click', function() {
                buttonSlide.prop('checked', true);
                $(this).addClass('active').parent('.nav-item').siblings().children().removeClass('active');
                monthlyPrice.css('display', 'block');
                yearlyPrice.css('display', 'none');

            });

            $(yearlySelectBtn).on('click', function() {
                buttonSlide.prop('checked', false);
                $(this).addClass('active').parent('.nav-item').siblings().children().removeClass('active');
                monthlyPrice.css('display', 'none');
                yearlyPrice.css('display', 'block');
            });

            $(buttonSlide).change(function() {
                if ($('input[id="pricing-checkbox"]:checked').length > 0) {
                    monthlySelectBtn.addClass('active');
                    yearlySelectBtn.removeClass('active');
                    monthlyPrice.css('display', 'block');
                    yearlyPrice.css('display', 'none');

                } else {
                    yearlySelectBtn.addClass('active');
                    monthlySelectBtn.removeClass("active");
                    monthlyPrice.css('display', 'none');
                    yearlyPrice.css('display', 'block');

                }
            });
        },

        axilMasonary: function() {
            $('.axil-isotope-wrapper').imagesLoaded(function() {
                // filter items on button click
                $('.isotope-button').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });

                // init Isotope
                var $grid = $('.isotope-list').isotope({
                    itemSelector: '.project',
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'fitRows',
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: ".project",
                    }
                });
            });

            $('.isotope-button button').on('click', function(event) {
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                event.preventDefault();
            });

            // Masonry
            var galleryIsoContainer = $('#no-equal-gallery');
            if (galleryIsoContainer.length) {
                var blogGallerIso = galleryIsoContainer.imagesLoaded(function() {
                    blogGallerIso.isotope({
                        
                        percentPosition: true,
                        layoutMode: 'fitRows',
                        masonry: {
                            columnWidth: '.no-equal-item'
                        }
                    });
                });
            }
        },

        axilcounterUpAtion: function() {
            var _counter = $('.count');
            if (_counter.length) {
                _counter.counterUp({
                    delay: 10,
                    time: 1000,
                    triggerOnce: true
                });
            }
        },

     counterUp: function () {
            
            var elementSelector = $('.count');
            elementSelector.each(function(){
                elementSelector.appear(function(e) {
                    var el = this;
                    var updateData = $(el).attr("data-count");
                    var od = new Odometer({
                        el: el,
                        format: 'd',
                        duration: 2000
                    });
                    od.update(updateData);
                });
            });
        },
        axilSlickActivation: function(e) {
            $('.slick-slider').not('.slick-initialized').slick();
        },

        magnificPopupActivation: function() {

            var yPopup = $('.popup-youtube');
            if (yPopup.length) {
                yPopup.magnificPopup({
                    disableOn: 300,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }
           
            },

        salActivation: function() {
            sal({
                threshold: 0.1,
                once: true
            });
        },
        marqueImages: function() {
            $('.marque-images').each(function() {
                var t = 0;
                var i = 1;
                var $this = $(this);
                setInterval(function() {
                    t += i;
                    $this.css('background-position-x', -t + 'px');
                }, 10);
            });
        },

        axilHover: function() {
            $('.services-grid, .counterup-progress, .testimonial-grid, .pricing-table, .brand-grid, .blog-list, .about-quality, .team-grid, .splash-hover-control').mouseenter(function() {
                var self = this;
                setTimeout(function() {
                    $('.services-grid.active, .counterup-progress.active, .testimonial-grid.active, .pricing-table.active, .brand-grid.active, .blog-list.active, .about-quality.active, .team-grid.active, .splash-hover-control.active').removeClass('active');
                    $(self).addClass('active');
                }, 0);

            });
        },

        mobileMenuActivation: function(e) {
            
            $('.menu-item-has-children > a').on('click', function(e) {

                var targetParent = $(this).parents('.header-main-nav'),
                    target = $(this).siblings('.axil-submenu'),
                    targetSiblings = $(this).parent('.menu-item-has-children').siblings().find('.axil-submenu');
                
                if (targetParent.hasClass('offcanvas')) {
                    $(target).slideToggle(400);
                    $(targetSiblings).slideUp(400);
                    $(this).parent('.menu-item-has-children').toggleClass('open');
                    $(this).parent('.menu-item-has-children').siblings().removeClass('open');
                }

            });
           
            function resizeClassAdd() {
                if (window.matchMedia('(min-width: 992px)').matches) {
                    $('body').removeClass('mobilemenu-active');
                    $('#mobilemenu-popup').removeClass('offcanvas show').removeAttr('style');
                    $('.axil-mainmenu .offcanvas-backdrop').remove();
                    $('.axil-submenu').removeAttr('style');
                    if ($('body').hasClass('onepage-template')) {
                        $('.header-main-nav ').removeAttr('id');
                    }
                } else {
                    $('body').addClass('mobilemenu-active');
                    $('#mobilemenu-popup').addClass('offcanvas');
                    $('.menu-item-has-children > a').on('click', function(e) {
                        e.preventDefault();
                    });
                    $('.header-main-nav ').attr('id', 'mobilemenu-popup');
                }
            }

            $(window).on('resize', function() {
                resizeClassAdd();
            });
            
            resizeClassAdd();
        },
        
        tiltAnimation: function() {
            var _tiltAnimation = $('.paralax-image')
            if (_tiltAnimation.length) {
                _tiltAnimation.tilt({
                    max: 12,
                    speed: 1e3,
                    easing: 'cubic-bezier(.03,.98,.52,.99)',
                    transition: !1,
                    perspective: 1e3,
                    scale: 1
                })
            }
        },

        onePageTopFixed: function() {
            if ($('.onepagefixed').length) {
                var fixedElem = $('.onepagefixed'),
                    distance = fixedElem.offset().top - 100,
                    $window = $(window),
                    totalDistance = $('.service-scroll-navigation-area').outerHeight() + distance;

                $(window).on('scroll', function() {
                    if ($window.scrollTop() >= distance) {
                        if ($('body').hasClass('admin-bar')) {
                            fixedElem.css({
                                position: 'fixed',
                                left: '0',
                                right: '0',
                                top: '32px',
                                zIndex: '5'
                            });
                        } else {
                            fixedElem.css({
                                position: 'fixed',
                                left: '0',
                                right: '0',
                                top: '0',
                                zIndex: '5'
                            });
                        }
                        fixedElem.addClass('show');

                    } else {
                        fixedElem.removeAttr('style');
                        fixedElem.removeClass('show');
                    }

                    if ($window.scrollTop() >= totalDistance) {
                        fixedElem.removeAttr('style');
                        fixedElem.removeClass('show');
                    }
                });
            }
        },

    };

    function widthgen() {
        $(window).on('load resize', elementWidth);

        function elementWidth() {
            $('.elementwidth').each(function() {
                var $container = $(this),
                    width = $container.outerWidth(),
                    classes = $container.attr('class').split(' ');
                var classes1 = startWith(classes, 'elwidth');
                classes1 = classes1[0].split('-');
                classes1.splice(0, 1);
                var classes2 = startWith(classes, 'elmaxwidth');
                classes2.forEach(function(el) {
                    $container.removeClass(el);
                });
                classes1.forEach(function(el) {
                    var maxWidth = parseInt(el);

                    if (width <= maxWidth) {
                        $container.addClass('elmaxwidth-' + maxWidth);
                    }
                });
            });
        }

        function startWith(item, stringName) {
            return $.grep(item, function(elem) {
                return elem.indexOf(stringName) == 0;
            });
        }
    }

    widthgen();

    function content_ready_scripts() {

        Theme.axilMasonary();
        //Theme.axilcounterUpAtion();
        Theme.counterUp();
        Theme.axilSlickActivation();
        Theme.magnificPopupActivation();
        Theme.salActivation();
        Theme.marqueImages();
        Theme.axilHover();
        Theme.mobileMenuActivation();
        Theme.tiltAnimation();
        Theme.pricingPlan();
        Theme.onePageTopFixed();
        Theme.sameHeightFunction();
        Theme.countdown();

    }

    function content_load_scripts() {
        Theme.magnificPopupActivation();
        Theme.salActivation();
        Theme.marqueImages();
        Theme.tiltAnimation();
    }

    $(document).ready(function() {
        content_ready_scripts();
    });

    $(window).on('load', function() {
        content_load_scripts();

    });

    $(window).on('load resize', function() {
        content_load_scripts();
    });

    $(window).on('elementor/frontend/init', function() {
        if (elementorFrontend.isEditMode()) {
            elementorFrontend.hooks.addAction('frontend/element_ready/widget', function() {
                content_ready_scripts();
                content_load_scripts();
            });
        }
    });

}());
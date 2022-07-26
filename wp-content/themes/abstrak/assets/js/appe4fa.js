(function(window, document, $, undefined) {
    'use strict';

    var axilInit = {
        i: function(e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function(e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function(e) {
            axilInit.w();
            axilInit.contactForm();
            axilInit.axilBackToTop();
            axilInit.stickyHeaderMenu();  
            axilInit.menuLinkActive(); 
            axilInit.axilScrollSpy();
            //axilInit.onePageNav();
            axilInit.axilScrollSpyOnepage();
            axilInit.blogModalActivation();
            axilInit.portfolioModalActivation();
            axilInit.caseModalActivation();
            

        },

        w: function(e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.res)
        },

        contactForm: function() {
            $('.axil-contact-form').on('submit', function(e) {
                e.preventDefault();
                var _self = $(this);
                var _selector = _self.closest('input,textarea');
                _self.closest('div').find('input,textarea').removeAttr('style');
                _self.find('.error-msg').remove();
                _self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
                var data = $(this).serialize();
                $.ajax({
                    url: 'mail.php',
                    type: "post",
                    dataType: 'json',
                    data: data,
                    success: function(data) {
                        _self.closest('div').find('button[type="submit"]').removeAttr('disabled');
                        if (data.code == false) {
                            _self.closest('div').find('[name="' + data.field + '"]');
                            _self.find('.btn-primary').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
                        } else {
                            $('.error-msg').hide();
                            $('.form-group').removeClass('focused');
                            _self.find('.btn-primary').after('<div class="success-msg"><p>' + data.success + '</p></div>');
                            _self.closest('div').find('input,textarea').val('');

                            setTimeout(function() {
                                $('.success-msg').fadeOut('slow');
                            }, 5000);
                        }
                    }
                });
            });
        },

        axilBackToTop: function() {
            var btn = $('#backto-top');
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        },

        stickyHeaderMenu: function() {

            $(window).on('scroll', function() {
                // Sticky Class Add
                if ($('body').hasClass('sticky-header')) {
                    var stickyPlaceHolder = $("#axil-sticky-placeholder"),
                        menu = $(".axil-mainmenu"),
                        menuH = menu.outerHeight(),
                        topHeaderH = $('.axil-header-top').outerHeight() || 0,
                        targrtScroll = topHeaderH + 200;
                    if ($(window).scrollTop() > targrtScroll) {
                        menu.addClass('axil-sticky');
                        stickyPlaceHolder.height(menuH);
                    } else {
                        menu.removeClass('axil-sticky');
                        stickyPlaceHolder.height(0);
                    }
                }
            });
        },
 
        countdownInit: function(countdownSelector, countdownTime) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function(e) {
                    $(this).html(
                        e.strftime(
                            "<div class='countdown-section'><div><div class='countdown-number'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Minutes</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Seconds</div> </div></div>"
                        )
                    );
                });
            }
        },
 
        menuLinkActive: function () {
            var currentPage = location.pathname.split("/"),
                current = currentPage[currentPage.length-1];
            $('.mainmenu li a').each(function(){
                var $this = $(this);
                if($this.attr('href') === current){
                    $this.addClass('active');
                }
            });
        },

        audioPlayerActivation: function () {
            GreenAudioPlayer.init({
                selector: '.green-player',
                stopOthersOnPlay: true
            })
        },

        sameHeightFunction: function () {
            function sameHeight() {
                var elements = $('.blog-list');
                var max_height = 0;
                elements.each(function(index, el) {
                  var height = $(el).height();
                  var index = index;
                  console.log(index);
                  if (height > max_height) {
                    max_height = height;
                  }
                });
                elements.height(max_height);
            }
            sameHeight();
        },

 
        onePageNav: function () {
            $('#onepagemenu').onePageNav({
                currentClass: 'current',
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.2,
                filter: '',
                easing: 'swing',
            });
        },

        axilScrollSpyOnepage: function () {
            var scrollspySelector = $('#onepagemenu');
            if (scrollspySelector.length) {
                var scrollSpy = new bootstrap.ScrollSpy(document.body, {
                    target: '#onepagemenu',
                    offset: 120
                });
            }
            $("#onepagemenu-axil a[href*=#]:not([href=#])").on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top -95
                        }, 1000);
                        return false;
                    }
                }
            });
        },
 
        axilScrollSpy: function () {
            var scrollspySelector = $('#onepagenav');
            if (scrollspySelector.length) {
                var scrollSpy = new bootstrap.ScrollSpy(document.body, {
                    target: '#onepagenav',
                    offset: 100
                });
            }
        },
        
        blogModalActivation : function () {

            var modalBox = $('.op-blog-modal');
            var blogList = $('.blog-list');
            var modalClose = modalBox.find('.close');

            if ($('body').hasClass('onepage-template')) {
                
                blogList.each(function() {
                    
                    var $this = $(this);
                    var buttons = $this.find('.post-thumbnail a, .title a, .more-btn');
                    var mainImg = $this.find('.modal-thumb');
                    var title = $this.find('.title');
                    var paragraph = $this.find('.details-description p');
                    var socialShare = $this.find('.blog-share');
                    
                    buttons.on('click', function(e){
                        $('body').addClass('op-modal-open');
                        modalBox.addClass('open');
                        mainImg.clone().appendTo('.op-modal-content .post-thumbnail');
                        title.clone().appendTo('.op-modal-content .post-content');
                        paragraph.clone().appendTo('.op-modal-content .post-content');
                        socialShare.clone().appendTo('.op-modal-content .post-content');
                        e.preventDefault();
                        
                    })
                    
                });
                
                modalClose.on('click', function(e) {
                    $('body').removeClass('op-modal-open');
                    modalBox.removeClass('open');
                    modalBox.find('.op-modal-content .post-content').html('');
                    modalBox.find('.op-modal-content .post-thumbnail').html('');
                    e.preventDefault();
                });

                $('#onepagemenu li a').on('click', function() {
                    var popupMenuWrap = $('#mobilemenu-popup .mobile-menu-close, .header-offcanvasmenu .btn-close');
                    if ($('#mobilemenu-popup, .header-offcanvasmenu').hasClass('offcanvas')) {
                        popupMenuWrap.trigger('click');
                        
                    }
                });
            }
        },

        portfolioModalActivation : function () {
            
            var modalBox = $('.op-portfolio-modal');
            var projectList = $('.project-grid');
            var modalClose = modalBox.find('.close');

            if ($('body').hasClass('onepage-template')) {
                
                projectList.each(function() {
                    
                    var $this = $(this);
                    var buttons = $this.find('.thumbnail a, .title a');
                    var mainImg = $this.find('.thumbnail .modal-thumb');
                    var title = $this.find('.title');
                    var paragraph = $this.find('.content p');
                    var socialShare = $this.find('.project-share');
                    buttons.on('click', function(e){
                        $('body').addClass('op-modal-open');
                        modalBox.addClass('open');
                        mainImg.clone().appendTo('.op-modal-content .portfolio-thumbnail');
                        title.clone().appendTo('.op-modal-content .portfolio-content');
                        paragraph.clone().appendTo('.op-modal-content .portfolio-content');
                        socialShare.clone().appendTo('.op-modal-content .portfolio-content');
                        e.preventDefault();
                        
                    })
                    
                });
                
                modalClose.on('click', function(e) {
                    $('body').removeClass('op-modal-open');
                    modalBox.removeClass('open');
                    modalBox.find('.op-modal-content .portfolio-content').html('');
                    modalBox.find('.op-modal-content .portfolio-thumbnail').html('');
                    e.preventDefault();
                });
            }
        },

        caseModalActivation : function () {
            
            var modalBox = $('.op-case-modal');
            var caseList = $('.case-study-featured');
            var modalClose = modalBox.find('.close');

            if ($('body').hasClass('onepage-template')) {
                
                caseList.each(function() {
                    
                    var $this = $(this);
                    var buttons = $this.find('.axil-btn');
                    var title = $this.find('.title');
                    var paragraph = $this.find('.details-description');

                    buttons.on('click', function(e){
                        $('body').addClass('op-modal-open');
                        modalBox.addClass('open');
                        title.clone().appendTo('.op-modal-content .case-content');
                        paragraph.clone().appendTo('.op-modal-content .case-content');
                        e.preventDefault();
                        
                    })
                    
                });
                
                modalClose.on('click', function(e) {
                    $('body').removeClass('op-modal-open');
                    modalBox.removeClass('open');
                    modalBox.find('.op-modal-content .case-content').html('');
                    e.preventDefault();
                });
            }
        },
    }
    axilInit.i();

})(window, document, jQuery);



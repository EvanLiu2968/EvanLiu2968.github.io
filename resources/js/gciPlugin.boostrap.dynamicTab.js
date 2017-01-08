(function ($) {

    var showTabHandler = function (targettabs, icon, title, tabid, url, closable, tabcontainer) {
        var $headerwrapper = $('ul.nav.nav-tabs').filter('[data-tabsid="' + targettabs + '"]');
        var $contentwrapper = $('div.tab-content').filter('[data-tabsid="' + targettabs + '"]');
        var settings = $headerwrapper.data('bs.tab.gciPlugin.dynamicTab').settings;

        if ($headerwrapper.find('a[href="#' + tabid + '"]').length == 0) {
            if ($headerwrapper.find('a[data-toggle="tab"]').length >= settings.tabLimit) {
                $.alert('最多只能打开'+settings.tabLimit+'个页面，请您先关闭部分页面。', '系统消息');
                return;
            } else {
                appendTabHandler(targettabs, icon, title, tabid, url, closable, tabcontainer);
            }
        }

        $headerwrapper.find('a[href="#' + tabid + '"]').tab('show');
    };

    var ajustActiveTabLinksHandler = function (e) {
        e.target // newly activated tab
        e.relatedTarget // previous active tab
        var $activeli = $(e.target).parent(); // li object
        var $headerwrapper = $activeli.parent();
        var $headerparent = $headerwrapper.parent();

        // 活动 tab 隐藏在左边，活动和之后 Tab 都可以显示
        $activeli.removeClass('hidden');
        $activeli.nextAll().removeClass('hidden');
        // 活动 tab 隐藏在右边，从最先开始隐藏，直到显示为止
        while ($activeli.offset().left + $activeli.outerWidth(true) > $headerparent.offset().left + $headerparent.width() - 20) {
            $headerwrapper.children('li:has(a[data-toggle="tab"])').filter(':visible')
                .first().addClass('hidden');
        }
    };

    var tabddMenuClickHandler = function (e) {
        e.preventDefault();
        var $thisli = $(this).parent();
        var targettabs = $(this).parentsUntil('ul.nav.nav-tabs[data-tabsid]').last().parent().attr('data-tabsid');
        var $headerwrapper = $('ul.nav.nav-tabs').filter('[data-tabsid="' + targettabs + '"]');
        var $contentwrapper = $('div.tab-content').filter('[data-tabsid="' + targettabs + '"]');

        if ($(this).is('a:has(i.fa-refresh)')) {
            // handle reload click
            var $active = $headerwrapper.find('li.active').find('a[data-toggle="tab"]');
            var tabid = $active.attr('href');
            var url = $active.attr('data-href');
            var $divcontent = $contentwrapper.find('div' + tabid).first();
            var $iframecontent = $contentwrapper.find('iframe' + tabid).first();

            if ($iframecontent.length > 0) {
                showUrlInTabHandler($iframecontent, url);
            } else if ($divcontent.length > 0) {
                showUrlInTabHandler($divcontent, url);
            }
            return;
        } else {
            var tabid = $(this).attr('href');
            $headerwrapper.find('> li> a[href="' + tabid + '"]').tab('show');
        }
    };

    var appendTabHandler = function (targettabs, icon, title, tabid, url, closable, tabcontainer) {
        var $headerwrapper = $('ul.nav.nav-tabs').filter('[data-tabsid="' + targettabs + '"]');
        var $contentwrapper = $('div.tab-content').filter('[data-tabsid="' + targettabs + '"]');
        var settings = $headerwrapper.data('bs.tab.gciPlugin.dynamicTab').settings;

        // add tab to dropdown
        var ditem = '<li><a data-target-tabs="[#data-target-tabs#]" data-href="[#url#]" href="#[#tabid#]"><i class="[#icon#] fa-sm"></i> [#title#]</a></li>'
        ditem = ditem.replace("[#tabid#]", tabid).replace("[#url#]", url).replace("[#data-target-tabs#]", targettabs)
            .replace("[#title#]", title).replace("[#icon#]", icon);
        $(ditem).appendTo($('li.nav-tabs-header-btns > ul.dropdown-menu', $headerwrapper));

        // add tab to nav tabs
        var tabtitle = '<li class=""><a data-toggle="tab" data-target-tabs="[#data-target-tabs#]" data-href="[#url#]" href="#[#tabid#]"><i class="[#icon#]"></i>[#title#]<span class="tab-close"><i class="fa fa-times-circle"></i></span></a></li>';
        if (!closable) {
            tabtitle = tabtitle.replace('<span class="tab-close"><i class="fa fa-times-circle"></i></span>', '');
        }

        var titleLen = settings.titleLen;
        titleLen = (/[^\s\w\d]/).test(title) ? titleLen : titleLen * 2;
        if ($.trim(title).length > titleLen) {
            title = $.trim(title).substr(0, titleLen).toString() + "..";
        }
        //title += '增加长度以便调试增加长度以便调试';
        $(tabtitle.replace("[#tabid#]", tabid).replace("[#url#]", url).replace("[#data-target-tabs#]", targettabs)
            .replace("[#title#]", title).replace("[#icon#]", icon)).appendTo($headerwrapper);

        if (tabcontainer == "iframe") {
            var tabPanelFmt = '<iframe id="[#tabid#]" class="tab-pane"></iframe>';
            var $content = $(tabPanelFmt.replace("[#tabid#]", tabid).replace("[#url#]", url)
                .replace("[#title#]", title)).appendTo($contentwrapper);
            $content.css({
                "width":"100%",
                "height":"100%",
                "border":"0"
            });
            $content.css("width", "100%");
            $content.css("border", "0");
            //Layout.handle100HeightContent(); // fix content height
            showUrlInTabHandler($content, url);
        }
        else {
            var tabPanelFmt = '<div id="[#tabid#]" class="tab-pane"></div>';
            var $content = $(tabPanelFmt.replace("[#tabid#]", tabid).replace("[#url#]", url)
                .replace("[#title#]", title)).appendTo($contentwrapper);
            showUrlInTabHandler($content, url);
        }
    };

    var showUrlInTabHandler = function (tab, url) {
        var $tab = $(tab);
        //Metronic.startPageLoading();
        if ($tab.is('iframe')) {
            //$tab.attr('src', '');
            $tab.attr('src', url);
            $(document).trigger("iframeStart");
            $tab.load(function () {
                //Metronic.stopPageLoading();
                $(document).trigger("iframeEnd");
            });
        }
        else {
            $tab.empty();
            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                success: function (res) {
                    //Metronic.stopPageLoading();
                    $tab.html(res);
                    //Layout.fixContentHeight(); // fix content height
                    //Metronic.initAjax(); // initialize core stuff
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //Metronic.stopPageLoading();
                    $tab.html('<h4>Could not load the requested content.</h4>');
                }
            });
        }
    };

    var closeTabHandler = function (e) {
        var $thisli = $(this).parent().parent();
        var tabid = $(this).parent().attr('href');
        var targettabs = $(this).parent().attr('data-target-tabs');
        var $headerwrapper = $('ul.nav.nav-tabs').filter('[data-tabsid="' + targettabs + '"]');
        var $contentwrapper = $('div.tab-content').filter('[data-tabsid="' + targettabs + '"]');

        if ($thisli.hasClass("active")) {
            if ($thisli.next().length > 0) {
                $thisli.next().find("a[data-toggle='tab']").tab("show");
            } else {
                $thisli.prev().find("a[data-toggle='tab']").tab("show");
            }
        }
        if (tabid != undefined) {
            $('> div' + tabid, $contentwrapper).remove();
            $('> iframe' + tabid, $contentwrapper).remove();
        }
        $('> li.nav-tabs-header-btns > ul.dropdown-menu', $thisli.parent()).find('li:has(a[href="' + tabid + '"])').remove();
        $thisli.remove();
    };

    // handle a link, open url with tab or direct to url in self 
    var showLinkHandler = function($link){
        var url = $link.attr("href");
        var targettabs = $link.attr("data-target-tabs");
        // mode will be 'self' or 'tab'
        var mode = $link.attr("data-tabs-dynamic");

        if (mode == 'tab' && targettabs) { // load to url in found tab
            // 可以通过 data-tabclosable 属性来指定 tab 是否可以关闭
            var closable = $link.attr("data-tabclosable") != "false";

            // 可以通过 data-tabid 属性来指定 tabid
            var tabid = $link.attr("data-tabid");
            if ((tabid == "" || tabid == undefined) && url != undefined) {
                tabid = url.toLowerCase().replace(/(\W+)/ig, '')// + Math.random();
            }
            //$link.attr("data-tabid", tabid);

            // 内容可以用 div 和 iframe 来承载，通过属性 data-tabcontainer 来指定，不指定则为
            var tabcontainer = $link.attr("data-tabcontainer");

            // 从 a 中获取 icon
            var icon = null;
            if ($('i[class]', $link).length > 0) {
                icon = $('i[class]', $link).attr("class");

            }

            // 从 a 中获取 title
            var title = $link.text();
            if ($('.title', $link).length > 0) {
                title = $('.title', $link).text();
            }
            showTabHandler(targettabs, icon, title, tabid, url, closable, tabcontainer);
        }
        else { // direct to url in self tab
            var $tab = null;
            if (!targettabs) {
                $tab = $link.parentsUntil('div.tab-pane.active').last().parent();
            } else {
                $tab = $('div.tab-content[data-tabsid="' + targettabs + '"]').find('> div.tab-pane.active');
            }
            if ($tab && $tab.length == 1) {
                showUrlInTabHandler($tab, url);
            }
        }
    };

    var GciPlugin_DynamicTab = function (targettabs, settings) {
        this.targettabs = targettabs;
        this.settings = settings;

        if (arguments.length > 0) {
            var $headerwrapper = $('ul.nav-tabs[data-tabsid="' + this.targettabs + '"]');
            this.showTab = function (title, url, closable, tabid, icon, tabcontainer) {
                if (!tabid) {
                    tabid = url.toLowerCase().replace(/(\W+)/ig, '');
                }
                showTabHandler(this.targettabs, icon, title, tabid, url, closable, tabcontainer);
            };
            // 
            this.showLink = function ($link, tabcontainer) {
                $link.attr('data-target-tabs', this.targettabs);
                if (tabcontainer && !$link.attr('data-tabcontainer')) {
                    $link.attr('data-tabcontainer', tabcontainer);
                }
                showLinkHandler($link);
            };
        }
    };

    $.extend({
        gciPlugin: $.extend({
            dynamicTab: function (targettabs, options) {

                if (!$(document).data('bs.tab.gciPlugin.dynamicTab.globalInit')) {
                    $(document).data('bs.tab.gciPlugin.dynamicTab.globalInit', true);
                    jQuery(document).on("click.bs.tab.gciPlugin.dynamicTab", 'ul.nav.nav-tabs' + '[data-tabsid]' + '> li > a[data-toggle="tab"]' + ' > span.tab-close', closeTabHandler);
                    jQuery(document).on('click.bs.tab.gciPlugin.dynamicTab', 'ul.nav.nav-tabs' + '[data-tabsid]' + '> li.nav-tabs-header-btns > ul.dropdown-menu > li > a', tabddMenuClickHandler);
                    jQuery(document).on('shown.bs.tab.bs.tab.gciPlugin.dynamicTab', 'ul.nav.nav-tabs' + '[data-tabsid]' + '> li > a[data-toggle="tab"]', ajustActiveTabLinksHandler)
                }
                if (arguments.length == 0) {
                    var data = $(document).data('bs.tab.gciPlugin.dynamicTab');
                    if (!data) {
                        $(document).data('bs.tab.gciPlugin.dynamicTab', (data = new GciPlugin_DynamicTab()));
                    }
                    return data;
                }
                else {
                    var settings = $.extend({
                        tabcontainer: 'iframe',
                        tabLimit: 5,
                        titleLen: 5,
                        headerAjust: null
                    }, options);

                    var $headerwrapper = $('ul.nav.nav-tabs').filter('[data-tabsid="' + targettabs + '"]');
                    var data = $headerwrapper.data('bs.tab.gciPlugin.dynamicTab');
                    if (!data) {
                        $headerwrapper.data('bs.tab.gciPlugin.dynamicTab', (data = new GciPlugin_DynamicTab(targettabs, settings)));
                    }
                    return data;
                }
            }
        }, $.gciPlugin)
    });
    (function() {
      var $tab_navbar = $('ul.nav-tabs[data-tabsid="dynamicTab-window-top-main"]');
      var $tab_content = $('div.tab-content[data-tabsid="dynamicTab-window-top-main"]');
      
      $tab_navbar.width('9999px');
      var heightAjust = function () {
          var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
          var window_height = $(window).height();
          var height = window_height - neg - $tab_navbar.outerHeight();
          $tab_content.height(height);
      };
      heightAjust();
      //$(document).on('click', '.menu-toggler.sidebar-toggler', headerAjust);
      //Metronic.addResizeHandler(headerAjust);
      var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var timer;
      window.addEventListener(resizeEvent, function() {
        clearTimeout(timer);
        timer = setTimeout(heightAjust, 300);
      }, false);

      window.dynamicTabTopMain = $.gciPlugin.dynamicTab('dynamicTab-window-top-main');

      var applyTopMainTabLink = function(selector) {
        jQuery(document).off('click.bs.tab.gciPlugin.dynamicTab', selector);
        jQuery(document).on('click.bs.tab.gciPlugin.dynamicTab', selector, function(e) {
          e.preventDefault();
          window.dynamicTabTopMain.showLink($(this));
        });
      };
      applyTopMainTabLink('a[data-tabs-dynamic]');
      //$('.page-sidebar-menu a.ajaxify.start').click() // load the content for the dashboard page.
    })();
}(jQuery));

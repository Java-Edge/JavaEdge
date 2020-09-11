$(function () {
    var $reportPane = $("<div class='reportPane'></div>");
    window.contentPane = FR.createWidget($.extend({ renderEl: $reportPane }, { "listeners": [], "type": "page" }));
    // alex:此处必须把contentPane注册到FR.SessionMgr里面,不然下面初始化工具栏时的_g(sessionID)会返回null
    FR.SessionMgr.register('554ea7c9-fd04-4a60-ad7d-b8e3903de12b', contentPane);
    ;
    var $toolbar_Conf =
        [{
            "position": "north", "toolbarConf": {
                "type": "toolbar", "disabled": "true", "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "useBookMark": false, "bookMarkName": "", "items": [{
                    "type": "first", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
                        "eventName": "afterinit", "once": false, "action": function (e) {
                            var as = arguments; return FR.tc(function () {
                                ; return
                                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}, {
    "eventName": "click", "once": false, "action": function (e) {
        var as = arguments; return FR.tc(function () {
            ; return
            eval("(function(){try{_g().gotoFirstPage()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
    "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
        var as = arguments; return FR.tc(function () {
            ; return
            eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
    "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
        var as = arguments; return FR.tc(function () {
            ; return
            eval("(function(){try{this[_g().currentPageIndex==1?'disable':'enable']()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "首页", "icon": "css:x-emb-first", "widgetName": "First"
}, {
    "type": "previous", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().gotoPreviousPage()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this[_g().currentPageIndex==1?'disable':'enable']()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "上一页", "icon": "css:x-emb-previous", "widgetName": "Previous"
}, {
    "type": "page-navi", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "useBookMark": false, "bookMarkName": "", "innerWidget": {
        "type": "horizontal", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "useBookMark": false, "bookMarkName": "", "vgap": 2, "hgap": 0, "items": [{
            "width": 50, "el": {
                "type": "number", "disabled": false, "invisible": false, "needSubmit": true, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
                    "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return
                            eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
                    "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return
                            eval("(function(){try{this.setEnable(true);;this.editComp.attr('disabled',
false); this.editComp.parent().parent().css('position', 'relative'); this.setValue((_g().currentPageIndex)) \n
                        }catch (ex) {
                            FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + '
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}
                    },{
                        "eventName": "afteredit", "once": false, "action": function (e) {
                            var as = arguments; return FR.tc(function () {
                                ; return eval("(function(){try{if(e.keyCode ==
FR.keyCode.ENTER){ _g().gotoPage(this.getValue()) } \n
                            }catch (ex) {
                                FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + '
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}
                        }], "useBookMark": false, "bookMarkName": "", "fontSize": 12, "maxIntLength": 32, "maxDecLength": 16, "allowDecimals": false, "allowNegative": false, "style": "text-align:center"
            }
        }, {
            "width": 40, "el": {
                "type": "label", "disabled": false, "invisible": false, "needSubmit": true, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
                    "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return
                            eval("(function(){try{if(_g().reportTotalPage>0)this.setText(\"/\"+_g().reportTotalPage); else
this.setText(\"/\");\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+' :
'+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
                    "eventName": "_g()", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () { }, this, as)
                    }
                }], "useBookMark": false, "bookMarkName": "", "verticalcenter": true, "textalign": "center", "decoration": "none", "color": "rgb(0,0,0)", "textColor": "0.0,0.0,0.0,1.0,", "fontsize": 12, "fontfamily": "SimSun", "wrap": true, "autoline": true
            }
        }], "alignment": "left"
    }
}, {
    "type": "next", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().gotoNextPage()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this[_g().currentPageIndex==_g().reportTotalPage?'disable':'enable']()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "下一页", "icon": "css:x-emb-next", "widgetName": "Next"
}, {
    "type": "last", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().gotoLastPage()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this[_g().currentPageIndex==_g().reportTotalPage?'disable':'enable']()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "末页", "icon": "css:x-emb-last", "widgetName": "Last"
}, {
    "type": "print", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return eval("(function(){try{_g().noClientPrint(false,
false) \n
            }catch (ex) {
                FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + ' :
'+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}
        },{
            "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
                var as = arguments; return FR.tc(function () {
                    ; return
                    eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(true);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "打印", "icon": "css:x-emb-print", "widgetName": "NewPrint"
}, {
    "type": "excel-menu", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(true);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "导出", "icon": "css:x-emb-export", "menu": [{
        "src": "PDF", "type": "export-pdf", "iconSrc": "css:x-emb-pdf", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().exportReportToPDF('ori')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "src": "Excel", "type": "excel-menu", "iconSrc": "css:x-emb-excel", "showIconSrc": true, "showTextSrc": true, "submenu": [{
            "src": "分页导出", "type": "export-excel-page", "iconSrc": "css:x-emb-excel", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
                var as = arguments; return FR.tc(function () {
                    ; return
                    eval("(function(){try{_g().exportReportToExcel('page')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
            "src": "原样导出", "type": "export-excel-ori", "iconSrc": "css:x-emb-excel", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
                var as = arguments; return FR.tc(function () {
                    ; return
                    eval("(function(){try{_g().exportReportToExcel('simple')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
            "src": "分页分Sheet导出", "type": "export-excel-sheet", "iconSrc": "css:x-emb-excel", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
                var as = arguments; return FR.tc(function () {
                    ; return
                    eval("(function(){try{_g().exportReportToExcel('sheet')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}]
    }, {
        "src": "Word", "type": "export-word", "iconSrc": "css:x-emb-word", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().exportReportToWord()\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "src": "图片", "type": "export-image", "iconSrc": "css:x-emb-image", "showIconSrc": true, "showTextSrc": true, "handler": function (e, item) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().exportReportToImage('PNG')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "istoolbarmenu": true
}, {
    "type": "mail", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{_g().emailReport('{\"customConsignee\":true,\"consigneeByDepartment\":false,\"consigneeByRole\":false}')\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
        "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.setEnable(true);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "邮件", "icon": "css:x-emb-email", "widgetName": "Email"
}, {
    "type": "button", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=null&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
        "eventName": "afterinit", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return
                eval("(function(){try{this.disable();\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},
{
        "eventName": "click", "once": false, "action": function (e) {
            var as = arguments; return FR.tc(function () {
                ; return eval("(function(){try{var as=arguments; return FR.tc(function () {
                    ; return eval(\"(function(){try{//接口为directExportToExcel: function (dsName, fileName, params,colNames) \\n
                        //注意参数中的特殊字符需要进行url编码，比如大括号，冒号等。\\n
                        var paramStr = encodeURIComponent(\\\"{area:\\\\\\\"华北','华东\\\\\\\",stuff:\\\\\\\"孙林','王伟\\\\\\\"}\\\")\\n
                        //数据集传参\\n
                        var colNames = encodeURIComponent(\\\"ƒ产品,销量\\\")\\n
                        //指定导出的数据列，导出字段按此顺序排列，为空默认导出所有\\n
                        _g().directExportToExcel(\\\"ds1\\\",
                        \\\"销量\\\", paramStr,colNames) \\n
                    }catch (ex) {
                    FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + ' :'+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)\");}, this,
as) \n
                }catch (ex) {
                    FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + ' :
'+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}
},
 {
                "target": _g(), "eventName": "startload", "once": false, "action": function (e) {
                    var as = arguments; return FR.tc(function () {
                        ; return
                        eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
                "target": _g(), "eventName": "afterload", "once": false, "action": function (e) {
                    var as = arguments; return FR.tc(function () {
                        ; return
                        eval("(function(){try{this.setEnable(true);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('Custom')+'JS'+FR.i18nText('Error')+'
: '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": false, "bookMarkName": "", "render": true, "text": "bg", "widgetName": "CustomToolBarButton"
}]}}];
var float_toolbars = [];
contentPane.on("init", function () {
    var regions = [{ region: 'center', el: $reportPane }];
    // 装载工具栏
    // carl:浮动工具栏假如在reportContent之后生成，那么它里面的背景在readContent的时候就会被clear，所以提前生成，afterload之后显示
    // contentPane.toolbar如果是多个工具栏就搞成数组
    if ($toolbar_Conf.length > 1) {
        contentPane.toolbar = [];
    }
    FR.hasTopToolbar = false;
    FR.hasBottomToolbar = false;
    $.each($toolbar_Conf, function (idx, conf) {
        var toolbarSettings = $.extend(conf.toolbarConf, { disabled: false });
        var toolbar = FR.createWidget($.extend({
            type: "toolbar"
        }, toolbarSettings));
        if ($toolbar_Conf.length == 1) {
            contentPane.toolbar = toolbar;
        } else {
            contentPane.toolbar.push(toolbar);
        }
        if (conf.position == 'north') {
            toolbar.element.addClass("fs-tab-content-top-toolbar");
            FR.hasTopToolbar = true;
            regions.push({ region: conf.position, el: toolbar.element });
        }
        else if (conf.position == 'south') {
            FR.hasBottomToolbar = true;
            regions.push({ region: conf.position, el: toolbar.element });
        } else {
            var position = { position: 'absolute', 'z-index': 1 };
            $.extend(position, conf.position);
            toolbar.element.css(position).appendTo($reportPane);
            float_toolbars[float_toolbars.length] = toolbar;
            float_toolbars[float_toolbars.length - 1].position = position;
            float_toolbars[float_toolbars.length - 1].element.css(position.left ? 'left' : 'right', 9999);
        }
    });

    var $container = FR.createWidget({
        type: "border",
        items: regions,
        renderEl: "body",
        width: Math.max(FR.windowWidth, 100),
        height: Math.max(FR.windowHeight, 100)
    });

    function reLayout() {
        //ext的x-toolbar带了样式, 跟报表整合后, 会出现偏差导致反复doLayout.
        $('.x-toolbar').css('border-width', '0px 0px 0px 0px');
        $('.x-toolbar').css('padding', '0px');
        $container.doLayout();
    }

    reLayout();

    $container.element.css({
        width: '100%',
        height: '100%'
    });

    $(window).resize(function () {
        //ext 默认有个toolbar
        reLayout()
    })
});
contentPane.on("afterload", function () {
    // 显示浮动工具栏
    $.each(float_toolbars, function (idx, float_toolbar) {
        float_toolbar.element.css(float_toolbar.position);
    });
});

(function () {
    this.currentSessionID = '554ea7c9-fd04-4a60-ad7d-b8e3903de12b';
    this.__fit__ = 'false'
    this.__fitConfig__ = '{"__fit__":false,"__fitState__":3}';
    FR.SessionMgr.register(this.currentSessionID, this);
    if ('page' == 'preview') {
        this.__singlesheet__ = '';
        if (this.__singlesheet__.length > 0) {
            this.__singlesheet__ = true;
        }
        this.reportIndex = parseInt('');
    }
    if (FR.__isdebug__ !== true) {
        /**
        * 分页预览对象
        * @class FR.PagePane
        * @extends FR.BasePane
        */
        $.extend(FR.PagePane.prototype, {
            /**
            * @property {Number} 当前页所在总页数中的序号
            */
            currentPageIndex: 0, // 该ReportPage所属的ReportPage集中的序号

            /**
            * @property {Number} 总页数
            */
            reportTotalPage: 0, // 该ReportPage所属的ReportPage集成生成的总的ReportPage的个数

            /**
            * @property {Number} 正在加载的页的序号
            */
            isLoadingPage: -1,

            /**
            * @property {Number} 已经加载的页序号组成的数组
            */
            pagesLoaded: [],
            pagesBorder: false, //是否显示分页预览时的边框,冻结的时候必须显示

            /**
            * 转向报表的第一页
            *
            * @example
            * contentPane.gotoFirstPage();// 跳转到首页
            */
            gotoFirstPage: function () {
                this.gotoPage(1);
            },

            /**
            * 转向报表的上一页
            *
            * @example
            * contentPane.gotoPreviousPage();//跳转上一页
            */
            gotoPreviousPage: function () {
                if (this.currentPageIndex <= 1) { return; } this.gotoPage(this.currentPageIndex - 1);
            }, /** * 转向报表的下一页 * * @example *
    contentPane.gotoNextPage();//跳转到下一页 */ gotoNextPage: function () { this.gotoPage(this.currentPageIndex + 1); }, /**
    * 转向报表的最后一页 * * @example * contentPane.gotoLastPage();//跳转到最后一页 */ gotoLastPage: function () {
                this.gotoPage(2147483647);
            }, /** * 转向报表的指定页 * * @example * contentPane.gotoPage(2);//跳转到第二页 * * @param {Number} pn
    页序号，序号从1开始 * @param {Function} [flipAnimation] 翻页动画 */ gotoPage: function (pn, flipAnimation) {
                if (typeof pn
                    != 'number' || isNaN(pn)) { return; } if (pn < 1) { pn = 1; } // 表示正在加载页面 if (this.isLoadingPage>= 0) {
                return;
            }
    this.fireEvent(FR.Events.STARTLOAD);


            // 标记正在加载页面
            this.isLoadingPage = pn;

            //多sheet预览, 某个sheet冻结会设置成hidden, 其他sheet非冻结时默认overflow:auto, 不然滚动条会消失
            this.$contentPane.css({
                overflow: 'auto'
            });
            var para = {
                op: "page_content",
                sessionID: this.currentSessionID,
                pn: pn
            };
            this.extendPara(para);
            this.addPreSizePara(para);
            // alex:下面强制设置innerHTML为空字符串,jQuery.html()方法会调用empty(),很费时间
            var config = {
                el: this.$contentPane,
                url: FR.servletURL,
                params: para,
                scripts: true,
                forceDisplay: true,
                timeout: this.options.loadTimeout,
                animation: flipAnimation,
                loadHtml: function (html) {
                    if (FR.Browser.r.isInnerHtmlSuitable) {
                        for (var i = 0; i < this.length; i++) { this[i].innerHTML = html; }
                    } else { this.html(html); }
                }, callback: function
                    () {
                        FR._executeScriptFromHtml(this.$contentPane.html()); this.fireEvent(FR.Events.AFTERLOAD); this.afterLoad();
                    // carl:暂时只有图表 this.$contentPane.asComponent({type: "fr_form" , selector: 'td[widget],div[widget][heavytd=\'
                    light\']'
                }); var $contentDIV = $(".pageContentDIV", this.$contentPane); var
                    borderCss = '1px solid rgb(149, 149, 149)'; var $frozenPage = $(".frozen-page", this.$contentPane); if
            ($frozenPage.length > 0) {
            if (FR.Report.Plugin.ScrollProcessor.item && FR.Plugin.validLevel(FR.Report.Plugin.ScrollProcessor,
                FR.Report.Plugin.ScrollProcessor.item)) {
                FR.Report.Plugin.ScrollProcessor.item.action.call(this, $('.frozen-north', $frozenPage), "y");
                FR.Report.Plugin.ScrollProcessor.item.action.call(this, $('.frozen-center', $frozenPage), "both");
                FR.Report.Plugin.ScrollProcessor.item.action.call(this, $('.frozen-west', $frozenPage), "x");
            }
            // richer:开始准备冻结
            var isCenter = $contentDIV.hasClass("contentDIV");

            if (isCenter) { // denny: 冻结且，居中显示
                //Sean: 居中且冻结时必须显示边框，否则不好看
                $contentDIV.css('border', borderCss);
                var self = this;
                var frozen_layout = function () {
                    $frozenPage.css("height", $contentDIV.height() - parseInt($('.report-background', $contentDIV).css("top")));
                    var pageWidth = Math.min(self.$contentPane.width(), $contentDIV.width());
                    $frozenPage.css("width", pageWidth - parseInt($('.report-background', $contentDIV).css("left")));
                    FR.layoutFrozen($frozenPage, FR.hasTopToolbar ? (FR.parameterContainerHeight + FR.toolbarHeight) :
                        FR.parameterContainerHeight, self.$contentPane);
                };
                frozen_layout();

                //17是滚动条高度
                var $footer = $(".HF-footer", this.$container);
                var footerTop = $('.frozen-center').height() + $('.frozen-north').height() - $footer.height() - 17 +
                    parseInt($('.report-background').css('top'));
                $footer.css('top', footerTop + 'px');
            } else {
                var createOutDiv4Frozen = function () {
                    var $frozenOutDiv = $('
                        < div /> ').addClass('frozen - page - outdiv');
        $frozenOutDiv.css({
                            width: "100%",
                            height: "100%",
                            position: $('.report-background').css('position')
                        });
                    $frozenPage.css({
                        left: $('.report-background').css('left'),
                        top: $('.report-background').css('top')
                    });
                    $frozenOutDiv.append($frozenPage);
                    return $frozenOutDiv;
                };
                var frozenOutDiv = createOutDiv4Frozen();
                this.$contentPane.asComponent({ type: "border", items: [{ region: 'center', el: $contentDIV }] });

                var regions = [{ region: 'center', el: frozenOutDiv }];
                var $header = $(".HF-header", this.$container);
                if ($header.length > 0) {
                    regions.push({ region: 'north', el: $header });
                }
                var $footer = $(".HF-footer", this.$container);
                if ($footer.length > 0) {
                    regions.push({ region: 'south', el: $footer });
                }

                $contentDIV.asComponent({ type: "border", items: regions });
                FR.layoutFrozen($frozenPage, FR.hasTopToolbar ? (FR.parameterContainerHeight + FR.toolbarHeight) :
                    FR.parameterContainerHeight, this.$contentPane);
                this.$contentPane.doLayout();
            }

            if (FR.Browser.isIE8Before() && $.support.boxModel === true) {
                var initColCell = function (element, ano_row_ranges) {
                    var col_ranges = [];
                    col_ranges[0] = 0;
                    var $cols = element.find('colgroup:eq(0)').children();
                    var $col;
                    var row_size = col_ranges.length;
                    $.each($cols, function (idx, col) {
                        $col = $(col);
                        if (ano_row_ranges) {
                            var h = ano_row_ranges[idx + row_size] - ano_row_ranges[idx + row_size - 1];
                            if (col.offsetWidth != h) {
                                var ofs = parseInt($col.css("width")) + h - col.offsetWidth;
                                $col.css("width", ofs);
                                if (idx === 0 && col.offsetWidth !== h) {
                                    $col.css("width", ofs + h - col.offsetWidth);
                                }
                            }
                        } else {
                            col_ranges[idx + row_size] = col_ranges[idx + row_size - 1] + col.offsetWidth;
                        }
                    });
                    return col_ranges;
                };

                var f_corner = $('.frozen-corner', this.$container);
                if (f_corner.length > 0) {
                    var col_ranges = initColCell($('.frozen-west', this.$container));
                    initColCell(f_corner, col_ranges);
                }
            }
        } else {
            try {
                //REPORT-6343 判断是否在网页框iframe中，获取iframe的overflow
                //REPORT-6794 IE 下，window.frameElement 拒绝访问，可能第一次调用的时候浏览器 dom 还没初始化完成。直接跳过即可
                if (!FR.Browser.isIE() && this != top && window.frameElement != null && window.frameElement.className ===
                    'fr_iframeeditor') {
                    this.$contentPane.css("overflow-x", window.frameElement.style.overflowX);
                    this.$contentPane.css("overflow-y", window.frameElement.style.overflowY);
                }
            } catch (e) {
                //REPORT-12714 低版本浏览器下的跨域报错直接忽略
            }
            if (FR.Report.Plugin.ScrollProcessor.item && FR.Plugin.validLevel(FR.Report.Plugin.ScrollProcessor,
                FR.Report.Plugin.ScrollProcessor.item)) {
                //ie下面$contentDIV外层还有center标签，插件里面处理
                FR.Report.Plugin.ScrollProcessor.item.action.call(this, $contentDIV, "both", true);
            }
            if (this.pagesBorder === true) {
                $contentDIV.css('border', borderCss);
            } else {
                $contentDIV.css('border', 'none');
            }
        }

        // 水印放到 contentDIV 的内层，设置居中、居左展示时，位置可以跟随变化
        var $targetDiv;
        if (FR.Browser.isIE8Before() && $frozenPage.length > 0) {
            // IE8 以下的冻结，dom 结构不一样
            $targetDiv = $('.fr-page-content:first', $contentDIV);
        } else {
            $targetDiv = $('.paper-background', $contentDIV);
        }
        // 如果设置了 __bypagesize__=false，$contentDIV 和 .paper-background 的大小都是 0，水印要加到更上一层 div。
        if (parseInt($targetDiv.css('width')) === 0) {
            $targetDiv = this.$contentPane;
        }
        FR.showWatermark($targetDiv);
        $(window).resize(function () {
            FR.showWatermark($targetDiv);
        })
        //wikky:把页脚的top调整下，防止页脚遮挡内容
        if ($(".HF-footer", this.$container).length > 0) {
            var tableHeight = $(".report-background", this.$container).find("table").height();
            var backgroundHeight = $(".report-background", this.$container).height();
            var contentHeight = tableHeight > backgroundHeight ? tableHeight : backgroundHeight;
            var topHeight = FR.Browser.isIE8Before() ? parseInt($("#fr-page-content", this.$container).css("top")) :
                parseInt($(".report-background", this.$container).css("top"));
            if ($(".HF-header", this.$container).length > 0) {
                topHeight = parseInt($(".HF-header", this.$container).css("top")) + $(".HF-header", this.$container).height();
            }
            //wikky:+1是为了防止边框遮挡
            var footerTop = contentHeight + topHeight + 1;
            footerTop = Math.max(footerTop, parseInt($(".HF-footer", this.$container).css("top")));
            $(".HF-footer", this.$container).css("top", footerTop);
        }
        // IE8 杂项模式 格子设置了边框 如果上方一行tr是隐藏的话 上边框就会变细 貌似border-collapse的问题
        if (FR.Browser.isIE8() && !$.support.boxModel) {
            var blankTr = $('tr:hidden', this.$contentPane);
            for (var i = 0; i < blankTr.length; i++) {
                var nextTr = blankTr.eq(i).next('tr'); for (var j = 0; j <
                    nextTr.children().length; j++) {
                        var td = nextTr.children().eq(j); for (var k = 1; k < 4; k++) {
                            if
                                (td.hasClass('btw' + k)) { td.css('border-top-width', k * 2); }
                        }
                }
            }
        } // 取消正在加载页面的标记
        this.isLoadingPage = -1;
    }.createDelegate(this)
}; FR.HtmlLoader.load(config); }, addPreSizePara:
function(para) { //缩放的时候需要使用保存的原始宽高计算，再进行transform缩放，以保持和其他页面的transform属性一致 if
    (this.$contentPane.data("preWidth")) { para._paperWidth = this.$contentPane.data("preWidth"); } if
        (this.$contentPane.data("preHeight")) { para._paperHeight = this.$contentPane.data("preHeight"); }
},
afterLoad: function() {
    var fitConfig = FR.jsonDecode(this.__fitConfig__); var isFit = fitConfig.__fit__; var
        fitState = fitConfig.__fitState__; var $frozenDIV = $(".frozen-table"); if (isFit && !FR.Browser.isIE8Before()
            && $frozenDIV.length === 0) {
                var container = this.$contentPane; if (container !== undefined) {
                    //在加载下一页之后，需要根据当前保存的最初始的宽高和当前container的宽高进行对比缩放 if (container.data("preHeight")===container.height() &&
                    container.data("preWidth") === container.width()) { this.processScrollWidth(container, 1, 1); return; }
                    this.scaleContent(container, fitState);
                }
    }
}, _setTotalPageByHtml: function () {
    var
    html_script = this.$contentPane.html().substring(0, 100); var begin = html_script.indexOf("<" + "script>"); var
        end = html_script.indexOf("</" + "script>"); html_script = html_script.substring(begin + 8, end);
    eval(html_script);
}, pageSetup: function () { // jim: page可以去掉此对话框了 this.showPageSetupDialog({sessionID:
    this.currentSessionID
}); }, /** * 服务器端打印 * @param quietConfig 可选 * * 调用举例： *
            window.contentPane.printReportServer({ * pageType: 2, // 打印页码类型：0：所有页，1：当前页，2：指定页 * pageIndex: '1-3' , //
            页码范围。当 pageType 为 2 时有效 * printerName: "" // 指定打印机 * }); */ printReportServer: function (quietConfig) {
    FR.doServerPrint(this.currentSessionID, this.currentPageIndex, quietConfig);
}, appletPrint: function () {
    FR.doAppletPrint(this.currentSessionID);
}, flashPrint: function () {
    FR.doFlashPrint(this.currentSessionID,
        this.currentPageIndex);
}, exportReportToPDF: function (extype) {
    if
        (this.fireEvent(FR.Events.BTOPDF) === false) { return; } var url = FR.servletURL + "?op=export&sessionID=" +
            this.currentSessionID + "&format=pdf&extype=" + extype; this.downloadExportFile(url, "pdf");
    this.fireEvent(FR.Events.ATOPDF);
}, exportReportToExcel: function (extype) {
    if
        (this.fireEvent(FR.Events.BTOEXCEL) === false) { return; } // carl:还是弄个提示吧 if (extype=='ldpage' ) {
    FR.Msg.toast(FR.i18nText("Fine-Engine_Export-Excel-LargeData-Page-Info"));
} var flag = extype.indexOf("_");
if (flag != -1) {
    var extypeNew = extype.substring(0, flag); var url = FR.servletURL + "?op=export&sessionID=" +
        this.currentSessionID + "&format=excel&extype=" + extypeNew + "&isExcel2003=" + true;
    this.downloadExportFile(url, "excel");
} else {
    var url = FR.servletURL + "?op=export&sessionID=" +
        this.currentSessionID + "&format=excel&extype=" + extype; this.downloadExportFile(url, "excel");
}
this.fireEvent(FR.Events.ATOEXCEL); }, exportReportToWord: function () {
    if
        (this.fireEvent(FR.Events.BTOWORD) === false) { return; } var url = FR.servletURL + "?op=export&sessionID=" +
            this.currentSessionID + "&format=word"; this.downloadExportFile(url, "word");
    this.fireEvent(FR.Events.ATOWORD);
}, exportReportToImage: function (extype) {
    if
        (this.fireEvent(FR.Events.BTOIMAGE) === false) { return; } window.location = FR.servletURL
            + "?op=export&sessionID=" + this.currentSessionID + "&format=image&extype=" + extype;
    this.fireEvent(FR.Events.ATOIMAGE);
}, exportReportToHtml: function () {
    if
        (this.fireEvent(FR.Events.BTOHTML) === false) { return; } window.location = FR.servletURL
            + "?op=export&sessionID=" + this.currentSessionID + "&format=html"; this.fireEvent(FR.Events.ATOHTML);
},
printPreview: function () {
    window.open(FR.servletURL
        + "?op=print_preview&cmd=pw_init_page&__pi__=false&sessionID=" + this.currentSessionID, "_blank"
        , "Scrollbar=yes,Resizable=yes,fullscreean=yes");
}, SetPrinterOffset: function () {
    FR.showIframeDialog({
        title: FR.i18nText("Fine-Engine_Platform_SetPrinterOffset"), width:
            Math.max(FR.i18nTextWidth("Fine-Engine_X_Offset", 7) * 2 + 280, 420), height: 300, url: FR.servletURL
                + "?op=printer_offset&cmd=pt_open&sessionID=" + this.currentSessionID
    });
}, initContentPane: function () {
    FR.PagePane.superclass.initContentPane.apply(this, arguments); this.on("afterload", function () {
        this.autoScale();
    }); this.on(FR.Events.STARTLOAD, function () {
        FR.Chart.WebUtils.clearChartsWithSheetIndex(this.currentPageIndex - 1);
    }); this.checkExportRegister();
},
loadContentPane: function () { this.gotoPage(1); }, _initSheetTabPane: function ($contentPane, sheetsO) {
            //重写_initSheetTabPane, 分页不要sheetPane $contentPane.css("overflow", "auto" ).css('border-top', '0px' ); }, /**
            * 是否显示分页预览时的边框 * 这个需要加在页面的加载起始事件中 * @param { Boolean } isVisible true表示边框可见，否则表示不可见 * / setBorderVisible:
    function (isVisible) { this.pagesBorder = isVisible; }
}); } if (this.options) {
    this.options.cutpage = '';
    this.options.dataTransType = 'xml';
}


this.loadReportPane({
    param: {
        "showType": 1, "alignLocation": 0, "delay": false, "parambg": { "background": "rgb(247,248,250)" }, "useParamsTemplate": false, "width": 960.0, "height": 80.0, "html": {
            "type": "parameter", "widgetName": "PARA", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=para&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "useBookMark": true, "bookMarkName": "", "widgetBackground": "", "vgap": 0, "hgap": 0, "compInterval": 0, "scrollable": false, "items": [{
                "type": "button", "widgetName": "BUTTON1", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=button1&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
                    "eventName": "click", "once": false, 
                    "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return eval("(function(){try{//接口为directExportToExcel: function
                                (dsName, fileName, params, colNames) \n//注意参数中的特殊字符需要进行url编码，比如大括号，冒号等。\nvar
            paramStr = encodeURIComponent(\"{area:\\\"华北','华东\\\",stuff:\\\"孙林','王伟\\\"}\")\n//数据集传参\nvar
            colNames = encodeURIComponent(\"地区,销售员,产品类型,产品,销量\")\n//指定导出的数据列，导出字段按此顺序排列，为空默认导出所有\n_g().directExportToExcel(\"ds1\",
                                    \"销量\", paramStr,
            colNames) \n}catch (ex) {
                            FR.Logger.error(ex); FR.Msg.toast(FR.i18nText('Custom') + 'JS' + FR.i18nText('Error') + '
            : '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}
                    }], 
                    
                    "useBookMark": false, "bookMarkName": "", "render": true, "text": "大数据集导出", "isToggle": false, "x": 528, "y": 20, "width": 80, "height": 21
            }, {
                "type": "formsubmit", "widgetName": "SEARCH", "disabled": false, "invisible": false, "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=Search&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "listeners": [{
                    "eventName": "click", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return eval("(function(){try{this.setEnable(false);\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText(' Custom')+'JS'+FR.i18nText('Error')+'
            : '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}},{
                    "eventName": "click", "once": false, "action": function (e) {
                        var as = arguments; return FR.tc(function () {
                            ; return eval("(function(){try{if (this.options.form != null && $.isFunction(this.options.form.formSubmit)) {\n    this.options.form.QueryBtn = this;\n    var self = this;\n    this.options.form.formSubmit({\n            url: \"/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b\",\n            asyn: true,\n            callback: function () {\n                _g().once(\"afterload\", function () {\n                    self.enable();\n                })\n                _g().loadContentPane();\n            }}\n    );\n}\n}catch(ex){FR.Logger.error(ex);FR.Msg.toast(FR.i18nText('
            Custom')+'JS'+FR.i18nText('Error')+'
            : '+ex.message);}}).createDelegate(this, [], 0).apply(this, arguments)");}, this, as)
}}], "useBookMark": true, "bookMarkName": "", "render": true, "text": "查询", "hotkeys": "enter", "isToggle": false, "key": "formsubmit", "x": 388, "y": 20, "width": 80, "height": 21
            }, { "type": "label", "widgetName": "LABEL地区", "disabled": false, "invisible": false, "needSubmit": true, "value": "地区:", "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=Label地区&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "useBookMark": false, "bookMarkName": "", "verticalcenter": true, "textalign": "center", "decoration": "none", "color": "rgb(0,0,0)", "textColor": "0.0,0.0,0.0,1.0,", "fontsize": 12, "fontfamily": "SimSun", "wrap": true, "autoline": true, "x": 20, "y": 20, "width": 80, "height": 21 }, { "type": "label", "widgetName": "LABEL销售员", "disabled": false, "invisible": false, "needSubmit": true, "value": "销售员:", "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=Label销售员&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "labelName": "地区:", "useBookMark": false, "bookMarkName": "", "verticalcenter": true, "textalign": "center", "decoration": "none", "color": "rgb(0,0,0)", "textColor": "0.0,0.0,0.0,1.0,", "fontsize": 12, "fontfamily": "SimSun", "wrap": true, "autoline": true, "x": 199, "y": 20, "width": 80, "height": 21 }, {
                "type": "tagcombocheckbox", "widgetName": "AREA", "disabled": false, "invisible": false, "needSubmit": true, "value": "", "widgetUrl": "/webroot/decision/view/report?op=widget&widgetname=area&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b", "labelName": "地区:", "useBookMark": false, "bookMarkName": "", "fontSize": 12, "directEdit": true, "norepeat": true, "searchTime": 200, "customData": true, "autoMode": true, "mode": "remote", "controlAttr": { "value": "" }, "delimiter": "'
                , '","returnArray":false,"supportTag":true,"x":100,"y":20,"width":80,"height":21},{"type":"tagcombocheckbox","widgetName":"STUFF","disabled":false,"invisible":false,"needSubmit":true,"value":"","widgetUrl":"/webroot/decision/view/report?op=widget&widgetname=stuff&sessionID=554ea7c9-fd04-4a60-ad7d-b8e3903de12b","labelName":"销售员:","useBookMark":false,"bookMarkName":"","fontSize":12,"directEdit":true,"norepeat":true,"searchTime":200,"customData":true,"autoMode":true,"mode":"remote","dependence":["area"],"controlAttr":{"value":""},"delimiter":"', '","returnArray":false,"supportTag":true,"x":279,"y":20,"width":80,"height":21}],"showBookmarks":true,"itemsIndex":["AREA","STUFF","SEARCH","BUTTON1"],"stickyItemsIndex":[],"absoluteCompState":0,"absoluteResolutionScaleW":1.0,"absoluteResolutionScaleH":1.0,"hasResize":false,"paraDisplay":true,"delayDisplayContent":false,"useParamsTemplate":false,"position":"left","width":960,"parambg":{"background":"rgb(247,248,250)"},"__FIT__":false}},sheets:[{"id":"sheet10","lazyload":true,"closable":true,"title":"sheet1"}],browserbg:{}});
            }).apply(contentPane); });
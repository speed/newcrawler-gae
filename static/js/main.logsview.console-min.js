var logsViewConsole={v:{webCrawlerId:null,siteId:null,logsTimer:null,isShow:false,logsWindowHeight:200,logsWindowHeightDefault:200},fn:{init:function(){if(logsViewConsole.v.logsTimer!=null){clearTimeout(logsViewConsole.v.logsTimer)}logsViewConsole.v.logsTimer=null;var d=jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv");if(d.length>0){for(var c in webCrawlerJsonData){if(isNaN(c)){continue}var b=webCrawlerJsonData[c]["name"];var a='<li class="console_item" lang="'+webCrawlerJsonData[c]["id"]+'">'+b+"</li>";jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").find(".selectdrop").append(a)}}jQuery(".logsViewConsole").click(function(){if(jQuery(".logsViewConsoleWindow").is(":hidden")){if(logsViewConsole.v.webCrawlerId==null||logsViewConsole.v.webCrawlerId==undefined){if(webCrawlerId==null||webCrawlerId==undefined){showInfo(nc.i18n("res.not.select.crawler"));return}logsViewConsole.v.webCrawlerId=webCrawlerId}logsViewConsole.v.isShow=true;jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").find(".selectdrop li").each(function(){var f=jQuery(this).attr("lang");var e=jQuery(this).text();jQuery(this).removeClass("selectdiv_item_selected");if(f==webCrawlerId){jQuery(".logsViewConsoleWindow").find(".logs").find(".select_title").text(e);jQuery(this).addClass("selectdiv_item_selected")}})}else{logsViewConsole.v.isShow=false}if(logsViewConsole.v.webCrawlerId==null||logsViewConsole.v.webCrawlerId==undefined){if(webCrawlerId==null||webCrawlerId==undefined){showInfo(nc.i18n("res.not.select.crawler"));return}}logsViewConsole.fn.moveAllTrWithObj(jQuery(".logsViewConsoleWindow").find(".logs").find("table"));jsonrpc.logService.consoleLogs(function(f,g,h){if(g){return}if(logsViewConsole.v.isShow){var e=jQuery(".ui-layout-content").height();e=e-(logsViewConsole.v.logsWindowHeightDefault+28);jQuery(".ui-layout-content").height(e);jQuery(".logsViewConsoleWindow").show();logsViewConsole.fn.initEvent();logsViewConsole.fn.log();jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").hover(function(){jQuery(this).addClass("selectdiv_datahighlight");jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdrop").show()},function(){jQuery(this).removeClass("selectdiv_datahighlight");jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdrop").hide()});jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").click(function(){var j=jQuery(this).attr("lang");var i=jQuery(this).text();logsViewConsole.fn.changeConsole(jQuery(this),j,i);jQuery(this).mouseout()});jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").hover(function(){jQuery(this).addClass("selectdiv_item_datahighlight")},function(){jQuery(this).removeClass("selectdiv_item_datahighlight")})}else{var e=jQuery(".ui-layout-content").height();e=e+(logsViewConsole.v.logsWindowHeightDefault+28);jQuery(".ui-layout-content").height(e);jQuery(".logsViewConsoleWindow").hide();if(logsViewConsole.v.logsTimer!=null){clearTimeout(logsViewConsole.v.logsTimer)}}},logsViewConsole.v.webCrawlerId,logsViewConsole.v.siteId,logsViewConsole.v.isShow)})},moveAllTrWithObj:function(a){var b=a.get(0);var d=b.rows.length;for(var c=d-1;c>0;c--){b.deleteRow(c)}},changeConsole:function(d,c,b){if(c==logsViewConsole.v.webCrawlerId){return}var a=logsViewConsole.v.webCrawlerId;jsonrpc.logService.consoleLogs(function(e,f,g){if(f){return}logsViewConsole.v.isShow=true;logsViewConsole.v.webCrawlerId=c;jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").each(function(){jQuery(this).removeClass("selectdiv_item_selected")});d.addClass("selectdiv_item_selected");jQuery(".logsViewConsoleWindow").find(".logs").find(".select_title").text(b);if(logsViewConsole.v.logsTimer==null){logsViewConsole.fn.log()}jsonrpc.logService.consoleLogs(function(h,i,j){if(i){return}},a,null,false)},c,null,true)},log:function(){jsonrpc.logService.readConsoleLogs(function(result,exception,profile,ele){result=eval(result);for(var i in result){if(isNaN(i)){continue}var row="";var logs=(result[i]["logs"]==null?"":result[i]["logs"]);var remark=(result[i]["remark"]==null?"":result[i]["remark"]);if(result[i]["key"]!=null&&result[i]["key"]!=""){var key=(result[i]["key"]==null?"":("logs_"+result[i]["key"]));row+="<tr id='"+key+"' class='simplehighlight'>";var status=(result[i]["status"]==null?"":result[i]["status"]);var color=(result[i]["color"]==null?"":("logs_"+result[i]["color"]));if(result[i]["isUpdate"]){jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").text(status);jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").removeClass("logs_blue logs_red logs_green");jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").addClass(color);jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_remark").text(remark);continue}else{var type=(result[i]["type"]==null?"":result[i]["type"]);if(type==1){type=nc.i18n("res.logs.type.crawl")}else{if(type==2){type=nc.i18n("res.logs.type.crawl.retry")}else{if(type==3){type=nc.i18n("res.logs.type.deploy")}else{if(type==4){type=nc.i18n("res.logs.type.deploy.retry")}else{if(type==5){type=nc.i18n("res.logs.type.download")}else{if(type==6){type=nc.i18n("res.logs.type.download.retry")}else{type=""}}}}}}var date=(result[i]["date"]==null?"":result[i]["date"]);row+="<td>"+date+"</td>";row+="<td>"+type+"</td>";row+="<td>[<span style='width:70px;display: inline-block;' class='logs_status "+color+"'>"+status+"</span>]</td>"}}else{row="<tr class='simplehighlight'>";row+="<td></td>";row+="<td></td>";row+="<td></td>"}row+='<td><div contenteditable="true" style="overflow: hidden; line-height: 22px; height: 22px; text-overflow: ellipsis;"  class="logs_body"></div></td>';row+='<td><div contenteditable="true" style="overflow: hidden; line-height: 22px; height: 22px; text-overflow: ellipsis;padding-left: 20px;" class="logs_remark" ></div></td>';row+="</tr>";var rowObj=jQuery(row);rowObj.find(".logs_body").text(logs);rowObj.find(".logs_remark").text(remark);rowObj.appendTo(".logsViewConsoleWindow .logs table");jQuery(".logsViewConsoleWindow").find(".logs").animate({scrollTop:jQuery(".logsViewConsoleWindow .logs")[0].scrollHeight},0);jQuery(".logsViewConsoleWindow").find(".logs").find("table").find(".simplehighlight").hover(function(){jQuery(this).children().addClass("logs_datahighlight")},function(){jQuery(this).children().removeClass("logs_datahighlight")})}if(logsViewConsole.v.isShow){logsViewConsole.v.logsTimer=setTimeout(function(){logsViewConsole.fn.log()},1500)}},logsViewConsole.v.webCrawlerId,logsViewConsole.v.siteId,0,20)},clean:function(){var a=jQuery(".logsViewConsoleWindow").find(".logs").find("table");logsViewConsole.fn.moveAllTrWithObj(a)},min:function(){var c=logsViewConsole.v.logsWindowHeight-25;logsViewConsole.v.logsWindowHeight=25;jQuery(".logsViewConsoleWindow").find(".logs").height(logsViewConsole.v.logsWindowHeight);var a=jQuery(".ui-layout-content").height();a=a+c;jQuery(".ui-layout-content").height(a);var b=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(b).removeClass("resize");jQuery(".logsViewConsoleWindow").find(".logs").find(".min").addClass("resize").removeClass("min");logsViewConsole.fn.initEvent()},max:function(){var a=jQuery(".ui-layout-content").height();jQuery(".ui-layout-content").height(0);logsViewConsole.v.logsWindowHeight=logsViewConsole.v.logsWindowHeight+a;jQuery(".logsViewConsoleWindow").find(".logs").height(logsViewConsole.v.logsWindowHeight);var b=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(b).removeClass("resize");jQuery(".logsViewConsoleWindow").find(".logs").find(".max").addClass("resize").removeClass("max");logsViewConsole.fn.initEvent()},resize:function(){var c=logsViewConsole.v.logsWindowHeight-logsViewConsole.v.logsWindowHeightDefault;var a=jQuery(".ui-layout-content").height();a=a+c;jQuery(".ui-layout-content").height(a);jQuery(".logsViewConsoleWindow").find(".logs").height(logsViewConsole.v.logsWindowHeightDefault);logsViewConsole.v.logsWindowHeight=logsViewConsole.v.logsWindowHeightDefault;var b=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(b).removeClass("resize");logsViewConsole.fn.initEvent()},initEvent:function(){jQuery(".logsViewConsoleWindow").find(".logs").find(".min").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".max").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".min").click(function(){logsViewConsole.fn.min()});jQuery(".logsViewConsoleWindow").find(".logs").find(".max").click(function(){logsViewConsole.fn.max()});jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").click(function(){logsViewConsole.fn.resize()});jQuery(".logsViewConsoleWindow").find(".logs").find(".min").attr("title",nc.i18n("res.console.min"));jQuery(".logsViewConsoleWindow").find(".logs").find(".max").attr("title",nc.i18n("res.console.max"));jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("title",nc.i18n("res.console.resize"))}}};
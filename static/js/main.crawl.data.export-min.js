var crawlDataExport={v:{tableId:"crawlDataExportTable",formId:"crawlDataExportForm",webCrawlerId:null,siteId:null,crawlRules:null,api:null},fn:{init:function(){if(crawlDataExport.v.siteId==null){showInfo(nc.i18n("res.site.invalid.refresh"));return}jsonrpc.crawlDataExportService.getApi(function(result,exception,profile){result="("+result+")";result=eval(result);var apiExportData=result.apiExportData;crawlDataExport.v.api=apiExportData;apiExportData=apiExportData+"&type=json";$("#"+crawlDataExport.v.tableId).find("#apiExportData").html(apiExportData+"<a href='"+apiExportData+"' target='_blank'>"+nc.i18n("res.view")+"</a>");removeLoading($("#"+crawlDataExport.v.tableId))},crawlDataExport.v.webCrawlerId,crawlDataExport.v.siteId);fillRulesVer(crawlDataExport.v.tableId,"crawlRulesVerId",true,null,function(){var crawlRulesVerIdObj=$("#"+crawlDataExport.v.tableId+" #crawlRulesVerId option:eq(1)");if(crawlRulesVerIdObj!=null){crawlRulesVerIdObj.attr("selected","selected");crawlDataExport.fn.changeRulesVer(crawlRulesVerIdObj.val())}});$("#"+crawlDataExport.v.tableId+" input[type=radio][name=type]").change(function(){var type=$("#"+crawlDataExport.v.tableId+" input[type=radio][name=type]:checked").val();var api=crawlDataExport.v.api+"&type="+type;$("#"+crawlDataExport.v.tableId).find("#apiExportData").html(api+"<a href='"+api+"' target='_blank'>"+nc.i18n("res.view")+"</a>");crawlDataExport.fn.initMap()})},save:function(){var c=$("#"+crawlDataExport.v.tableId+" input[type=radio][name=type]:checked").val();var b=$("#"+crawlDataExport.v.tableId+" #crawlRulesVerId").val();var d={};$("#"+crawlDataExport.v.formId).find(".rules").find("li").each(function(){var e=$(this).find(".name").text();var f="";if("json"==c){f=$(this).find("input[name=map]").val()}else{f=$(this).find("select[name=mapSelect]").val()}d[e]=f});var a=$.toJSON(d);showLoading($("#"+crawlDataExport.v.tableId));jsonrpc.crawlDataExportService.save(function(e,f,g){removeLoading($("#"+crawlDataExport.v.tableId));var h=e;if(h){showInfo(nc.i18n("res.save.success"))}else{showInfo(nc.i18n("res.save.failure"))}},crawlDataExport.v.webCrawlerId,crawlDataExport.v.siteId,b,c,a)},changeRulesVer:function(id){$("#"+crawlDataExport.v.formId).find(".rules").empty();if(id==null||id===""){return}jsonrpc.crawlRulesService.query(function(result,exception,profile){var data=result;data=eval(data);crawlDataExport.v.crawlRules=data;crawlDataExport.fn.initMap()},crawlDataExport.v.webCrawlerId,crawlDataExport.v.siteId,id)},initMap:function(){var type=$("#"+crawlDataExport.v.tableId+" input[type=radio][name=type]:checked").val();jsonrpc.crawlDataExportService.query(function(result,exception,profile){var data=result;data=eval(data);crawlDataExport.fn.initMapHtml(type,data)},crawlDataExport.v.webCrawlerId,crawlDataExport.v.siteId,type)},initMapHtml:function(k,m){$("#"+crawlDataExport.v.formId).find(".rules").empty();var e=crawlDataExport.v.crawlRules;if("json"==k){for(var f in e){if(isNaN(f)){continue}var a=e[f]["name"];if(e[f]["labelType"]=="2"||e[f]["labelType"]=="4"||e[f]["isOffset"]=="true"||e[f]["isTemp"]=="true"){continue}var h="item_"+f;var b="<li class='"+h+"'><span class='name'>"+a+"</span><span class='map'><input type='text' name='map'/></span></li>";$("#"+crawlDataExport.v.formId).find(".rules").append(b);var l="";for(var d in m){if(isNaN(d)){continue}if(m[d]["name"]==a){l=m[d]["value"];break}}$("#"+crawlDataExport.v.formId).find(".rules").find("."+h).find("input[name=map]").val(l)}}else{var g="<select name='mapSelect'><option></option>";for(var f in e){if(isNaN(f)){continue}var a=e[f]["name"];if(e[f]["labelType"]=="2"||e[f]["labelType"]=="4"||e[f]["isOffset"]=="true"||e[f]["isTemp"]=="true"){continue}g+="<option value='"+a+"'>"+a+"</option>"}g+="</select>";var h="item_"+f;var c="<li class='item_title'><span class='name'>title</span><span class='map'>"+g+"</span></li><li class='item_link'><span class='name'>link</span><span class='map'>"+g+"</span></li><li class='item_description'><span class='name'>description</span><span class='map'>"+g+"</span></li><li class='item_author'><span class='name'>author</span><span class='map'>"+g+"</span></li><li class='item_category'><span class='name'>category</span><span class='map'>"+g+"</span></li><li class='item_comments'><span class='name'>comments</span><span class='map'>"+g+"</span></li><li class='item_pubDate'><span class='name'>pubDate</span><span class='map'>"+g+"</span></li>";$("#"+crawlDataExport.v.formId).find(".rules").append(c);var l="";for(var d in m){if(isNaN(d)){continue}var a=m[d]["name"];var l=m[d]["value"];$("#"+crawlDataExport.v.formId).find(".rules").find(".item_"+a).find("select[name=mapSelect]").val(l)}}}}};
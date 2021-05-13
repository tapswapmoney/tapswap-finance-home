function ctSetCookie(e,t){document.cookie=e+"="+encodeURIComponent(t)+"; path=/; samesite=lax"}function apbct_collect_visible_fields(e){var t,n=[],o="",i=0,c=[];for(t in e.elements)isNaN(+t)||(n[t]=e.elements[t]);return(n=n.filter(function(e){return"none"!==getComputedStyle(e).display&&"hidden"!==getComputedStyle(e).visibility&&"0"!==getComputedStyle(e).opacity&&"hidden"!==e.getAttribute("type")&&"submit"!==e.getAttribute("type")&&null!==e.getAttribute("name")&&-1===c.indexOf(e.getAttribute("name"))&&(i++,-1===["radio","checkbox"].indexOf(e.getAttribute("type"))||(c.push(e.getAttribute("name")),!1))})).forEach(function(e,t,n){o+=" "+e.getAttribute("name")}),{visible_fields:o=o.trim(),visible_fields_count:i}}function apbct_visible_fields_set_cookie(e){e="object"==typeof e&&null!==e?e:{};ctSetCookie("apbct_visible_fields",JSON.stringify(e))}function apbct_js_keys__set_input_value(e,t,n,o){if(0<document.querySelectorAll("[name^=ct_checkjs]").length)for(var i=document.querySelectorAll("[name^=ct_checkjs]"),c=0;c<i.length;c++)i[c].value=e.js_key}function apbct_public_sendAJAX(t,n,o){var i=n.callback||null,c=n.callback_context||null,a=n.callback_params||null,e=n.async||!0,l=n.notJson||null,s=n.timeout||15e3,o=o||null,r=n.button||null,u=n.spinner||null,p=n.progressbar||null,d=n.silent||null,m=n.no_nonce||null;"string"==typeof t?t=(t=!m?t+"&_ajax_nonce="+ctPublic._ajax_nonce:t)+"&no_cache="+Math.random():(m||(t._ajax_nonce=ctPublic._ajax_nonce),t.no_cache=Math.random()),r&&(r.setAttribute("disabled","disabled"),r.style.cursor="not-allowed"),u&&jQuery(u).css("display","inline"),jQuery.ajax({type:"POST",url:ctPublic._ajax_url,data:t,async:e,success:function(e){r&&(r.removeAttribute("disabled"),r.style.cursor="pointer"),u&&jQuery(u).css("display","none"),(e=!l?JSON.parse(e):e).error?(setTimeout(function(){p&&p.fadeOut("slow")},1e3),alert("Error happens: "+(e.error||"Unkown"))):i&&(a?i.apply(c,a.concat(e,t,n,o)):i(e,t,n,o))},error:function(e,t,n){r&&(r.removeAttribute("disabled"),r.style.cursor="pointer"),u&&jQuery(u).css("display","none"),n&&!d&&(console.log("APBCT_AJAX_ERROR"),console.log(e),console.log(t),console.log("Anti-spam by Cleantalk plugin error: "+n+"Please, contact Cleantalk tech support https://wordpress.org/support/plugin/cleantalk-spam-protect/"))},timeout:s})}function apbct_public_sendREST(t,n){var o=n.callback||null;jQuery.ajax({type:"POST",url:ctPublic._rest_url+"cleantalk-antispam/v1/"+t,beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",ctPublic._rest_nonce)},success:function(e){e.error?alert("Error happens: "+(e.error||"Unknown")):o&&o(e,t,n,null)},error:function(e,t,n){n&&(console.log("APBCT_REST_ERROR"),console.log(e),console.log(t),console.log("Anti-spam by Cleantalk plugin error: "+n+"Please, contact Cleantalk tech support https://wordpress.org/support/plugin/cleantalk-spam-protect/"),alert("Anti-spam by Cleantalk plugin error: "+n+"Please, contact Cleantalk tech support https://wordpress.org/support/plugin/cleantalk-spam-protect/"))}})}!function(){var e=new Date,t=(new Date).getTime(),n=!0,o=[],i=0;function c(e,t,n){"function"==typeof window.addEventListener?e.addEventListener(t,n):e.attachEvent(t,n)}function a(e,t,n){"function"==typeof window.removeEventListener?e.removeEventListener(t,n):e.detachEvent(t,n)}ctSetCookie("ct_ps_timestamp",Math.floor((new Date).getTime()/1e3)),ctSetCookie("ct_fkp_timestamp","0"),ctSetCookie("ct_pointer_data","0"),ctSetCookie("ct_timezone","0"),setTimeout(function(){ctSetCookie("ct_timezone",e.getTimezoneOffset()/60*-1)},1e3);var l=function(e){ctSetCookie("ct_fkp_timestamp",Math.floor((new Date).getTime()/1e3)),a(window,"mousedown",l),a(window,"keydown",l)},s=setInterval(function(){n=!0},150),r=setInterval(function(){ctSetCookie("ct_pointer_data",JSON.stringify(o))},1200),u=function(e){!0===n&&(o.push([Math.round(e.clientY),Math.round(e.clientX),Math.round((new Date).getTime()-t)]),n=!1,50<=++i&&(a(window,"mousemove",u),clearInterval(s),clearInterval(r)))};c(window,"mousemove",u),c(window,"mousedown",l),c(window,"keydown",l),c(window,"DOMContentLoaded",function(){ctSetCookie("apbct_visible_fields",0),setTimeout(function(){for(var e={},t=0;t<document.forms.length;t++){var n=document.forms[t];n.classList.contains("slp_search_form")||n.parentElement.classList.contains("mec-booking")||-1!==n.action.toString().indexOf("activehosted.com")||n.id&&"caspioform"==n.id||n.name.classList&&n.name.classList.contains("tinkoffPayRow")||n.name.classList&&n.name.classList.contains("give-form ")||(e[t]=apbct_collect_visible_fields(n),n.onsubmit_prev=n.onsubmit,n.onsubmit=function(e){var t={};t[0]=apbct_collect_visible_fields(this),apbct_visible_fields_set_cookie(t),e.target.onsubmit_prev instanceof Function&&setTimeout(function(){e.target.onsubmit_prev.call(e.target,e)},500)})}apbct_visible_fields_set_cookie(e)},1e3)})}(),"undefined"!=typeof jQuery&&jQuery(document).ajaxComplete(function(e,t,n){!t.responseText||-1===t.responseText.indexOf('"apbct')||void 0!==(t=JSON.parse(t.responseText)).apbct&&(t=t.apbct).blocked&&(document.dispatchEvent(new CustomEvent("apbctAjaxBockAlert",{bubbles:!0,detail:{message:t.comment}})),cleantalkModal.loaded=t.comment,cleantalkModal.open(),1==+t.stop_script&&window.stop())});
//# sourceMappingURL=apbct-public.min.js.map
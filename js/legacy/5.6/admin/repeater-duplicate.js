!function f(c,d,r){function l(t,e){if(!d[t]){if(!c[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(o)return o(t,!0);var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}var i=d[t]={exports:{}};c[t][0].call(i.exports,function(e){return l(c[t][1][e]||e)},i,i.exports,f,c,d,r)}return d[t].exports}for(var o="function"==typeof require&&require,e=0;e<r.length;e++)l(r[e]);return l}({1:[function(e,t,n){"use strict";function c(e,t,n){n=n||"> .acf-field, > .acf-fields > .acf-field";var a=e.find(n),i=t.find(n);a.each(function(e,t){return i[e]?d(a[e]).data("type")!==d(i[e]).data("type")?(console.trace("Error: source field type does not match destination field type"),!1):void function(e,t){var n,a,i;n=e.attr("data-type"),(a=d.Event("acf_duplicate:"+n)).destination=t,e.trigger(a),a.isDefaultPrevented()||(r[n]?r[n](e,t):r._default(e,t,n),(i=d.Event("acf_duplicated:"+n)).destination=t,e.trigger(i))}(d(a[e]),d(i[e])):(console.trace("Error: source fields do not match destination fields"),!1)})}var d,a,i,f,r;d=jQuery,a=acf_duplicate_repeater.options,i=d.extend({},acf.fields.repeater),f=d.extend({},acf.fields.flexible_content),r={_default:function(e,t,n){var a=e.find('[type="'+n+'"]');t.find('[type="'+n+'"]').each(function(e,t){d(this).val(d(a[e]).val())})},button_group:function(e,t){var n=t.find('[type="radio"]');e.find('[type="radio"]').each(function(e,t){if(d(t).prop("checked"))return d(n[e]).trigger("click"),!1})},checkbox:function(e,t){var n=t.find('[type="checkbox"]');e.find('[type="checkbox"]').each(function(e,t){d(n[e]).prop("checked",d(t).prop("checked"))})},color_picker:function(e,t){r._default(e,t,"text"),r._default(e,t,"hidden")},date_picker:function(e,t){r._default(e,t,"text"),r._default(e,t,"hidden")},date_time_picker:function(e,t){r._default(e,t,"text"),r._default(e,t,"hidden")},file:function(e,t){var n=e.find(".acf-file-uploader"),a=t.find(".acf-file-uploader");r._default(e,t,"hidden"),n.hasClass("has-value")&&(a.find("div").first().html(n.find("div").first().html()),t.find(".acf-file-uploader").addClass("has-value"))},flexible_content:function(e,i){var f="> .acf-input > .acf-flexible-content > .values > .layout";acf.fields.flexible_content.set("$field",i),e.find(f).each(function(e,t){var n,a=d(t);acf.fields.flexible_content.add(a.data("layout")),n=i.find(f).last(),c(d(t),n,"> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field")})},gallery:function(e,t){var n=e.find(".acf-gallery-attachments"),a=t.find(".acf-gallery-attachments"),i=t.find('input[type="hidden"]').attr("name")+"[]";n.children().each(function(e,t){$clone=d(t).clone(),$clone.find('[type="hidden"]').attr("name",i),a.append($clone)})},google_map:function(e,t){r._default(e,t,"hidden")},group:function(e,t){c(e,t,"> .acf-input > .acf-table > tbody > .acf-row > .acf-field, > .acf-input > .acf-fields > .acf-field")},image:function(e,t){r._default(e,t,"hidden"),t.find("img").attr("src",e.find("img").attr("src")),e.find(".acf-image-uploader").hasClass("has-value")&&t.find(".acf-image-uploader").addClass("has-value")},link:function(e,t){var n=e.find(".link-node"),a=t.find(".link-node");a.html(n.html()),a.attr("href",n.attr("href")),a.attr("target",n.attr("target")),a.trigger("change")},oembed:function(e,t){t.find('[data-name="search-input"]').val(e.find('[type="hidden"]').val()).trigger("blur")},post_object:function(e,t){r.select(e,t)},radio:function(e,t){r.button_group(e,t),r._default(e,t,"text")},range:function(e,t){r._default(e,t,"range"),r._default(e,t,"number")},relationship:function(e,t){var a=t.find(".values > .list"),n=t.find(".acf-relationship").children('input[type="hidden"]'),i=n.attr("name")+"[]";e.find(".values > .list").children().each(function(e,t){var n=d(t).clone();n.find('[type="hidden"]').attr("name",i),a.append(n)}),n.trigger("change")},repeater:function(e,t){acf.fields.repeater.set("$field",t),e.find("> .acf-input > .acf-repeater > .acf-table > tbody > .acf-row:not(.acf-clone)").each(function(e,t){var n=acf.fields.repeater.add();c(d(t),n,"> .acf-field, > .acf-fields > .acf-field")})},select:function(e,t,n){n=n||" > .acf-input > select";var a=e.find(n),i=t.find(n);1*a.data("ui")&&(i.html(""),a.find("option").each(function(e,t){i.append(d(t).clone())})),$destOpts=i.find("option"),a.find("option").each(function(e,t){d($destOpts[e]).prop("selected",d(t).prop("selected"))})},taxonomy:function(e,t){r.radio(e,t),r.checkbox(e,t),r.select(e,t,"> .acf-input > .acf-taxonomy-field > select")},textarea:function(e,t){t.find("textarea").val(e.find("textarea").val())},time_picker:function(e,t){r._default(e,t,"text"),r._default(e,t,"hidden")},true_false:function(e,t){t.find('[type="checkbox"]').prop("checked",e.find('[type="checkbox"]').prop("checked")),t.find('[type="checkbox"]').trigger("change")},user:function(e,t){r.select(e,t)},wysiwyg:function(f,c){acf.add_action("wysiwyg_tinymce_init",function(e,t,n,a){if(a.get(0)===c.get(0)){var i=tinymce.get(f.find("textarea").attr("id"));i&&e.setContent(i.getContent())}}),c.find("textarea").html(f.find("textarea").html())}},acf.fields.flexible_content=acf.fields.flexible_content.extend({events:{'click [data-name="duplicate-layout"]':"_duplicate"},render:function(){var e;return e=f.render.apply(this,arguments),this.$values.children(".layout").each(function(e,t){d(this).find('[data-name="duplicate-layout"]').length||d(this).find(".acf-fc-layout-controlls").prepend(a.duplicate_flexible_btn)}),e},_duplicate:function(e){var t,n,a,i;n=(a=e.$el.closest(".layout")).closest(".acf-field"),acf.fields.flexible_content.set("$field",n),acf.fields.flexible_content.add(a.data("layout"),a),i=a.prev(".layout"),c(a,i,"> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field"),(t=d.Event("acf_duplicated_layout")).destination=i,a.trigger(t)}}),acf.fields.repeater=acf.fields.repeater.extend({events:{'click a[data-event="duplicate-row"]':"_duplicate"},render:function(){var e;return e=i.render.apply(this,arguments),this.$tbody.children().each(function(e){d(this).find("> td.remove").append(a.duplicate_repeater_btn)}),e},_duplicate:function(e){var t,n,a;e.$el.hasClass("acf-icon")&&(c(t=e.$el.closest(".acf-row"),n=this.add(t)),this.$input.trigger("change"),(a=d.Event("acf_duplicated_row")).destination=n,t.trigger(a))}})},{}]},{},[1]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlZ2FjeS81LjYvYWRtaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxlZ2FjeS81LjYvYWRtaW4vc3JjL2pzL2xlZ2FjeS81LjYvYWRtaW4vcmVwZWF0ZXItZHVwbGljYXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwiMSIsIm1vZHVsZSIsImNvcHlfdmFsdWVzIiwiJHNyYyIsIiRkZXN0IiwiX3NlbGVjdG9yIiwiJHNvdXJjZXMiLCJmaW5kIiwiJGRlc3RzIiwiZWFjaCIsImVsIiwiJCIsImRhdGEiLCJjb25zb2xlIiwidHJhY2UiLCJ0eXBlIiwiY29weUV2ZW50IiwiZG9uZUV2ZW50IiwiYXR0ciIsIkV2ZW50IiwiZGVzdGluYXRpb24iLCJ0cmlnZ2VyIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiY29weV92YWx1ZV9jYiIsIl9kZWZhdWx0IiwiY29weV92YWx1ZSIsIm9wdGlvbnMiLCJvcmlnX3JlcGVhdGVyIiwib3JpZ19mbGV4aWJsZV9jb250ZW50IiwialF1ZXJ5IiwiYWNmX2R1cGxpY2F0ZV9yZXBlYXRlciIsImV4dGVuZCIsImFjZiIsImZpZWxkcyIsInJlcGVhdGVyIiwiZmxleGlibGVfY29udGVudCIsIiRzcmNlcyIsInRoaXMiLCJ2YWwiLCJidXR0b25fZ3JvdXAiLCIkZGVzdFJhZGlvIiwicHJvcCIsImNoZWNrYm94IiwiJGRlc3RDQiIsImNvbG9yX3BpY2tlciIsImRhdGVfcGlja2VyIiwiZGF0ZV90aW1lX3BpY2tlciIsImZpbGUiLCIkc3JjVXBsIiwiJGRlc3RVcGwiLCJoYXNDbGFzcyIsImZpcnN0IiwiaHRtbCIsImFkZENsYXNzIiwic2VsZWN0b3IiLCJzZXQiLCJsYXlvdXQiLCIkbmV3X2xheW91dCIsIiRsYXlvdXQiLCJhZGQiLCJsYXN0IiwiZ2FsbGVyeSIsIiRzcmNMaXN0IiwiJGRlc3RMaXN0IiwibmFtZSIsImNoaWxkcmVuIiwiJGNsb25lIiwiY2xvbmUiLCJhcHBlbmQiLCJnb29nbGVfbWFwIiwiZ3JvdXAiLCJpbWFnZSIsImxpbmsiLCIkc3JjTm9kZSIsIiRkZXN0Tm9kZSIsIm9lbWJlZCIsInBvc3Rfb2JqZWN0IiwicmFkaW8iLCJyYW5nZSIsInJlbGF0aW9uc2hpcCIsIiRpbnB1dCIsInJvdyIsIiRuZXdfcm93Iiwic2VsZWN0IiwiJHNyY1NlbGVjdCIsIiRkZXN0U2VsZWN0IiwiJGRlc3RPcHRzIiwidGF4b25vbXkiLCJ0ZXh0YXJlYSIsInRpbWVfcGlja2VyIiwidHJ1ZV9mYWxzZSIsInVzZXIiLCJ3eXNpd3lnIiwiYWRkX2FjdGlvbiIsImVkIiwiaWQiLCJpbml0IiwiJGZpZWxkIiwiZ2V0Iiwic3JjRWQiLCJ0aW55bWNlIiwic2V0Q29udGVudCIsImdldENvbnRlbnQiLCJldmVudHMiLCJjbGljayBbZGF0YS1uYW1lPVwiZHVwbGljYXRlLWxheW91dFwiXSIsInJlbmRlciIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwiJHZhbHVlcyIsInByZXBlbmQiLCJkdXBsaWNhdGVfZmxleGlibGVfYnRuIiwiX2R1cGxpY2F0ZSIsImR1cGxpY2F0ZWRFdmVudCIsIiRlbCIsImNsb3Nlc3QiLCJwcmV2IiwiY2xpY2sgYVtkYXRhLWV2ZW50PVwiZHVwbGljYXRlLXJvd1wiXSIsIiR0Ym9keSIsImR1cGxpY2F0ZV9yZXBlYXRlcl9idG4iLCIkc291cmNlIl0sIm1hcHBpbmdzIjoiQ0FBQSxTQUFBQSxFQUFBQyxFQUFBQyxFQUFBQyxHQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEdBQUEsSUFBQUosRUFBQUcsR0FBQSxDQUFBLElBQUFKLEVBQUFJLEdBQUEsQ0FBQSxJQUFBRSxFQUFBLG1CQUFBQyxTQUFBQSxRQUFBLElBQUFGLEdBQUFDLEVBQUEsT0FBQUEsRUFBQUYsR0FBQSxHQUFBLEdBQUFJLEVBQUEsT0FBQUEsRUFBQUosR0FBQSxH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LEVBQ0FELEVBTUR3QyxHQUhBdkMsRUFBVTFFLEVBQUVrSSxJQUFJQyxRQUFRLFlBR1BBLFFBQVEsY0FHekJuRixJQUFJQyxPQUFPRSxpQkFBaUJvQixJQUFLLFNBQVUwQyxHQUczQ2pFLElBQUlDLE9BQU9FLGlCQUFpQndCLElBQUtELEVBQVE5QyxLQUFLLFVBQVc4QyxHQUd6REQsRUFBY0MsRUFBUTBELEtBQU0sV0FHNUJsSCxFQUFhd0QsRUFBU0QsRUFBYSw2RUFFbkN3RCxFQUFrQnRHLEVBQUVRLE1BQU8sMEJBQ1hDLFlBQWNxQyxFQUU5QkMsRUFBUXJDLFFBQVM0RixNQVFuQmpGLElBQUlDLE9BQU9DLFNBQVdGLElBQUlDLE9BQU9DLFNBQVNILE9BQU8sQ0FDaER3RSxPQUFRLENBQ1BjLHNDQUF1QyxjQUV4Q1osT0FBUSxXQUVQLElBQUlDLEVBU0osT0FQQUEsRUFBTS9FLEVBQWM4RSxPQUFPRSxNQUFPdEUsS0FBTXVFLFdBR3hDdkUsS0FBS2lGLE9BQU9yRCxXQUFXeEQsS0FBSyxTQUFTckIsR0FDcEN1QixFQUFFMEIsTUFBTTlCLEtBQUssZUFBZTZELE9BQVExQyxFQUFRNkYsMEJBR3RDYixHQUVSTSxXQUFZLFNBQVVoSSxHQUVyQixJQUFJd0ksRUFBU3BILEVBQU82RyxFQUdoQmpJLEVBQUVrSSxJQUFJaEUsU0FBUyxjQVNuQmhELEVBUkNzSCxFQUFVeEksRUFBRWtJLElBQUlDLFFBQVEsWUFLekIvRyxFQUFRaUMsS0FBS3NCLElBQUs2RCxJQUtsQm5GLEtBQUsyQyxPQUFPM0QsUUFBUSxXQUVwQjRGLEVBQWtCdEcsRUFBRVEsTUFBTyx1QkFDWEMsWUFBY2hCLEVBRTlCb0gsRUFBUW5HLFFBQVM0RiIsImZpbGUiOiJsZWdhY3kvNS42L2FkbWluL3JlcGVhdGVyLWR1cGxpY2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oJCl7XG5cdHZhciBvcHRpb25zID0gYWNmX2R1cGxpY2F0ZV9yZXBlYXRlci5vcHRpb25zLFxuXG5cdFx0b3JpZ19yZXBlYXRlciA9ICQuZXh0ZW5kKCB7fSwgYWNmLmZpZWxkcy5yZXBlYXRlciApLFxuXHRcdG9yaWdfZmxleGlibGVfY29udGVudCA9ICQuZXh0ZW5kKCB7fSwgYWNmLmZpZWxkcy5mbGV4aWJsZV9jb250ZW50ICksXG5cblx0XHQvKipcblx0XHQgKlx0dmFsdWUgY29weSBjYWxsYmFja3Ncblx0XHQgKi9cblx0XHRjb3B5X3ZhbHVlX2NiID0ge1xuXHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggJHNyYywgJGRlc3QsIHR5cGUgKSB7IC8vIE9LQVlcblx0XHRcdHZhciAkc3JjZXMgPSAkc3JjLmZpbmQoJ1t0eXBlPVwiJyt0eXBlKydcIl0nKTtcblx0XHRcdCRkZXN0LmZpbmQoJ1t0eXBlPVwiJyt0eXBlKydcIl0nKS5lYWNoKGZ1bmN0aW9uKGksZWwpe1xuXHRcdFx0XHQkKHRoaXMpLnZhbCggJCggJHNyY2VzW2ldICkudmFsKCkgKTtcblx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRidXR0b25fZ3JvdXA6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0dmFyICRkZXN0UmFkaW8gPSAkZGVzdC5maW5kKCdbdHlwZT1cInJhZGlvXCJdJyk7XG5cdFx0XHQkc3JjLmZpbmQoJ1t0eXBlPVwicmFkaW9cIl0nKS5lYWNoKCBmdW5jdGlvbihpLGVsKSB7XG5cdFx0XHRcdGlmICggJChlbCkucHJvcCgnY2hlY2tlZCcpICkge1xuXHRcdFx0XHRcdCQoICRkZXN0UmFkaW9baV0gKS50cmlnZ2VyKCdjbGljaycgKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Y2hlY2tib3g6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0dmFyICRkZXN0Q0IgPSAkZGVzdC5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cdFx0XHQkc3JjLmZpbmQoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKS5lYWNoKCBmdW5jdGlvbihpLGVsKSB7XG5cdFx0XHRcdCQoICRkZXN0Q0JbaV0gKS5wcm9wKCdjaGVja2VkJywgJChlbCkucHJvcCgnY2hlY2tlZCcpICk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGNvbG9yX3BpY2tlcjogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyBPS0FZXG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydfZGVmYXVsdCddKCRzcmMsICRkZXN0LCAndGV4dCcgKTtcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsICdoaWRkZW4nICk7XG5cdFx0fSxcblx0XHRkYXRlX3BpY2tlcjogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyBPS0FZXG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydfZGVmYXVsdCddKCRzcmMsICRkZXN0LCAndGV4dCcgKTtcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsICdoaWRkZW4nICk7XG5cdFx0fSxcblx0XHRkYXRlX3RpbWVfcGlja2VyOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsICd0ZXh0JyApO1xuXHRcdFx0Y29weV92YWx1ZV9jYlsnX2RlZmF1bHQnXSgkc3JjLCAkZGVzdCwgJ2hpZGRlbicgKTtcblx0XHR9LFxuXHRcdGZpbGU6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0dmFyICRzcmNVcGwgPSAkc3JjLmZpbmQoJy5hY2YtZmlsZS11cGxvYWRlcicpLFxuXHRcdFx0XHQkZGVzdFVwbCA9ICRkZXN0LmZpbmQoJy5hY2YtZmlsZS11cGxvYWRlcicpO1xuXG5cdFx0XHQvLyBzZXQgaGlkZGVuXG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydfZGVmYXVsdCddKCAkc3JjLCAkZGVzdCwgJ2hpZGRlbicgKTtcblxuXHRcdFx0aWYgKCAkc3JjVXBsLmhhc0NsYXNzKCdoYXMtdmFsdWUnKSApIHtcblx0XHRcdFx0JGRlc3RVcGwuZmluZCgnZGl2JykuZmlyc3QoKS5odG1sKCAkc3JjVXBsLmZpbmQoJ2RpdicpLmZpcnN0KCkuaHRtbCgpICk7XG5cdFx0XHRcdCRkZXN0LmZpbmQoJy5hY2YtZmlsZS11cGxvYWRlcicpLmFkZENsYXNzKCdoYXMtdmFsdWUnKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZmxleGlibGVfY29udGVudDogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkge1xuXHRcdFx0dmFyIHNlbGVjdG9yID0gJz4gLmFjZi1pbnB1dCA+IC5hY2YtZmxleGlibGUtY29udGVudCA+IC52YWx1ZXMgPiAubGF5b3V0Jztcblx0XHRcdGFjZi5maWVsZHMuZmxleGlibGVfY29udGVudC5zZXQoICckZmllbGQnLCAkZGVzdCApO1xuXG5cdFx0XHQkc3JjLmZpbmQoIHNlbGVjdG9yICkuZWFjaChmdW5jdGlvbihpLGxheW91dCl7XG5cdFx0XHRcdC8vIGVhY2ggcmVwZWF0ZXIgZW50cnkuLi4gZmluZCBmaWVsZHMgaW4gcmVwZWF0ZXIgZW50cnlcblx0XHRcdFx0dmFyICRsYXlvdXQgPSAkKGxheW91dCksXG5cdFx0XHRcdFx0JG5ld19sYXlvdXQ7XG5cblx0XHRcdFx0YWNmLmZpZWxkcy5mbGV4aWJsZV9jb250ZW50LmFkZCggJGxheW91dC5kYXRhKCdsYXlvdXQnKSApO1xuXG5cdFx0XHRcdCRuZXdfbGF5b3V0ID0gJGRlc3QuZmluZCggc2VsZWN0b3IgKS5sYXN0KCk7XG5cblx0XHRcdFx0Ly8gdGJsICsgYmxvY2sgKyByb3dcblx0XHRcdFx0Y29weV92YWx1ZXMoICQobGF5b3V0KSwgJG5ld19sYXlvdXQsICc+IC5hY2YtdGFibGUgPiB0Ym9keSA+IC5hY2Ytcm93ID4gLmFjZi1maWVsZCwgPiAuYWNmLWZpZWxkcyA+IC5hY2YtZmllbGQnICk7IC8vIGV4Y2x1ZGUgY2xvbmVzIVxuXG5cdFx0XHR9KTsgLy8gdGFibGVcblx0XHR9LFxuXHRcdGdhbGxlcnk6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0Ly8gY29weV92YWx1ZV9jYlsnX2RlZmF1bHQnXSgkc3JjLCAkZGVzdCwgJ2hpZGRlbicgKTtcblx0XHRcdHZhciAkc3JjTGlzdCA9ICRzcmMuZmluZCgnLmFjZi1nYWxsZXJ5LWF0dGFjaG1lbnRzJyksXG5cdFx0XHRcdCRkZXN0TGlzdCA9ICRkZXN0LmZpbmQoJy5hY2YtZ2FsbGVyeS1hdHRhY2htZW50cycpLFxuXHRcdFx0XHQkaW5wdXQgPSAkZGVzdC5maW5kKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyksXG5cdFx0XHRcdG5hbWUgPSAkaW5wdXQuYXR0cignbmFtZScpICsgJ1tdJztcblxuXHRcdFx0JHNyY0xpc3QuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKGksZWwpe1xuXHRcdFx0XHQkY2xvbmUgPSAkKGVsKS5jbG9uZSgpO1xuXHRcdFx0XHQkY2xvbmUuZmluZCgnW3R5cGU9XCJoaWRkZW5cIl0nKS5hdHRyKCAnbmFtZScsIG5hbWUgKTtcblx0XHRcdFx0JGRlc3RMaXN0LmFwcGVuZCgkY2xvbmUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRnb29nbGVfbWFwOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsICdoaWRkZW4nICk7XG5cdFx0fSxcblx0XHRncm91cDogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkge1xuXHRcdFx0Y29weV92YWx1ZXMoICRzcmMsICRkZXN0LCAnPiAuYWNmLWlucHV0ID4gLmFjZi10YWJsZSA+IHRib2R5ID4gLmFjZi1yb3cgPiAuYWNmLWZpZWxkLCA+IC5hY2YtaW5wdXQgPiAuYWNmLWZpZWxkcyA+IC5hY2YtZmllbGQnICk7IC8vIGV4Y2x1ZGUgY2xvbmVzIVxuXHRcdH0sXG5cdFx0aW1hZ2U6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0Ly8gc2V0IGhpZGRlblxuXHRcdFx0Y29weV92YWx1ZV9jYlsnX2RlZmF1bHQnXSggJHNyYywgJGRlc3QsICdoaWRkZW4nICk7XG5cdFx0XHQkZGVzdC5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCAkc3JjLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpIClcblx0XHRcdGlmICggJHNyYy5maW5kKCcuYWNmLWltYWdlLXVwbG9hZGVyJykuaGFzQ2xhc3MoJ2hhcy12YWx1ZScpICkge1xuXHRcdFx0XHQkZGVzdC5maW5kKCcuYWNmLWltYWdlLXVwbG9hZGVyJykuYWRkQ2xhc3MoJ2hhcy12YWx1ZScpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRsaW5rOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdHZhciAkc3JjTm9kZSA9ICRzcmMuZmluZCgnLmxpbmstbm9kZScpLFxuXHRcdFx0XHQkZGVzdE5vZGUgPSAkZGVzdC5maW5kKCcubGluay1ub2RlJyk7XG5cblx0XHRcdCRkZXN0Tm9kZS5odG1sKCAkc3JjTm9kZS5odG1sKCkgKTtcblx0XHRcdCRkZXN0Tm9kZS5hdHRyKCAnaHJlZicsICRzcmNOb2RlLmF0dHIoICdocmVmJyApICk7XG5cdFx0XHQkZGVzdE5vZGUuYXR0ciggJ3RhcmdldCcsICRzcmNOb2RlLmF0dHIoICd0YXJnZXQnICkgKTtcblxuXHRcdFx0JGRlc3ROb2RlLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdH0sXG5cdFx0b2VtYmVkOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdCRkZXN0LmZpbmQoJ1tkYXRhLW5hbWU9XCJzZWFyY2gtaW5wdXRcIl0nKVxuXHRcdFx0XHQudmFsKCAkc3JjLmZpbmQoJ1t0eXBlPVwiaGlkZGVuXCJdJykudmFsKCkgKVxuXHRcdFx0XHQudHJpZ2dlcignYmx1cicpO1xuXHRcdH0sXG5cdFx0cG9zdF9vYmplY3Q6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHsgLy8gT0tBWVxuXHRcdFx0Y29weV92YWx1ZV9jYlsnc2VsZWN0J10oJHNyYywgJGRlc3QgKTtcblx0XHR9LFxuXHRcdHJhZGlvOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ2J1dHRvbl9ncm91cCddKCRzcmMsICRkZXN0KTtcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsJ3RleHQnKTtcblx0XHR9LFxuXHRcdHJhbmdlOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsJ3JhbmdlJyk7XG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydfZGVmYXVsdCddKCRzcmMsICRkZXN0LCdudW1iZXInKTtcblx0XHR9LFxuXHRcdHJlbGF0aW9uc2hpcDogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyBPS0FZXG5cdFx0XHR2YXIgJGRlc3RMaXN0ID0gJGRlc3QuZmluZCgnLnZhbHVlcyA+IC5saXN0JyksXG5cdFx0XHRcdCRpbnB1dCA9ICRkZXN0LmZpbmQoJy5hY2YtcmVsYXRpb25zaGlwJykuY2hpbGRyZW4oJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKSxcblx0XHRcdFx0bmFtZSA9ICRpbnB1dC5hdHRyKCduYW1lJykgKyAnW10nO1xuXG5cdFx0XHQkc3JjLmZpbmQoJy52YWx1ZXMgPiAubGlzdCcpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihpLGVsKXtcblx0XHRcdFx0dmFyICRjbG9uZSA9ICQoZWwpLmNsb25lKCk7XG5cdFx0XHRcdCRjbG9uZS5maW5kKCdbdHlwZT1cImhpZGRlblwiXScpLmF0dHIoICduYW1lJywgbmFtZSApO1xuXHRcdFx0XHQkZGVzdExpc3QuYXBwZW5kKCRjbG9uZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHR9LFxuXHRcdHJlcGVhdGVyOmZ1bmN0aW9uKCAkc3JjLCAkZGVzdCApIHtcblxuXHRcdFx0YWNmLmZpZWxkcy5yZXBlYXRlci5zZXQoICckZmllbGQnLCAkZGVzdCApO1xuXHRcdFx0JHNyYy5maW5kKCc+IC5hY2YtaW5wdXQgPiAuYWNmLXJlcGVhdGVyID4gLmFjZi10YWJsZSA+IHRib2R5ID4gLmFjZi1yb3c6bm90KC5hY2YtY2xvbmUpJykuZWFjaChmdW5jdGlvbihpLHJvdyl7XG5cdFx0XHRcdC8vIGVhY2ggcmVwZWF0ZXIgZW50cnkuLi4gZmluZCBmaWVsZHMgaW4gcmVwZWF0ZXIgZW50cnlcblx0XHRcdFx0dmFyICRuZXdfcm93ID0gYWNmLmZpZWxkcy5yZXBlYXRlci5hZGQoKTtcblxuXHRcdFx0XHRjb3B5X3ZhbHVlcyggJChyb3cpLCAkbmV3X3JvdywgJz4gLmFjZi1maWVsZCwgPiAuYWNmLWZpZWxkcyA+IC5hY2YtZmllbGQnICk7IC8vIGV4Y2x1ZGUgY2xvbmVzIVxuXHRcdFx0fSk7IC8vIHRhYmxlXG5cdFx0fSxcblx0XHRzZWxlY3Q6IGZ1bmN0aW9uKCAkc3JjLCAkZGVzdCwgX3NlbGVjdG9yICkgeyAvLyBPS0FZXG5cdFx0XHRfc2VsZWN0b3IgPSBfc2VsZWN0b3IgfHwgJyA+IC5hY2YtaW5wdXQgPiBzZWxlY3QnO1xuXHRcdFx0dmFyICRzcmNTZWxlY3QgPSAkc3JjLmZpbmQoIF9zZWxlY3RvciApLFxuXHRcdFx0XHQkZGVzdFNlbGVjdCA9ICRkZXN0LmZpbmQoIF9zZWxlY3RvciApO1xuXG5cdFx0XHRpZiAoICRzcmNTZWxlY3QuZGF0YSgndWknKSAqIDEgKSB7XG5cdFx0XHRcdC8vIHNvcnQgJGRlc3QgbGlrZSAkc3JjXG5cdFx0XHRcdCRkZXN0U2VsZWN0Lmh0bWwoJycpO1xuXHRcdFx0XHQkc3JjU2VsZWN0LmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24oaSxlbCl7XG5cdFx0XHRcdFx0JGRlc3RTZWxlY3QuYXBwZW5kKCQoZWwpLmNsb25lKCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdCRkZXN0T3B0cyA9ICRkZXN0U2VsZWN0LmZpbmQoJ29wdGlvbicpO1xuXHRcdFx0JHNyY1NlbGVjdC5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKGksZWwpIHtcblx0XHRcdFx0JCggJGRlc3RPcHRzW2ldICkucHJvcCgnc2VsZWN0ZWQnLCAkKGVsKS5wcm9wKCdzZWxlY3RlZCcpICk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRheG9ub215OiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ3JhZGlvJ10oJHNyYywgJGRlc3QpO1xuXHRcdFx0Y29weV92YWx1ZV9jYlsnY2hlY2tib3gnXSgkc3JjLCAkZGVzdCk7XG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydzZWxlY3QnXSgkc3JjLCAkZGVzdCwgJz4gLmFjZi1pbnB1dCA+IC5hY2YtdGF4b25vbXktZmllbGQgPiBzZWxlY3QnICk7XG5cdFx0fSxcblx0XHR0ZXh0YXJlYTogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyBPS0FZXG5cdFx0XHQkZGVzdC5maW5kKCd0ZXh0YXJlYScpLnZhbCggJHNyYy5maW5kKCd0ZXh0YXJlYScpLnZhbCgpICk7XG5cdFx0fSxcblx0XHR0aW1lX3BpY2tlcjogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyBPS0FZXG5cdFx0XHRjb3B5X3ZhbHVlX2NiWydfZGVmYXVsdCddKCRzcmMsICRkZXN0LCAndGV4dCcgKTtcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ19kZWZhdWx0J10oJHNyYywgJGRlc3QsICdoaWRkZW4nICk7XG5cdFx0fSxcblx0XHR0cnVlX2ZhbHNlOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdCRkZXN0LmZpbmQoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKS5wcm9wKCdjaGVja2VkJywgJHNyYy5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJykucHJvcCgnY2hlY2tlZCcpICk7XG5cdFx0XHQkZGVzdC5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0fSxcblx0XHR1c2VyOiBmdW5jdGlvbiggJHNyYywgJGRlc3QgKSB7IC8vIE9LQVlcblx0XHRcdGNvcHlfdmFsdWVfY2JbJ3NlbGVjdCddKCAkc3JjLCAkZGVzdCApO1xuXHRcdH0sXG5cdFx0d3lzaXd5ZzogZnVuY3Rpb24oICRzcmMsICRkZXN0ICkgeyAvLyAuLi5cblx0XHRcdHZhciBpbml0X2NiID0gZnVuY3Rpb24oIGVkLCBpZCwgaW5pdCwgJGZpZWxkICkge1xuXHRcdFx0XHRpZiAoICRmaWVsZC5nZXQoMCkgPT09ICRkZXN0LmdldCgwKSApIHtcblx0XHRcdFx0XHR2YXIgc3JjRWQgPSB0aW55bWNlLmdldCggJHNyYy5maW5kKCd0ZXh0YXJlYScpLmF0dHIoJ2lkJykgKTtcblx0XHRcdFx0XHRpZiAoIHNyY0VkICkge1xuXHRcdFx0XHRcdFx0ZWQuc2V0Q29udGVudCggc3JjRWQuZ2V0Q29udGVudCgpICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQvL1x0YWNmLnJlbW92ZV9hY3Rpb24oJ3d5c2l3eWdfdGlueW1jZV9pbml0JywgaW5pdF9jYiApOyAvLyBtaG1tbW1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGFjZi5hZGRfYWN0aW9uKCd3eXNpd3lnX3RpbnltY2VfaW5pdCcsIGluaXRfY2IgKTtcblxuXHRcdFx0JGRlc3QuZmluZCgndGV4dGFyZWEnKS5odG1sKCAkc3JjLmZpbmQoJ3RleHRhcmVhJykuaHRtbCgpICk7XG5cdFx0fSxcblx0fTtcblxuXHQvKipcblx0ICpcdENvcHkgdmFsdWVzIGZyb20gb25lIGFjZi1maWVsZCB0byBhbm90aGVyXG5cdCAqXG5cdCAqXHRAcGFyYW0gJHNyYyBqUXVlcnkgb2JqZWN0IGhvbGRpbmcgdGhlIC5hY2YtZmllbGQgb2JqZWN0IHRvIGNvcHkgZnJvbVxuXHQgKlx0QHBhcmFtICRkZXN0IGpRdWVyeSBvYmplY3QgaG9sZGluZyB0aGUgLmFjZi1maWVsZCBvYmplY3QgdG8gY29weSB0b1xuXHQgKi9cblx0ZnVuY3Rpb24gY29weV92YWx1ZSggJHNyYywgJGRlc3QgKSB7XG5cdFx0dmFyIHR5cGUsXG5cdFx0XHRjb3B5RXZlbnQsXG5cdFx0XHRkb25lRXZlbnQ7XG5cblx0XHR0eXBlID0gJHNyYy5hdHRyKCdkYXRhLXR5cGUnKTtcblxuXHRcdGNvcHlFdmVudCA9ICQuRXZlbnQoICdhY2ZfZHVwbGljYXRlOicgKyB0eXBlICk7XG5cdFx0Y29weUV2ZW50LmRlc3RpbmF0aW9uID0gJGRlc3Q7XG5cblx0XHQkc3JjLnRyaWdnZXIoIGNvcHlFdmVudCApO1xuXG5cdFx0Ly8gYWxsb3cgY2FuY2VsaW5nXG5cdFx0aWYgKCBjb3B5RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCAhIGNvcHlfdmFsdWVfY2JbIHR5cGUgXSApIHtcblx0XHRcdC8vIERlZmFsdCBiZWhhdmlvdXIgZm9yIHRleHQsIHJhbmdlLCB1cmwsIG51bWJlcixcblx0XHRcdGNvcHlfdmFsdWVfY2IuX2RlZmF1bHQoICRzcmMsICRkZXN0LCB0eXBlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcHlfdmFsdWVfY2JbdHlwZV0oICRzcmMsICRkZXN0ICk7XG5cdFx0fVxuXG5cdFx0ZG9uZUV2ZW50ID0gJC5FdmVudCggJ2FjZl9kdXBsaWNhdGVkOicgKyB0eXBlICk7XG5cdFx0ZG9uZUV2ZW50LmRlc3RpbmF0aW9uID0gJGRlc3Q7XG5cblx0XHQkc3JjLnRyaWdnZXIoIGRvbmVFdmVudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqXHRDb3B5IHZhbHVlcyBmcm9tIG9uZSBzZXQgb2YgYWNmLWZpZWxkcyB0byBhbm90aGVyLlxuXHQgKlx0SXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggJHNyYyBhZG4gJGRlc3QgaGF2ZSBhbiBpZGVudGljYWxcblx0ICpcblx0ICpcdEBwYXJhbSAkc3JjIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgLmFjZi1maWVsZCBvYmplY3RzIHRvIGNvcHkgZnJvbVxuXHQgKlx0QHBhcmFtICRkZXN0IGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgLmFjZi1maWVsZCBvYmplY3QgdG8gY29weSB0b1xuXHQgKlx0QHBhcmFtIF9zZWxlY3RvciBjc3Mgc2VsZWN0b3IgdG8gc2VsZWN0IC5hY2YtZmllbGRzIGluIGJvdGggJHNyYyBhbmQgJGRlc3Rcblx0ICovXG5cdGZ1bmN0aW9uIGNvcHlfdmFsdWVzKCAkc3JjLCAkZGVzdCwgX3NlbGVjdG9yICkge1xuXHRcdHZhciBmaWVsZF9tYXBcdD0ge30sXG5cdFx0XHRfc2VsZWN0b3IgPSBfc2VsZWN0b3IgfHwgJz4gLmFjZi1maWVsZCwgPiAuYWNmLWZpZWxkcyA+IC5hY2YtZmllbGQnLFxuXHRcdFx0JHNvdXJjZXNcdD0gJHNyYy5maW5kKCBfc2VsZWN0b3IgKSxcblx0XHRcdCRkZXN0c1x0XHQ9ICRkZXN0LmZpbmQoIF9zZWxlY3RvciApO1xuXG5cdFx0JHNvdXJjZXMuZWFjaCggZnVuY3Rpb24oIGksIGVsICl7XG5cdFx0XHRpZiAoICEgJGRlc3RzW2ldICkge1xuXHRcdFx0XHRjb25zb2xlLnRyYWNlKCdFcnJvcjogc291cmNlIGZpZWxkcyBkbyBub3QgbWF0Y2ggZGVzdGluYXRpb24gZmllbGRzJyk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICggJCggJHNvdXJjZXNbaV0gKS5kYXRhKCd0eXBlJykgIT09ICQoJGRlc3RzW2ldKS5kYXRhKCd0eXBlJykgKSB7XG5cdFx0XHRcdGNvbnNvbGUudHJhY2UoJ0Vycm9yOiBzb3VyY2UgZmllbGQgdHlwZSBkb2VzIG5vdCBtYXRjaCBkZXN0aW5hdGlvbiBmaWVsZCB0eXBlJyk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGNvcHlfdmFsdWUoICQoICRzb3VyY2VzW2ldICksICQoJGRlc3RzW2ldKSApO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqXHRFeHRlbmQgYWNmIGZsZXhpYmxlIGNvbnRlbnQgZmllbGRcblx0ICovXG5cdGFjZi5maWVsZHMuZmxleGlibGVfY29udGVudCA9IGFjZi5maWVsZHMuZmxleGlibGVfY29udGVudC5leHRlbmQoe1xuXHRcdGV2ZW50czoge1xuXHRcdFx0J2NsaWNrIFtkYXRhLW5hbWU9XCJkdXBsaWNhdGUtbGF5b3V0XCJdJzogJ19kdXBsaWNhdGUnXG5cdFx0fSxcblx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgcmV0O1xuXG5cdFx0XHRyZXQgPSBvcmlnX2ZsZXhpYmxlX2NvbnRlbnQucmVuZGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblxuXHRcdFx0Ly8gdXBkYXRlIG9yZGVyIG51bWJlcnNcblx0XHRcdHRoaXMuJHZhbHVlcy5jaGlsZHJlbignLmxheW91dCcpLmVhY2goZnVuY3Rpb24oIGksIGVsICl7XG5cdFx0XHRcdGlmICggISAkKHRoaXMpLmZpbmQoJ1tkYXRhLW5hbWU9XCJkdXBsaWNhdGUtbGF5b3V0XCJdJykubGVuZ3RoICkge1xuXHRcdFx0XHRcdCQodGhpcykuZmluZCgnLmFjZi1mYy1sYXlvdXQtY29udHJvbGxzJykucHJlcGVuZCggb3B0aW9ucy5kdXBsaWNhdGVfZmxleGlibGVfYnRuICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0sXG5cdFx0X2R1cGxpY2F0ZTogZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHR2YXIgbGF5b3V0LFxuXHRcdFx0XHRkdXBsaWNhdGVkRXZlbnQsXG5cdFx0XHRcdCRmaWVsZCxcblx0XHRcdFx0JGxheW91dCxcblx0XHRcdFx0JG5ld19sYXlvdXQ7XG5cblx0XHRcdC8vIGdldCBsYXlvdXQgd3JhcHBlclxuXHRcdFx0JGxheW91dCA9IGUuJGVsLmNsb3Nlc3QoJy5sYXlvdXQnKTtcblxuXHRcdFx0Ly8gZ2V0IGZsZXhpYmxlX2NvbnRlbnQgZmllbGRcblx0XHRcdCRmaWVsZCA9ICRsYXlvdXQuY2xvc2VzdCgnLmFjZi1maWVsZCcpO1xuXG5cdFx0XHQvLyBhY2Ygc2V0IGZpZWxkIGNvbnRlbnh0XG5cdFx0XHRhY2YuZmllbGRzLmZsZXhpYmxlX2NvbnRlbnQuc2V0KCAnJGZpZWxkJywgJGZpZWxkICk7XG5cblx0XHRcdC8vIGFjZiBhZGQgdGFyZ2V0IGxheW91dCBiZWZvcmUgc291cmNlIGxheW91dFxuXHRcdFx0YWNmLmZpZWxkcy5mbGV4aWJsZV9jb250ZW50LmFkZCggJGxheW91dC5kYXRhKCdsYXlvdXQnKSwgJGxheW91dCApO1xuXG5cdFx0XHQvLyBnZXQgdGhlIGFkZGVkIGxheW91dFxuXHRcdFx0JG5ld19sYXlvdXQgPSAkbGF5b3V0LnByZXYoICcubGF5b3V0JyApO1xuXG5cdFx0XHQvLyBjb3B5IHZhbHVlcyBmcm9tIHNvdXJjZSBsYXlvdXQgdG8gZGVzdGluYXRpb25cblx0XHRcdGNvcHlfdmFsdWVzKCAkbGF5b3V0LCAkbmV3X2xheW91dCwgJz4gLmFjZi10YWJsZSA+IHRib2R5ID4gLmFjZi1yb3cgPiAuYWNmLWZpZWxkLCA+IC5hY2YtZmllbGRzID4gLmFjZi1maWVsZCcgKTsgLy8gZXhjbHVkZSBjbG9uZXMhXG5cblx0XHRcdGR1cGxpY2F0ZWRFdmVudCA9ICQuRXZlbnQoICdhY2ZfZHVwbGljYXRlZF9sYXlvdXQnICk7XG5cdFx0XHRkdXBsaWNhdGVkRXZlbnQuZGVzdGluYXRpb24gPSAkbmV3X2xheW91dDtcblxuXHRcdFx0JGxheW91dC50cmlnZ2VyKCBkdXBsaWNhdGVkRXZlbnQgKTtcblxuXHRcdH1cblx0fSk7XG5cblx0LyoqXG5cdCAqXHRFeHRlbmQgYWNmIGZsZXhpYmxlIGNvbnRlbnQgZmllbGRcblx0ICovXG5cdGFjZi5maWVsZHMucmVwZWF0ZXIgPSBhY2YuZmllbGRzLnJlcGVhdGVyLmV4dGVuZCh7XG5cdFx0ZXZlbnRzOiB7XG5cdFx0XHQnY2xpY2sgYVtkYXRhLWV2ZW50PVwiZHVwbGljYXRlLXJvd1wiXSc6ICdfZHVwbGljYXRlJ1xuXHRcdH0sXG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0dmFyIHJldDtcblxuXHRcdFx0cmV0ID0gb3JpZ19yZXBlYXRlci5yZW5kZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXG5cdFx0XHQvLyBhZGQgZHVwbGljYXRlIGJ0blxuXHRcdFx0dGhpcy4kdGJvZHkuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKGkpe1xuXHRcdFx0XHQkKHRoaXMpLmZpbmQoJz4gdGQucmVtb3ZlJykuYXBwZW5kKCBvcHRpb25zLmR1cGxpY2F0ZV9yZXBlYXRlcl9idG4gKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0sXG5cdFx0X2R1cGxpY2F0ZTogZnVuY3Rpb24oIGUgKSB7XG5cblx0XHRcdHZhciAkc291cmNlLCAkZGVzdCwgZHVwbGljYXRlZEV2ZW50O1xuXG5cdFx0XHQvLyBnZXQgc291cmNlIHJvd1xuXHRcdFx0aWYoIGUuJGVsLmhhc0NsYXNzKCdhY2YtaWNvbicpICkge1xuXHRcdFx0XHQkc291cmNlID0gZS4kZWwuY2xvc2VzdCgnLmFjZi1yb3cnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIGFkZCBkZXN0aW5hdGlvbiByb3dcblx0XHRcdCRkZXN0ID0gdGhpcy5hZGQoICRzb3VyY2UgKTsgLy8gYWRkIGJlZm9yZSBzb3VyY2UhXG5cblx0XHRcdC8vIGNvcHkgdmFsdWVzIGZyb20gc291cmNlIHJvdyB0byBkZXN0aW5hdGlvblxuXHRcdFx0Y29weV92YWx1ZXMoICRzb3VyY2UsICRkZXN0ICk7XG5cblx0XHRcdHRoaXMuJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xuXG5cdFx0XHRkdXBsaWNhdGVkRXZlbnQgPSAkLkV2ZW50KCAnYWNmX2R1cGxpY2F0ZWRfcm93JyApO1xuXHRcdFx0ZHVwbGljYXRlZEV2ZW50LmRlc3RpbmF0aW9uID0gJGRlc3Q7XG5cblx0XHRcdCRzb3VyY2UudHJpZ2dlciggZHVwbGljYXRlZEV2ZW50ICk7XG5cblx0XHR9LFxuXHR9KTtcblxuXG59KShqUXVlcnkpXG4iXX0=

webpackJsonp([1],{"62B+":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={isInt:function(e,t){return(t?new RegExp("^(0|[1-9][0-9]*)$"):new RegExp("^([1-9][0-9]*)$")).test(e)},isMoney:function(e){return new RegExp("^[0-9]+(.[0-9]{1,2})?$").test(e)},isChinese:function(e){return new RegExp("[一-龥]+","ig").test(e)},isPhone:function(e){return new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0-9])[0-9]{8}$/,"ig").test(e)},isFixedPhone:function(e){return new RegExp(/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,"ig").test(e)}};t.default=s},Q8aI:function(e,t){},qKcU:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,i=o("62B+"),r=(s=i)&&s.__esModule?s:{default:s};var n={predefineRoutineText:function(e,t,o){new RegExp(/[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|[\u2700-\u27BF]\uFE0F]/,"ig").test(t)?o(new Error("不允许使用表情符号")):o()},predefineNumeralText:function(e,t,o){new RegExp(/^[0-9a-z]+$/,"ig").test(t)?o():o(new Error(e.message))},predefineNumeral:function(e,t,o){new RegExp(/^[0-9]+$/,"ig").test(t)?o():o(new Error(e.message))},email:function(e,t,o){new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,"ig").test(t)?o():o(new Error(e.message))},idCard:function(e,t,o){new RegExp(/^[1-9][0-9]{5}(18|19|20)[0-9]{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/,"ig").test(t)?o():o(new Error(e.message))},phone:function(e,t,o){new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0-9])[0-9]{8}$/,"ig").test(t)?o():o(new Error(e.message))},fixedPhone:function(e,t,o){new RegExp(/^[0-9*#-]+$/,"ig").test(t)?o():o(new Error(e.message))},phoneAndFixedPhone:function(e,t,o){r.default.isPhone(t)||r.default.isFixedPhone(t)?o():o(new Error(e.message))},password:function(e,t,o){var s=0;/[0-9]+/gi.test(t)&&(s+=1),/[a-z]+/gi.test(t)&&(s+=1),/((?=[\x21-\x7e]+)[^A-Za-z0-9])/gi.test(t)&&(s+=1),s<2?o(new Error(e.message)):o()},passwordRepeat:function(e,t,o,s){t===s?o():o(new Error(e.message))},unEmoji:function(e,t,o){new RegExp(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/,"ig").test(t)?o(new Error(e.message)):o()},unSpace:function(e,t,o){new RegExp(/ /,"ig").test(t)?o(new Error(e.message)):o()},unChinese:function(e,t,o){new RegExp("[一-龥]+","ig").test(t)?o(new Error(e.message)):o()},signlessInteger:function(e,t,o){r.default.isInt(t,!0)?o():o(new Error(e.message))},signlessIntegerNonZero:function(e,t,o){r.default.isInt(t,!1)?o():o(new Error(e.message))}};t.default=n},wJHF:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("//Fk"),i=o.n(s),r=o("fZjL"),n=o.n(r),a=o("mvHQ"),l=o.n(a),m=o("jAow"),u=o.n(m),c=(o("qKcU"),o("7K6E")),p=o.n(c),d={data:function(){return{clientType:this.$store.state.clientType,formId:"",formDesign:{},widgetList:[],uploadindKey:"",uploadKeyList:[],uploadFile:[],uploadFileUrl:[],isPreview:!1,formDetail:{title:"企业员工满意度调查"},formUser:{company:"",code:"",name:"",contact:""},rule:{company:[{required:!0,message:"请输入您的企业名称",trigger:"blur"}],code:[{required:!0,message:"请输入统一机构代码",trigger:"blur"}],name:[{required:!0,message:"请输入联系人姓名",trigger:"blur"}],contact:[{required:!0,message:"请输入您的联系方式",trigger:"blur"}]}}},created:function(){"true"===this.$route.query.preview?this.isPreview=!1:this.isPreview=!0,this.$route.query.formId?this.queryForm():this.$router.push("/")},methods:{queryForm:function(e){var t=this,o=l()({id:this.$route.query.formId}),s=new FormData;s.append("requestParam",o),p.a.request(u.a.base+"f/api/app/v2/questionnaire/queryById",s,"file","post").then(function(e){t.widgetList=JSON.parse(e.source).list;for(var o=0,s=t.widgetList.length;o<s;o++)switch(t.widgetList[o].type){case"input":case"textarea":t.$set(t.formDesign,t.widgetList[o].model,"");break;case"number":t.$set(t.formDesign,t.widgetList[o].model,t.widgetList[o].options.min);break;case"radio":case"checkbox":case"select":t.$set(t.formDesign,t.widgetList[o].model,t.widgetList[o].options.selectValue);break;case"imgupload":t.$set(t.formDesign,t.widgetList[o].model,[])}})},onSubmit:function(){var e=this;this.$refs.formUser.validate(function(t){if(t){for(var o=0,s=e.widgetList.length;o<s;o++)if(e.widgetList[o].options.required)switch(e.widgetList[o].type){case"input":case"textarea":case"radio":case"select":if(!e.formDesign[e.widgetList[o].model]&&0!==e.formDesign[e.widgetList[o].model])return void e.$message.error("您有必填的题目未填写，请填写完整再提交");break;case"number":break;case"checkbox":case"imgupload":if(0===e.formDesign[e.widgetList[o].model].length)return void e.$message.error("您有必填的题目未填写，请填写完整再提交")}e.onReadyUploadImage()}})},onReadyUploadImage:function(){for(var e=n()(this.formDesign),t=0,o=e.length;t<o;t++)this.formDesign[e[t]].length&&this.formDesign[e[t]][0].status&&this.uploadKeyList.push(e[t]);this.uploadAllImage()},uploadAllImage:function(){for(var e=this,t=0,o=this.uploadKeyList.length;t<o;t++){this.uploadindKey="",this.uploadFile=[],this.uploadFileUrl=[];for(var s=0,r=this.formDesign[this.uploadKeyList[t]].length;s<r;s++)if("ready"===this.formDesign[this.uploadKeyList[t]][s].status){this.uploadindKey=this.uploadKeyList[t];var n=this.formDesign[this.uploadKeyList[t]][s].raw,a=new FormData;a.append("file",n);var l=p.a.request(u.a.base+"f/api/user/uploadFile",a,"file","post").then(function(t){e.uploadFileUrl.push(t.fileId)});this.uploadFile.push(l)}if(this.uploadFile.length>0)return void i.a.all(this.uploadFile).then(function(){for(var t=0,o=e.formDesign[e.uploadindKey].length;t<o;t++)"ready"===e.formDesign[e.uploadindKey][t].status&&(e.formDesign[e.uploadindKey][t].uploadUrl=e.uploadFileUrl[t],e.formDesign[e.uploadindKey][t].status="success");e.uploadAllImage()}).catch(function(){console.log("uploadAllImage catch")})}this.saveForm()},saveForm:function(e){for(var t=this,o=JSON.parse(l()(this.formDesign)),s=n()(o),i=0,r=s.length;i<r;i++)if("[object Array]"===Object.prototype.toString.call(o[s[i]]))switch(Object.prototype.toString.call(o[s[i]][0])){case"[object String]":o[s[i]]=o[s[i]].join(",　");break;case"[object Object]":for(var a=0,m=o[s[i]].length;a<m;a++)o[s[i]][a].url=o[s[i]][a].uploadUrl}for(var c=[],d=0,f=this.widgetList.length;d<f;d++){var g={model:this.widgetList[d].model,name:this.widgetList[d].name,type:this.widgetList[d].type};c.push(g)}o=JSON.parse(l()(o).replace(/:\[\]/g,':"(空)"').replace(/:""/g,':"(空)"'));var h={userId:this.$store.state.signInUser.id,name:this.formUser.company,estateId:this.formUser.code,userName:this.formUser.name,userPhone:this.formUser.contact,formId:this.$route.query.formId,questionnaireId:this.$route.query.id,data:o,fields:c},v=new FormData;v.append("requestParam",l()(h)),p.a.request(u.a.base+"f/api/app/v2/questionnaire/commit",v,"file","post").then(function(e){t.$message({message:"提交成功",type:"success"}),t.$router.push("/")})},checkFileFormat:function(e,t){return"image/png"!==e.raw.type&&"image/jpeg"!==e.raw.type&&"image/bmp"!==e.raw.type?(this.$message.error("请上传图片"),!1):!(e.size>=1024*t)||(this.$message.error("文件大小不超过"+t+"KB"),!1)},onUploadChange:function(e,t,o){if("ready"===e.status)if(this.checkFileFormat(e,o.options.size)){var s=e.name.substring(e.name.lastIndexOf("."),e.name.length),i=new Date-0+s,r=new File([e.raw],i,{type:e.raw.type});r.uid=e.raw.uid,e.raw=r,e.name=i,this.formDesign[o.model].push(e)}else{var n=l()(this.formDesign[o.model]);this.formDesign[o.model]=[],this.formDesign[o.model]=JSON.parse(n)}},onUploadRemove:function(e,t,o){this.formDesign[o.model]=t},onUploadExceed:function(){switch(this.clientType){case"phone":case"pc":this.$message.error("图片上传已上限，无法添加")}}}},f={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"questionnaire-input"},["phone"===e.clientType?o("div",{staticClass:"phone"},[o("div",{staticClass:"input-form"},[o("el-form",{attrs:{model:e.formDesign,"label-position":"top"}},e._l(e.widgetList,function(t){return o("div",{key:t.key,staticClass:"fd-design-group-item"},[o("el-form-item",{attrs:{label:t.name,required:t.options.required}},["input"===t.type?[o("el-input",{attrs:{placeholder:t.options.defaultValue,maxlength:t.options.maxlength},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"textarea"===t.type?[o("el-input",{attrs:{type:"textarea",placeholder:t.options.defaultValue,maxlength:t.options.maxlength},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"number"===t.type?[o("el-input-number",{staticClass:"fr-number",attrs:{min:t.options.min,max:t.options.max},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"radio"===t.type?[o("el-radio-group",{staticClass:"fr-radio-group",model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(t,s){return o("el-radio",{key:s,attrs:{label:t.label}},[e._v(e._s(t.label))])}),1)]:e._e(),e._v(" "),"checkbox"===t.type?[o("el-checkbox-group",{staticClass:"fr-checkbox-group",model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(t,s){return o("el-checkbox",{key:s,attrs:{label:t.label}},[e._v(e._s(t.label))])}),1)]:e._e(),e._v(" "),"select"===t.type?[o("el-select",{staticClass:"fr-select",attrs:{placeholder:"请选择"},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)]:e._e(),e._v(" "),"imgupload"==t.type?[o("el-upload",{staticClass:"fr-upload",attrs:{action:"#",multiple:!0,"list-type":"picture-card",limit:t.options.limit,"auto-upload":!1,"file-list":e.formDesign[t.model],"on-change":function(o,s){e.onUploadChange(o,s,t)},"on-exceed":e.onUploadExceed,"on-remove":function(o,s){e.onUploadRemove(o,s,t)}}},[o("i",{staticClass:"el-icon-plus"})])]:e._e()],2)],1)}),0)],1),e._v(" "),e.isPreview?o("div",{staticClass:"info"},[e._m(0),e._v(" "),o("div",{staticClass:"enterprise"},[o("el-form",{key:"formUser",ref:"formUser",attrs:{model:e.formUser,rules:e.rule}},[o("el-form-item",{attrs:{label:"企业名称",prop:"company"}},[o("el-input",{attrs:{maxlength:"30",placeholder:"请输入您的企业名称"},model:{value:e.formUser.company,callback:function(t){e.$set(e.formUser,"company",t)},expression:"formUser.company"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"统一机构代码",prop:"code"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入统一机构代码"},model:{value:e.formUser.code,callback:function(t){e.$set(e.formUser,"code",t)},expression:"formUser.code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"联系人姓名",prop:"name"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入联系人姓名"},model:{value:e.formUser.name,callback:function(t){e.$set(e.formUser,"name",t)},expression:"formUser.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"联系方式",prop:"contact"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入您的联系方式"},model:{value:e.formUser.contact,callback:function(t){e.$set(e.formUser,"contact",t)},expression:"formUser.contact"}})],1)],1)],1)]):e._e(),e._v(" "),o("div",{staticClass:"questionnaire-submit row con-c align-c"},[o("el-button",{on:{click:function(t){return t.preventDefault(),e.onSubmit()}}},[e._v("提交问卷")])],1)]):e._e(),e._v(" "),"pc"===e.clientType?o("div",{staticClass:"pc"},[o("div",{staticClass:"questionnaire-title row con-c align-c"},[o("span",[e._v(e._s(e.formDetail.title))])]),e._v(" "),o("div",{staticClass:"input-form"},[o("el-form",{attrs:{model:e.formDesign,"label-position":"top"}},e._l(e.widgetList,function(t){return o("div",{key:t.key,staticClass:"fd-design-group-item"},[o("el-form-item",{attrs:{label:t.name,required:t.options.required}},["input"===t.type?[o("el-input",{attrs:{placeholder:t.options.defaultValue,maxlength:t.options.maxlength},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"textarea"===t.type?[o("el-input",{attrs:{type:"textarea",placeholder:t.options.defaultValue,maxlength:t.options.maxlength},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"number"===t.type?[o("el-input-number",{staticClass:"fr-number",attrs:{min:t.options.min,max:t.options.max},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}})]:e._e(),e._v(" "),"radio"===t.type?[o("el-radio-group",{staticClass:"fr-radio-group",model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(t,s){return o("el-radio",{key:s,attrs:{label:t.label}},[e._v(e._s(t.label))])}),1)]:e._e(),e._v(" "),"checkbox"===t.type?[o("el-checkbox-group",{staticClass:"fr-checkbox-group",model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(t,s){return o("el-checkbox",{key:s,attrs:{label:t.label}},[e._v(e._s(t.label))])}),1)]:e._e(),e._v(" "),"select"===t.type?[o("el-select",{staticClass:"fr-select",attrs:{placeholder:"请选择"},model:{value:e.formDesign[t.model],callback:function(o){e.$set(e.formDesign,t.model,o)},expression:"formDesign[item.model]"}},e._l(t.options.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)]:e._e(),e._v(" "),"imgupload"==t.type?[o("el-upload",{staticClass:"fr-upload",attrs:{action:"#",multiple:!0,"list-type":"picture-card",limit:t.options.limit,"auto-upload":!1,"file-list":e.formDesign[t.model],"on-change":function(o,s){e.onUploadChange(o,s,t)},"on-exceed":e.onUploadExceed,"on-remove":function(o,s){e.onUploadRemove(o,s,t)}}},[o("i",{staticClass:"el-icon-plus"})])]:e._e()],2)],1)}),0)],1),e._v(" "),e.isPreview?o("div",{staticClass:"info"},[e._m(1),e._v(" "),o("el-form",{key:"formUser",ref:"formUser",attrs:{model:e.formUser,rules:e.rule,"label-width":"120px","label-position":"right"}},[o("div",{staticClass:"row con-b align-c"},[o("el-form-item",{staticClass:"form-item",attrs:{label:"企业名称：",prop:"company"}},[o("el-input",{attrs:{maxlength:"30",placeholder:"请输入您的企业名称"},model:{value:e.formUser.company,callback:function(t){e.$set(e.formUser,"company",t)},expression:"formUser.company"}})],1),e._v(" "),o("el-form-item",{staticClass:"form-item",attrs:{label:"统一机构代码：",prop:"code"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入统一机构代码"},model:{value:e.formUser.code,callback:function(t){e.$set(e.formUser,"code",t)},expression:"formUser.code"}})],1)],1),e._v(" "),o("div",{staticClass:"row con-b align-c"},[o("el-form-item",{staticClass:"form-item",attrs:{label:"联系人姓名：",prop:"name"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入联系人姓名"},model:{value:e.formUser.name,callback:function(t){e.$set(e.formUser,"name",t)},expression:"formUser.name"}})],1),e._v(" "),o("el-form-item",{staticClass:"form-item",attrs:{label:"联系方式：",prop:"contact"}},[o("el-input",{attrs:{maxlength:"18",placeholder:"请输入您的联系方式"},model:{value:e.formUser.contact,callback:function(t){e.$set(e.formUser,"contact",t)},expression:"formUser.contact"}})],1)],1)])],1):e._e(),e._v(" "),o("div",{staticClass:"questionnaire-submit row con-c align-c"},[o("el-button",{on:{click:function(t){return t.preventDefault(),e.onSubmit()}}},[e._v("提交问卷")])],1)]):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info-title row con-c align-c"},[t("span",[this._v("确认您的信息")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info-title row con-c align-c"},[t("span",[this._v("确认您的信息")])])}]};var g=o("VU/8")(d,f,!1,function(e){o("Q8aI")},null,null);t.default=g.exports}});
//# sourceMappingURL=1.1bea48615c577777f820.js.map
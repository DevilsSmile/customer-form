webpackJsonp([5],{"5twd":function(o,e){},TZDU:function(o,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("//Fk"),t=a.n(n),r=a("mvHQ"),l=a.n(r),m=a("jAow"),i=a.n(m),s=(a("qKcU"),a("7K6E")),p=a.n(s),c={data:function(){return{host:i.a.base,clientType:this.$store.state.clientType,uploadFile:[],uploadFileUrl:[],formCompanyInfo:{id:"",companyName:"",companyCode:"",companyKey:"",companyProduct:"",name:"",contact:"",other:"",file:[]},formCompanyInfoBuffer:{},rule:{companyName:[{required:!0,message:"企业名称不能为空",trigger:"blur"}],companyCode:[{required:!0,message:"统一机构代码不能为空",trigger:"blur"}],companyKey:[{required:!0,message:"企业关键技术不能为空",trigger:"blur"}],companyProduct:[{required:!0,message:"企业提供产品不能为空",trigger:"blur"}],name:[{required:!0,message:"联系人姓名不能为空",trigger:"blur"}],contact:[{required:!0,message:"联系方式不能为空",trigger:"blur"}]}}},created:function(){this.$store.state.isSignIn?(this.formCompanyInfo=JSON.parse(l()(this.$store.state.signInUser)),this.formCompanyInfoBuffer=JSON.parse(l()(this.$store.state.signInUser))):this.onRouteHome()},methods:{onRouteHome:function(){this.$router.push("/apppage/")},onCompany:function(){var o=this;this.$refs.elementFormCompanyInfo.validate(function(e){if(e){o.uploadFileUrl=[];for(var a=0,n=o.formCompanyInfo.file.length;a<n;a++)if("ready"===o.formCompanyInfo.file[a].status){var r=o.formCompanyInfo.file[a].raw,l=new FormData;l.append("file",r);var m=p.a.request(i.a.base+"f/api/user/uploadFile",l,"file","post").then(function(e){o.uploadFileUrl.push(e.fileId)});o.uploadFile.push(m)}if(o.uploadFile.length>0)return void t.a.all(o.uploadFile).then(function(){for(var e=0,a=o.formCompanyInfo.file.length;e<a;e++)"ready"===o.formCompanyInfo.file[e].status&&(o.formCompanyInfo.file[e].url=i.a.base+o.uploadFileUrl[0],o.formCompanyInfo.file[e].uploadUrl=i.a.base.substring(0,i.a.base.length-1)+o.uploadFileUrl[0],o.formCompanyInfo.file[e].status="success",o.uploadFileUrl.splice(0,1));o.saveCompany()}).catch(function(){console.log("uploadAllImage catch")});o.saveCompany()}})},saveCompany:function(){for(var o=this,e=[],a=JSON.parse(l()(this.formCompanyInfo.file)),n=0,t=a.length;n<t;n++)e.push(a[n].uploadUrl.replace(i.a.base,"/"));var r=l()({userId:this.formCompanyInfo.id,name:this.formCompanyInfo.companyName,code:this.formCompanyInfo.companyCode,contacts:this.formCompanyInfo.name,phone:this.formCompanyInfo.contact,technology:this.formCompanyInfo.companyKey,product:this.formCompanyInfo.companyProduct,others:this.formCompanyInfo.other,userFiles:"|"+e.join("|")}),m=new FormData;m.append("requestParam",r),p.a.request(i.a.base+"f/api/user/userUpdate",m,"file","post").then(function(e){o.formCompanyInfoBuffer=JSON.parse(l()(o.formCompanyInfo)),o.$store.commit("signInUser",o.formCompanyInfoBuffer),o.$message({showClose:!0,message:"修改成功",type:"success"}),o.onRouteHome()}).catch(function(o){})},checkFileFormat:function(o){return"image/png"!==o.raw.type&&"image/jpeg"!==o.raw.type?(this.$message.error("图片仅支持JPG、PNG格式"),!1):!(o.size>=6291456)||(this.$message.error("文件大小不超过5MB"),!1)},onUploadChange:function(o,e){if("ready"===o.status)if(this.checkFileFormat(o)){var a=o.name.substring(o.name.lastIndexOf("."),o.name.length),n=new Date-0+a,t=new File([o.raw],n,{type:o.raw.type});t.uid=o.raw.uid,o.raw=t,o.name=n,this.formCompanyInfo.file.push(o)}else{var r=l()(this.formCompanyInfo.file);this.formCompanyInfo.file=[],this.formCompanyInfo.file=JSON.parse(r)}},onUploadRemove:function(o,e){for(var a=this.formCompanyInfo.file,n=0,t=a.length;n<t;n++)if(a[n]&&a[n].uid===o.uid){a.splice(n,1);break}},onUploadPreviewFile:function(o){this.uploadFileUrl=o.url,this.winUploadFile=!0},onUploadSuccess:function(o,e,a){if(200===o.code){for(var n=this.formCompanyInfo.file,t=0,r=n.length;t<r;t++)if(n[t]&&n[t].uid===e.uid){n[t].url=i.a.resources+o.data.url;break}this.formCompanyInfo.file=n}},onUploadFail:function(o){},onUploadExceed:function(o,e){e.length>=3&&this.$message.error("达到最大张数限制")}}},f={render:function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("div",{staticClass:"edit-information"},["phone"===o.clientType?a("div",{staticClass:"phone column con-c align-c"},[a("div",{staticClass:"container-form"},[a("el-form",{ref:"elementFormCompanyInfo",attrs:{model:o.formCompanyInfo,rules:o.rule}},[a("el-form-item",{attrs:{label:"企业名称",prop:"companyName"}},[a("el-input",{staticClass:"input-text",attrs:{maxlength:"11",placeholder:"企业名称"},model:{value:o.formCompanyInfo.companyName,callback:function(e){o.$set(o.formCompanyInfo,"companyName",e)},expression:"formCompanyInfo.companyName"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"统一机构代码",prop:"companyCode"}},[a("el-input",{staticClass:"input-text",attrs:{maxlength:"18",placeholder:"统一机构代码"},model:{value:o.formCompanyInfo.companyCode,callback:function(e){o.$set(o.formCompanyInfo,"companyCode",e)},expression:"formCompanyInfo.companyCode"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"联系人姓名",prop:"name"}},[a("el-input",{staticClass:"input-text",attrs:{maxlength:"11",placeholder:"联系人姓名"},model:{value:o.formCompanyInfo.name,callback:function(e){o.$set(o.formCompanyInfo,"name",e)},expression:"formCompanyInfo.name"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"联系方式",prop:"contact"}},[a("el-input",{staticClass:"input-text",attrs:{maxlength:"18",placeholder:"联系方式",disabled:""},model:{value:o.formCompanyInfo.contact,callback:function(e){o.$set(o.formCompanyInfo,"contact",e)},expression:"formCompanyInfo.contact"}})],1),o._v(" "),a("el-form-item",{staticClass:"column",attrs:{prop:"companyKey"}},[a("div",{staticClass:"form-item-label row"},[o._v("企业关键技术")]),o._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"11",placeholder:"企业关键技术"},model:{value:o.formCompanyInfo.companyKey,callback:function(e){o.$set(o.formCompanyInfo,"companyKey",e)},expression:"formCompanyInfo.companyKey"}})],1),o._v(" "),a("el-form-item",{attrs:{prop:"companyProduct"}},[a("div",{staticClass:"form-item-label row"},[o._v("企业提供产品")]),o._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"18",placeholder:"企业提供产品"},model:{value:o.formCompanyInfo.companyProduct,callback:function(e){o.$set(o.formCompanyInfo,"companyProduct",e)},expression:"formCompanyInfo.companyProduct"}})],1),o._v(" "),a("el-form-item",[a("div",{staticClass:"form-item-label row"},[o._v("其他")]),o._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"11",placeholder:"其他"},model:{value:o.formCompanyInfo.other,callback:function(e){o.$set(o.formCompanyInfo,"other",e)},expression:"formCompanyInfo.other"}})],1),o._v(" "),a("el-form-item",[a("div",{staticClass:"form-item-label row"},[o._v("附件")]),o._v(" "),a("el-upload",{ref:"uploadImage",staticClass:"upload-image row",attrs:{"list-type":"picture-card","auto-upload":!1,limit:3,action:"","file-list":o.formCompanyInfo.file,"on-preview":o.onUploadPreviewFile,"on-remove":function(e,a){o.onUploadRemove(e,a)},"on-change":function(e,a){o.onUploadChange(e,a)},"on-success":function(e,a,n){o.onUploadSuccess(e,a,n)},"on-error":function(e){o.onUploadFail(e)}}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),o._v(" "),a("div",{staticClass:"column con-c align-c"},[a("el-button",{staticClass:"button-submit",on:{click:function(e){return e.preventDefault(),o.onCompany()}}},[o._v("保存")]),o._v(" "),a("el-button",{staticClass:"button-cancel",on:{click:function(e){return e.preventDefault(),o.onRouteHome()}}},[o._v("取消")])],1)],1)],1)]):o._e(),o._v(" "),"pc"===o.clientType?a("div",{staticClass:"pc row con-c align-c",on:{click:function(e){return e.target!==e.currentTarget?null:o.onRouteHome()}}},[a("div",{staticClass:"container-form"},[o._m(0),o._v(" "),a("el-form",{ref:"elementFormCompanyInfo",attrs:{model:o.formCompanyInfo,rules:o.rule,"label-width":"130px","label-position":"right"}},[a("div",{staticClass:"row con-b align-c"},[a("el-form-item",{attrs:{label:"企业名称：",prop:"companyName"}},[a("el-input",{attrs:{maxlength:"11",placeholder:"企业名称"},model:{value:o.formCompanyInfo.companyName,callback:function(e){o.$set(o.formCompanyInfo,"companyName",e)},expression:"formCompanyInfo.companyName"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"统一机构代码：",prop:"companyCode"}},[a("el-input",{attrs:{maxlength:"18",placeholder:"统一机构代码"},model:{value:o.formCompanyInfo.companyCode,callback:function(e){o.$set(o.formCompanyInfo,"companyCode",e)},expression:"formCompanyInfo.companyCode"}})],1)],1),o._v(" "),a("div",{staticClass:"row con-b align-c"},[a("el-form-item",{attrs:{label:"联系人姓名：",prop:"name"}},[a("el-input",{attrs:{maxlength:"11",placeholder:"联系人姓名"},model:{value:o.formCompanyInfo.name,callback:function(e){o.$set(o.formCompanyInfo,"name",e)},expression:"formCompanyInfo.name"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"联系方式：",prop:"contact"}},[a("el-input",{attrs:{maxlength:"18",placeholder:"联系方式",disabled:""},model:{value:o.formCompanyInfo.contact,callback:function(e){o.$set(o.formCompanyInfo,"contact",e)},expression:"formCompanyInfo.contact"}})],1)],1),o._v(" "),a("div",{staticClass:"row con-b align-c"},[a("el-form-item",{attrs:{label:"企业关键技术：",prop:"companyKey"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"11",placeholder:"企业关键技术"},model:{value:o.formCompanyInfo.companyKey,callback:function(e){o.$set(o.formCompanyInfo,"companyKey",e)},expression:"formCompanyInfo.companyKey"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"企业提供产品：",prop:"companyProduct"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"18",placeholder:"企业提供产品"},model:{value:o.formCompanyInfo.companyProduct,callback:function(e){o.$set(o.formCompanyInfo,"companyProduct",e)},expression:"formCompanyInfo.companyProduct"}})],1)],1),o._v(" "),a("div",{staticClass:"row con-b"},[a("el-form-item",{attrs:{label:"其他："}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4},maxlength:"11",placeholder:"其他"},model:{value:o.formCompanyInfo.other,callback:function(e){o.$set(o.formCompanyInfo,"other",e)},expression:"formCompanyInfo.other"}})],1),o._v(" "),a("el-form-item",{attrs:{label:"附件："}},[a("el-upload",{ref:"uploadImage",staticClass:"upload-image row",attrs:{"list-type":"picture-card","auto-upload":!1,limit:3,action:"","file-list":o.formCompanyInfo.file,"on-preview":o.onUploadPreviewFile,"on-remove":function(e,a){o.onUploadRemove(e,a)},"on-change":function(e,a){o.onUploadChange(e,a)},"on-success":function(e,a,n){o.onUploadSuccess(e,a,n)},"on-error":function(e){o.onUploadFail(e)}}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),o._v(" "),a("div",{staticClass:"operation row con-c align-c"},[a("el-button",{staticClass:"button-cancel",on:{click:function(e){return e.preventDefault(),o.onRouteHome()}}},[o._v("取消")]),o._v(" "),a("el-button",{staticClass:"button-submit",on:{click:function(e){return e.preventDefault(),o.onCompany()}}},[o._v("保存")])],1)])],1)]):o._e()])},staticRenderFns:[function(){var o=this.$createElement,e=this._self._c||o;return e("div",{staticClass:"form-title column con-c align-c"},[e("span",[this._v("企业信息")]),this._v(" "),e("div",{staticClass:"form-title-decorate"})])}]};var u=a("VU/8")(c,f,!1,function(o){a("5twd")},null,null);e.default=u.exports}});
//# sourceMappingURL=5.a29450660bb29b2a963e.js.map
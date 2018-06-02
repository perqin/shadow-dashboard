webpackJsonp([1],{"+VGo":function(t,n){},"/9nU":function(t,n){},0:function(t,n,e){t.exports=e("NHnr")},"7SuA":function(t,n){},HmQy:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});e("Viya");var o=e("/5sW"),i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("mdc-layout-app",[e("mdc-toolbar",{attrs:{slot:"toolbar",fixed:""},slot:"toolbar"},[e("mdc-toolbar-row",[e("mdc-toolbar-section",{attrs:{"align-start":""}},[e("mdc-toolbar-menu-icon",{attrs:{event:"toggle-drawer"}}),e("mdc-toolbar-title",[t._v("Shadow Dashboard")])],1)],1)],1),e("mdc-drawer",{attrs:{slot:"drawer","toggle-on":"toggle-drawer"},slot:"drawer"},[e("mdc-drawer-list",[e("mdc-drawer-item",{attrs:{"start-icon":"dashboard",to:"/"}},[t._v("Home")]),e("mdc-drawer-item",{attrs:{"start-icon":"storage",to:"nodes"}},[t._v("Nodes")]),e("mdc-drawer-item",{attrs:{"start-icon":"cloud",to:"subscriptions"}},[t._v("Subscriptions")]),e("mdc-drawer-item",{attrs:{"start-icon":"settings",to:"settings"}},[t._v("Settings")])],1)],1),e("main",{staticClass:"content"},[e("router-view")],1)],1)],1)},c=[],a=e("XyMi");function s(t){e("+VGo")}var r=null,u=!1,d=s,l=null,f=null,p=Object(a["a"])(r,i,c,u,d,l,f),b=p.exports,h=e("/ocq"),m={name:"home"},g=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"home"},[e("mdc-display",{attrs:{tag:"h1"}},[t._v("Welcome to Shadow Dashboard")])],1)},v=[];function C(t){e("Wy+7")}var w=!1,k=C,S="data-v-6b91a0c3",x=null,_=Object(a["a"])(m,g,v,w,k,S,x),y=_.exports,$=e("NYxO"),N={name:"nodes",computed:Object($["b"])(["nodes"]),methods:{onNodeSwitchChanged:function(t){this.$store.dispatch(t.enabled?"enableNode":"disableNode",t)}},created:function(){this.$store.dispatch("refreshNodes")}},O=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nodes-content"},[e("mdc-list",{attrs:{interactive:""}},t._l(t.nodes,function(n){return e("mdc-list-item",{key:n.id},[t._v("\n      "+t._s(n.remarks&&""!==n.remarks?n.remarks:n.server)+"\n      "),e("div",{attrs:{slot:"end-detail"},slot:"end-detail"},[e("mdc-switch",{attrs:{slot:"end-detail"},on:{change:function(e){t.onNodeSwitchChanged(n)}},slot:"end-detail",model:{value:n.enabled,callback:function(e){t.$set(n,"enabled",e)},expression:"node.enabled"}})],1)])}))],1)},B=[];function D(t){e("bANx")}var E=!1,P=D,A="data-v-69f283ba",j=null,H=Object(a["a"])(N,O,B,E,P,A,j),L=H.exports,T=(e("y9m4"),e("mtWM")),R=e.n(T),U=R.a.create({baseURL:"/"}),V={getConfig:function(){return U("/nodes/config").then(function(t){return t.data})},updateConfig:function(t){return U("/nodes/config",{method:"put",data:t})}},W={createOne:function(t){return U("/subscriptions",{method:"post",data:t}).then(function(t){return t.data})},listAll:function(){return U("/subscriptions").then(function(t){return t.data})},getOne:function(t){return U("/subscriptions/".concat(t)).then(function(t){return t.data})},updateOne:function(t){return U("subscriptions/".concat(t.id),{method:"put",data:t})},updateNodes:function(t){return U("/subscriptions/".concat(t,"/update"),{method:"post"})},deleteOne:function(t){return U("/subscriptions/".concat(t),{method:"delete"})}},M={getConfig:function(){return U("/cow/config").then(function(t){return t.data})},updateConfig:function(t){return U("/cow/config",{method:"put",data:t})}},q={name:"subscriptionDetail",data:function(){return{open:!1,subscription:{},updating:!1}},methods:{show:function(t){this.open=!0,this.subscription={id:t},this.loadSubscription()},loadSubscription:function(){var t=this;this.subscription={id:this.subscription.id,url:""},this.subscription.id&&W.getOne(this.subscription.id).then(function(n){t.subscription=n})},onValidate:function(t){var n=this,e=t.accept;Promise.resolve().then(function(){n.updating=!0}).then(function(){return n.subscription.id?W.updateOne(n.subscription):W.createOne(n.subscription).then(function(t){return n.subscription=t})}).then(function(){n.updating=!1,e(),n.$store.commit("insertOrUpdateSubscription",n.subscription)}).catch(function(t){n.updating=!1})}}},F=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("mdc-dialog",{attrs:{title:"Subscription detail",accept:"Save",cancel:"Discard"},on:{validate:t.onValidate},model:{value:t.open,callback:function(n){t.open=n},expression:"open"}},[e("form",{staticClass:"detail-form"},[e("mdc-textfield",{attrs:{label:"URL",fullwidth:""},model:{value:t.subscription.url,callback:function(n){t.$set(t.subscription,"url",n)},expression:"subscription.url"}})],1)])],1)},G=[];function I(t){e("HmQy")}var K=!1,Q=I,J="data-v-31234216",X=null,Y=Object(a["a"])(q,F,G,K,Q,J,X),z=Y.exports,Z={name:"subscriptions",components:{SubscriptionDetail:z},data:function(){return{}},computed:Object($["b"])({subscriptions:"subscriptions"}),created:function(){this.$store.dispatch("refreshSubscriptions")},methods:{onEditButtonClick:function(t){this.$refs.subscriptionDetailDialog.show(t)},onAddFabClick:function(){this.$refs.subscriptionDetailDialog.show(null)},onRefreshButtonClick:function(t){this.$store.dispatch("refreshSubscriptionNodes",t)},onDeleteButtonClick:function(t){this.$store.dispatch("removeSubscription",t)}}},tt=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"subscription-content"},[e("mdc-list",{attrs:{interactive:""}},t._l(t.subscriptions,function(n){return e("mdc-list-item",{key:n.id},[t._v("\n      "+t._s(n.url)+"\n      "),e("div",{attrs:{slot:"end-detail"},slot:"end-detail"},[e("div",{staticClass:"list-item-actions-container"},[e("mdc-button",{attrs:{disabled:n.refreshing},on:{click:function(e){t.onRefreshButtonClick(n.id)}}},[t._v("\n            "+t._s(n.refreshing?"Refreshing":"Refresh")+"\n          ")]),e("mdc-button",{attrs:{disabled:n.refreshing},on:{click:function(e){t.onEditButtonClick(n.id)}}},[t._v("Edit")]),e("mdc-button",{attrs:{disabled:n.refreshing},on:{click:function(e){t.onDeleteButtonClick(n.id)}}},[t._v("Delete")])],1)])])})),e("mdc-fab",{attrs:{fixed:"",icon:"add"},on:{click:t.onAddFabClick}}),e("SubscriptionDetail",{ref:"subscriptionDetailDialog"})],1)},nt=[];function et(t){e("/9nU")}var ot=!1,it=et,ct="data-v-a0ec1a8a",at=null,st=Object(a["a"])(Z,tt,nt,ot,it,ct,at),rt=st.exports,ut={name:"settings",data:function(){return{loadBalance:"",cowConfigLoadBalanceOptions:[{value:"backup",title:"Backup"},{value:"hash",title:"Hash"},{value:"latency",title:"Latency"}],cowConfig:{enabled:!1,executablePath:"",listen:"",loadBalance:"hash"},nodesConfig:{executablePath:""}}},created:function(){var t=this;M.getConfig().then(function(n){t.cowConfig=n}),V.getConfig().then(function(n){t.nodesConfig=n})},methods:{onCowConfigSaveClick:function(){var t=this;M.updateConfig(this.cowConfig).then(function(){t.$refs.snackbar.show({message:"Changes saved."})})},onNodesConfigSaveClick:function(){var t=this;V.updateConfig(this.nodesConfig).then(function(){t.$refs.snackbar.show({message:"Changes saved."})})}}},dt=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("mdc-layout-grid",[e("mdc-layout-cell",{attrs:{desktop:6}},[e("mdc-card",[e("mdc-card-header",{attrs:{title:"Cow Settings",subtitle:"COW is a HTTP proxy to simplify bypassing the great firewall."}}),e("mdc-card-text",[e("form",[e("mdc-switch",{attrs:{label:"Enabled"},model:{value:t.cowConfig.enabled,callback:function(n){t.$set(t.cowConfig,"enabled",n)},expression:"cowConfig.enabled"}}),e("mdc-textfield",{attrs:{label:"Executable"},model:{value:t.cowConfig.executablePath,callback:function(n){t.$set(t.cowConfig,"executablePath",n)},expression:"cowConfig.executablePath"}}),e("mdc-textfield",{attrs:{label:"Listening HTTP address"},model:{value:t.cowConfig.listen,callback:function(n){t.$set(t.cowConfig,"listen",n)},expression:"cowConfig.listen"}}),e("mdc-select",{attrs:{label:"Load balance"},model:{value:t.cowConfig.loadBalance,callback:function(n){t.$set(t.cowConfig,"loadBalance",n)},expression:"cowConfig.loadBalance"}},t._l(t.cowConfigLoadBalanceOptions,function(n){return e("option",{key:n.value,domProps:{value:n.value}},[t._v(t._s(n.title))])}))],1)]),e("mdc-card-actions",[e("mdc-card-action-buttons",[e("mdc-card-action-button",{on:{click:function(n){t.onCowConfigSaveClick()}}},[t._v("Save")])],1),e("mdc-card-action-icons",[e("a",{attrs:{href:"https://github.com/cyfdecyf/cow/blob/master/doc/sample-config/rc",target:"_blank"}},[e("mdc-card-action-icon",{attrs:{icon:"help"}})],1)])],1)],1)],1),e("mdc-layout-cell",{attrs:{desktop:6}},[e("mdc-card",[e("mdc-card-header",{attrs:{title:"Nodes Settings"}}),e("mdc-card-text",[e("form",[e("mdc-textfield",{attrs:{label:"Executable"},model:{value:t.nodesConfig.executablePath,callback:function(n){t.$set(t.nodesConfig,"executablePath",n)},expression:"nodesConfig.executablePath"}})],1)]),e("mdc-card-actions",[e("mdc-card-action-buttons",[e("mdc-card-action-button",{on:{click:function(n){t.onNodesConfigSaveClick()}}},[t._v("Save")])],1)],1)],1)],1)],1),e("mdc-snackbar",{ref:"snackbar"})],1)},lt=[];function ft(t){e("u5Kt")}var pt=!1,bt=ft,ht="data-v-0b74812d",mt=null,gt=Object(a["a"])(ut,dt,lt,pt,bt,ht,mt),vt=gt.exports;o["a"].use(h["a"]);var Ct=new h["a"]({routes:[{path:"/",name:"home",component:y},{path:"/nodes",name:"nodes",component:L},{path:"/subscriptions",name:"subscriptions",component:rt},{path:"/settings",name:"settings",component:vt}]}),wt=e("Biqn"),kt=e.n(wt);o["a"].use($["a"]);var St="http://localhost:4566",xt=new $["a"].Store({state:{nodes:[],subscriptions:[]},mutations:{updateNodes:function(t,n){t.nodes=n},updateSubscriptions:function(t,n){t.subscriptions=n},updateSubscription:function(t,n){var e,o=-1;t.subscriptions.forEach(function(t,i){t.id===n.id&&(o=i,e=kt()({},t,n))}),-1!==o&&t.subscriptions.splice(o,1,e)},insertOrUpdateSubscription:function(t,n){var e,o=-1;t.subscriptions.forEach(function(t,i){t.id===n.id&&(o=i,e=kt()({},t,n))}),-1!==o?t.subscriptions.splice(o,1,e):t.subscriptions.push(n)},deleteSubscription:function(t,n){var e=-1;t.subscriptions.forEach(function(t,o){t.id===n&&(e=o)}),-1!==e&&t.subscriptions.splice(e,1)}},actions:{refreshNodes:function(t){var n=t.commit;R.a.get("".concat(St,"/nodes")).then(function(t){n("updateNodes",t.data)}).catch(function(t){return console.error(t)})},enableNode:function(t,n){t.commit;R.a.put("".concat(St,"/nodes/").concat(n.id,"/enabled"),{enabled:!0}).then(function(t){}).catch(function(t){return console.error(t)})},disableNode:function(t,n){t.commit;R.a.put("".concat(St,"/nodes/").concat(n.id,"/enabled"),{enabled:!1}).then(function(t){}).catch(function(t){return console.error(t)})},refreshSubscriptions:function(t){var n=t.commit;W.listAll().then(function(t){n("updateSubscriptions",t)})},refreshSubscriptionNodes:function(t,n){var e=t.commit;Promise.resolve().then(function(){e("updateSubscription",{id:n,refreshing:!0})}).then(function(){return W.updateNodes(n)}).then(function(){e("updateSubscription",{id:n,refreshing:!1})})},removeSubscription:function(t,n){var e=t.commit;W.deleteOne(n).then(function(){e("deleteSubscription",n)})}}}),_t=e("n6Cl");e("uMhA"),e("uTBe"),e("7SuA"),e("hd1I");o["a"].use(_t["a"]),o["a"].config.productionTip=!1,new o["a"]({router:Ct,store:xt,render:function(t){return t(b)}}).$mount("#app")},Viya:function(t,n){},"Wy+7":function(t,n){},bANx:function(t,n){},hd1I:function(t,n){},u5Kt:function(t,n){},uMhA:function(t,n){},uTBe:function(t,n){}},[0]);
//# sourceMappingURL=app.7f8f8f9d.js.map
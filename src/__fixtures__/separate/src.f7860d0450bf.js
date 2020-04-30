function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return"function"==typeof e}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function not_equal(e,t){return e!=e?t==t:e!==t}function append(e,t){e.appendChild(t)}function insert(e,t,n){e.insertBefore(t,n||null)}function detach(e){e.parentNode.removeChild(e)}function destroy_each(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function element(e){return document.createElement(e)}function svg_element(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function listen(e,t,n,c){return e.addEventListener(t,n,c),()=>e.removeEventListener(t,n,c)}function attr(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function children(e){return Array.from(e.childNodes)}function claim_element(e,t,n,c){for(let c=0;c<e.length;c+=1){const r=e[c];if(r.nodeName===t){let t=0;for(;t<r.attributes.length;){const e=r.attributes[t];n[e.name]?t++:r.removeAttribute(e.name)}return e.splice(c,1)[0]}}return c?svg_element(t):element(t)}function claim_text(e,t){for(let n=0;n<e.length;n+=1){const c=e[n];if(3===c.nodeType)return c.data=""+t,e.splice(n,1)[0]}return text(t)}function claim_space(e){return claim_text(e," ")}function set_data(e,t){t=""+t,e.data!==t&&(e.data=t)}function query_selector_all(e,t=document.body){return Array.from(t.querySelectorAll(e))}let current_component;function set_current_component(e){current_component=e}const dirty_components=[],binding_callbacks=[],render_callbacks=[],flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}let flushing=!1;const seen_callbacks=new Set;function flush(){if(!flushing){flushing=!0;do{for(let e=0;e<dirty_components.length;e+=1){const t=dirty_components[e];set_current_component(t),update(t.$$)}for(dirty_components.length=0;binding_callbacks.length;)binding_callbacks.pop()();for(let e=0;e<render_callbacks.length;e+=1){const t=render_callbacks[e];seen_callbacks.has(t)||(seen_callbacks.add(t),t())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,flushing=!1,seen_callbacks.clear()}}function update(e){if(null!==e.fragment){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}const outroing=new Set;let outros;function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function transition_out(e,t,n,c){if(e&&e.o){if(outroing.has(e))return;outroing.add(e),outros.c.push(()=>{outroing.delete(e),c&&(n&&e.d(1),c())}),e.o(t)}}function create_component(e){e&&e.c()}function claim_component(e,t){e&&e.l(t)}function mount_component(e,t,n){const{fragment:c,on_mount:r,on_destroy:a,after_update:o}=e.$$;c&&c.m(t,n),add_render_callback(()=>{const t=r.map(run).filter(is_function);a?a.push(...t):run_all(t),e.$$.on_mount=[]}),o.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;null!==n.fragment&&(run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){-1===e.$$.dirty[0]&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,c,r,a,o=[-1]){const l=current_component;set_current_component(e);const s=t.props||{},i=e.$$={fragment:null,ctx:null,props:a,update:noop,not_equal:r,bound:blank_object(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:blank_object(),dirty:o};let u=!1;if(i.ctx=n?n(e,s,(t,n,...c)=>{const a=c.length?c[0]:n;return i.ctx&&r(i.ctx[t],i.ctx[t]=a)&&(i.bound[t]&&i.bound[t](a),u&&make_dirty(e,t)),n}):[],i.update(),u=!0,run_all(i.before_update),i.fragment=!!c&&c(i.ctx),t.target){if(t.hydrate){const e=children(t.target);i.fragment&&i.fragment.l(e),e.forEach(detach)}else i.fragment&&i.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor),flush()}set_current_component(l)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}function create_fragment(e){let t,n;return{c(){t=element("header"),n=text("header")},l(e){t=claim_element(e,"HEADER",{});var c=children(t);n=claim_text(c,"header"),c.forEach(detach)},m(e,c){insert(e,t,c),append(t,n)},p:noop,i:noop,o:noop,d(e){e&&detach(t)}}}class Header extends SvelteComponent{constructor(e){super(),init(this,e,null,create_fragment,safe_not_equal,{})}}function get_each_context(e,t,n){const c=e.slice();return c[3]=t[n],c}function get_each_context_1(e,t,n){const c=e.slice();return c[3]=t[n],c}function create_each_block_1(e){let t,n;return{c(){t=element("li"),n=text(e[3]),this.h()},l(c){t=claim_element(c,"LI",{class:!0});var r=children(t);n=claim_text(r,e[3]),r.forEach(detach),this.h()},h(){attr(t,"class","svelte-w1q41y")},m(e,c){insert(e,t,c),append(t,n)},p:noop,d(e){e&&detach(t)}}}function create_each_block(e){let t,n,c=e[3]+"";return{c(){t=element("li"),n=text(c),this.h()},l(e){t=claim_element(e,"LI",{class:!0});var r=children(t);n=claim_text(r,c),r.forEach(detach),this.h()},h(){attr(t,"class","svelte-w1q41y")},m(e,c){insert(e,t,c),append(t,n)},p(e,t){2&t&&c!==(c=e[3]+"")&&set_data(n,c)},d(e){e&&detach(t)}}}function create_fragment$1(e){let t,n,c,r,a,o,l,s,i,u,d,_,m,f,h,p;const g=new Header({});let b=[0,1,2],y=[];for(let t=0;t<3;t+=1)y[t]=create_each_block_1(get_each_context_1(e,b,t));let $=e[1],x=[];for(let t=0;t<$.length;t+=1)x[t]=create_each_block(get_each_context(e,$,t));return{c(){t=space(),create_component(g.$$.fragment),n=space(),c=element("button"),r=text("Increment"),a=space(),o=element("h1"),l=text("Count: "),s=text(e[0]),i=space(),u=element("ul"),d=text("Static, pre-rendered list ");for(let e=0;e<3;e+=1)y[e].c();_=space(),m=element("ul"),f=text("Dynamic list ");for(let e=0;e<x.length;e+=1)x[e].c();this.h()},l(h){query_selector_all('[data-svelte="svelte-1g0blys"]',document.head).forEach(detach),t=claim_space(h),claim_component(g.$$.fragment,h),n=claim_space(h),c=claim_element(h,"BUTTON",{});var p=children(c);r=claim_text(p,"Increment"),p.forEach(detach),a=claim_space(h),o=claim_element(h,"H1",{class:!0});var b=children(o);l=claim_text(b,"Count: "),s=claim_text(b,e[0]),b.forEach(detach),i=claim_space(h),u=claim_element(h,"UL",{class:!0});var $=children(u);d=claim_text($,"Static, pre-rendered list ");for(let e=0;e<3;e+=1)y[e].l($);$.forEach(detach),_=claim_space(h),m=claim_element(h,"UL",{class:!0});var k=children(m);f=claim_text(k,"Dynamic list ");for(let e=0;e<x.length;e+=1)x[e].l(k);k.forEach(detach),this.h()},h(){document.title="Page title2",attr(o,"class","svelte-w1q41y"),attr(u,"class","svelte-w1q41y"),attr(m,"class","svelte-w1q41y")},m(b,$,k){insert(b,t,$),mount_component(g,b,$),insert(b,n,$),insert(b,c,$),append(c,r),insert(b,a,$),insert(b,o,$),append(o,l),append(o,s),insert(b,i,$),insert(b,u,$),append(u,d);for(let e=0;e<3;e+=1)y[e].m(u,null);insert(b,_,$),insert(b,m,$),append(m,f);for(let e=0;e<x.length;e+=1)x[e].m(m,null);h=!0,k&&p(),p=listen(c,"click",e[2])},p(e,[t]){if((!h||1&t)&&set_data(s,e[0]),2&t){let n;for($=e[1],n=0;n<$.length;n+=1){const c=get_each_context(e,$,n);x[n]?x[n].p(c,t):(x[n]=create_each_block(c),x[n].c(),x[n].m(m,null))}for(;n<x.length;n+=1)x[n].d(1);x.length=$.length}},i(e){h||(transition_in(g.$$.fragment,e),h=!0)},o(e){transition_out(g.$$.fragment,e),h=!1},d(e){e&&detach(t),destroy_component(g,e),e&&detach(n),e&&detach(c),e&&detach(a),e&&detach(o),e&&detach(i),e&&detach(u),destroy_each(y,e),e&&detach(_),e&&detach(m),destroy_each(x,e),p()}}}function instance(e,t,n){let c=0;let r;return e.$$.update=()=>{1&e.$$.dirty&&n(1,r=Array.from({length:c},(e,t)=>t))},[c,r,()=>{n(0,c++,c)}]}class Component extends SvelteComponent{constructor(e){super(),init(this,e,instance,create_fragment$1,not_equal,{})}}new Component({target:document.body,hydrate:!0});
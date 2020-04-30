function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return"function"==typeof e}function not_equal(e,t){return e!=e?t==t:e!==t}function append(e,t){e.appendChild(t)}function insert(e,t,n){e.insertBefore(t,n||null)}function detach(e){e.parentNode.removeChild(e)}function destroy_each(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function element(e){return document.createElement(e)}function svg_element(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function listen(e,t,n,c){return e.addEventListener(t,n,c),()=>e.removeEventListener(t,n,c)}function attr(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function children(e){return Array.from(e.childNodes)}function claim_element(e,t,n,c){for(let c=0;c<e.length;c+=1){const a=e[c];if(a.nodeName===t){let t=0;for(;t<a.attributes.length;){const e=a.attributes[t];n[e.name]?t++:a.removeAttribute(e.name)}return e.splice(c,1)[0]}}return c?svg_element(t):element(t)}function claim_text(e,t){for(let n=0;n<e.length;n+=1){const c=e[n];if(3===c.nodeType)return c.data=""+t,e.splice(n,1)[0]}return text(t)}function claim_space(e){return claim_text(e," ")}function set_data(e,t){t=""+t,e.data!==t&&(e.data=t)}function query_selector_all(e,t=document.body){return Array.from(t.querySelectorAll(e))}let current_component;function set_current_component(e){current_component=e}const dirty_components=[],binding_callbacks=[],render_callbacks=[],flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}let flushing=!1;const seen_callbacks=new Set;function flush(){if(!flushing){flushing=!0;do{for(let e=0;e<dirty_components.length;e+=1){const t=dirty_components[e];set_current_component(t),update(t.$$)}for(dirty_components.length=0;binding_callbacks.length;)binding_callbacks.pop()();for(let e=0;e<render_callbacks.length;e+=1){const t=render_callbacks[e];seen_callbacks.has(t)||(seen_callbacks.add(t),t())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,flushing=!1,seen_callbacks.clear()}}function update(e){if(null!==e.fragment){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}const outroing=new Set;function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function mount_component(e,t,n){const{fragment:c,on_mount:a,on_destroy:r,after_update:l}=e.$$;c&&c.m(t,n),add_render_callback(()=>{const t=a.map(run).filter(is_function);r?r.push(...t):run_all(t),e.$$.on_mount=[]}),l.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;null!==n.fragment&&(run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){-1===e.$$.dirty[0]&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,c,a,r,l=[-1]){const o=current_component;set_current_component(e);const s=t.props||{},i=e.$$={fragment:null,ctx:null,props:r,update:noop,not_equal:a,bound:blank_object(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(o?o.$$.context:[]),callbacks:blank_object(),dirty:l};let u=!1;if(i.ctx=n?n(e,s,(t,n,...c)=>{const r=c.length?c[0]:n;return i.ctx&&a(i.ctx[t],i.ctx[t]=r)&&(i.bound[t]&&i.bound[t](r),u&&make_dirty(e,t)),n}):[],i.update(),u=!0,run_all(i.before_update),i.fragment=!!c&&c(i.ctx),t.target){if(t.hydrate){const e=children(t.target);i.fragment&&i.fragment.l(e),e.forEach(detach)}else i.fragment&&i.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor),flush()}set_current_component(o)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}function get_each_context(e,t,n){const c=e.slice();return c[3]=t[n],c}function get_each_context_1(e,t,n){const c=e.slice();return c[3]=t[n],c}function create_each_block_1(e){let t,n;return{c(){t=element("li"),n=text(e[3]),this.h()},l(c){t=claim_element(c,"LI",{class:!0});var a=children(t);n=claim_text(a,e[3]),a.forEach(detach),this.h()},h(){attr(t,"class","svelte-w1q41y")},m(e,c){insert(e,t,c),append(t,n)},p:noop,d(e){e&&detach(t)}}}function create_each_block(e){let t,n,c=e[3]+"";return{c(){t=element("li"),n=text(c),this.h()},l(e){t=claim_element(e,"LI",{class:!0});var a=children(t);n=claim_text(a,c),a.forEach(detach),this.h()},h(){attr(t,"class","svelte-w1q41y")},m(e,c){insert(e,t,c),append(t,n)},p(e,t){2&t&&c!==(c=e[3]+"")&&set_data(n,c)},d(e){e&&detach(t)}}}function create_fragment(e){let t,n,c,a,r,l,o,s,i,u,d,_,h,m,f,p=[0,1,2],g=[];for(let t=0;t<3;t+=1)g[t]=create_each_block_1(get_each_context_1(e,p,t));let b=e[1],y=[];for(let t=0;t<b.length;t+=1)y[t]=create_each_block(get_each_context(e,b,t));return{c(){t=space(),n=element("header"),c=element("button"),a=text("Increment"),r=space(),l=element("h1"),o=text("Count: "),s=text(e[0]),i=space(),u=element("ul"),d=text("Static, pre-rendered list ");for(let e=0;e<3;e+=1)g[e].c();_=space(),h=element("ul"),m=text("Dynamic list ");for(let e=0;e<y.length;e+=1)y[e].c();this.h()},l(f){query_selector_all('[data-svelte="svelte-1gnwn0a"]',document.head).forEach(detach),t=claim_space(f),n=claim_element(f,"HEADER",{});var p=children(n);c=claim_element(p,"BUTTON",{});var b=children(c);a=claim_text(b,"Increment"),b.forEach(detach),r=claim_space(p),l=claim_element(p,"H1",{class:!0});var x=children(l);o=claim_text(x,"Count: "),s=claim_text(x,e[0]),x.forEach(detach),i=claim_space(p),u=claim_element(p,"UL",{class:!0});var k=children(u);d=claim_text(k,"Static, pre-rendered list ");for(let e=0;e<3;e+=1)g[e].l(k);k.forEach(detach),_=claim_space(p),h=claim_element(p,"UL",{class:!0});var $=children(h);m=claim_text($,"Dynamic list ");for(let e=0;e<y.length;e+=1)y[e].l($);$.forEach(detach),p.forEach(detach),this.h()},h(){document.title="Page title",attr(l,"class","svelte-w1q41y"),attr(u,"class","svelte-w1q41y"),attr(h,"class","svelte-w1q41y")},m(p,b,x){insert(p,t,b),insert(p,n,b),append(n,c),append(c,a),append(n,r),append(n,l),append(l,o),append(l,s),append(n,i),append(n,u),append(u,d);for(let e=0;e<3;e+=1)g[e].m(u,null);append(n,_),append(n,h),append(h,m);for(let e=0;e<y.length;e+=1)y[e].m(h,null);x&&f(),f=listen(c,"click",e[2])},p(e,[t]){if(1&t&&set_data(s,e[0]),2&t){let n;for(b=e[1],n=0;n<b.length;n+=1){const c=get_each_context(e,b,n);y[n]?y[n].p(c,t):(y[n]=create_each_block(c),y[n].c(),y[n].m(h,null))}for(;n<y.length;n+=1)y[n].d(1);y.length=b.length}},i:noop,o:noop,d(e){e&&detach(t),e&&detach(n),destroy_each(g,e),destroy_each(y,e),f()}}}function instance(e,t,n){let c=0;let a;return e.$$.update=()=>{1&e.$$.dirty&&n(1,a=Array.from({length:c},(e,t)=>t))},[c,a,()=>{n(0,c++,c)}]}class Component2 extends SvelteComponent{constructor(e){super(),init(this,e,instance,create_fragment,not_equal,{})}}new Component2({target:document.body,hydrate:!0});
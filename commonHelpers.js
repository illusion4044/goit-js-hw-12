import{a as f,i as a,S as b}from"./assets/vendor-eded45c0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const L=t=>t.map(({webformatURL:s,largeImageURL:i,tags:r,likes:e})=>`
          <div class="col gallery-item">
            <div class="card shadow-sm">
              <a href="${i}" class="gallery-link">
                <img src="${s}" alt="${r}" class="gallery-img img-fluid" />
              </a>
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-body-secondary">Likes: ${e}</small>
                </div>
              </div>
            </div>
          </div>`).join(""),w="43813609-98f1a5b8a61f7cd1a2ca10379",v="https://pixabay.com/api/",g=async(t="cat",s=1,i=15)=>{const r=new URLSearchParams({key:w,q:t,orientation:"horizontal",page:s,per_page:i});try{return(await f.get(`${v}?${r.toString()}`)).data}catch(e){throw new Error(`Error ${e.response.status}: ${e.response.statusText}`)}},E=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),l=document.querySelector(".js-load-more"),u=document.querySelector(".js-loader");let m,d="",n=1,y=0;const S=async t=>{if(t.preventDefault(),d=t.target.elements.searchKeyword.value.trim(),d===""){c.innerHTML="",t.target.reset(),a.show({message:"Input field cannot be empty",position:"topRight",timeout:2e3,color:"red"});return}n=1,c.innerHTML="",l.classList.add("is-hidden"),u.classList.remove("is-hidden");try{const s=await g(d,n);y=Math.ceil(s.totalHits/15),p(s)}catch(s){console.error("Error fetching photos:",s),a.show({message:"An error occurred while fetching photos",position:"topRight",timeout:2e3,color:"red"})}finally{u.classList.add("is-hidden")}},M=async()=>{u.classList.remove("is-hidden");try{const t=await g(d,n+1);p(t,!0),n+=1,n>=y&&(l.classList.add("is-hidden"),a.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"blue"}))}catch(t){console.error("Error fetching photos:",t),a.show({message:"An error occurred while fetching photos",position:"topRight",timeout:2e3,color:"red"})}finally{u.classList.add("is-hidden")}},p=(t,s=!1)=>{if(!t.hits||t.hits.length===0){a.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"red"}),c.innerHTML="";return}const i=L(t.hits);s?c.insertAdjacentHTML("beforeend",i):c.innerHTML=i,m&&m.destroy(),m=new b(".js-gallery a",{captionDelay:250}),n>=y?(l.classList.add("is-hidden"),a.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"blue"})):l.classList.remove("is-hidden");const r=document.querySelectorAll(".gallery-item");if(r.length>0){const e=r[0].getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}};E.addEventListener("submit",S);l.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map

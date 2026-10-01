const box=document.querySelector('.lightbox'), full=box.querySelector('img');

document.querySelectorAll('.grid img').forEach(img=>img.addEventListener('click',()=>{
  full.src=img.src;
  box.classList.add('open');
  box.setAttribute('aria-hidden','false');
}));

function close(){
  box.classList.remove('open');
  box.setAttribute('aria-hidden','true');
  full.src='';
}

box.querySelector('button').onclick=close;
box.addEventListener('click',e=>{if(e.target===box)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

// Scroll reveal: images softly fade in and rise when entering view,
// then fade out again when they leave the viewport so the effect can replay.
const galleryImages=[...document.querySelectorAll('.grid img')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(!reduceMotion && 'IntersectionObserver' in window){
  document.body.classList.add('reveal-ready');
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      }else{
        entry.target.classList.remove('is-visible');
      }
    });
  },{threshold:0.14,rootMargin:'-4% 0px -8% 0px'});

  galleryImages.forEach((img,index)=>{
    img.style.transitionDelay=`${(index%2)*120}ms`;
    observer.observe(img);
  });
}


(() => {
 const video=document.querySelector('#process-video');
 const button=document.querySelector('.film-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let userPaused=false;
 const sync=()=>{button.textContent=video.paused?'▶':'Ⅱ';button.setAttribute('aria-label',video.paused?'Включить видео':'Приостановить видео');};
 const play=()=>video.play().catch(sync);
 video.addEventListener('play',sync);video.addEventListener('pause',sync);
 button.addEventListener('click',()=>{userPaused=!video.paused;if(video.paused){play();}else{video.pause();}});
 const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting){video.pause();}else if(!userPaused&&!reduced.matches&&!document.hidden){play();}},{threshold:.15});observer.observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();}else if(!userPaused&&!reduced.matches){play();}});
 reduced.addEventListener('change',()=>{if(reduced.matches)video.pause();else if(!userPaused)play();});
 if(!reduced.matches)play();
})();

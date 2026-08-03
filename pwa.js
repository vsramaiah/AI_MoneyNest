(function(){
  if ("serviceWorker" in navigator && !location.hostname.includes("claudeusercontent.com")) {
    let waitingServiceWorker=null;
    const updateBanner=document.getElementById("updateBanner");
    const updateReloadBtn=document.getElementById("updateReloadBtn");
    const showUpdateBanner=(worker)=>{
      waitingServiceWorker=worker;
      if(updateBanner) updateBanner.classList.add("on");
    };

    let refreshingForUpdate=false;
    let serviceWorkerRegistration=null;

    navigator.serviceWorker.register("service-worker.js", { scope: "./" })
      .then((registration) => {
        serviceWorkerRegistration=registration;
        if(registration.waiting) showUpdateBanner(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const newWorker=registration.installing;
          if(!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if(newWorker.state==="installed" && navigator.serviceWorker.controller){
              showUpdateBanner(newWorker);
            }
          });
        });
      })
      .catch((err) => console.warn("SW registration failed", err));

    if(updateReloadBtn){
      updateReloadBtn.addEventListener("click", async () => {
        updateReloadBtn.disabled=true;
        updateReloadBtn.textContent="Refreshing...";
        try{
          const registration=serviceWorkerRegistration || await navigator.serviceWorker.getRegistration();
          if(registration) await registration.update();
          const worker=waitingServiceWorker || registration?.waiting || registration?.installing;
          if(worker){
            worker.postMessage({type:"SKIP_WAITING"});
            setTimeout(()=>location.reload(),1200);
            return;
          }
          location.reload();
        }catch(err){
          console.warn("Update refresh failed",err);
          location.reload();
        }
      });
    }

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if(refreshingForUpdate) return;
      refreshingForUpdate=true;
      location.reload();
    });
  }

  let deferredPrompt;
  const installBtn=document.getElementById("installBtn");
  const isStandalone=(typeof window.matchMedia==='function'&&window.matchMedia("(display-mode: standalone)").matches)||window.navigator.standalone===true;

  if(installBtn&&isStandalone){
    installBtn.style.display="none";
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(installBtn&&!isStandalone) installBtn.style.display = "block";
  });

  if(installBtn){
    installBtn.addEventListener("click", () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
          installBtn.style.display="none";
        });
      }else if(isStandalone){
        toast("App already installed");
      }else{
        toast("Install prompt is not available on this device yet");
      }
    });
  }

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if(installBtn) installBtn.style.display = "none";
    toast("MoneyNest installed");
  });

  window.addEventListener("online", () => {
    setDot("on");
    toast("Back online");
  });

  window.addEventListener("offline", () => {
    setDot("off");
    toast("You are offline");
  });

  setDot(navigator.onLine===false?"off":"on");
})();

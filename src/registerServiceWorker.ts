if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'DEVELOPMENT') {
  window.addEventListener('load', async () => {
    // register the service worker from the file specified
    const registration = await navigator.serviceWorker.register('/service-worker.js');

    // ensure the case when the updatefound event was missed is also handled
    // by re-invoking the prompt when there's a waiting Service Worker
    if (registration.waiting) {
    //   Show notification: app is ready to update
    }

    // detect Service Worker update available and wait for it to become installed
    registration.addEventListener('updatefound', () => {
      if (registration.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        registration.installing.addEventListener('statechange', () => {
          if (registration.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              //   Show notification: app is ready to update
            } 
            // else {
            //   // otherwise it's the first install, nothing to do
            //   console.log('Service Worker initialized for the first time')
            // }
          }
        });
      }
    });
  }); 
}
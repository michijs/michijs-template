import { trustedTypePolicy } from "@michijs/michijs";
import { skipWaitingMessage } from "@michijs/default-service-worker/utils";

export const registerServiceWorker = async (): Promise<void> => {
  if (
    michiProcess.env.NODE_ENV !== "DEVELOPMENT" &&
    "serviceWorker" in navigator
  ) {
    // Doesnt work properly on android - only on web
    // register the service worker from the file specified
    const registration = await navigator.serviceWorker.register(
      trustedTypePolicy.createScriptURL(
        "/service-worker.js",
      ) as unknown as string,
    );

    // ensure the case when the updatefound event was missed is also handled
    // by re-invoking the prompt when there's a waiting Service Worker
    if (registration.waiting) {
      // Update found - do something here to notify
      registration.waiting.postMessage(skipWaitingMessage());
    }

    // detect Service Worker update available and wait for it to become installed
    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        // wait until the new Service worker is actually installed (ready to take over)
        installingWorker.addEventListener("statechange", () => {
          if (registration.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              // Update found - do something here to notify
              installingWorker.postMessage(skipWaitingMessage());
            }
            // else {
            //   // otherwise it's the first install, nothing to do
            //   console.log('Service Worker initialized for the first time')
            // }
          }
        });
      }
    });
  }
};

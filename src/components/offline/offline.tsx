import {
  component$,
  sync$,
  useOnWindow,
  useVisibleTask$,
} from "@qwik.dev/core";

export const PreloadOffline = component$(() => {
  console.log("PRELOAD OFFLINE");

  useVisibleTask$(() => {
    console.log("VISIBLE TASK");
  });

  useOnWindow(
    "load",
    sync$(() => {
      console.log("DOMContentLoaded");
      const stateScript = document.querySelector('script[type="qwik/state"]');
      if (stateScript?.textContent) {
        const state = JSON.parse(stateScript.textContent);
        const qChunks = new Set<string>();

        // Updated regex to find chunks in the format "q-XXXXXXXX.js"
        JSON.stringify(state).replace(/q-[A-Za-z0-9_]+\.js/g, (match) => {
          qChunks.add(match);
          return match;
        });

        // Append link tags to head
        console.log(qChunks);
        qChunks.forEach((chunk) => {
          const link = document.createElement("link");
          link.rel = "modulepreload";
          link.href = "build/" + chunk;
          link.fetchPriority = "low";
          document.head.appendChild(link);
        });
      }
    })
  );

  return <></>;
});

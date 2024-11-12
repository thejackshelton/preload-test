import { component$, useSignal, useTask$ } from "@qwik.dev/core";
import { QwikManifest } from "@qwik.dev/core/optimizer";
import { useLocation } from "@qwik.dev/router";

export const PreloadOffline = component$(() => {
  const location = useLocation();
  const bundles = useSignal<string[]>([]);
  useTask$(async () => {
    const res = await fetch(location.url.origin + "/q-manifest.json");
    const manifest: QwikManifest = await res.json();
    bundles.value = Object.keys(manifest.bundles);
  });
  return (
    <>
      {bundles.value.map((bundle) => (
        <link
          key={bundle}
          rel="modulepreload"
          href={"build/" + bundle}
          fetchPriority="low"
        />
      ))}
    </>
  );
});

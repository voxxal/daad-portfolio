<script lang="ts">
  import type { SingleManifestEntry } from "$lib/manifest";
  const { mf, unit }: { mf: SingleManifestEntry; unit: string } = $props();
</script>

<div class="mb-32">
  <hr />
  <h1 class="text-6xl">{mf.name || unit}</h1>
  <a href={`/images/q2/${unit}/${mf.work}`}
    ><img
      class="w-full border border-black border-solid"
      src={`/images/q2/${unit}/${mf.work}`}
      alt="Page"
    /></a
  >
</div>

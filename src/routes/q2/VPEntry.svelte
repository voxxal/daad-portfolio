<script lang="ts">
  import type { VPManifestEntry } from "$lib/manifest";
  import Portrait from "./Portrait.svelte";
  const { mf, unit }: { mf: VPManifestEntry; unit: string } = $props();
</script>

<div class="mb-32">
  <hr />
  <h1 class="text-6xl">{mf.name || unit}</h1>
  <div
    class="grid gap-4"
    style="grid-template-columns: repeat({mf.works.length}, minmax(0, 1fr))"
  >
    {#each mf.works as img}
      <Portrait path={img}/>
    {/each}
  </div>
</div>

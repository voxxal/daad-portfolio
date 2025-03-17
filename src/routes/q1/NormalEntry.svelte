<script lang="ts">
  import type { NormalManifestEntry } from "$lib/manifest";
  const { mf, unit }: { mf: NormalManifestEntry; unit: string } = $props();
</script>

<div class="mb-32">
  <hr />
  <h1 class="text-6xl">{mf.name || unit}</h1>
  {#if mf.selected}
    <h3>Selected Pieces</h3>
    <div
      class="grid gap-4"
      style="grid-template-columns: repeat({mf.selected
        .length}, minmax(0, 1fr))"
    >
      {#each mf.selected as img}
        {@const path = `/images/${unit}/${img}`}
        <a href={path}
          ><img
            class="w-full border border-black border-solid"
            src={path}
            alt={img}
          /></a
        >
      {/each}
    </div>
  {/if}

  <h3>All Work</h3>
  <div class="grid grid-cols-9 gap-4">
    {#each mf.works as img}
      {@const path = `/images/${unit}/${img}`}
      <a href={path}
        ><img
          class="w-full border border-black border-solid"
          src={path}
          alt={img}
        /></a
      >
    {/each}
  </div>
  {#if mf.sources}
    {@const entries = Object.entries(mf.sources)}
    <div>
      <p>
        <strong>Sources:</strong>
        {#each entries as [name, source], i}
          <a href={source}>{name}</a>{#if i != entries.length - 1}{`, `}{/if}
        {/each}
      </p>
    </div>
  {/if}
</div>

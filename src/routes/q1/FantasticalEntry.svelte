<script lang="ts">
  import type { FantasticalManifestEntry } from "$lib/manifest";
  const { mf, unit }: { mf: FantasticalManifestEntry; unit: string } = $props();
</script>

<div class="mb-32">
  <hr />
  <h1 class="text-6xl">Fantastical Portraits</h1>
  {#each mf.works as work}
    <h1 class="text-5xl leading-none">{work.name}</h1>
    <h2 class="text-2xl italic font-normal leading-none">{work.category}</h2>
    <h3 class="text-xl">Work in progresses</h3>
    <div
      class="grid gap-4"
      style="grid-template-columns: repeat({work.wips}, minmax(0, 1fr))"
    >
      {#each { length: work.wips } as _, wip}
        {@const path = `/images/${unit}/${work.path}-${wip}.jpg`}
        <a href={path}
          ><img
            class="w-full border border-black border-solid"
            src={path}
            alt={work.name}
          /></a
        >
      {/each}
    </div>
    <h3 class="text-xl">Final</h3>
    {@const path = `/images/${unit}/${work.path}-final.jpg`}
    <a href={path}
      ><img
        class="w-full border border-black border-solid"
        src={path}
        alt={work.name}
      /></a
    >
    <p>{work.description}</p>
    {#if work.sources}
      {@const entries = Object.entries(work.sources)}
      <div>
        <p>
          <strong>Sources:</strong>
          {#each entries as [name, source], i}
            <a href={source}>{name}</a>{#if i != entries.length - 1}{`, `}{/if}
          {/each}
        </p>
      </div>
    {/if}
  {/each}
</div>

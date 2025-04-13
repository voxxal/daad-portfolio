<script lang="ts">
  import type { Manifest } from "$lib/manifest";
  import type { PageProps } from "./$types";
  import SingleEntry from "./SingleEntry.svelte";
  import NormalEntry from "./NormalEntry.svelte";
  const { data }: PageProps = $props();
  const manifest: Manifest = (data as any).manifest;
  $effect(() => console.log(manifest));
</script>

<div class="mx-8 my-12">
  <a href="/">&larr; Back</a>
  {#each [...Object.entries(manifest)].toSorted(([ka, va], [kb, vb]) => -ka.localeCompare(kb)) as [unit, mf]}
    {#if !mf.layout}
      <NormalEntry {unit} {mf} />
    {:else if mf.layout == "single"}
      <SingleEntry {unit} {mf} />
    {/if}
  {/each}
</div>

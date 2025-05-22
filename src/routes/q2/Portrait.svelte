<script lang="ts">
  const { path } = $props();
  const BAR_WIDTH = 8;
  let pos = $state(0);
  let portrait: HTMLDivElement | null = $state(null);
  $effect(() => {
    if (!portrait) return;
    const rect = portrait.getBoundingClientRect();
    const width = rect.right - rect.left;
    pos = (width - BAR_WIDTH) / 2;
  });

  let dragging = $state(false);

  const startDrag = () => {
    dragging = true;
  };

  const drag = (e: MouseEvent) => {
    if (dragging && portrait) {
      const rect = portrait.getBoundingClientRect();
      const x = e.clientX - rect.left;
      pos = Math.max(Math.min(x, rect.right - rect.left - BAR_WIDTH), 0);
    }
  };

  const endDrag = () => {
    dragging = false;
  };
</script>

<div
  class="grid *:col-start-1 *:row-start-1 w-full h-fit select-none {dragging
    ? '*:cursor-col-resize'
    : ''}"
  bind:this={portrait}
>
  <div class="grid *:col-start-1 *:row-start-1 *:w-full">
    <img src="/images/q2/14-vector-portraits/{path}b.jpg" alt="portrait before" />
    <img
      src="/images/q2/14-vector-portraits/{path}a.jpg"
      alt="portrait after"
      style="clip-path: polygon(0 0, {pos}px 0, {pos}px 100%, 0 100%);"
    />
  </div>
  <div
    class="w-2 bg-gray-500 cursor-col-resize relative h-full"
    onmousedown={startDrag}
    style="left: {pos}px;"
  ></div>
</div>

<svelte:window onmouseup={endDrag} onmousemove={drag} />

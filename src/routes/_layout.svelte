<script>
  export let segment;
</script>

<slot {segment}></slot>

<style>
    :global(body) {
        background: black;
        color: white;
    }
</style>
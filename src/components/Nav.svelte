<script>
  export let segment;
</script>

<style>
  .selected {
    color: red;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>
    <li>
      <a class={segment === 'maps' ? 'selected' : ''} href="maps">maps</a>
    </li>
  
</nav>



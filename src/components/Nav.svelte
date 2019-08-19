<script>
</script>

<style>
  .navigation {
    margin-top: -0.5rem;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    text-transform: uppercase;
    font-size: 1.1rem;
  }

  li {
    list-style-type: none;
    padding: 0.1rem 0.5rem;
    color: var(--secondary);
  }

  li.link:hover {
    background: var(--secondary);
    color: var(--background);
  }

  button {
    height: 1.2rem;
    width: 1.2rem;
  }
</style>

<div class="navigation">
  <hr>
  <nav>
    <ul>
      <li class="link"><a href="/">Home</a></li>
      <li class="link"><a href="/archive">Archive</a></li>
      <li class="link"><a href="/about">About</a></li>
      <li class="link"><a class="external" target="_blank" href="https://secure.actblue.com/donate/dec-dc-action?refcode=website-top-button&_ga=2.160425400.442605078.1564760265-581411585.1544444358">Donate</a></li>
      <li>
        <button style="background: url(/arrow-left-circle.svg)"></button>
        <button style="background: url(/pause-circle.svg)"></button>
        <button style="background: url(/arrow-right-circle.svg)"></button>
      </li>
    </ul>
  </nav>
  <hr>
</div>
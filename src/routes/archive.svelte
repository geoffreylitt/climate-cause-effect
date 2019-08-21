<div class="archive">
  <div class="left-content"></div>
  <div class="right-content"></div>
</div>

<style>
  .left-content {
    grid-area: left-content;
  }
  .right-content {
    grid-area: right-content;
  }
  .archive {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr), minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "left-content right-content";
    gap: 0.5rem;
  }
</style>
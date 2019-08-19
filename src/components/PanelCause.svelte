<script>
  import PanelName from './PanelName.svelte'
  export let data;
</script>

<style>
  .info {
    display: flex;
  }

  .figure {
    width: 50%;
    display: flex;
    align-items: flex-start;
  }

  .caption {
    padding-right: 0.5rem;
    text-transform: uppercase;
  }

  .number {
    font-size: 3rem;
    line-height: 0.8;
    padding-right: 0.5rem;
  }
</style>

<div class="panel">
  <hr />
    <PanelName {data} />
  <hr />
  <div class="stocks">{data.stock_ticker}</div>
  <hr />
  <div class="info">
    <div class="figure market-cap">
      <div class="caption">
        Market
        <br />
        Cap
      </div>
      <div class="number">${data.market_cap}B</div>
    </div>
    <div class="figure emissions">
      <div class="caption">
        Yearly
        <br />
        Emissions
      </div>
      <div class="number">{data.sample_emissions}</div>
      <div class="units">
        MTCO<sub>2</sub>e
      </div>
    </div>
  </div>
  <hr />
</div>

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
    flex-wrap: wrap;
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

  .units {
    display: inline;
    font-size: 1rem;
  }

  /* tablet */
  @media only screen and (max-width: 768px) and (min-width: 480px) {
    .number {
      font-size: 2rem;
    }

    .units {
      font-size: 0.8rem;
    }
  }

  /* mobile */
  @media only screen and (max-width: 480px) {
    .number {
      font-size: 1rem;
    }

    .units {
      font-size: 0.6rem;
    }

    .caption {
      font-size: 0.6rem;
      margin-bottom: 0.3rem;
    }
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
      <div class="number">{
        data.sample_emissions}
        <div class="units">
          MTCO<sub>2</sub>e
        </div>
      </div>

    </div>
  </div>
  <hr />
</div>

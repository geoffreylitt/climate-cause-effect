<script>
  import { formatLatitude, formatLongitude } from "latlon-formatter";
  export let data;
</script>

<div class="main">
  <div class="name">
    {data.name}
    <span class="suffix">{data.suffix || ''}</span>
  </div>
  {#if data.ranking}
    <div class="ranking">
      <div class="number">#{data.ranking}</div>
      <div class="ranking-info">Highest<br>Emissions</div>
    </div>
  {/if}
</div>
<div class="location">
  <div class="address">{data.city || data.address}</div>
  <div class="latlong">
    <img class="icon" src="/globe.svg" alt="Globe Icon">
    {formatLatitude(data.lat, {degrees: true})}, {formatLongitude(data.long, {degrees: true})}
  </div>
</div>

<style>
  .main {
    display: flex;
    width: 100%;
    align-items: baseline;
  }

  .name {
    width: 70%;
    font-size: 3rem;
    line-height: 0.8;
    padding-bottom: 1.5rem;
    padding-right: 0.5rem;
  }

  .ranking {
    width: 30%;
    display: flex;
    align-items: center;
  }

  .ranking-info {
    text-transform: uppercase;
  }

  .number {
    font-size: 2rem;
    padding-right: 0.5rem;
  }

  .name .suffix {
    color: var(--secondary);
  }

  .location {
    display: flex;
    align-items: baseline;
  }

  .address {
    font-size: 1.5rem;
    padding-right: 0.5rem;
  }

  .icon {
    padding-right: 0.1rem;
  }

  @media only screen and (max-width: 768px) {
    .location {
      flex-wrap: wrap;
    }
  }

  @media only screen and (max-width: 768px) and (min-width: 480px) {
    .name {
      font-size: 2rem;
      width: 80%;
    }

    .address {
      font-size: 1.2rem;
    }

    .ranking {
      width: 20%;
    }

    .ranking-info {
      display: none;
    }
  }

  @media only screen and (max-width: 480px) {
    .name {
      font-size: 1.5rem;
      width: 100%;
    }

    .address {
      font-size: 1rem;
    }

    .ranking {
      display: none;
    }

    .latlong {
      font-size: 0.5rem;
    }
  }
</style>

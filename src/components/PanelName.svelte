<script>
  import { formatLatitude, formatLongitude } from "latlon-formatter";
  export let data;
</script>

<div class="name">
  {data.name}
  <span class="suffix">{data.suffix || ''}</span>
</div>
<div class="location">
  <div class="address">{data.city || data.address}</div>
  <div class="latlong">
    <img class="icon" src="/globe.svg" alt="Globe Icon">
    {formatLatitude(data.lat, {degrees: true})}, {formatLongitude(data.long, {degrees: true})}
  </div>
</div>

<style>
  .name {
    font-size: 3rem;
    line-height: 0.8;
    padding-bottom: 1.5rem;
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
    }

    .address {
      font-size: 1.2rem;
    }
  }

  @media only screen and (max-width: 480px) {
    .name {
      font-size: 1.5rem;
    }

    .address {
      font-size: 1rem;
    }

    .latlong {
      font-size: 0.5rem;
    }
  }
</style>

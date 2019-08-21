<script>
  import ImageAerial from "../components/ImageAerial.svelte";
  import ImageStreetView from "../components/ImageStreetView.svelte";

  let aerialUrl = "";
  let aerialData = {
    zoom: 10,
    lat: 0,
    long: 0
  };

  let populateAerialData = e => {
    let rawUrl = e.target.value;
    let matchData = rawUrl.match(
      /.*\/maps\/\@([0-9\-\.]*),([0-9\-\.]*),.*/
    );
    if (matchData) {
      aerialData.lat = matchData[1];
      aerialData.long = matchData[2];
    }
  };

  let createAerial = e => {
    base('Climate Effects').create(aerialData, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    });
  }

  let streetViewUrl = "";
  let streetViewData = {
    lat: 0,
    long: 0,
    heading: 0,
    fov: 90,
    pitch: 0
  };

  let populateStreetViewData = e => {
    let rawUrl = e.target.value;
    let matchData = rawUrl.match(
      /.*\/\@([0-9\-\.]*),([0-9\-\.]*),.*,([0-9\-\.]*)h,([0-9\-\.]*)t.*/
    );
    if (matchData) {
      streetViewData.lat = matchData[1];
      streetViewData.long = matchData[2];
      streetViewData.heading = matchData[3];
      streetViewData.pitch = matchData[4] - 90.0;
    }
  };
</script>

<div class="map-helper">
  <div class="params">
    <h1>Aerial builder</h1>
    <p>1) Enter Maps URL, 2) tweak params, 3) copy paste to airtable</p>
    <div class="param">
      Map URL:
      <input on:change={populateAerialData} />
    </div>
    <hr/>
    <div class="param">
      Zoom:
      <input type="number" bind:value={aerialData.zoom} />
    </div>
    <div class="param">
      Lat:
      <input type="number" step="0.01" bind:value={aerialData.lat} />
    </div>
    <div class="param">
      Long:
      <input type="number" step="0.01" bind:value={aerialData.long} />
    </div>
  </div>
  <div class="preview" style="height: 640px; width: 640px;">
    <ImageAerial
      center={aerialData.lat + ',' + aerialData.long}
      zoom={aerialData.zoom}
      copyright={''} />
  </div>
</div>

<div class="map-helper">
  <div class="params">
    <h1>Street view builder</h1>
    <p>1) Enter Maps URL, 2) tweak params, 3) copy paste to airtable</p>
    <div class="param">
      Map URL:
      <input on:change={populateStreetViewData} />
    </div>
    <hr/>
    <div class="param">
      Lat:
      <input type="number" step="0.01" bind:value={streetViewData.lat} />
    </div>
    <div class="param">
      Long:
      <input type="number" step="0.01" bind:value={streetViewData.long} />
    </div>
    <div class="param">
      Heading:
      <input type="number" bind:value={streetViewData.heading} />
    </div>
    <div class="param">
      FOV:
      <input type="number" bind:value={streetViewData.fov} />
    </div>
    <div class="param">
      Pitch:
      <input type="number" bind:value={streetViewData.pitch} />
    </div>
  </div>
  <div class="preview" style="height: 640px; width: 640px;">
    <ImageStreetView
      location={`${streetViewData.lat},${streetViewData.long}`}
      fov={streetViewData.fov}
      heading={streetViewData.heading}
      pitch={streetViewData.pitch}
      camNumber={1} />
  </div>
</div>

<style>
  .map-helper {
    margin: 50px;
    font-size: 24px;
  }

  input {
    border: solid thin var(--secondary);
  }

  .map-helper {
    display: grid;
    grid-template-columns: 1fr, 2fr;
    grid-template-rows: auto;
  }

  .params{
    grid-column: 1;
  }

  .param {
    margin: 10px 0;
  }

  .preview{
    grid-column: 2;
  }
</style>

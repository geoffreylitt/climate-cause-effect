<script>
  import reglLib from "regl";

  export let center;
  export let zoom;

  export let width;
  export let height;

  let canvas;

  $: url = makeMapUrl(center, zoom);

  $: canvas && renderImgToCanvas(url)

  function makeMapUrl(effect) {
    let params = {
      size: `${width}x${height}`,
      center,
      zoom,
      maptype: 'hybrid'
    };

    let queryString = Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&");

    return `/maps/api/staticmap?${queryString}`;
  }

  function renderImgToCanvas (imgUrl) {
    let regl = reglLib(canvas);
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;
    image.onload = function() {
      // init regl once component has mounted
      regl({
        frag: `
        precision mediump float;
        uniform sampler2D texture;
        varying vec2 uv;
        void main () {
          gl_FragColor = texture2D(texture, uv);
        }`,

        vert: `
        precision mediump float;
        attribute vec2 position;
        varying vec2 uv;
        void main () {
          uv = position;
          gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
        }`,

        attributes: {
          position: [-2, 0, 0, -2, 2, 2]
        },

        uniforms: {
          texture: regl.texture(image)
        },

        count: 3
      })();
    };
  };
</script>

<canvas bind:this={canvas} {width} {height} />

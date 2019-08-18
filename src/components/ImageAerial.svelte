<script>
  import reglLib from "regl";

  export let center;
  export let zoom;

  export let width;
  export let height;

  let canvas;

  $: url = makeMapUrl(center, zoom);

  $: canvas && renderImgToCanvas(url);

  function makeMapUrl(effect) {
    let params = {
      size: `${width}x${height}`,
      center,
      zoom,
      maptype: "hybrid",
      scale: 2
    };

    let queryString = Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&");

    return `/maps/api/staticmap?${queryString}`;
  }

  function renderImgToCanvas(imgUrl) {
    let regl = reglLib(canvas);
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;
    image.onload = function() {
      // init regl once component has mounted
      let drawImage = regl({
        frag: `
        precision mediump float;
        uniform sampler2D texture;
        varying vec2 uv;
        uniform float time;

        void main () {
          // flip in the x-axis
          vec2 flipped = vec2(1.0 - uv.x, uv.y);

          // zoom in so we only see 0.25~0.75 in both axes
          vec2 zoomed = vec2(flipped.x * 0.5 + 0.25 + (time / 200.0), flipped.y * 0.5 + 0.25);
          
          gl_FragColor = texture2D(texture, zoomed);
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
          texture: regl.texture(image),
          time: regl.prop("time")
        },

        count: 3
      });

      regl.frame(({ time }) => {
        // clear contents of the drawing buffer
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1
        });

        // draw a triangle using the command defined above
        drawImage({
          time: time
        });
      });
    };
  }
</script>

<canvas bind:this={canvas} {width} {height} />

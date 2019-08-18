<script>
  import reglLib from "regl";

  export let center;
  export let zoom;

  let width;
  let height;

  let canvas;

  $: url = makeMapUrl(center, zoom);

  $: canvas && renderImgToCanvas(url);

  function makeMapUrl(effect) {
    let params = {
      size: `640x640`,
      center,
      zoom,
      maptype: "satellite",
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

          // define the animation speed in each direction
         float xDelta = mod(time / 100.0, 0.5);
         float yDelta = xDelta / 3.0; // move faster in x than y

         float xPos = flipped.x * 0.5 + xDelta;
         float yPos = flipped.y * 0.5 + 0.25 + yDelta;

          // zoom in 2x, and animate pan based on time 
          vec2 zoomed = vec2(xPos, yPos);

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
          texture: regl.texture({
            data: image,
            mag: "linear" // smooth scrolling
          }),
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

<div class="canvas-container" bind:clientWidth={width} bind:clientHeight={height}>
  <canvas bind:this={canvas}  
  {width} {height} />
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

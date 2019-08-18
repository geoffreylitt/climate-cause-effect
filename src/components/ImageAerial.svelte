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
        varying vec2 vUv;
        uniform float time;
        uniform float ratio;

        vec2 resize(vec2 uv) {
          float x = uv.x * min(ratio, 1.0);
          float y = uv.y / max(ratio, 1.0);
          return vec2(0.5 - min(ratio, 1.0) / 2.0 + x, 0.5 - (1.0 / max(ratio, 1.0)) / 2.0 + y);
        }

        void main () {
          // define the animation speed in each direction
         float xDelta = mod(time / 100.0, 0.5);
         float yDelta = xDelta / 3.0; // move faster in x than y

         // float xPos = vUv.x * 0.5 + xDelta;
         // float yPos = vUv.y * 0.5 + 0.25 + yDelta;

          // zoom in 2x, and animate pan based on time 
          // vec2 zoomed = vec2(xPos, yPos);

          gl_FragColor = texture2D(texture, resize(vUv));
        }`,

        vert: `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main () {
          vUv = uv;
          gl_Position = vec4(2.0 * position - 1.0, 0, 1);
        }`,

        attributes: {
          position: [
            [[0, 0], [1, 1], [0, 1]],
            [[0, 0], [1, 1], [1, 0]]
          ],
          uv: [
            [[0, 0.96], [0.96, 0], [0, 0]],
            [[0, 0.96], [0.96, 0], [0.96, 0.96]]
          ]
        },

        uniforms: {
          texture: regl.texture({
            data: image,
            mag: "linear" // smooth scrolling
          }),
          time: regl.prop("time"),
          ratio: regl.prop("ratio")
        },

        count: 6
      });

      regl.frame(({ time }) => {
        // clear contents of the drawing buffer
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1
        });

        // draw a triangle using the command defined above
        drawImage({
          time: time,
          ratio: 1.0 * width / height
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

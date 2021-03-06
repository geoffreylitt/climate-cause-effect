<script>
  import reglLib from "regl";
  import { onMount, onDestroy } from "svelte";
  import { makeAerialMapUrl } from '../lib/google-maps-urls'

  export let copyright;
  export let center;
  export let zoom;
  export let direction = 30;

  let width;
  let height;

  let canvas;

  $: url = makeAerialMapUrl(center, zoom);
  $: canvas && renderImgToCanvas(url);

  let imageTexture;
  let tick;

  let currentAnimationTime = 0;
  let startTimeForCurrentImage = 0;

  onMount(() => {
    const regl = reglLib(canvas);
    imageTexture = regl.texture();
    const drawImage = regl({
      frag: `
      precision highp float;
      uniform sampler2D texture;
      varying vec2 vUv;
      uniform float time;
      uniform float ratio;
      uniform float direction;

      vec2 resize(vec2 uv) {
        float x = uv.x * min(ratio, 1.0);
        float y = uv.y / max(ratio, 1.0);
        return vec2(0.5 - min(ratio, 1.0) / 2.0 + x, 0.5 - (1.0 / max(ratio, 1.0)) / 2.0 + y);
      }

      void main () {

        float zoom = 4.0 / 3.0;
        float speed = 1.0 / 100.0;

        // define the animation speed in each direction
        float offset = time * speed;
        vec2 vector = vec2(cos(direction), sin(direction));
        vec2 delta = offset * vector;
        vec2 uv = mod(vUv / zoom + delta, 0.96);

        gl_FragColor = texture2D(texture, resize(uv));
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
        texture: imageTexture,
        time: regl.prop("time"),
        ratio: regl.prop("ratio"),
        direction: regl.prop("direction")
      },

      count: 6
    });

    tick = regl.frame(({ time }) => {
      // clear contents of the drawing buffer
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1
      });

      // make the requestAnimationFrame timestamp
      // available in a variable in outer scope
      currentAnimationTime = time;

      // draw a triangle using the command defined above
      drawImage({
        // the time passed into REGL is the time since the
        // current image started showing. This makes the
        // pan effect reset for each new image,
        // avoiding seams in the display
        time: time - startTimeForCurrentImage,
        ratio: width / height,
        direction: direction * Math.PI / 180
      });
    });
  })

  onDestroy(() => {
    if (tick) tick.cancel();
  })

  function renderImgToCanvas(imgUrl) {
    // update the start time for current image to be the
    // current requestAnimationFrame timestamp
    startTimeForCurrentImage = currentAnimationTime;

    // render black until the image loads,
    // to avoid lags between parts of the UI
    imageTexture([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);

    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;
    image.onload = function() {
      imageTexture({
        data: image,
        mag: "linear",
        min: 'linear' // smooth scrolling
      });
    };
  }

</script>

<div class="canvas-container" bind:clientWidth={width} bind:clientHeight={height}>
  <canvas bind:this={canvas}  
  {width} {height} />
  <div class="copyright">
    © Google
    {#if copyright}
     / {copyright}
    {/if}
  </div>
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .copyright {
    font-size: 0.75rem;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.5rem;
    opacity: 0.6;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

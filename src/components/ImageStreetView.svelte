<script>
  import reglLib from "regl";

  export let location;
  export let fov;
  export let heading;
  export let pitch;

  export let width;
  export let height;

  let filter = "kodak";

  let canvas;

  let colorMatrices = [
    {
      name: "kodak",
      matrix: [
        1.1285582396593525,
        -0.3967382283601348,
        -0.03992559172921793,
        0,
        63.72958762196502,
        -0.16404339962244616,
        1.0835251566291304,
        -0.05498805115633132,
        0,
        24.732407896706203,
        -0.16786010706155763,
        -0.5603416277695248,
        1.6014850761964943,
        0,
        35.62982807460946,
        0,
        0,
        0,
        1,
        0
      ]
    },
    {
      name: "technicolor",
      matrix: [
        1.9125277891456083,
        -0.8545344976951645,
        -0.09155508482755585,
        0,
        11.793603434377337,
        -0.3087833385928097,
        1.7658908555458428,
        -0.10601743074722245,
        0,
        -70.35205161461398,
        -0.231103377548616,
        -0.7501899197440212,
        1.847597816108189,
        0,
        30.950940869491138,
        0,
        0,
        0,
        1,
        0
      ]
    },
    {
      name: "vintage",
      matrix: [
        0.6279345635605994,
        0.3202183420819367,
        -0.03965408211312453,
        0,
        9.651285835294123,
        0.02578397704808868,
        0.6441188644374771,
        0.03259127616149294,
        0,
        7.462829176470591,
        0.0466055556782719,
        -0.0851232987247891,
        0.5241648018700465,
        0,
        5.159190588235296,
        0,
        0,
        0,
        1,
        0
      ]
    },
    {
      name: "polaroid",
      matrix: [
        1.438,
        -0.062,
        -0.062,
        0,
        0,
        -0.122,
        1.378,
        -0.122,
        0,
        0,
        -0.016,
        -0.016,
        1.483,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ]
    }
  ];

  let colorMatrix = colorMatrices.find(cm => cm.name === filter).matrix;

  $: url = makeStreetViewUrl(location, fov, heading, pitch);

  $: canvas && renderImgToCanvas(url, colorMatrix);

  function makeStreetViewUrl(location, fov, heading, pitch) {
    let params = {
      size: `${width}x${height}`,
      location,
      fov,
      heading,
      pitch
    };

    let queryString = Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&");

    return `/maps/api/streetview?${queryString}`;
  }

  function renderImgToCanvas(imgUrl, colorMatrix) {
    let regl = reglLib(canvas);
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;

    image.onload = function() {
      // init regl once component has mounted
      let drawImage = regl({
        // original frag shader
        // frag: `
        // precision mediump float;
        // uniform sampler2D texture;
        // uniform vec2 u_textureSize;
        // varying vec2 uv;
        // void main () {
        //   gl_FragColor = texture2D(texture, uv);
        // }`,

        // blurry frag shader
        // frag: `
        // precision mediump float;

        // // our texture
        // uniform sampler2D texture;
        // uniform vec2 u_textureSize;

        // // the texCoords passed in from the vertex shader.
        // varying vec2 uv;

        // void main() {
        //   // compute 1 pixel in texture coordinates.
        //   vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;

        //   // average the left, middle, and right pixels.
        //   gl_FragColor = (
        //       texture2D(texture, uv) +
        //       texture2D(texture, uv + vec2(onePixel.x, 0.0)) +
        //      texture2D(texture, uv + vec2(-onePixel.x, 0.0))) / 3.0;
        // }
        // `,

        // color transform frag shader
        frag: `
        precision mediump float;

        // our texture
        uniform sampler2D texture;
        uniform float m[20]; // color transform matrix
        uniform float time; // current time

        // the texCoords passed in from the vertex shader.
        varying vec2 uv;

        void main() {
          vec4 c = texture2D(texture, uv);
          gl_FragColor.r = m[0] * c.r + m[1] * c.g + m[2] * c.b + m[4] + (100.0 * (time / 1000.0));
          gl_FragColor.g = m[5] * c.r + m[6] * c.g + m[7] * c.b + m[9];
          gl_FragColor.b = m[10] * c.r + m[11] * c.g + m[12] * c.b + m[14];
          gl_FragColor.a = c.a;
        }
        `,

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
          time: regl.prop("time"),
          texture: regl.texture(image),
          "m[0]": colorMatrix[0],
          "m[1]": colorMatrix[1],
          "m[2]": colorMatrix[2],
          "m[3]": colorMatrix[3],
          "m[4]": colorMatrix[4] / 255.0,
          "m[5]": colorMatrix[5],
          "m[6]": colorMatrix[6],
          "m[7]": colorMatrix[7],
          "m[8]": colorMatrix[8],
          "m[9]": colorMatrix[9] / 255.0,
          "m[10]": colorMatrix[10],
          "m[11]": colorMatrix[11],
          "m[12]": colorMatrix[12],
          "m[13]": colorMatrix[13],
          "m[14]": colorMatrix[14] / 255.0,
          "m[15]": colorMatrix[15],
          "m[16]": colorMatrix[16],
          "m[17]": colorMatrix[17],
          "m[18]": colorMatrix[18],
          "m[19]": colorMatrix[19] / 255.0
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

<select bind:value={filter}>
  {#each colorMatrices as matrix}
    <option value={matrix}>{matrix.name}</option>
  {/each}
</select>
<canvas bind:this={canvas} {width} {height} />

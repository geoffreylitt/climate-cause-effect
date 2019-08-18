<script>
  import reglLib from "regl";

  export let location;
  export let fov;
  export let heading;
  export let pitch;

  let width;
  let height;

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
      size: `640x640`,
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
        // frag: `
        // precision mediump float;

        // // our texture
        // uniform sampler2D texture;
        // uniform float m[20]; // color transform matrix
        // uniform float time; // current time

        // // the texCoords passed in from the vertex shader.
        // varying vec2 uv;

        // void main() {
        //   vec4 c = texture2D(texture, uv);
        //   gl_FragColor.r = m[0] * c.r + m[1] * c.g + m[2] * c.b + m[4] + (100.0 * (time / 1000.0));
        //   gl_FragColor.g = m[5] * c.r + m[6] * c.g + m[7] * c.b + m[9];
        //   gl_FragColor.b = m[10] * c.r + m[11] * c.g + m[12] * c.b + m[14];
        //   gl_FragColor.a = c.a;
        // }
        // `,

        frag: `
          #define PI 3.14159265

          precision mediump float;
          uniform float time;
          uniform vec2 dimensions;
          uniform sampler2D texture;

          vec3 tex2D( sampler2D _tex, vec2 _p ){
            vec3 col = texture2D( _tex, _p ).xyz;
            if ( 0.5 < abs( _p.x - 0.5 ) ) {
              col = vec3( 0.1 );
            }
            return col;
          }

          float hash( vec2 _v ){
            return fract( sin( dot( _v, vec2( 89.44, 19.36 ) ) ) * 22189.22 );
          }

          float iHash( vec2 _v, vec2 _r ){
            float h00 = hash( vec2( floor( _v * _r + vec2( 0.0, 0.0 ) ) / _r ) );
            float h10 = hash( vec2( floor( _v * _r + vec2( 1.0, 0.0 ) ) / _r ) );
            float h01 = hash( vec2( floor( _v * _r + vec2( 0.0, 1.0 ) ) / _r ) );
            float h11 = hash( vec2( floor( _v * _r + vec2( 1.0, 1.0 ) ) / _r ) );
            vec2 ip = vec2( smoothstep( vec2( 0.0, 0.0 ), vec2( 1.0, 1.0 ), mod( _v*_r, 1. ) ) );
            return ( h00 * ( 1. - ip.x ) + h10 * ip.x ) * ( 1. - ip.y ) + ( h01 * ( 1. - ip.x ) + h11 * ip.x ) * ip.y;
          }

          float noise( vec2 _v ){
            float sum = 0.;
            for( int i=1; i<9; i++ )
            {
              sum += iHash( _v + vec2( i ), vec2( 2. * pow( 2., float( i ) ) ) ) / pow( 2., float( i ) );
            }
            return sum;
          }

          void main(){
            vec2 pre_uv = gl_FragCoord.xy / dimensions;
            // flip image in x and y
            vec2 uv = vec2(pre_uv.x, 1.0 - pre_uv.y);
            vec2 uvn = uv;
            vec3 col = vec3( 0.0 );

            // tape wave
            uvn.x += ( noise( vec2( uvn.y, time ) ) - 0.5 )* 0.005;
            uvn.x += ( noise( vec2( uvn.y * 100.0, time * 10.0 ) ) - 0.5 ) * 0.01;

            // tape crease
            float tcPhase = clamp( ( sin( uvn.y * 8.0 - time * PI * 1.2 ) - 0.92 ) * noise( vec2( time ) ), 0.0, 0.01 ) * 10.0;
            float tcNoise = max( noise( vec2( uvn.y * 100.0, time * 10.0 ) ) - 0.5, 0.0 );
            uvn.x = uvn.x - tcNoise * tcPhase;

            // switching noise
            float snPhase = smoothstep( 0.03, 0.0, uvn.y );
            uvn.y += snPhase * 0.3;
            uvn.x += snPhase * ( ( noise( vec2( uv.y * 100.0, time * 10.0 ) ) - 0.5 ) * 0.2 );
              
            col = tex2D( texture, uvn );
            col *= 1.0 - tcPhase;
            col = mix(
              col,
              col.yzx,
              snPhase
            );

            // bloom
            for( float x = -4.0; x < 2.5; x += 1.0 ){
              col.xyz += vec3(
                tex2D( texture, uvn + vec2( x - 0.0, 0.0 ) * 7E-3 ).x,
                tex2D( texture, uvn + vec2( x - 2.0, 0.0 ) * 7E-3 ).y,
                tex2D( texture, uvn + vec2( x - 4.0, 0.0 ) * 7E-3 ).z
              ) * 0.1;
            }
            col *= 0.6;

            // ac beat
            col *= 1.0 + clamp( noise( vec2( 0.0, uv.y + time * 0.2 ) ) * 0.6 - 0.25, 0.0, 0.1 );

            gl_FragColor = vec4( col, 1.0 );
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
          position: [[[0, 0], [1, 1], [0, 1]], [[0, 0], [1, 1], [1, 0]]]
        },

        uniforms: {
          time: regl.prop("time"),
          texture: regl.texture(image),
          dimensions: [image.width, image.height]
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
          time: time / 3.0
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
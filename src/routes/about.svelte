<style>
  .text-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .hero {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--secondary);
  }

  .lede {
    color: var(--primary);
  }

  .subheading {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  p {
    margin: 10px 0;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .cta {
    font-size: 2rem;
  }

  .columns {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    margin: 1rem 0;
  }

  .colophon {
    margin: 1rem 0;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    color: var(--secondary);
    text-decoration: inherit;
  }

  @media only screen and (max-width: 480px) {
    .hero {
      font-size: 1.8rem;
    }

    .subheading {
      font-size: 1.3rem;
    }

    .columns {
      display: block;
    }

    .column {
      margin-bottom: 2rem;
    }
  }
</style>

<div class="about text-content">
  <p class="hero">
    <span class="lede">
      Corporations are largely responsible for the global warming crisis.
    </span>
    63% of all greenhouse gas emissions from 1751 to 2010 were produced by the activities and products of just 90 companies.
  </p>

  <div class="subheading">
    <p>
      HQ→CO<sub>2</sub>
      juxtaposes random pairs of images: the headquarters of high-emissions fossil fuel companies, and places around the world being affected by global warming.
    </p>
    <p>
      It aims to concretely visualize how corporate executives bear enormous responsibility for the past and future of the climate crisis. 
    </p>
  </div>

  <hr />

  <div class="columns">
    <div class="column">
      <ul class="cta">
        <h2>Ways to help</h2>
        <li>
          <a
            href="/api/donate"
            target="_blank">
            Donate
          </a>
          to the Sunrise Movement
        </li>

        <li>
          <a href="https://www.sunrisemovement.org/volunteer" target="_blank">
            Volunteer
          </a>
          to help
        </li>

        <li>
          <a
            href="https://gofossilfree.org/divestment/what-is-fossil-fuel-divestment/"
            target="_blank">
            Divest
          </a>
          from fossil fuel companies
        </li>

        <li>
          <a
            href="https://www.theguardian.com/environment/2013/nov/20/90-companies-man-made-global-warming-emissions-climate-change"
            target="_blank">
            Learn more
          </a>
          about corporations and climate change
        </li>
      </ul>
    </div>

    <div class="column">
      <h2>Data Appendix</h2>
      <p>
        <strong>Emissions data</strong>
        are estimates of 2015 emissions, in metric tons of CO<sub>2</sub> equivalent, from the
        <a
          href="https://b8f65cb373b1b7b15feb-c70d8ead6ced550b4d987d7c03fcdd1d.ssl.cf3.rackcdn.com/cms/reports/documents/000/002/327/original/Carbon-Majors-Report-2017.pdf"
          target="_blank">
          CDP Carbon Majors Report 2017
        </a>
        .
        Figures include both firsthand emissions by companies, and downstream emissions
        caused by their products.

        Companies were selected for this site based on estimated yearly emissions rankings and availability of image/financial data.
      </p>
      <p>
        For more information on the Carbon Majors project, see the
        <a
          href="http://climateaccountability.org/carbonmajors.html"
          target="_blank">
          Climate Accountability Institute website
        </a>.
        
        The creators of this website are not affiliated with the Climate
        Accountability Institute or CDP.
      </p>
      <p>
        <strong>Market cap data</strong>
        are values from Google Finance as of Aug 2019 for publicly traded
        companies, and
        <a
          target="_blank"
          href="https://www.ft.com/content/5de6ef96-8b95-11db-a61f-0000779e2340#axzz1L5EPlmlJ">
          Financial Times estimates
        </a>
        for some state-owned firms.
      </p>
      <p>
        <strong>Image data</strong> comes from Google Maps and Google Street View. Detailed copyright info is noted on each image.
      </p>
      <p>
        Pairings of companies and places are randomized. The effects of climate change are global.
      </p>
    </div>
  </div>

  <hr />

  <div class="colophon">
    <h2>Colophon</h2>
    <p>
      HQ→CO<sub>2</sub>
      is made by
      <a href="https://seththompson.org/" target="_blank">Seth&nbsp;Thompson</a>
      and
      <a href="https://www.geoffreylitt.com/" target="_blank">
        Geoffrey&nbsp;Litt
      </a>
      .
      The site is built with <a href="https://svelte.dev/" target="_blank">Svelte</a>, <a href="https://sapper.svelte.dev/" target="_blank">Sapper</a>, and <a href="https://github.com/regl-project/regl" target="_blank">Regl</a>.
    </p>
    <p>
      Let us know what you think! (s3th.thompson, gklitt) at gmail.
    </p>
    <p>
      The VHS video effect is based on a
      <a href="https://www.shadertoy.com/view/XtBXDt" target="_blank">
        shader effect by FMS_Cat on Shadertoy
      </a>
      .
    </p>
  </div>
</div>

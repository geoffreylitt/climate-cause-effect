<style>
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
    margin-bottom: 3rem;
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
    grid-template-columns: 2fr 1fr 1fr;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    margin-top: 2rem;
  }

  a:hover {
    text-decoration: underline;
  }

  @media only screen and (max-width: 480px) {
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
      Private companies are largely responsible for the global warming crisis.
    </span>
    63% of all greenhouse gas emissions from 1751 to 2010 were produced by just
    90 companies.
  </p>

  <p class="subheading">
    HQ→CO<sub>2</sub>
    visualizes how executives in corporate headquarters
    are making decisions every day that cause staggering harm to the entire Earth.
  </p>
  <hr />
  <div class="columns">
    <div class="column">
      <ul class="cta">
        <h2>Ways to help</h2>
        <li>
          <a
            href="https://secure.actblue.com/donate/dec-dc-action"
            target="_blank">
            Donate
          </a>
          to the Sunrise Movement
        </li>

        <li>
          <a
            href="https://www.sunrisemovement.org/volunteer"
            target="_blank">
            Volunteer
          </a>
          locally or remotely
        </li>

        <li>
          <a
            href="https://gofossilfree.org/divestment/what-is-fossil-fuel-divestment/"
            target="_blank">
            Divest
          </a>
          from fossil fuel companies
        </li>
      </ul>
    </div>
    <div class="column">
      <h2>Appendix</h2>
      <p>
        <strong>Emissions data</strong> include both firsthand emissions by companies, and
        downstream emissions caused by their products (which typically far
        exceed firsthand emissions for fossil fuel companies).
      </p>
      <p>Data is reported in metric tons of CO2 equivalent emissions, and comes from
        the
        <a
          href="https://b8f65cb373b1b7b15feb-c70d8ead6ced550b4d987d7c03fcdd1d.ssl.cf3.rackcdn.com/cms/reports/documents/000/002/327/original/Carbon-Majors-Report-2017.pdf"
          target="_blank">
          CDP Carbon Majors Report 2017
        </a>
        .
      </p>
      <p>
        For more information on the Carbon Majors project, see the
        <a
          href="http://climateaccountability.org/carbonmajors.html"
          target="_blank">
          Climate Accountability Institute website
        </a>
        or a
        <a
          href="https://www.theguardian.com/environment/2013/nov/20/90-companies-man-made-global-warming-emissions-climate-change"
          target="_blank">
          Guardian article
        </a>
        covering their work.
      </p>

      <p>
        The creators of this website are not affiliated with the Climate
        Accountability Institute or CDP.
      </p>
      <p>
        <strong>Market cap data</strong> are values from Google Finance as of Aug 2019 for
        publicly traded companies, and
        <a
          target="_blank"
          href="https://www.ft.com/content/5de6ef96-8b95-11db-a61f-0000779e2340#axzz1L5EPlmlJ">
          Financial Times estimates
        </a>
        for some state-owned firms.
      </p>
    </div>
    <div class="column">
      <h2>Colophon</h2>
      <p>
        HQ→CO<sub>2</sub>
        is made by
        <a href="https://seththompson.org/" target="_blank">
          Seth&nbsp;Thompson
        </a>
        and
        <a href="https://www.geoffreylitt.com/" target="_blank">
          Geoffrey&nbsp;Litt
        </a>
        .
      </p>
      <p>
        This site uses Svelte, Sapper, the Google Maps API, and WebGL.
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
</div>

<script>
  import Logo from "../components/Logo.svelte"
</script>
  
<div class="container">
  <header>
    <Logo />
  </header>

  <div class="text-content">
    <h1 id="abouthqco2">About HQ→CO2</h1>

    <blockquote>
      <p>"The public and private sectors alike must do what is necessary to stop global warming. Those who are historically responsible for polluting our atmosphere have a clear obligation to be part of the solution."</p>
    </blockquote>

    <p>—Al Gore</p>

    <br/>

    <p><strong>Private companies are largely responsible for the global warming crisis.</strong> 63% of all greenhouse gas emissions from 1751 to 2010 were produced by just 90 companies.</p>

    <p>HQ→CO2 is an attempt to visualize how every day, decisions made by executives in corporate headquarters are contributing to greenhouse gas emissions that pose an enormous threat to our planet.</p>

    <h2 id="authors">Authors</h2>

    <p>HQ→CO2 is made by <a href="https://seththompson.org/">Seth Thompson</a> and <a href="https://www.geoffreylitt.com/">Geoffrey Litt</a>.</p>

    <h2 id="appendix">Appendix</h2>

    <p>Data on company emissions comes from the <a href="https://b8f65cb373b1b7b15feb-c70d8ead6ced550b4d987d7c03fcdd1d.ssl.cf3.rackcdn.com/cms/reports/documents/000/002/327/original/Carbon-Majors-Report-2017.pdf">CDP Carbon Majors Report 2017</a>.</p>

    <p>For more information on the Carbon Majors project, see the <a href="http://climateaccountability.org/carbonmajors.html">Climate Accountability Institute website</a> or an <a href="https://www.theguardian.com/environment/2013/nov/20/90-companies-man-made-global-warming-emissions-climate-change">article in the Guardian</a> covering their work. </p>

    <p>The creators of this website are not affiliated with the Climate Accountability Institute or CDP.</p>

    <p>The video effect on the Google Street View images is based on a wonderful <a href="https://www.shadertoy.com/view/XtBXDt">shader effect by FMS_Cat on Shadertoy</a>.</p>
  </div>
</div>

<style>
  .text-content {
    max-width: 500px;
    margin: 0 auto;
  }

  p {
    margin: 10px 0;
  }

  h1 {
    font-size: 2.0rem;
  }

  h2 {
    font-size: 1.3rem;
    margin-top: 2rem;
  }
  
  a {
    text-decoration: underline;
  }
</style>
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="ftr"><div class="wrap ftr-in">
<div><a class="logo" href="/"><span class="logo-ic">&#9835;</span>Fix<b>MySpeaker</b></a><p>Free online speaker cleaner. Eject water and remove dust from your phone, tablet or watch speaker using sound frequencies.</p></div>
<div><h3>Tools</h3><a href="#tool">Water Ejector (165Hz)</a><a href="#tool">Dust Cleaner</a><a href="#tool">Dual-Action Vibration</a><a href="#tool">Stereo Balance Test</a></div>
<div><h3>Guides</h3><a href="#water">Remove water</a><a href="#dust">Remove dust</a><a href="#devices">iPhone &amp; Android</a><a href="#tips">Safety tips</a></div></div>
<div class="wrap copy">&copy; ${new Date().getFullYear()} fixspeaker.github.io &middot; Fix My Speaker. Not a substitute for professional repair of physically damaged speakers.</div></footer>`;
  }
}
customElements.define('site-footer', SiteFooter);

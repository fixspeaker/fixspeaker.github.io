class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header class="hdr"><div class="wrap hdr-in">
<a class="logo" href="/" aria-label="Fix My Speaker home"><span class="logo-ic">&#9835;</span>Fix<b>MySpeaker</b></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
<nav class="nav" aria-label="Main"><a href="#tool">Speaker Cleaner</a><a href="#features">Features</a><a href="#how">How It Works</a><a href="#water">Water</a><a href="#dust">Dust</a><a href="#devices">Devices</a><a href="#faq">FAQ</a><a class="btn sm" href="#tool">Fix Now</a></nav></div></header>`;
    const b = this.querySelector('.burger'), n = this.querySelector('.nav');
    b.addEventListener('click', () => { const o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
    n.addEventListener('click', e => { if (e.target.tagName === 'A') { n.classList.remove('open'); b.setAttribute('aria-expanded', false); } });
    addEventListener('scroll', () => this.firstChild.classList.toggle('sc', scrollY > 10), { passive: true });
  }
}
customElements.define('site-header', SiteHeader);

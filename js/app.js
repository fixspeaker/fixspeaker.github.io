(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  let ctx, osc, gain, pan, tick, vib, tEnd, mode = 'water', bal = 'both', running = false;
  const info = {
    water: ['Water Ejector', 'Plays a steady 165Hz tone to push trapped water out of the speaker grille.', 30],
    dust: ['Dust Cleaner', 'Sweeps 200Hz to 1500Hz to shake loose lint and micro-particles.', 40],
    dual: ['Dual-Action', 'Combines the 165Hz tone with synchronized vibration for stubborn water or debris.', 30],
    balance: ['Stereo Balance Test', 'Check left and right speaker clarity after cleaning.', 0]
  };
  const ui = () => {
    $('#modeTitle').textContent = info[mode][0]; $('#modeDesc').textContent = info[mode][1];
    $('#balBtns').hidden = mode !== 'balance';
    $('#go').textContent = running ? 'Stop' : 'Start ' + (mode === 'balance' ? 'Test' : 'Cleaning');
    $('#go').classList.toggle('on', running); $('#orb').classList.toggle('run', running);
    $('#vibNote').hidden = !(mode === 'dual' && !navigator.vibrate);
  };
  function stop() {
    clearInterval(tick); clearInterval(vib); navigator.vibrate && navigator.vibrate(0);
    if (osc) { try { gain.gain.setTargetAtTime(0, ctx.currentTime, .03); osc.stop(ctx.currentTime + .1); } catch (e) {} osc = null; }
    running = false; $('#bar').style.width = '0'; $('#hz').textContent = '— Hz'; ui();
  }
  function start() {
    stop();
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume();
    gain = ctx.createGain(); gain.gain.value = +$('#vol').value;
    pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    osc = ctx.createOscillator(); osc.type = 'sine';
    osc.connect(gain); if (pan) { gain.connect(pan); pan.connect(ctx.destination); } else gain.connect(ctx.destination);
    const t0 = performance.now(), dur = info[mode][2] * 1000; tEnd = t0 + dur;
    osc.frequency.value = mode === 'balance' ? 440 : mode === 'dust' ? 200 : 165;
    if (pan) pan.pan.value = bal === 'left' ? -1 : bal === 'right' ? 1 : 0;
    osc.start(); running = true; ui();
    tick = setInterval(() => {
      const t = performance.now() - t0; let f = osc.frequency.value;
      if (mode === 'dust') f = 200 + 1300 * (.5 - .5 * Math.cos(2 * Math.PI * t / 6000));
      if (mode === 'balance' && bal === 'sweep' && pan) pan.pan.value = Math.sin(2 * Math.PI * t / 3000);
      if (mode === 'balance' && bal === 'freq') f = 100 + 1900 * (.5 - .5 * Math.cos(2 * Math.PI * t / 8000));
      osc.frequency.value = f; $('#hz').textContent = Math.round(f) + ' Hz';
      if (dur) { $('#bar').style.width = Math.min(100, t / dur * 100) + '%'; if (t >= dur) { stop(); $('#done').hidden = false; } }
    }, 40);
    if ((mode === 'dual') && navigator.vibrate) { navigator.vibrate([300, 80]); vib = setInterval(() => navigator.vibrate([300, 80]), 400); }
    $('#done').hidden = true;
  }
  $$('.tab').forEach(b => b.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.remove('act')); b.classList.add('act'); mode = b.dataset.mode; stop();
  }));
  $$('#balBtns button').forEach(b => b.addEventListener('click', () => {
    bal = b.dataset.bal; $$('#balBtns button').forEach(x => x.classList.toggle('act', x === b));
    if (running && mode === 'balance' && pan) pan.pan.value = bal === 'left' ? -1 : bal === 'right' ? 1 : 0; else if (!running) start();
  }));
  $('#go').addEventListener('click', () => running ? stop() : start());
  $('#vol').addEventListener('input', e => { if (gain && running) gain.gain.value = +e.target.value; $('#volv').textContent = Math.round(e.target.value * 100) + '%'; });
  document.addEventListener('visibilitychange', () => document.hidden && running && stop());
  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 });
  $$('.rv').forEach(el => io.observe(el));
  // faq
  $$('.faq details').forEach(d => d.addEventListener('toggle', () => d.open && $$('.faq details').forEach(o => o !== d && (o.open = false))));
  ui();
})();

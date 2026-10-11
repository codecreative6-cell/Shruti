const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s), R = (a, b) => a + Math.random() * (b - a);
    const C = ['#ff9bbd', '#ff7fa8', '#ffd54a', '#ffc107', '#ffffff', '#d1366f'];
    const mk = (p, t, css, cls) => { const e = document.createElement(t); e.style.cssText = css; if (cls) e.className = cls; p.append(e); return e };
    /* Photos: [file name, caption, image height]. Keep this HTML in the SAME folder as the photos.
       If your photos are in a sub-folder, set DIR to e.g. 'images/'. */
    const DIR = '';
    const PH = [
      ['imgggggg (29).jpg', 'Sunflower smile', 1560], ['imgggggg (28).jpg', 'A soft glance', 1560],
      ['imgggggg (1).webp', 'Arms wide in the snow', 1463], ['imgggggg (2).webp', 'A handful of snow', 1463],
      ['imgggggg (1).jpg', 'Golden hour by the lake', 1287], ['imgggggg (2).jpg', 'Blue kurta, carved stone', 1285],
      ['imgggggg (4).jpg', 'Looking back, smiling', 1560], ['imgggggg (5).jpg', 'Red and radiant', 1560],
      ['imgggggg (6).jpg', 'Cloudy sky, sunny smile', 1560], ['imgggggg (7).jpg', 'Over the shoulder', 1560],
      ['imgggggg (8).jpg', 'Mid-twirl laughter', 1560], ['imgggggg (11).jpg', 'Monsoon mood', 1560],
      ['imgggggg (12).jpg', 'Palm trees, quiet river', 1560], ['imgggggg (15).jpg', 'Sunshine in yellow', 1560],
      ['imgggggg (13).jpg', 'Eyes closed at the waterfall', 1560], ['imgggggg (16).jpg', 'Waterfall smile', 1560],
      ['imgggggg (18).jpg', 'Café mode: on', 1560], ['imgggggg (20).jpg', 'The shy laugh', 1560],
      ['imgggggg (21).jpg', 'Pure happiness', 1560], ['imgggggg (23).jpg', 'Fountain garden', 1560],
      ['imgggggg (24).jpg', 'Eyes closed, joy open', 1560], ['imgggggg (26).jpg', 'Saree and a red stole', 1560],
      ['imgggggg (33).jpg', 'One last look back', 1560], ['imgggggg (35).jpg', 'Graceful and grinning', 1560],
      ['imgggggg (36).jpg', 'Looking up at the sky', 1560]];
    const src = i => encodeURI(DIR + PH[i][0]);
    const IMG = p => `<img src="${encodeURI(DIR + p[0])}" width="1170" height="${p[2]}"`;

    addEventListener('DOMContentLoaded', () => {
      /* sunflower drawn in SVG: 24 petals + 110 seeds on the golden angle */
      const sf = () => {
        let p = '', s = '';
        for (let i = 0; i < 24; i++)p += `<g transform="rotate(${i * 15} 100 100)"><ellipse class="pt" style="--i:${i}" cx="100" cy="45" rx="9.5" ry="32" fill="${i % 2 ? '#ffc107' : '#ffd54a'}"/></g>`;
        for (let i = 0; i < 110; i++) { const a = i * 2.39996, r = 3.2 * Math.sqrt(i); s += `<circle cx="${(100 + r * Math.cos(a)).toFixed(1)}" cy="${(100 + r * Math.sin(a)).toFixed(1)}" r="${(1 + i / 110 * 1.4).toFixed(1)}" fill="${i % 3 ? '#8a4513' : '#3b1a07'}"/>` }
        return `<svg viewBox="0 0 200 200" aria-hidden="true">${p}<circle cx="100" cy="100" r="38" fill="#5b2a0e"/><g class="sd">${s}</g></svg>`
      };
      $$('[data-sf]').forEach(e => e.innerHTML = sf());
      $$('[data-split]').forEach(e => e.innerHTML = [...e.dataset.split].map((c, i) => `<i style="--i:${i}">${c == ' ' ? '&nbsp;' : c}</i>`).join(''));

      /* photos: hero, film strip, polaroid wall (file names come from PH above) */
      $('#hero').src = src(0);
      $('#mq').innerHTML = PH.concat(PH).map(p => IMG(p) + ' alt="">').join('');
      $('#wall').innerHTML = PH.map(p => `<figure class="pol rv">${IMG(p)} loading="lazy" alt="${p[1]}"><figcaption>${p[1]}</figcaption></figure>`).join('');
      $('#stage').innerHTML = PH.map(p => `<div class="slide">${IMG(p)} loading="lazy" alt="${p[1]}" draggable="false"></div>`).join('');

      /* SVG sunflowers for gate */
      document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="gb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d96f00"/><stop offset="1" stop-color="#ffb000"/></linearGradient><linearGradient id="gf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffab00"/><stop offset="1" stop-color="#ffe45c"/></linearGradient><radialGradient id="gc"><stop offset="0" stop-color="#5a2d0a"/><stop offset=".65" stop-color="#34170a"/><stop offset="1" stop-color="#8a6420"/></radialGradient></defs></svg>');
      function head(face) {
        const P = 'M0-22C14-36 15-74 0-96C-15-74-14-36 0-22Z'; let a = '', b = '', s = '';
        for (let i = 0; i < 20; i++) {
          a += `<g transform="rotate(${i * 18})"><g class="pp" style="--i:${i}"><path d="${P}" fill="url(#gb)"/></g></g>`;
          b += `<g transform="rotate(${i * 18 + 9})"><g class="pp" style="--i:${i + 20}"><path d="${P}" fill="url(#gf)"/><path d="M0-34V-84" stroke="#e59a00" stroke-width="1.2" opacity=".5"/></g></g>`
        }
        if (!face) for (let n = 1; n < 150; n++) { const r = 2.55 * Math.sqrt(n), t = n * 2.39996; s += `<circle cx="${(r * Math.cos(t)).toFixed(1)}" cy="${(r * Math.sin(t)).toFixed(1)}" r="1.5" fill="${n % 3 ? '#c98a3c' : '#e8b866'}"/>` }
        return `<g class="ly1">${a}</g><g class="ly2">${b}</g>` + (face ? '<circle r="50" fill="#6b3a12"/>' : '<circle r="37" fill="#6b3a12"/><circle r="34" fill="url(#gc)"/>' + s)
      }
      document.querySelectorAll('#gate .sf').forEach(el => {
        const f = el.hasAttribute('data-face');
        el.insertAdjacentHTML('afterbegin', `<svg viewBox="-100 -100 200 200">${head(f)}</svg>`)
      });

      /* sparkles + balloons */
      $$('#intro,.hero,.cake').forEach(b => { for (let i = 0; i < 14; i++)mk(b, 's', `left:${R(2, 96)}%;top:${R(2, 96)}%;--z:${R(8, 20)}px;--w:${R(0, 3)}s`) });
      for (let i = 0; i < 7; i++)mk($('#bl'), 'b', `--x:${6 + i * 14}%;--c:${C[i % 4]};--d:${R(10, 16)}s;--w:${-R(0, 12)}s`, 'bl');
      const fall = n => { for (let i = 0; i < n; i++)mk($('#fall'), 'i', `left:${R(0, 100)}%;--s:${R(.6, 1.3)};--d:${R(8, 15)}s;--w:${-R(0, 12)}s;--dx:${R(-140, 140)}px;--c:${C[i % C.length]}`) };

      /* opening gate */
      $('#open').onclick = () => {
        const g = $('#gate');
        g.classList.add('open');
        document.body.classList.add('open');
        document.body.classList.remove('locked');
        fall(26);
        setTimeout(() => g.remove(), 1200);
      };

      /* carousel logic */
      const sl = [...document.querySelectorAll('.slide')], N = sl.length;
      let cur = 0, moved = false, hov = false, vis = false;
      sl.forEach((e, i) => e.onclick = () => {
        if (moved) return;
        if (i == cur) { $('#lb img').src = e.firstElementChild.src; $('#lb').classList.add('on'); }
        else { cur = i; place(); }
      });
      function place() {
        sl.forEach((e, i) => {
          let d = (i - cur + N) % N; if (d > N / 2) d -= N; const a = Math.abs(d);
          e.style.cssText = `transform:translateX(${d * 60}%) translateZ(${-a * 140}px) rotateY(${-d * 40}deg) scale(${a ? 1 : 1.06});opacity:${a > 3 ? 0 : 1 - a * .2};z-index:${50 - a};pointer-events:${a > 3 ? 'none' : 'auto'};filter:${a ? 'brightness(.9)' : 'none'}`;
        });
        $('#ctr').textContent = (cur + 1) + ' / ' + N;
      }
      const go = n => { cur = (cur + n + N) % N; place() };
      $('.nx').onclick = () => go(1); $('.pv').onclick = () => go(-1);
      addEventListener('keydown', e => { if (e.key == 'ArrowRight') go(1); if (e.key == 'ArrowLeft') go(-1); });
      const cv = $('#cv'); let sx = null;
      cv.onpointerdown = e => sx = e.clientX;
      cv.onpointerup = e => { if (sx != null && Math.abs(e.clientX - sx) > 40) { moved = true; go(e.clientX < sx ? 1 : -1); setTimeout(() => moved = false, 80) } sx = null };
      cv.onmouseenter = () => hov = true; cv.onmouseleave = () => hov = false;
      new IntersectionObserver(es => vis = es[0].isIntersecting).observe(cv);
      setInterval(() => { if (vis && !hov && !$('#lb').classList.contains('on')) go(1) }, 3200);
      place();

      /* scroll reveal */
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15 });
      $$('.rv').forEach(e => io.observe(e));

      /* lightbox */
      const lb = $('#lb');
      $('#wall').onclick = e => { const im = e.target.closest('img'); if (im) { $('#lb img').src = im.src; lb.classList.add('on') } };
      lb.onclick = () => lb.classList.remove('on');
      addEventListener('keydown', e => { if (e.key == 'Escape') lb.classList.remove('on') });

      /* flip card */
      const fl = $('#flip'), tg = () => fl.classList.toggle('on');
      fl.onclick = tg; fl.onkeydown = e => { if (e.key == 'Enter' || e.key == ' ') { e.preventDefault(); tg() } };

      /* candles + confetti */
      const cake = $('#cake'), blow = $('#blow');
      const burst = () => {
        const b = cake.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + 30;
        for (let i = 0; i < 70; i++) { const a = R(0, 6.283), d = R(90, 320), e = mk(document.body, 'i', `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 120}px;--r:${R(-540, 540)}deg;--c:${C[i % C.length]}`, 'cf'); setTimeout(() => e.remove(), 1800) }
      };
      blow.onclick = () => {
        const out = cake.classList.toggle('out');
        blow.textContent = out ? 'Light them again' : 'Blow the candles';
        $('#wishmsg').textContent = out ? 'Wish made. Now let it bloom.' : 'Close your eyes and wish for something sunny.';
        if (out) burst()
      };
    });
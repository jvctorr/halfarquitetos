/* Half Arquitetos — script.js */
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // YEAR
  $('#yr').textContent = new Date().getFullYear();

  // THEME
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ha-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  $('#themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ha-theme', next);
  });

  // MOBILE NAV
  const mt = $('#menuToggle'), nm = $('#navMobile');
  mt?.addEventListener('click', () => {
    nm.classList.toggle('open');
    mt.setAttribute('aria-expanded', nm.classList.contains('open'));
  });
  $$('#navMobile a').forEach(a => a.addEventListener('click', () => nm.classList.remove('open')));

  // REVEAL
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // GALLERY
  const projects = [
    { img:'assets/images/projeto-04-casa.webp', cat:'residencial', title:'Residência com piscina e luz natural', desc:'Volumetria contemporânea, varanda integrada e materiais que dialogam com o entorno.', span:8, h:'h-wide' },
    { img:'assets/images/projeto-02-studio.webp', cat:'interiores', title:'Studio integrado e funcional', desc:'Marcenaria inteligente, mesa Saarinen e cadeiras Wishbone em composição acolhedora.', span:4, h:'h-tall' },
    { img:'assets/images/projeto-01-sala.webp', cat:'interiores', title:'Sala social com identidade', desc:'Painel ripado em madeira, sofá modular e mesa de jantar com vista panorâmica.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-03-infantil.webp', cat:'planejados', title:'Quarto infantil planejado', desc:'Beliche elevado, marcenaria sob medida e detalhes lúdicos para a rotina real.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-05-quarto.webp', cat:'reforma', title:'Quarto reformado com aconchego', desc:'Cama-baú, nichos e cabeceira ripada para mais organização e leveza.', span:4, h:'h-sq' },
  ];
  const gallery = $('#gallery');
  function renderGallery(filter='all'){
    gallery.innerHTML = '';
    projects.filter(p => filter==='all' || p.cat===filter).forEach((p,i) => {
      const el = document.createElement('div');
      el.className = `g-card span-${p.span} ${p.h} reveal`;
      el.innerHTML = `<img loading="lazy" src="${p.img}" alt="${p.title}">
        <div class="g-info"><div class="cat">${p.cat}</div><h4>${p.title}</h4></div>`;
      el.addEventListener('click', () => openLightbox(p));
      gallery.appendChild(el);
      requestAnimationFrame(()=> el.classList.add('in'));
    });
  }
  renderGallery();
  $$('.filters .chip').forEach(c => c.addEventListener('click', () => {
    $$('.filters .chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    renderGallery(c.dataset.filter);
  }));

  // LIGHTBOX
  const lb = $('#lightbox');
  function openLightbox(p){
    $('#lbImg').src = p.img;
    $('#lbImg').alt = p.title;
    $('#lbCat').textContent = p.cat;
    $('#lbTitle').textContent = p.title;
    $('#lbDesc').textContent = p.desc;
    $('#lbWpp').href = `https://wa.me/5571991276838?text=${encodeURIComponent('Olá, gostei do projeto: '+p.title+'. Quero um projeto assim.')}`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  $('#lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }

  // QUIZ
  const questions = [
    { q:'O que você deseja transformar?', opts:['Casa','Apartamento','Sala comercial','Loja','Consultório','Ambiente específico','Ainda estou decidindo'] },
    { q:'Qual sensação você quer para o espaço?', opts:['Moderno','Aconchegante','Minimalista','Sofisticado','Natural','Funcional','Elegante'] },
    { q:'Quais elementos você mais gosta?', opts:['Madeira','Tons claros','Iluminação quente','Cimento','Mármore','Cores neutras','Plantas','Vidro e linhas retas'] },
    { q:'Qual é o maior problema hoje?', opts:['Falta de espaço','Ambiente sem personalidade','Pouca funcionalidade','Reforma parada','Dúvida de orçamento','Falta de planejamento','Não sei por onde começar'] },
    { q:'O que você espera do projeto?', opts:['Mais conforto','Mais beleza','Mais organização','Valorização do imóvel','Experiência para clientes','Aproveitamento do espaço'] },
  ];
  const results = {
    natural:{ title:'Sofisticação Natural com Toque Aconchegante', text:'Seu perfil combina com materiais naturais, iluminação acolhedora, tons equilibrados e ambientes que transmitem conforto sem abrir mão da elegância.' },
    minimal:{ title:'Minimalismo Funcional', text:'Seu projeto pede clareza, organização visual e soluções inteligentes para aproveitar melhor cada metro do espaço.' },
    contemp:{ title:'Elegância Contemporânea', text:'Seu estilo combina com linhas modernas, materiais sofisticados e uma atmosfera visualmente marcante, mas equilibrada.' },
    func:{ title:'Funcionalidade Inteligente', text:'Seu principal desafio parece ser transformar o espaço em algo mais prático, bem resolvido e adaptado à rotina.' },
    comm:{ title:'Ambiente Comercial com Identidade', text:'Seu projeto precisa unir experiência, estética e estratégia para transmitir a essência da marca ao cliente.' },
  };
  let qi = 0, answers = [];
  const body = $('#quizBody'), bar = $('#quizBar');
  function renderQuiz(){
    bar.style.width = ((qi)/(questions.length))*100 + '%';
    if (qi >= questions.length) return showResult();
    const q = questions[qi];
    body.innerHTML = `<div class="q-step">Pergunta ${qi+1} de ${questions.length}</div>
      <div class="q-question">${q.q}</div>
      <div class="q-opts">${q.opts.map(o => `<button class="q-opt" data-v="${o}">${o}</button>`).join('')}</div>
      <div class="q-nav">
        <button class="btn btn-ghost" id="qBack" ${qi===0?'disabled style=\"opacity:.4\"':''}>← Voltar</button>
        <button class="btn btn-primary" id="qNext" disabled style="opacity:.5">Continuar →</button>
      </div>`;
    let chosen = null;
    $$('.q-opt', body).forEach(b => b.addEventListener('click', () => {
      $$('.q-opt', body).forEach(x => x.classList.remove('selected'));
      b.classList.add('selected'); chosen = b.dataset.v;
      const n = $('#qNext'); n.disabled = false; n.style.opacity=1;
    }));
    $('#qBack').addEventListener('click', () => { if (qi>0){ qi--; answers.pop(); renderQuiz(); } });
    $('#qNext').addEventListener('click', () => { if (chosen){ answers[qi]=chosen; qi++; renderQuiz(); } });
  }
  function computeResult(){
    const a = answers.map(s=>s.toLowerCase()).join(' ');
    if (/sala comercial|loja|consultório|clientes/.test(a)) return results.comm;
    if (/minimalista|organização|clareza/.test(a)) return results.minimal;
    if (/natural|aconchegante|madeira|plantas/.test(a)) return results.natural;
    if (/sofisticado|elegante|mármore|moderno/.test(a)) return results.contemp;
    return results.func;
  }
  function showResult(){
    bar.style.width='100%';
    const r = computeResult();
    const msg = `Olá, Half Arquitetos. Fiz o quiz no site e meu resultado foi: ${r.title}. Quero conversar sobre um projeto nesse estilo.`;
    body.innerHTML = `<div class="q-result">
      <span class="pill">Seu estilo</span>
      <h3>${r.title}</h3>
      <p>${r.text}</p>
      <div class="hero-cta" style="margin-top:18px">
        <a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/5571991276838?text=${encodeURIComponent(msg)}">Quero conversar sobre meu projeto nesse estilo</a>
        <a class="btn btn-ghost" href="#projetos">Ver projetos parecidos</a>
        <button class="btn btn-link" id="qRestart">Refazer o quiz ↻</button>
      </div>
    </div>`;
    $('#qRestart').addEventListener('click', () => { qi=0; answers=[]; renderQuiz(); });
  }
  renderQuiz();

  // CHAT
  const fab = $('#chatFab'), panel = $('#chatPanel'), msgs = $('#chatMsgs'),
        form = $('#chatForm'), input = $('#chatText');
  let chatId = localStorage.getItem('ha-chat-id');
  if (!chatId){ chatId = 'ha-' + Date.now() + '-' + Math.random().toString(36).slice(2,9); localStorage.setItem('ha-chat-id', chatId); }
  function addMsg(text, who='bot'){
    const b = document.createElement('div'); b.className = `bubble ${who}`; b.textContent = text; msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight; return b;
  }
  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', !panel.classList.contains('open'));
    if (msgs.children.length === 0){
      addMsg('Oi, seja bem-vindo(a). Você está pensando em reformar, construir ou apenas entender possibilidades para o seu espaço?');
    }
    if (panel.classList.contains('open')) input.focus();
  });
  $('#chatClose').addEventListener('click', () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim(); if (!text) return;
    addMsg(text, 'me'); input.value = '';
    const typing = addMsg('digitando…', 'bot'); typing.classList.add('typing');
    try{
      const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: chatId, human_message: text })
      });
      const data = await res.json().catch(()=> ({}));
      typing.remove();
      const reply = data.message || data.response || data.reply || data.output || data.text || (typeof data === 'string' ? data : null);
      addMsg(reply || 'Obrigado pela mensagem. Em breve retornaremos.');
    } catch(err){
      typing.remove();
      addMsg('Não consegui responder agora, mas você pode falar diretamente com a Half pelo WhatsApp.');
    }
  });
})();

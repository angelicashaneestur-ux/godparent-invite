(function () {
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get('to') || '').trim().toLowerCase();
  const selectedName = CONFIG.recipients[slug];

  if (!selectedName) {
    app.innerHTML = `
      <div class="screen screen-invalid">
        <div class="title">This link isn't quite right</div>
        <p>Please use the personal invitation link that was sent to you.</p>
      </div>`;
    return;
  }

  app.style.setProperty('--accent', CONFIG.event.accentColor);
  document.title = `Will you be ${CONFIG.event.childName}'s Godparent?`;

  const state = { screen: 'opening' };

  function goTo(screen) {
    state.screen = screen;
    render();
  }

  function submitRsvp(response) {
    if (CONFIG.rsvpEndpoint) {
      fetch(CONFIG.rsvpEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: selectedName,
          slug,
          response,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Best-effort: the confirmation screen still shows regardless of network state.
      });
    }
    goTo(response === 'accepted' ? 'confirmed-accept' : 'confirmed-decline');
  }

  function screenOpening() {
    return `
      <div class="screen screen-opening">
        <img src="assets/baby-photo.jpg" alt="${CONFIG.event.childName}">
        <div class="scrim"></div>
        <div class="copy fade-up">
          <div class="eyebrow">I have a special question</div>
          <div class="headline">for you</div>
          <button class="btn-primary-light" data-action="goToInvite">Open Invitation</button>
        </div>
      </div>`;
  }

  function screenInvite() {
    return `
      <div class="screen screen-invite">
        <div class="hero">
          <img src="assets/baby-photo-2.jpg" alt="${CONFIG.event.childName}">
          <div class="scrim"></div>
        </div>
        <div class="body">
          <div class="card-white fade-up" style="animation-delay:.1s">
            <div class="salutation">Dear ${selectedName},</div>
            <p>Hi, it's me, ${CONFIG.event.childName}! I may be little, but I already know I want you by my side. Will you be my Godparent at my christening?</p>
          </div>
          <div class="card-event fade-up" style="animation-delay:.15s">
            <div class="title">${CONFIG.event.childName}'s Christening</div>
            <div class="row"><div class="label">Date</div><div class="value">${CONFIG.event.eventDate}</div></div>
            <div class="row"><div class="label">Time</div><div class="value">${CONFIG.event.eventTime}</div></div>
            <div class="row"><div class="label">Venue</div><div class="value">${CONFIG.event.venue}</div></div>
          </div>
          <button class="btn-primary-dark fade-up" style="animation-delay:.2s" data-action="goToRsvp">RSVP Now</button>
        </div>
      </div>`;
  }

  function screenRsvp() {
    return `
      <div class="screen screen-rsvp">
        <button class="btn-back" data-action="backToInvite">&larr; Back</button>
        <div class="prompt fade-up">
          <div class="kicker">Dear ${selectedName}</div>
          <div class="question">So, will you?</div>
          <p>I'd love to know if you can stand by me as my Godparent on ${CONFIG.event.eventDate}.</p>
        </div>
        <div class="rsvp-actions">
          <button class="btn-accept" data-action="accept">Yes, I'd be honored</button>
          <button class="btn-decline" data-action="decline">I'm unable to attend</button>
        </div>
      </div>`;
  }

  function screenConfirmed(accepted) {
    const confirmColor = accepted ? CONFIG.event.accentColor : '#B08B5A';
    const confirmGlyph = accepted ? '✓' : '♥';
    const confirmTitle = accepted ? 'Yay, thank you!' : "That's okay";
    const confirmBody = accepted
      ? `I'm so happy you said yes, ${selectedName}! Can't wait to have you by my side on ${CONFIG.event.eventDate} at ${CONFIG.event.venue}.`
      : `Thank you for letting me know, ${selectedName}. I'll miss having you there, but I understand — I still love you either way.`;

    const giftHtml = accepted ? `
      <div class="gift-card fade-up" style="animation-delay:.2s">
        <div class="heading">If you'd like to bring a gift</div>
        <div class="gift-list">
          ${CONFIG.giftIdeas.map(g => `
            <div class="gift-item">
              <img src="${g.img}" alt="${g.label}">
              ${g.label}
            </div>`).join('')}
        </div>
      </div>` : '';

    return `
      <div class="screen screen-confirmed">
        <div class="badge pop-in" style="background:${confirmColor}"><span>${confirmGlyph}</span></div>
        <div class="title fade-up" style="animation-delay:.1s">${confirmTitle}</div>
        <p class="body-text fade-up" style="animation-delay:.15s">${confirmBody}</p>
        ${giftHtml}
        <button class="btn-return" data-action="backToInvite">Back to Invitation</button>
      </div>`;
  }

  function render() {
    switch (state.screen) {
      case 'opening': app.innerHTML = screenOpening(); break;
      case 'invite': app.innerHTML = screenInvite(); break;
      case 'rsvp': app.innerHTML = screenRsvp(); break;
      case 'confirmed-accept': app.innerHTML = screenConfirmed(true); break;
      case 'confirmed-decline': app.innerHTML = screenConfirmed(false); break;
    }
  }

  app.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;
    if (action === 'goToInvite') goTo('invite');
    else if (action === 'goToRsvp') goTo('rsvp');
    else if (action === 'backToInvite') goTo('invite');
    else if (action === 'accept') submitRsvp('accepted');
    else if (action === 'decline') submitRsvp('declined');
  });

  render();
})();

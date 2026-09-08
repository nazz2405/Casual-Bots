(() => {
  "use strict";

  const data = window.casualBotsData || { team: {}, players: [] };
  const team = data.team || {};
  const players = Array.isArray(data.players) ? data.players : [];
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[character]));

  const rosterGrid = $("#rosterGrid");
  const dialog = $("#playerDialog");
  const dialogContent = $("#dialogContent");
  const toast = $("#toast");
  let toastTimer;

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  };

  const playerCard = (player, index) => {
    const badges = (player.badges || []).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
    const number = String(index + 1).padStart(2, "0");

    return `
      <article class="player-card reveal" style="--player: ${escapeHtml(player.color || "#a97cff")}; --player-soft: ${escapeHtml(player.colorSoft || "#ffffff")}; --card-index: ${index};">
        <div class="player-card-top">
          <span class="player-number">${number}</span>
          <span class="player-status"><i></i>${escapeHtml(player.status || "Squad member")}</span>
        </div>
        <div class="player-portrait" aria-hidden="true">
          <span class="portrait-grid"></span>
          <span class="portrait-ring ring-one"></span>
          <span class="portrait-ring ring-two"></span>
          <span class="player-initial">${escapeHtml(player.initial || player.name?.[0] || "B")}</span>
          <span class="portrait-star">✦</span>
        </div>
        <div class="player-card-content">
          <p class="player-role">${escapeHtml(player.role || "Brawl Stars player")}</p>
          <h3>${escapeHtml(player.name || `PLAYER ${number}`)}</h3>
          <p class="player-handle">${escapeHtml(player.handle || "@casualbot")}</p>
          <div class="player-badges">${badges}</div>
          <button class="profile-button" type="button" data-player-index="${index}" aria-label="View ${escapeHtml(player.name || `player ${number}`)} profile">
            Open player card <span aria-hidden="true">↗</span>
          </button>
        </div>
      </article>`;
  };

  const renderRoster = () => {
    if (!rosterGrid) return;
    if (!players.length) {
      rosterGrid.innerHTML = '<p class="empty-roster">Add your players in <code>site-data.js</code> to launch the roster.</p>';
      return;
    }
    rosterGrid.innerHTML = players.slice(0, 3).map(playerCard).join("");
  };

  const openPlayer = (player) => {
    if (!dialog || !dialogContent || !player) return;
    const badges = (player.badges || []).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
    dialogContent.innerHTML = `
      <div class="dialog-profile" style="--player: ${escapeHtml(player.color || "#a97cff")}; --player-soft: ${escapeHtml(player.colorSoft || "#ffffff")};">
        <div class="dialog-portrait" aria-hidden="true">
          <span class="dialog-initial">${escapeHtml(player.initial || player.name?.[0] || "B")}</span>
          <span class="dialog-star">✦</span>
        </div>
        <div class="dialog-copy">
          <p class="player-role">${escapeHtml(player.role || "Brawl Stars player")}</p>
          <h2 id="dialogPlayerName">${escapeHtml(player.name || "Casual Bot")}</h2>
          <p class="dialog-handle">${escapeHtml(player.handle || "@casualbot")}</p>
          <div class="player-badges">${badges}</div>
          <p class="dialog-bio">${escapeHtml(player.bio || "Add this player’s story in site-data.js.")}</p>
          <blockquote>“${escapeHtml(player.specialty || "A key member of Casual Bots.")}”</blockquote>
          <dl class="player-details">
            <div><dt>Main mode</dt><dd>${escapeHtml(player.mainMode || "Add mode")}</dd></div>
            <div><dt>Favorite brawler</dt><dd>${escapeHtml(player.favoriteBrawler || "Add brawler")}</dd></div>
            <div><dt>Trophies</dt><dd>${escapeHtml(player.trophy || "Add trophies")}</dd></div>
            <div><dt>Win rate</dt><dd>${escapeHtml(player.winRate || "Add win rate")}</dd></div>
            <div><dt>Signature power</dt><dd>${escapeHtml(player.power || "Add strength")}</dd></div>
          </dl>
        </div>
      </div>`;
    dialog.showModal();
  };

  renderRoster();

  rosterGrid?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-player-index]");
    if (!trigger) return;
    openPlayer(players[Number(trigger.dataset.playerIndex)]);
  });

  $(".dialog-close")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const copyTeamTag = async () => {
    const tag = team.tag || "#CASUALBOTS";
    try {
      await navigator.clipboard.writeText(tag);
      showToast(`${tag} copied to your clipboard`);
    } catch {
      showToast(`Team tag: ${tag}`);
    }
  };

  $$('[data-copy-tag]').forEach((button) => button.addEventListener("click", copyTeamTag));
  $$('[data-team-tag]').forEach((element) => { element.textContent = team.tag || "#CASUALBOTS"; });
  $$('[data-next-session]').forEach((element) => { element.textContent = team.nextSession || "Session to be announced"; });
  $$('[data-mode-focus]').forEach((element) => { element.textContent = team.modeFocus || "Mode to be announced"; });

  const communityLink = $('[data-community-link]');
  if (communityLink && team.communityUrl) {
    communityLink.href = team.communityUrl;
    communityLink.target = "_blank";
    communityLink.rel = "noreferrer";
    communityLink.firstChild.textContent = "Join the community ";
  }

  const menuToggle = $(".menu-toggle");
  const siteNav = $("#siteNav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  $$("#siteNav a").forEach((link) => link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const header = $("#siteHeader");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }, { passive: true });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();

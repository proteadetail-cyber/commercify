// Commercify Master Interactive Web Application Logic

// ═══════ LICENSE KEY SYSTEM ═══════
const MASTER_KEY = 'Amaya@1Sage';
const WHOP_API_KEY = 'apik_n2mFksGhn9xrs_C6439764_C_f45e8ea09bcac92b19cded9b60fdb445e0fd16c80fa1096d9879703e497f14';
const LICENSE_STORAGE_KEY = 'commercify_license';

function checkLicense() {
  const savedKey = localStorage.getItem(LICENSE_STORAGE_KEY);
  if (savedKey === MASTER_KEY) {
    unlockApp();
    return;
  }
  if (savedKey) {
    // Re-validate saved Whop key silently
    validateWhopKey(savedKey).then(valid => {
      if (valid) unlockApp();
      else showLockScreen();
    }).catch(() => {
      // If offline, trust the saved key
      unlockApp();
    });
  } else {
    showLockScreen();
  }
}

async function validateWhopKey(key) {
  // Master key bypass (works offline)
  if (key === MASTER_KEY) return true;

  try {
    // Check if key matches a valid Whop membership
    const res = await fetch(`https://api.whop.com/api/v5/memberships/${key}`, {
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      // Membership exists and is active
      if (data.status === 'active' || data.status === 'completed' || data.status === 'trialing') {
        return true;
      }
    }

    // Also try as a license key validation
    const licRes = await fetch(`https://api.whop.com/api/v5/license_keys/${encodeURIComponent(key)}/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    if (licRes.ok) {
      const licData = await licRes.json();
      if (licData.valid || licData.status === 'active') return true;
    }

    return false;
  } catch (err) {
    console.warn('Whop validation failed (possibly offline):', err);
    return false;
  }
}

function showLockScreen() {
  document.body.classList.add('app-locked');
  const lock = document.getElementById('lockScreen');
  lock.style.display = 'flex';
  lock.classList.remove('hidden');

  const input = document.getElementById('licenseKeyInput');
  const btn = document.getElementById('unlockBtn');
  const error = document.getElementById('lockError');

  btn.addEventListener('click', () => attemptUnlock(input, error, btn));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptUnlock(input, error, btn);
    error.textContent = '';
  });

  setTimeout(() => input.focus(), 300);
}

async function attemptUnlock(input, error, btn) {
  const key = input.value.trim();
  if (!key) {
    error.textContent = 'Please enter a license key';
    shakeInput(input);
    return;
  }

  // Show loading state
  btn.textContent = 'Verifying...';
  btn.disabled = true;
  error.textContent = '';

  const valid = await validateWhopKey(key);

  if (valid) {
    localStorage.setItem(LICENSE_STORAGE_KEY, key);
    unlockApp();
  } else {
    error.textContent = 'Invalid license key';
    btn.textContent = 'Unlock';
    btn.disabled = false;
    shakeInput(input);
    input.select();
  }
}

function shakeInput(el) {
  el.style.animation = 'none';
  el.offsetHeight; // trigger reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = 'none', 400);
}

function unlockApp() {
  document.body.classList.remove('app-locked');
  const lock = document.getElementById('lockScreen');
  lock.classList.add('hidden');
  setTimeout(() => lock.style.display = 'none', 500);
  initApp();
}

// ═══════ APP INIT (runs after unlock) ═══════
function initApp() {
  initTabNavigation();
  renderStageCards();
  initProfitCalculator();
  initNicheScorecard();
  renderToolkit('all', '');
  renderVideos('all');
  renderMistakes();
  renderMyChecklist();
  loadUserNotes();
  setupEventListeners();
  updateProgressTracker();
}

document.addEventListener('DOMContentLoaded', () => {
  checkLicense();
});

// Global State
let activeView = 'blueprint';
let activeToolkitCategory = 'all';
let activeVideoCategory = 'all';
let savedProgress = JSON.parse(localStorage.getItem('commercify_progress') || '{}');
let savedNotes = JSON.parse(localStorage.getItem('commercify_notes') || '{}');

// 1. View Navigation
function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeView = tab.dataset.view;
      switchView(activeView);
    });
  });
}

function switchView(viewId) {
  const views = document.querySelectorAll('.app-view');
  views.forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 2. Render Stage Cards
function renderStageCards() {
  const container = document.getElementById('stages-cards-container');
  if (!container) return;

  container.innerHTML = COMMERCIFY_STAGES.map(stage => {
    const isCompleted = isStageComplete(stage.id);
    return `
      <div class="glass stage-card" onclick="openStageModal('${stage.id}')">
        <div>
          <div class="stage-card-header">
            <div class="stage-num-orb">${stage.num}</div>
            <span class="eyebrow" style="margin-bottom:0;">${stage.eyebrow}</span>
          </div>
          <h3>${stage.icon} ${stage.title}</h3>
          <p>${stage.subtitle}</p>
        </div>
        <div class="stage-card-footer">
          <span>${stage.actionItems.length} Checklist Tasks</span>
          <span>${isCompleted ? '✓ Completed' : 'Explore Guide →'}</span>
        </div>
      </div>
    `;
  }).join('');
}

function isStageComplete(stageId) {
  const stage = COMMERCIFY_STAGES.find(s => s.id === stageId);
  if (!stage) return false;
  return stage.actionItems.every(item => savedProgress[item.id] === true);
}

// 3. Profit Calculator Slider Logic
function initProfitCalculator() {
  const priceSlider = document.getElementById('slider-price');
  const costSlider = document.getElementById('slider-cost');
  const feeSlider = document.getElementById('slider-fee');
  const cacSlider = document.getElementById('slider-cac');

  if (!priceSlider) return;

  const calculate = () => {
    const price = parseFloat(priceSlider.value) || 0;
    const cost = parseFloat(costSlider.value) || 0;
    const feePct = parseFloat(feeSlider.value) || 0;
    const cac = parseFloat(cacSlider.value) || 0;

    document.getElementById('val-price').innerText = `$${price.toFixed(2)}`;
    document.getElementById('val-cost').innerText = `$${cost.toFixed(2)}`;
    document.getElementById('val-fee').innerText = `${feePct.toFixed(1)}%`;
    document.getElementById('val-cac').innerText = `$${cac.toFixed(2)}`;

    const feeAmount = price * (feePct / 100);
    const netProfit = price - cost - feeAmount - cac;
    const marginPct = price > 0 ? (netProfit / price) * 100 : 0;
    const roas = cac > 0 ? (price / cac) : 0;

    const netEl = document.getElementById('calc-net-profit');
    if (netEl) {
      netEl.innerText = `$${netProfit.toFixed(2)}`;
      netEl.style.color = netProfit >= 0 ? 'var(--accent)' : '#ef4444';
    }

    const marginEl = document.getElementById('calc-margin');
    if (marginEl) marginEl.innerText = `${marginPct.toFixed(1)}%`;

    const roasEl = document.getElementById('calc-roas');
    if (roasEl) roasEl.innerText = `${roas.toFixed(2)}x`;

    const monthlyOrders = 100;
    const monthlyNet = netProfit * monthlyOrders;
    const monthlyEl = document.getElementById('calc-monthly-net');
    if (monthlyEl) {
      monthlyEl.innerText = `$${monthlyNet.toFixed(2)}`;
      monthlyEl.style.color = monthlyNet >= 0 ? '#FFF' : '#ef4444';
    }
  };

  [priceSlider, costSlider, feeSlider, cacSlider].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  calculate();
}

// 4. Niche Scorecard Validator
function initNicheScorecard() {
  const items = document.querySelectorAll('.check-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const isChecked = item.classList.contains('checked');
      item.querySelector('.checkbox-custom').innerText = isChecked ? '✓' : '';
      updateScorecardScore();
    });
  });
}

function updateScorecardScore() {
  const items = document.querySelectorAll('#view-scorecard .check-item');
  const total = items.length;
  const checked = document.querySelectorAll('#view-scorecard .check-item.checked').length;
  const score = total > 0 ? Math.round((checked / total) * 100) : 0;

  const scoreEl = document.getElementById('score-value');
  const verdictEl = document.getElementById('score-verdict');

  if (scoreEl) scoreEl.innerText = `${score}%`;

  if (verdictEl) {
    if (score >= 80) {
      verdictEl.innerText = '🚀 High Viability Niche! Strong margins and validated demand.';
      verdictEl.style.color = 'var(--accent-dark)';
    } else if (score >= 50) {
      verdictEl.innerText = '⚠️ Moderate Risk. Adjust pricing, freight agreements, or product differentiation.';
      verdictEl.style.color = '#d97706';
    } else {
      verdictEl.innerText = '❌ High Risk Niche. Re-evaluate supplier costs or target market pain point.';
      verdictEl.style.color = '#dc2626';
    }
  }
}

// 5. Toolkit Directory Filter & Search
function renderToolkit(category = 'all', query = '') {
  const container = document.getElementById('toolkit-items-container');
  if (!container) return;

  const lowerQuery = query.toLowerCase();
  let html = '';

  TOOLKIT_CATEGORIES.forEach(catGroup => {
    if (category !== 'all' && catGroup.category.toLowerCase() !== category.toLowerCase()) return;

    const filteredTools = catGroup.tools.filter(t => 
      t.name.toLowerCase().includes(lowerQuery) || t.desc.toLowerCase().includes(lowerQuery)
    );

    if (filteredTools.length === 0) return;

    filteredTools.forEach(tool => {
      html += `
        <div class="glass tool-card">
          <div>
            <span class="tag">${tool.tag}</span>
            <h5>${tool.name}</h5>
            <p>${tool.desc}</p>
          </div>
          <div style="margin-top:14px; font-size:0.8rem; font-weight:700; color:var(--ink-muted);">
            Category: ${catGroup.category}
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = html || `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--ink-muted);">No tools match your search criteria.</div>`;
}

// 6. Video Masterclasses Render
function renderVideos(filter = 'all') {
  const container = document.getElementById('videos-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? CURATED_VIDEOS 
    : CURATED_VIDEOS.filter(v => v.stageId === filter);

  container.innerHTML = filtered.map(vid => `
    <div class="glass video-card">
      <div>
        <span class="eyebrow" style="padding:4px 10px; font-size:0.75rem; margin-bottom:8px;">${vid.rank}</span>
        <h3>${vid.creator}</h3>
        <span class="channel">${vid.channel}</span>
        <p class="why">${vid.why}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
        <span class="tag" style="margin-bottom:0;">${vid.tag}</span>
        <a href="${vid.url}" target="_blank" rel="noopener" class="btn btn-ghost" style="padding:8px 16px; font-size:0.85rem;">Watch Channel →</a>
      </div>
    </div>
  `).join('');
}

// 7. Mistakes List
function renderMistakes() {
  const container = document.getElementById('mistakes-container');
  if (!container) return;

  container.innerHTML = COMMON_MISTAKES.map(m => `
    <div class="glass mistake">
      <div class="x">✕</div>
      <div style="font-size:1.02rem; color:var(--ink-primary);">${m}</div>
    </div>
  `).join('');
}

// 8. Render My Checklist View
function renderMyChecklist() {
  const container = document.getElementById('my-checklist-container');
  if (!container) return;

  let html = '';
  COMMERCIFY_STAGES.forEach(stage => {
    html += `
      <div class="glass" style="margin-bottom:24px;">
        <h3 style="font-size:1.3rem; margin-bottom:14px;">${stage.icon} ${stage.title}</h3>
        <div class="checklist-items">
          ${stage.actionItems.map(item => {
            const isChecked = savedProgress[item.id] === true;
            return `
              <div class="check-item ${isChecked ? 'checked' : ''}" onclick="toggleChecklistItem('${item.id}', this)">
                <div class="checkbox-custom">${isChecked ? '✓' : ''}</div>
                <span style="font-size:0.98rem; font-weight:600;">${item.text}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 9. Notes System
function loadUserNotes() {
  const textarea = document.getElementById('user-launch-notes');
  if (textarea && savedNotes.launchNotes) {
    textarea.value = savedNotes.launchNotes;
  }
}

function saveUserNotes() {
  const textarea = document.getElementById('user-launch-notes');
  if (textarea) {
    savedNotes.launchNotes = textarea.value;
    localStorage.setItem('commercify_notes', JSON.stringify(savedNotes));
    const btn = document.getElementById('btn-save-notes');
    if (btn) {
      btn.innerText = '✓ Saved!';
      setTimeout(() => { btn.innerText = '💾 Save Notes'; }, 2000);
    }
  }
}

// 10. Stage Detail Modal Popup
function openStageModal(stageId) {
  const stage = COMMERCIFY_STAGES.find(s => s.id === stageId);
  if (!stage) return;

  const modal = document.getElementById('stage-modal');
  const body = document.getElementById('modal-body-content');

  let html = `
    <span class="eyebrow">${stage.eyebrow}</span>
    <h2 style="font-size:2.2rem; margin:8px 0 14px;">${stage.icon} ${stage.title}</h2>
    <p style="font-size:1.1rem; color:var(--ink-secondary); line-height:1.65; margin-bottom:28px;">${stage.subtitle}</p>
  `;

  if (stage.steps) {
    html += `<div style="display:flex; flex-direction:column; gap:24px;">`;
    stage.steps.forEach(step => {
      html += `
        <div style="display:grid; grid-template-columns:50px 1fr; gap:20px; align-items:start;">
          <div style="width:44px; height:44px; border-radius:50%; background:var(--accent); color:#12180E; font-weight:800; font-size:1.2rem; display:flex; align-items:center; justify-content:center;">${step.num}</div>
          <div>
            <h3 style="font-size:1.25rem; margin-bottom:8px;">${step.title}</h3>
            <p style="font-size:1rem; color:var(--ink-secondary); line-height:1.6;">${step.content}</p>
            ${step.tools ? `<div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;">${step.tools.map(t => `<span class="cat-pill" style="font-size:0.8rem;">${t}</span>`).join('')}</div>` : ''}
            ${step.callout ? `<div style="margin-top:14px; padding:14px 18px; border-left:4px solid var(--accent); background:var(--accent-light); border-radius:0 10px 10px 0; font-size:0.92rem; font-weight:600;">${step.callout}</div>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  if (stage.comparison) {
    html += `
      <h3 style="margin:28px 0 14px;">Platform Comparison</h3>
      <div class="glass" style="padding:0; overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
          <thead>
            <tr style="background:var(--pearl-alt); border-bottom:1px solid var(--pearl-border);">
              <th style="padding:12px 16px;">Platform</th>
              <th style="padding:12px 16px;">Best For</th>
              <th style="padding:12px 16px;">Cost</th>
              <th style="padding:12px 16px;">Trade-off</th>
            </tr>
          </thead>
          <tbody>
            ${stage.comparison.map(c => `
              <tr style="border-bottom:1px solid var(--pearl-border);">
                <td style="padding:12px 16px; font-weight:700;">${c.platform}</td>
                <td style="padding:12px 16px;">${c.bestFor}</td>
                <td style="padding:12px 16px; font-weight:600;">${c.cost}</td>
                <td style="padding:12px 16px; color:var(--ink-secondary);">${c.tradeoff}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  html += `
    <h3 style="margin:32px 0 14px;">Stage Checklist Tasks</h3>
    <div class="checklist-items">
      ${stage.actionItems.map(item => {
        const isChecked = savedProgress[item.id] === true;
        return `
          <div class="check-item ${isChecked ? 'checked' : ''}" onclick="toggleChecklistItem('${item.id}', this)">
            <div class="checkbox-custom">${isChecked ? '✓' : ''}</div>
            <span style="font-size:0.95rem; font-weight:600;">${item.text}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;

  body.innerHTML = html;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('stage-modal').classList.remove('active');
}

function toggleChecklistItem(id, el) {
  el.classList.toggle('checked');
  const isChecked = el.classList.contains('checked');
  el.querySelector('.checkbox-custom').innerText = isChecked ? '✓' : '';
  savedProgress[id] = isChecked;
  localStorage.setItem('commercify_progress', JSON.stringify(savedProgress));
  updateProgressTracker();
  renderStageCards();
  renderMyChecklist();
}

function updateProgressTracker() {
  let total = 0;
  let done = 0;
  COMMERCIFY_STAGES.forEach(stage => {
    stage.actionItems.forEach(item => {
      total++;
      if (savedProgress[item.id]) done++;
    });
  });

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const badgeText = document.getElementById('app-progress-text');
  if (badgeText) badgeText.innerText = `${done}/${total} Tasks Done (${pct}%)`;

  const bar = document.getElementById('progress-bar-fill');
  if (bar) bar.style.width = `${pct}%`;
}

// 11. Event Listeners
function setupEventListeners() {
  const modal = document.getElementById('stage-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const toolkitSearch = document.getElementById('toolkit-search');
  if (toolkitSearch) {
    toolkitSearch.addEventListener('input', (e) => {
      renderToolkit(activeToolkitCategory, e.target.value);
    });
  }

  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeToolkitCategory = pill.dataset.category;
      const searchVal = document.getElementById('toolkit-search')?.value || '';
      renderToolkit(activeToolkitCategory, searchVal);
    });
  });

  const saveNotesBtn = document.getElementById('btn-save-notes');
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', saveUserNotes);
  }
}

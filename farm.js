/* 
 * farm.js — compliant scaffold (no network calls)
 * Purpose: Provide a floating UI + timing/queue logic for pixel simulation.
 * How to use:
 *   1) Include this file on any page (or run in Tampermonkey).
 *   2) The default "painter" only logs actions; it does NOT contact any website.
 *   3) If you gain access to an official, terms‑compliant API, plug it into setPainter().
 */

(() => {
  const CONFIG = {
    START_X: 742,
    START_Y: 1148,
    PIXELS_PER_LINE: 100,
    DELAY_MS: 1000,
    THEME: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      text: '#ffffff',
      highlight: '#775ce3',
      success: '#00ff00',
      error: '#ff0000'
    }
  };

  const state = {
    running: false,
    paintedCount: 0,
    lastPixel: null,
    minimized: false,
    menuOpen: false,
    language: 'en',
    // painter: async ({x, y, colorId}) => { ... return { ok: boolean, message?: string } }
    painter: async ({ x, y, colorId }) => {
      // DEFAULT: simulation only — NO network calls.
      await sleep(50);
      console.log(`[SIM] paint at (${x},${y}) with color #${colorId}`);
      return { ok: true, message: 'Simulated pixel' };
    }
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * CONFIG.PIXELS_PER_LINE),
    y: Math.floor(Math.random() * CONFIG.PIXELS_PER_LINE)
  });
  const getRandomColorId = () => 1 + Math.floor(Math.random() * 31);

  // Public hook to replace the painter with an official/allowed API.
  window.setPainter = (painterFn) => {
    if (typeof painterFn === 'function') state.painter = painterFn;
  };

  const createUI = () => {
    if (state.menuOpen) return;
    state.menuOpen = true;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .wplace-bot-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 260px;
        background: ${CONFIG.THEME.primary};
        border: 1px solid ${CONFIG.THEME.accent};
        border-radius: 10px;
        padding: 0;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        z-index: 999999;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        color: ${CONFIG.THEME.text};
        animation: slideIn 0.4s ease-out;
        overflow: hidden;
      }
      .wplace-header {
        padding: 12px 15px;
        background: ${CONFIG.THEME.secondary};
        color: ${CONFIG.THEME.highlight};
        font-size: 15px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
      }
      .wplace-content { padding: 14px; display: ${state.minimized ? 'none' : 'block'}; }
      .wplace-controls { display: flex; gap: 10px; margin-bottom: 12px; }
      .wplace-btn {
        flex: 1; padding: 9px 10px; border: none; border-radius: 8px;
        font-weight: 700; cursor: pointer;
      }
      .wplace-btn-start { background: ${CONFIG.THEME.accent}; color: #fff; }
      .wplace-btn-stop  { background: ${CONFIG.THEME.error}; color: #fff; }
      .wplace-stats {
        background: ${CONFIG.THEME.secondary}; padding: 10px; border-radius: 8px; margin-bottom: 12px;
      }
      .wplace-stat-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
      .wplace-status { padding: 8px; border-radius: 6px; text-align: center; font-size: 13px; background: rgba(255,255,255,0.08); }
      #paintEffect { position: absolute; inset: 0; pointer-events: none; border-radius: 10px; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'wplace-bot-panel';
    panel.innerHTML = `
      <div id="paintEffect"></div>
      <div class="wplace-header">
        <div>WPlace Planner</div>
        <button id="minimizeBtn" style="background:none;border:none;color:#fff;opacity:.7">_</button>
      </div>
      <div class="wplace-content">
        <div class="wplace-controls">
          <button id="toggleBtn" class="wplace-btn wplace-btn-start">Start</button>
        </div>
        <div class="wplace-stats" id="statsArea">
          <div class="wplace-stat-item"><span>Pixels</span><span id="pxCount">0</span></div>
          <div class="wplace-stat-item"><span>Last</span><span id="lastPx">—</span></div>
        </div>
        <div class="wplace-status" id="statusText">Ready</div>
      </div>
    `;
    document.body.appendChild(panel);

    // Draggable
    const header = panel.querySelector('.wplace-header');
    let pos1=0,pos2=0,pos3=0,pos4=0;
    header.onmousedown = (e) => {
      if (e.target.id === 'minimizeBtn') return;
      e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY;
      document.onmouseup = () => { document.onmouseup=null; document.onmousemove=null; };
      document.onmousemove = (ev) => {
        ev.preventDefault();
        pos1 = pos3 - ev.clientX; pos2 = pos4 - ev.clientY; pos3 = ev.clientX; pos4 = ev.clientY;
        panel.style.top  = (panel.offsetTop  - pos2) + 'px';
        panel.style.left = (panel.offsetLeft - pos1) + 'px';
      };
    };

    const toggleBtn = panel.querySelector('#toggleBtn');
    const minimizeBtn = panel.querySelector('#minimizeBtn');
    const statusText = panel.querySelector('#statusText');
    const content = panel.querySelector('.wplace-content');
    const pxCount = panel.querySelector('#pxCount');
    const lastPx = panel.querySelector('#lastPx');
    const paintEffect = panel.querySelector('#paintEffect');

    const setStatus = (msg) => { statusText.textContent = msg; };
    const setCounts = () => {
      pxCount.textContent = state.paintedCount;
      lastPx.textContent = state.lastPixel ? `${state.lastPixel.x},${state.lastPixel.y}` : '—';
    };

    toggleBtn.addEventListener('click', async () => {
      state.running = !state.running;
      if (state.running) {
        toggleBtn.textContent = 'Stop';
        toggleBtn.classList.remove('wplace-btn-start');
        toggleBtn.classList.add('wplace-btn-stop');
        setStatus('Running (simulation)');
        loop();
      } else {
        toggleBtn.textContent = 'Start';
        toggleBtn.classList.add('wplace-btn-start');
        toggleBtn.classList.remove('wplace-btn-stop');
        setStatus('Paused');
      }
    });

    minimizeBtn.addEventListener('click', () => {
      state.minimized = !state.minimized;
      content.style.display = state.minimized ? 'none' : 'block';
    });

    async function loop() {
      while (state.running) {
        const { x, y } = getRandomPosition();
        const colorId = getRandomColorId();
        try {
          const res = await state.painter({ x, y, colorId });
          if (res && res.ok) {
            state.paintedCount++;
            state.lastPixel = { x: CONFIG.START_X + x, y: CONFIG.START_Y + y, colorId };
            paintEffect.style.animation = 'pulse 0.5s';
            setTimeout(() => (paintEffect.style.animation = ''), 500);
            setStatus(res.message || 'OK');
          } else {
            setStatus((res && res.message) || 'Failed (sim)');
          }
        } catch (e) {
          setStatus('Error in painter (sim)');
          console.error(e);
        }
        setCounts();
        await sleep(CONFIG.DELAY_MS);
      }
    }
  };

  // Auto-start UI
  if (typeof window !== 'undefined' && document && document.body) {
    createUI();
  }
})();
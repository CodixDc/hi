/* 
 * image.js — WPlace Auto Image Tool
 * Combines palette/diff utilities with a floating GUI
 */
(() => {
  // ================== PALETTE / UTILS ==================
  const basic = { "0,0,0":1,"60,60,60":2,"120,120,120":3,"210,210,210":4,"255,255,255":5,"96,0,24":6,"237,28,36":7,"255,127,39":8,"246,170,9":9,"249,221,59":10,"255,250,188":11,"14,185,104":12,"19,230,123":13,"135,255,94":14,"12,129,110":15,"16,174,166":16,"19,225,190":17,"40,80,158":18,"64,147,228":19,"96,247,242":20,"107,80,246":21,"153,177,251":22,"120,12,153":23,"170,56,185":24,"224,159,249":25,"203,0,122":26,"236,31,128":27,"243,141,169":28,"104,70,52":29,"149,104,42":30,"248,178,119":31 };
  const premium = {"170,170,170":32,"165,14,30":33,"250,128,114":34,"228,92,26":35,"214,181,148":36,"156,132,49":37,"197,173,49":38,"232,212,95":39,"74,107,58":40,"90,148,74":41,"132,197,115":42,"15,121,159":43,"187,250,242":44,"125,199,255":45,"77,49,184":46,"74,66,132":47,"122,113,196":48,"181,174,241":49,"219,164,99":50,"209,128,81":51,"255,197,165":52,"155,82,73":53,"209,128,120":54,"250,182,164":55,"123,99,82":56,"156,132,107":57,"51,57,65":58,"109,117,141":59,"179,185,209":60,"109,100,63":61,"148,140,107":62,"205,197,158":63};
  const palette = { ...basic, ...premium };
  const entries = Object.entries(palette).map(([k, id]) => ({ id, rgb: k.split(',').map(Number) }));

  function nearestColorId(r, g, b) {
    let bestId = 0, best = Infinity;
    for (const p of entries) {
      const d = Math.abs(r - p.rgb[0]) + Math.abs(g - p.rgb[1]) + Math.abs(b - p.rgb[2]);
      if (d < best) { best = d; bestId = p.id; }
    }
    return bestId || 0;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error('Failed to load image: ' + src));
      img.src = src;
    });
  }

  async function imageToTemplate(src, { useNearest = true } = {}) {
    const img = await loadImage(src);
    const { width, height } = img;
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, width, height).data;

    const data = Array.from({ length: width }, () => new Array(height).fill(0));
    const lookup = (r,g,b) => useNearest ? nearestColorId(r,g,b) : (palette[`${r},${g},${b}`] || 0);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const a = d[i + 3];
        if (a === 255) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          data[x][y] = lookup(r,g,b);
        } else {
          data[x][y] = 0;
        }
      }
    }
    return { width, height, data };
  }

  // Expose API
  window.WPlaceImageTools = { imageToTemplate, nearestColorId };

  // ================== SIMPLE GUI ==================
  const container = document.createElement('div');
  container.style = `
    position:fixed;top:20px;right:20px;z-index:9999;
    background:#111;color:white;font-family:sans-serif;
    border:1px solid #444;border-radius:8px;
    padding:10px;width:250px;
  `;
  container.innerHTML = `
    <h3 style="margin:0 0 10px 0;font-size:16px;">WPlace Auto-Image</h3>
    <input type="file" id="imgUpload"><br><br>
    <canvas id="previewCanvas" style="max-width:100%;border:1px solid #333;"></canvas>
    <p id="status" style="font-size:12px;margin-top:8px;">Idle</p>
  `;
  document.body.appendChild(container);

  const fileInput = container.querySelector('#imgUpload');
  const previewCanvas = container.querySelector('#previewCanvas');
  const status = container.querySelector('#status');
  const ctx = previewCanvas.getContext('2d');

  fileInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    status.textContent = "Loading image...";
    const template = await WPlaceImageTools.imageToTemplate(url);
    previewCanvas.width = template.width;
    previewCanvas.height = template.height;

    // Draw preview
    for (let x = 0; x < template.width; x++) {
      for (let y = 0; y < template.height; y++) {
        if (template.data[x][y]) {
          ctx.fillStyle = "black";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    status.textContent = `Loaded ${template.width}x${template.height} image`;
  });
})();
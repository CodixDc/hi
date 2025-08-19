(async () => {
  /* ======================================================
   * WPlace Auto-Image — FULL MERGED SCRIPT
   * - Old GUI (draggable window, stats, progress, resize)
   * - New utilities (imageToTemplate, nearestColorId, palette)
   * ====================================================== */

  /* ----------------- CONFIG ----------------- */
  const CONFIG = {
    COOLDOWN_DEFAULT: 31000,
    TRANSPARENCY_THRESHOLD: 100,
    WHITE_THRESHOLD: 250,
    LOG_INTERVAL: 10,
    THEME: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      text: '#ffffff',
      highlight: '#775ce3',
      success: '#00ff00',
      error: '#ff0000',
      warning: '#ffaa00'
    }
  };

  /* ----------------- I18N TEXTS (unchanged) ----------------- */
  const TEXTS = {
    pt: {
      title: "WPlace Auto-Image",
      initBot: "Iniciar Auto-BOT",
      uploadImage: "Upload da Imagem",
      resizeImage: "Redimensionar Imagem",
      selectPosition: "Selecionar Posição",
      startPainting: "Iniciar Pintura",
      stopPainting: "Parar Pintura",
      checkingColors: "🔍 Verificando cores disponíveis...",
      noColorsFound: "❌ Abra a paleta de cores no site e tente novamente!",
      colorsFound: "✅ {count} cores disponíveis encontradas",
      loadingImage: "🖼️ Carregando imagem...",
      imageLoaded: "✅ Imagem carregada com {count} pixels válidos",
      imageError: "❌ Erro ao carregar imagem",
      selectPositionAlert: "Pinte o primeiro pixel na localização onde deseja que a arte comece!",
      waitingPosition: "👆 Aguardando você pintar o pixel de referência...",
      positionSet: "✅ Posição definida com sucesso!",
      positionTimeout: "❌ Tempo esgotado para selecionar posição",
      startPaintingMsg: "🎨 Iniciando pintura...",
      paintingProgress: "🧱 Progresso: {painted}/{total} pixels...",
      noCharges: "⌛ Sem cargas. Aguardando {time}...",
      paintingStopped: "⏹️ Pintura interrompida pelo usuário",
      paintingComplete: "✅ Pintura concluída! {count} pixels pintados.",
      paintingError: "❌ Erro durante a pintura",
      missingRequirements: "❌ Carregue uma imagem e selecione uma posição primeiro",
      progress: "Progresso",
      pixels: "Pixels",
      charges: "Cargas",
      estimatedTime: "Tempo estimado",
      initMessage: "Clique em 'Iniciar Auto-BOT' para começar",
      waitingInit: "Aguardando inicialização...",
      resizeSuccess: "✅ Imagem redimensionada para {width}x{height}",
      paintingPaused: "⏸️ Pintura pausada na posição X: {x}, Y: {y}"
    },
    en: {
      title: "WPlace Auto-Image",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      checkingColors: "🔍 Checking available colors...",
      noColorsFound: "❌ Open the color palette on the site and try again!",
      colorsFound: "✅ {count} available colors found",
      loadingImage: "🖼️ Loading image...",
      imageLoaded: "✅ Image loaded with {count} valid pixels",
      imageError: "❌ Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "👆 Waiting for you to paint the reference pixel...",
      positionSet: "✅ Position set successfully!",
      positionTimeout: "❌ Timeout for position selection",
      startPaintingMsg: "🎨 Starting painting...",
      paintingProgress: "🧱 Progress: {painted}/{total} pixels...",
      noCharges: "⌛ No charges. Waiting {time}...",
      paintingStopped: "⏹️ Painting stopped by user",
      paintingComplete: "✅ Painting complete! {count} pixels painted.",
      paintingError: "❌ Error during painting",
      missingRequirements: "❌ Load an image and select a position first",
      progress: "Progress",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Start Auto-BOT' to begin",
      waitingInit: "Waiting for initialization...",
      resizeSuccess: "✅ Image resized to {width}x{height}",
      paintingPaused: "⏸️ Painting paused at position X: {x}, Y: {y}"
    },
    fr: {
      title: "WPlace Auto-Image",
      initBot: "Démarrer Auto-BOT",
      uploadImage: "Télécharger l'image",
      resizeImage: "Redimensionner l'image",
      selectPosition: "Sélectionner la position",
      startPainting: "Commencer la peinture",
      stopPainting: "Arrêter la peinture",
      checkingColors: "🔍 Vérification des couleurs disponibles...",
      noColorsFound: "❌ Ouvrez la palette de couleurs sur le site et réessayez !",
      colorsFound: "✅ {count} couleurs disponibles trouvées",
      loadingImage: "🖼️ Chargement de l'image...",
      imageLoaded: "✅ Image chargée avec {count} pixels valides",
      imageError: "❌ Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel à l’endroit où vous souhaitez commencer l’art !",
      waitingPosition: "👆 En attente que vous peigniez le pixel de référence...",
      positionSet: "✅ Position définie avec succès !",
      positionTimeout: "❌ Temps écoulé pour la sélection de la position",
      startPaintingMsg: "🎨 Début de la peinture...",
      paintingProgress: "🧱 Progression : {painted}/{total} pixels...",
      noCharges: "⌛ Pas de charges. Attente de {time}...",
      paintingStopped: "⏹️ Peinture arrêtée par l’utilisateur",
      paintingComplete: "✅ Peinture terminée ! {count} pixels peints.",
      paintingError: "❌ Erreur pendant la peinture",
      missingRequirements: "❌ Veuillez d'abord télécharger une image et sélectionner une position",
      progress: "Progression",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estimé",
      initMessage: "Cliquez sur 'Démarrer Auto-BOT' pour commencer",
      waitingInit: "En attente de l'initialisation...",
      resizeSuccess: "✅ Image redimensionnée à {width}x{height}",
      paintingPaused: "⏸️ Peinture en pause à la position X : {x}, Y : {y}"
    },
    ru: {
      title: "WPlace Auto-Image",
      initBot: "Запустить Auto-BOT",
      uploadImage: "Загрузить Изображение",
      resizeImage: "Изменить Размер",
      selectPosition: "Выбрать Позицию",
      startPainting: "Начать Рисование",
      stopPainting: "Завершить Рисование",
      checkingColors: "🔍 Проверка доступных цветов...",
      noColorsFound: "❌ Откройте палитру цветов на сайте и попробуйте снова!",
      colorsFound: "✅ {count} найдено доступных цветов",
      loadingImage: "🖼️ Загрузка изображения...",
      imageLoaded: "✅ Изображение загружено с {count} допустимых пикселей",
      imageError: "❌ Ошибка загрузки изображения",
      selectPositionAlert: "Нарисуйте первый пиксель в том месте, где вы хотите, чтобы начинался арт.!",
      waitingPosition: "👆 Ждем, когда вы нарисуете опорный пиксель...",
      positionSet: "✅ Положение установлено успешно!",
      positionTimeout: "❌ Время ожидания выбора позиции вышло",
      startPaintingMsg: "🎨 Начинаем рисовать...",
      paintingProgress: "🧱 Прогресс: {painted}/{total} пикселей...",
      noCharges: "⌛ Нет зарядов. ожидание {time}...",
      paintingStopped: "⏹️ Рисование остановлено пользователем",
      paintingComplete: "✅ Рисование завершено! {count} пикселей нарисовано.",
      paintingError: "❌ Ошибка во время рисование",
      missingRequirements: "❌ Сначала загрузите изображение и выберите позицию",
      progress: "Прогресс",
      pixels: "Пиксели",
      charges: "Заряды",
      estimatedTime: "Предположительное время",
      initMessage: "Нажмите «Запустить Auto-BOT», чтобы начать",
      waitingInit: "Ожидание инициализации...",
      resizeSuccess: "✅ Изображение изменено до {width}x{height}",
      paintingPaused: "⏸️ Рисование приостановлено на позиции X: {x}, Y: {y}"
    },
    nl: {
      title: "WPlaats Auto-Afbeelding",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Afbeelding",
      resizeImage: "Formaat Afbeelding Wijzigen",
      selectPosition: "Selecteer Positie",
      startPainting: "Start Schilderen",
      stopPainting: "Stop Schilderen",
      checkingColors: "🔍 Beschikbare kleuren controleren...",
      noColorsFound: "❌ Open het kleurenpalet op de site en probeer het opnieuw!",
      colorsFound: "✅ {count} beschikbare kleuren gevonden",
      loadingImage: "🖼️ Afbeelding laden...",
      imageLoaded: "✅ Afbeelding geladen met {count} geldige pixels",
      imageError: "❌ Fout bij het laden van de afbeelding",
      selectPositionAlert: "Schilder de eerste pixel op de locatie waar je de afbeelding wilt laten beginnen!",
      waitingPosition: "👆 Wacht tot je de referentiepixel schildert...",
      positionSet: "✅ Positie succesvol ingesteld!",
      positionTimeout: "❌ Time-out voor positieselectie",
      startPaintingMsg: "🎨 Schilderen starten...",
      paintingProgress: "🧱 Voortgang: {geschilderd}/{totaal} pixels...",
      noCharges: "⌛ Geen kosten. Wachten {time}...",
      paintingStopped: "⏹️ Schilderen gestopt door gebruiker",
      paintingComplete: "✅ Schilderen voltooid! {count} pixels geschilderd.",
      paintingError: "❌ Fout tijdens het schilderen",
      missingRequirements: "❌ Laad een afbeelding en selecteer eerst een positie",
      progress: "Voortgang",
      pixels: "Pixels",
      charges: "Kosten",
      estimatedTime: "Geschatte tijd",
      initMessage: "Klik op 'Start Auto-BOT' om te beginnen",
      waitingInit: "Wachten op initialisatie...",
      resizeSuccess: "✅ Afbeelding verkleind naar {breedte} x {hoogte}",
      paintingPaused: "⏸️ Schilderen gepauzeerd op positie X: {x}, Y: {y}"
    },
    uk: {
      title: "WPlace Auto-Image",
      initBot: "Запустити бота",
      uploadImage: "Завантажити зображення",
      resizeImage: "Змінити розмір зображення",
      selectPosition: "Вибрати позицію",
      startPainting: "Почати малювання",
      stopPainting: "Зупинити малювання",
      checkingColors: "🔍 Перевірка доступних кольорів...",
      noColorsFound: "❌ Відкрийте палітру кольорів на сайті та спробуйте ще раз!",
      colorsFound: "✅ Знайдено {count} доступних кольорів",
      loadingImage: "🖼️ Завантаження зображення...",
      imageLoaded: "✅ Зображення завантажено з {count} коректними пікселями",
      imageError: "❌ Помилка завантаження зображення",
      selectPositionAlert: "Намалюйте перший піксель у місці, з якого має початися арт!",
      waitingPosition: "👆 Очікування, поки ви намалюєте контрольний піксель...",
      positionSet: "✅ Позицію успішно встановлено!",
      positionTimeout: "❌ Час очікування вибору позиції вичерпано",
      startPaintingMsg: "🎨 Початок малювання...",
      paintingProgress: "🧱 Прогрес: {painted}/{total} пікселів...",
      noCharges: "⌛ Немає зарядів. Очікування {time}...",
      paintingStopped: "⏹️ Малювання зупинено користувачем",
      paintingComplete: "✅ Малювання завершено! Намальовано {count} пікселів.",
      paintingError: "❌ Помилка під час малювання",
      missingRequirements: "❌ Спочатку завантажте зображення та виберіть позицію",
      progress: "Прогрес",
      pixels: "Пікселі",
      charges: "Заряди",
      estimatedTime: "Орієнтовний час",
      initMessage: "Натисніть «Запустити бота», щоб почати",
      waitingInit: "Очікування запуску...",
      resizeSuccess: "✅ Зображення змінено до {width}x{height}",
      paintingPaused: "⏸️ Малювання призупинено на позиції X: {x}, Y: {y}"
    }
  };

  const state = {
    running: false,
    imageLoaded: false,
    processing: false,
    totalPixels: 0,
    paintedPixels: 0,
    availableColors: [],
    currentCharges: 0,
    cooldown: CONFIG.COOLDOWN_DEFAULT,
    imageData: null,              // raw pixels (legacy use)
    template: null,               // NEW: template with color IDs
    stopFlag: false,
    colorsChecked: false,
    startPosition: null,
    selectingPosition: false,
    region: null,
    minimized: false,
    lastPosition: { x: 0, y: 0 },
    estimatedTime: 0,
    language: 'en'
  };

  function detectLanguage() {
    const userLang = navigator.language.split('-')[0]
    if (TEXTS[userLang]) {
      state.language = userLang;
    }
  }

  /* ----------------- NEW UTILITIES (palette + template) ----------------- */
  // Palette (id mapping must match site)
  const BASIC = { "0,0,0":1,"60,60,60":2,"120,120,120":3,"210,210,210":4,"255,255,255":5,"96,0,24":6,"237,28,36":7,"255,127,39":8,"246,170,9":9,"249,221,59":10,"255,250,188":11,"14,185,104":12,"19,230,123":13,"135,255,94":14,"12,129,110":15,"16,174,166":16,"19,225,190":17,"40,80,158":18,"64,147,228":19,"96,247,242":20,"107,80,246":21,"153,177,251":22,"120,12,153":23,"170,56,185":24,"224,159,249":25,"203,0,122":26,"236,31,128":27,"243,141,169":28,"104,70,52":29,"149,104,42":30,"248,178,119":31 };
  const PREMIUM = {"170,170,170":32,"165,14,30":33,"250,128,114":34,"228,92,26":35,"214,181,148":36,"156,132,49":37,"197,173,49":38,"232,212,95":39,"74,107,58":40,"90,148,74":41,"132,197,115":42,"15,121,159":43,"187,250,242":44,"125,199,255":45,"77,49,184":46,"74,66,132":47,"122,113,196":48,"181,174,241":49,"219,164,99":50,"209,128,81":51,"255,197,165":52,"155,82,73":53,"209,128,120":54,"250,182,164":55,"123,99,82":56,"156,132,107":57,"51,57,65":58,"109,117,141":59,"179,185,209":60,"109,100,63":61,"148,140,107":62,"205,197,158":63};
  const PALETTE = { ...BASIC, ...PREMIUM }; // rgb string -> id
  const ENTRIES = Object.entries(PALETTE).map(([k, id]) => ({ id, rgb: k.split(',').map(Number) }));
  const ID_TO_RGB = ENTRIES.reduce((acc, e) => { acc[e.id] = e.rgb; return acc; }, {});

  function nearestPaletteId(r, g, b) {
    let bestId = 0, best = Infinity;
    for (const p of ENTRIES) {
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
      img.onerror = () => reject(new Error('Failed to load image: ' + src));
      img.src = src;
    });
  }

  async function imageToTemplate(src, { useNearest = true } = {}) {
    const img = await loadImage(src);
    const { width, height } = img;
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, width, height).data;

    const data = Array.from({ length: width }, () => new Array(height).fill(0));
    const lookup = (r,g,b) => {
      const exact = PALETTE[`${r},${g},${b}`];
      if (!useNearest) return exact || 0;
      return exact || nearestPaletteId(r,g,b);
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const a = d[i + 3];
        if (a < CONFIG.TRANSPARENCY_THRESHOLD) {
          data[x][y] = 0; // transparent -> 0 (skip)
          continue;
        }
        const r = d[i], g = d[i + 1], b = d[i + 2];
        // treat near-white as background skip (like old script)
        if (r >= CONFIG.WHITE_THRESHOLD && g >= CONFIG.WHITE_THRESHOLD && b >= CONFIG.WHITE_THRESHOLD) {
          data[x][y] = 0; // skip whites
        } else {
          data[x][y] = lookup(r,g,b);
        }
      }
    }
    return { width, height, data };
  }

  // exposed for debugging if needed
  window.WPlaceImageTools = { imageToTemplate, nearestPaletteId };

  /* ----------------- LEGACY UTILS (GUI helpers) ----------------- */
  const Utils = {
    sleep: ms => new Promise(r => setTimeout(r, ms)),
    colorDistance: (a, b) => Math.sqrt(
      Math.pow(a[0] - b[0], 2) + 
      Math.pow(a[1] - b[1], 2) + 
      Math.pow(a[2] - b[2], 2)
    ),
    createImageUploader: () => new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png,image/jpeg';
      input.onchange = () => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.readAsDataURL(input.files[0]);
      };
      input.click();
    }),
    extractAvailableColors: () => {
      const colorElements = document.querySelectorAll('[id^="color-"]');
      return Array.from(colorElements)
        .filter(el => !el.querySelector('svg'))
        .filter(el => {
          const id = parseInt(el.id.replace('color-', ''));
          return id !== 0 && id !== 5; // exclude none and pure white
        })
        .map(el => {
          const id = parseInt(el.id.replace('color-', ''));
          const rgbStr = el.style.backgroundColor.match(/\d+/g);
          const rgb = rgbStr ? rgbStr.map(Number) : [0, 0, 0];
          return { id, rgb };
        });
    },
    formatTime: ms => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      let result = '';
      if (days > 0) result += `${days}d `;
      if (hours > 0 || days > 0) result += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
      result += `${seconds}s`;
      return result;
    },
    showAlert: (message, type = 'info') => {
      const alert = document.createElement('div');
      alert.style.position = 'fixed';
      alert.style.top = '20px';
      alert.style.left = '50%';
      alert.style.transform = 'translateX(-50%)';
      alert.style.padding = '15px 20px';
      alert.style.background = CONFIG.THEME[type] || CONFIG.THEME.accent;
      alert.style.color = CONFIG.THEME.text;
      alert.style.borderRadius = '5px';
      alert.style.zIndex = '10000';
      alert.style.boxShadow = '0 3px 10px rgba(0,0,0,0.3)';
      alert.style.display = 'flex';
      alert.style.alignItems = 'center';
      alert.style.gap = '10px';
      const icons = {
        error: 'exclamation-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
      };
      alert.innerHTML = `<i class="fas fa-${icons[type] || 'info-circle'}"></i><span>${message}</span>`;
      document.body.appendChild(alert);
      setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.5s';
        setTimeout(() => alert.remove(), 500);
      }, 3000);
    },
    calculateEstimatedTime: (remainingPixels, currentCharges, cooldown) => {
      const ppc = currentCharges > 0 ? currentCharges : 0;
      const fullCycles = Math.ceil((remainingPixels - ppc) / Math.max(currentCharges, 1));
      return (fullCycles * cooldown) + ((remainingPixels - 1) * 100);
    },
    isWhitePixel: (r, g, b) => r >= CONFIG.WHITE_THRESHOLD && g >= CONFIG.WHITE_THRESHOLD && b >= CONFIG.WHITE_THRESHOLD,
    t: (key, params = {}) => {
      let text = TEXTS[state.language][key] || TEXTS.en[key] || key;
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
      }
      return text;
    }
  };

  /* ----------------- WPlace Backend Service ----------------- */
  const WPlaceService = {
    async paintPixelInRegion(regionX, regionY, pixelX, pixelY, color) {
      try {
        const res = await fetch(`https://backend.wplace.live/s0/pixel/${regionX}/${regionY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          credentials: 'include',
          body: JSON.stringify({ coords: [pixelX, pixelY], colors: [color] })
        });
        const data = await res.json();
        return data?.painted === 1;
      } catch {
        return false;
      }
    },
    async getCharges() {
      try {
        const res = await fetch('https://backend.wplace.live/me', { credentials: 'include' });
        const data = await res.json();
        return { 
          charges: data.charges?.count || 0, 
          cooldown: data.charges?.cooldownMs || CONFIG.COOLDOWN_DEFAULT 
        };
      } catch {
        return { charges: 0, cooldown: CONFIG.COOLDOWN_DEFAULT };
      }
    }
  };

  /* ----------------- Image Processor (for resize dialog) ----------------- */
  class ImageProcessor {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      this.img = new Image();
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      this.previewCanvas = document.createElement('canvas');
      this.previewCtx = this.previewCanvas.getContext('2d');
    }
    async load() {
      return new Promise((resolve, reject) => {
        this.img.onload = () => {
          this.canvas.width = this.img.width;
          this.canvas.height = this.img.height;
          this.ctx.drawImage(this.img, 0, 0);
          resolve();
        };
        this.img.onerror = reject;
        this.img.src = this.imageSrc;
      });
    }
    getPixelData() {
      return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    }
    getDimensions() {
      return { width: this.canvas.width, height: this.canvas.height };
    }
    resize(newWidth, newHeight) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.imageSmoothingEnabled = false; // keep pixel crisp
      tempCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      this.ctx.drawImage(tempCanvas, 0, 0);
      return this.getPixelData();
    }
    generatePreview(newWidth, newHeight) {
      this.previewCanvas.width = newWidth;
      this.previewCanvas.height = newHeight;
      this.previewCtx.imageSmoothingEnabled = false;
      this.previewCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      return this.previewCanvas.toDataURL();
    }
  }

  /* ----------------- GUI Creation (from old script) ----------------- */
  async function createUI() {
    detectLanguage();

    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      #wplace-image-bot-container {
        position: fixed; top: 20px; right: 20px; width: 300px;
        background: ${CONFIG.THEME.primary}; border: 1px solid ${CONFIG.THEME.accent};
        border-radius: 8px; padding: 0; box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        z-index: 9998; font-family: 'Segoe UI', Roboto, sans-serif; color: ${CONFIG.THEME.text};
        animation: slideIn 0.4s ease-out; overflow: hidden;
      }
      .wplace-header {
        padding: 12px 15px; background: ${CONFIG.THEME.secondary}; color: ${CONFIG.THEME.highlight};
        font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move; user-select: none;
      }
      .wplace-header-title { display: flex; align-items: center; gap: 8px; }
      .wplace-header-controls { display: flex; gap: 10px; }
      .wplace-header-btn { background: none; border: none; color: ${CONFIG.THEME.text}; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; }
      .wplace-header-btn:hover { opacity: 1; }
      .wplace-content { padding: 15px; display: block; }
      .wplace-controls { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
      .wplace-btn { padding: 10px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
      .wplace-btn:hover { transform: translateY(-2px); }
      .wplace-btn-primary { background: ${CONFIG.THEME.accent}; color: white; }
      .wplace-btn-upload { background: ${CONFIG.THEME.secondary}; color: white; border: 1px dashed ${CONFIG.THEME.text}; }
      .wplace-btn-start { background: ${CONFIG.THEME.success}; color: white; }
      .wplace-btn-stop { background: ${CONFIG.THEME.error}; color: white; }
      .wplace-btn-select { background: ${CONFIG.THEME.highlight}; color: black; }
      .wplace-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
      .wplace-stats { background: ${CONFIG.THEME.secondary}; padding: 12px; border-radius: 6px; margin-bottom: 15px; }
      .wplace-stat-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
      .wplace-stat-label { display: flex; align-items: center; gap: 6px; opacity: 0.8; }
      .wplace-progress { width: 100%; background: ${CONFIG.THEME.secondary}; border-radius: 4px; margin: 10px 0; overflow: hidden; }
      .wplace-progress-bar { height: 10px; background: ${CONFIG.THEME.highlight}; transition: width 0.3s; }
      .wplace-status { padding: 8px; border-radius: 4px; text-align: center; font-size: 13px; }
      .status-default { background: rgba(255,255,255,0.1); }
      .status-success { background: rgba(0, 255, 0, 0.1); color: ${CONFIG.THEME.success}; }
      .status-error { background: rgba(255, 0, 0, 0.1); color: ${CONFIG.THEME.error}; }
      .status-warning { background: rgba(255, 165, 0, 0.1); color: orange; }
      .position-info { font-size: 13px; margin-top: 5px; padding: 5px; background: ${CONFIG.THEME.secondary}; border-radius: 4px; text-align: center; }
      .wplace-minimized .wplace-content { display: none; }
      .resize-container {
        display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: ${CONFIG.THEME.primary}; padding: 20px; border-radius: 8px; z-index: 10000;
        box-shadow: 0 0 20px rgba(0,0,0,0.5); max-width: 90%; max-height: 90%; overflow: auto;
      }
      .resize-preview { max-width: 100%; max-height: 300px; margin: 10px 0; border: 1px solid ${CONFIG.THEME.accent}; }
      .resize-controls { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
      .resize-slider { width: 100%; }
      .resize-buttons { display: flex; gap: 10px; }
      .resize-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: none; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'wplace-image-bot-container';
    container.innerHTML = `
      <div class="wplace-header">
        <div class="wplace-header-title">
          <i class="fas fa-image"></i>
          <span>${Utils.t('title')}</span>
        </div>
        <div class="wplace-header-controls">
          <button id="minimizeBtn" class="wplace-header-btn" title="minimize">
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <div class="wplace-content">
        <div class="wplace-controls">
          <button id="initBotBtn" class="wplace-btn wplace-btn-primary">
            <i class="fas fa-robot"></i>
            <span>${Utils.t('initBot')}</span>
          </button>
          <button id="uploadBtn" class="wplace-btn wplace-btn-upload" disabled>
            <i class="fas fa-upload"></i>
            <span>${Utils.t('uploadImage')}</span>
          </button>
          <button id="resizeBtn" class="wplace-btn wplace-btn-primary" disabled>
            <i class="fas fa-expand"></i>
            <span>${Utils.t('resizeImage')}</span>
          </button>
          <button id="selectPosBtn" class="wplace-btn wplace-btn-select" disabled>
            <i class="fas fa-crosshairs"></i>
            <span>${Utils.t('selectPosition')}</span>
          </button>
          <button id="startBtn" class="wplace-btn wplace-btn-start" disabled>
            <i class="fas fa-play"></i>
            <span>${Utils.t('startPainting')}</span>
          </button>
          <button id="stopBtn" class="wplace-btn wplace-btn-stop" disabled>
            <i class="fas fa-stop"></i>
            <span>${Utils.t('stopPainting')}</span>
          </button>
        </div>
        <div class="wplace-progress">
          <div id="progressBar" class="wplace-progress-bar" style="width: 0%"></div>
        </div>
        <div class="wplace-stats">
          <div id="statsArea">
            <div class="wplace-stat-item">
              <div class="wplace-stat-label"><i class="fas fa-info-circle"></i> ${Utils.t('initMessage')}</div>
            </div>
          </div>
        </div>
        <div id="statusText" class="wplace-status status-default">
          ${Utils.t('waitingInit')}
        </div>
      </div>
    `;

    const resizeContainer = document.createElement('div');
    resizeContainer.className = 'resize-container';
    resizeContainer.innerHTML = `
      <h3 style="margin-top: 0; color: ${CONFIG.THEME.text}">${Utils.t('resizeImage')}</h3>
      <div class="resize-controls">
        <label style="color: ${CONFIG.THEME.text}">
          Width: <span id="widthValue">0</span>px
          <input type="range" id="widthSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label style="color: ${CONFIG.THEME.text}">
          Height: <span id="heightValue">0</span>px
          <input type="range" id="heightSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label style="color: ${CONFIG.THEME.text}">
          <input type="checkbox" id="keepAspect" checked>
          Keep aspect ratio
        </label>
        <img id="resizePreview" class="resize-preview" src="">
        <div class="resize-buttons">
          <button id="confirmResize" class="wplace-btn wplace-btn-primary">
            <i class="fas fa-check"></i>
            <span>Apply</span>
          </button>
          <button id="cancelResize" class="wplace-btn wplace-btn-stop">
            <i class="fas fa-times"></i>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    `;

    const resizeOverlay = document.createElement('div');
    resizeOverlay.className = 'resize-overlay';

    document.body.appendChild(container);
    document.body.appendChild(resizeOverlay);
    document.body.appendChild(resizeContainer);

    // Drag logic
    const header = container.querySelector('.wplace-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      if (e.target.closest('.wplace-header-btn')) return;
      e.preventDefault();
      pos3 = e.clientX; pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
      pos3 = e.clientX; pos4 = e.clientY;
      container.style.top = (container.offsetTop - pos2) + "px";
      container.style.left = (container.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    // Bindings
    const initBotBtn = container.querySelector('#initBotBtn');
    const uploadBtn = container.querySelector('#uploadBtn');
    const resizeBtn = container.querySelector('#resizeBtn');
    const selectPosBtn = container.querySelector('#selectPosBtn');
    const startBtn = container.querySelector('#startBtn');
    const stopBtn = container.querySelector('#stopBtn');
    const minimizeBtn = container.querySelector('#minimizeBtn');
    const statusText = container.querySelector('#statusText');
    const progressBar = container.querySelector('#progressBar');
    const statsArea = container.querySelector('#statsArea');
    const content = container.querySelector('.wplace-content');

    const widthSlider = resizeContainer.querySelector('#widthSlider');
    const heightSlider = resizeContainer.querySelector('#heightSlider');
    const widthValue = resizeContainer.querySelector('#widthValue');
    const heightValue = resizeContainer.querySelector('#heightValue');
    const keepAspect = resizeContainer.querySelector('#keepAspect');
    const resizePreview = resizeContainer.querySelector('#resizePreview');
    const confirmResize = resizeContainer.querySelector('#confirmResize');
    const cancelResize = resizeContainer.querySelector('#cancelResize');

    minimizeBtn.addEventListener('click', () => {
      state.minimized = !state.minimized;
      if (state.minimized) {
        container.classList.add('wplace-minimized');
        minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
      } else {
        container.classList.remove('wplace-minimized');
        minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
      }
    });

    window.updateUI = (messageKey, type = 'default', params = {}) => {
      const message = Utils.t(messageKey, params);
      statusText.textContent = message;
      statusText.className = `wplace-status status-${type}`;
      statusText.style.animation = 'none';
      void statusText.offsetWidth;
      statusText.style.animation = 'slideIn 0.3s ease-out';
    };

    window.updateStats = async () => {
      if (!state.colorsChecked || (!state.imageLoaded && !state.template)) return;
      const { charges, cooldown } = await WPlaceService.getCharges();
      state.currentCharges = Math.floor(charges);
      state.cooldown = cooldown;
      const progress = state.totalPixels > 0 ? Math.round((state.paintedPixels / state.totalPixels) * 100) : 0;
      const remainingPixels = state.totalPixels - state.paintedPixels;
      state.estimatedTime = Utils.calculateEstimatedTime(remainingPixels, state.currentCharges, state.cooldown);
      progressBar.style.width = `${progress}%`;
      statsArea.innerHTML = `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-image"></i> ${Utils.t('progress')}</div>
          <div>${progress}%</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-paint-brush"></i> ${Utils.t('pixels')}</div>
          <div>${state.paintedPixels}/${state.totalPixels}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-bolt"></i> ${Utils.t('charges')}</div>
          <div>${Math.floor(state.currentCharges)}</div>
        </div>
        ${(state.imageLoaded || state.template) ? `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-clock"></i> ${Utils.t('estimatedTime')}</div>
          <div>${Utils.formatTime(state.estimatedTime)}</div>
        </div>` : ''}
      `;
    };

    function showResizeDialog(processor) {
      const { width, height } = processor.getDimensions();
      const aspectRatio = width / height;
      widthSlider.value = width; heightSlider.value = height;
      widthValue.textContent = width; heightValue.textContent = height;
      resizePreview.src = processor.img.src;
      resizeOverlay.style.display = 'block';
      resizeContainer.style.display = 'block';
      const updatePreview = () => {
        const newWidth = parseInt(widthSlider.value);
        const newHeight = parseInt(heightSlider.value);
        widthValue.textContent = newWidth; heightValue.textContent = newHeight;
        resizePreview.src = processor.generatePreview(newWidth, newHeight);
      };
      widthSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const newWidth = parseInt(widthSlider.value);
          const newHeight = Math.round(newWidth / aspectRatio);
          heightSlider.value = newHeight;
        }
        updatePreview();
      });
      heightSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const newHeight = parseInt(heightSlider.value);
          const newWidth = Math.round(newHeight * aspectRatio);
          widthSlider.value = newWidth;
        }
        updatePreview();
      });
      confirmResize.onclick = async () => {
        const newWidth = parseInt(widthSlider.value);
        const newHeight = parseInt(heightSlider.value);
        const resizedPixels = processor.resize(newWidth, newHeight);
        // Convert resized pixels to template IDs
        const data = Array.from({ length: newWidth }, () => new Array(newHeight).fill(0));
        let totalValidPixels = 0;
        for (let y = 0; y < newHeight; y++) {
          for (let x = 0; x < newWidth; x++) {
            const idx = (y * newWidth + x) * 4;
            const r = resizedPixels[idx];
            const g = resizedPixels[idx + 1];
            const b = resizedPixels[idx + 2];
            const alpha = resizedPixels[idx + 3];
            if (alpha < CONFIG.TRANSPARENCY_THRESHOLD) continue;
            if (Utils.isWhitePixel(r, g, b)) continue;
            const id = PALETTE[`${r},${g},${b}`] || nearestPaletteId(r,g,b);
            if (id) {
              data[x][y] = id;
              totalValidPixels++;
            }
          }
        }
        state.template = { width: newWidth, height: newHeight, data };
        state.totalPixels = totalValidPixels;
        state.paintedPixels = 0;
        updateStats();
        updateUI('resizeSuccess', 'success', { width: newWidth, height: newHeight });
        closeResizeDialog();
      };
      cancelResize.onclick = closeResizeDialog;
    }
    function closeResizeDialog() {
      resizeOverlay.style.display = 'none';
      resizeContainer.style.display = 'none';
    }

    // Button logic
    initBotBtn.addEventListener('click', async () => {
      try {
        updateUI('checkingColors', 'default');
        state.availableColors = Utils.extractAvailableColors();
        if (state.availableColors.length === 0) {
          Utils.showAlert(Utils.t('noColorsFound'), 'error');
          updateUI('noColorsFound', 'error');
          return;
        }
        state.colorsChecked = true;
        uploadBtn.disabled = false;
        selectPosBtn.disabled = false;
        initBotBtn.style.display = 'none';
        updateUI('colorsFound', 'success', { count: state.availableColors.length });
        updateStats();
      } catch {
        updateUI('imageError', 'error');
      }
    });

    uploadBtn.addEventListener('click', async () => {
      try {
        updateUI('loadingImage', 'default');
        const imageSrc = await Utils.createImageUploader();
        // NEW: create template directly
        const tpl = await imageToTemplate(imageSrc, { useNearest: true });
        // Count valid pixels (exclude 0 and pure white id 5 just in case)
        let valid = 0;
        for (let y = 0; y < tpl.height; y++) {
          for (let x = 0; x < tpl.width; x++) {
            const id = tpl.data[x][y];
            if (id && id !== 5) valid++;
          }
        }
        state.template = tpl;
        state.totalPixels = valid;
        state.paintedPixels = 0;
        state.imageLoaded = true;
        state.lastPosition = { x: 0, y: 0 };
        resizeBtn.disabled = false;
        if (state.startPosition) startBtn.disabled = false;
        updateStats();
        updateUI('imageLoaded', 'success', { count: valid });
      } catch {
        updateUI('imageError', 'error');
      }
    });

    resizeBtn.addEventListener('click', () => {
      if (state.imageLoaded && state.template) {
        // Use processor over the original image source. Reconstruct an image from template isn't trivial,
        // so we keep a hidden data URL of last uploaded image by reusing the resize preview path in processor.
        // Instead, we open a new upload flow for resizing using the last source available.
        const lastSrc = resizePreview.src && resizePreview.src.length > 0 ? resizePreview.src : null;
        const useSrc = lastSrc || (state.imageData?.processor?.img?.src) || null;
        // If we don't have a processor yet, build from last uploaded src by asking again (safe fallback)
        const srcPromise = useSrc ? Promise.resolve(useSrc) : Utils.createImageUploader();
        srcPromise.then(async (src) => {
          const processor = new ImageProcessor(src);
          await processor.load();
          showResizeDialog(processor);
        });
      }
    });

    selectPosBtn.addEventListener('click', async () => {
      if (state.selectingPosition) return;
      state.selectingPosition = true;
      state.startPosition = null;
      state.region = null;
      startBtn.disabled = true;
      Utils.showAlert(Utils.t('selectPositionAlert'), 'info');
      updateUI('waitingPosition', 'default');
      const originalFetch = window.fetch;
      window.fetch = async (url, options) => {
        if (typeof url === 'string' && url.includes('https://backend.wplace.live/s0/pixel/') && options?.method?.toUpperCase() === 'POST') {
          try {
            const response = await originalFetch(url, options);
            const clonedResponse = response.clone();
            const data = await clonedResponse.json();
            if (data?.painted === 1) {
              const regionMatch = url.match(/\/pixel\/(\d+)\/(\d+)/);
              if (regionMatch && regionMatch.length >= 3) {
                state.region = { x: parseInt(regionMatch[1]), y: parseInt(regionMatch[2]) };
              }
              const payload = JSON.parse(options.body);
              if (payload?.coords && Array.isArray(payload.coords)) {
                state.startPosition = { x: payload.coords[0], y: payload.coords[1] };
                state.lastPosition = { x: 0, y: 0 };
                if (state.imageLoaded || state.template) startBtn.disabled = false;
                window.fetch = originalFetch;
                state.selectingPosition = false;
                updateUI('positionSet', 'success');
              }
            }
            return response;
          } catch {
            return originalFetch(url, options);
          }
        }
        return originalFetch(url, options);
      };
      setTimeout(() => {
        if (state.selectingPosition) {
          window.fetch = originalFetch;
          state.selectingPosition = false;
          updateUI('positionTimeout', 'error');
          Utils.showAlert(Utils.t('positionTimeout'), 'error');
        }
      }, 120000);
    });

    startBtn.addEventListener('click', async () => {
      if ((!state.imageLoaded && !state.template) || !state.startPosition || !state.region) {
        updateUI('missingRequirements', 'error');
        return;
      }
      state.running = true;
      state.stopFlag = false;
      startBtn.disabled = true;
      stopBtn.disabled = false;
      uploadBtn.disabled = true;
      selectPosBtn.disabled = true;
      resizeBtn.disabled = true;
      updateUI('startPaintingMsg', 'success');
      try {
        await processTemplate(); // NEW
      } catch {
        updateUI('paintingError', 'error');
      } finally {
        state.running = false;
        stopBtn.disabled = true;
        if (!state.stopFlag) {
          startBtn.disabled = true;
          uploadBtn.disabled = false;
          selectPosBtn.disabled = false;
          resizeBtn.disabled = false;
        } else {
          startBtn.disabled = false;
        }
      }
    });

    stopBtn.addEventListener('click', () => {
      state.stopFlag = true;
      state.running = false;
      stopBtn.disabled = true;
      updateUI('paintingStopped', 'warning');
    });
  }

  /* ----------------- Painting Logic (using template) ----------------- */
  async function processTemplate() {
    const tpl = state.template;
    const { width, height } = tpl;
    const { x: startX, y: startY } = state.startPosition;
    const { x: regionX, y: regionY } = state.region;

    let startRow = state.lastPosition.y || 0;
    let startCol = state.lastPosition.x || 0;

    outerLoop:
    for (let y = startRow; y < height; y++) {
      for (let x = (y === startRow ? startCol : 0); x < width; x++) {
        if (state.stopFlag) {
          state.lastPosition = { x, y };
          updateUI('paintingPaused', 'warning', { x, y });
          break outerLoop;
        }
        const desiredId = tpl.data[x][y];
        if (!desiredId || desiredId === 5) continue; // skip empty/white

        // Map desired palette id to nearest among currently available colors
        const desiredRgb = ID_TO_RGB[desiredId] || [0,0,0];
        let best = state.availableColors[0]?.id || desiredId;
        let bestDist = Infinity;
        for (const c of state.availableColors) {
          const d = Utils.colorDistance(desiredRgb, c.rgb);
          if (d < bestDist) { bestDist = d; best = c.id; }
        }
        const colorToPaint = best;

        if (state.currentCharges < 1) {
          updateUI('noCharges', 'warning', { time: Utils.formatTime(state.cooldown) });
          await Utils.sleep(state.cooldown);
          const chargeUpdate = await WPlaceService.getCharges();
          state.currentCharges = chargeUpdate.charges;
          state.cooldown = chargeUpdate.cooldown;
        }

        const pixelX = startX + x;
        const pixelY = startY + y;
        const success = await WPlaceService.paintPixelInRegion(regionX, regionY, pixelX, pixelY, colorToPaint);

        if (success) {
          state.paintedPixels++;
          state.currentCharges--;
          state.estimatedTime = Utils.calculateEstimatedTime(state.totalPixels - state.paintedPixels, state.currentCharges, state.cooldown);
          if (state.paintedPixels % CONFIG.LOG_INTERVAL === 0) {
            updateStats();
            updateUI('paintingProgress', 'default', { painted: state.paintedPixels, total: state.totalPixels });
          }
        }
      }
    }

    if (state.stopFlag) {
      updateUI('paintingStopped', 'warning');
    } else {
      updateUI('paintingComplete', 'success', { count: state.paintedPixels });
      state.lastPosition = { x: 0, y: 0 };
    }
    updateStats();
  }

  // Boot
  await createUI();
})();
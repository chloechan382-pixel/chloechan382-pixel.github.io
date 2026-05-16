/**
 * script.js
 *
 * 1. Render editorial project sections from data/projects.js
 *    - Video left/right alternating per project
 *    - Description + floating images in the aside column
 * 2. Insert scatter zones between projects (images drifting in white space)
 * 3. Lazy-load video iframes via IntersectionObserver
 * 4. Scroll-linked parallax with lerp inertia on floating images + scatter images
 * 5. Section fade-in on scroll
 * 6. Mobile nav + smooth scroll
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     SCATTER ZONE PLACEMENT PRESETS
     Each preset is a list of { x (% left), y (px top), w (px) } positions.
     x is a percentage of the container width.
     Cycles by projectIndex so adjacent zones look different.
  ---------------------------------------------------------------- */
  var SCATTER_PRESETS = [
    // 4-slot: spread evenly, offset vertically
    [
      { x:  3, y:  30, w: 176 },
      { x: 28, y: 110, w: 210 },
      { x: 57, y:  20, w: 168 },
      { x: 80, y:  90, w: 182 }
    ],
    // 3-slot: looser spread
    [
      { x:  6, y:  60, w: 198 },
      { x: 40, y:  10, w: 220 },
      { x: 74, y:  80, w: 175 }
    ],
    // 3-slot: left-weighted
    [
      { x:  2, y:  20, w: 190 },
      { x: 24, y:  95, w: 165 },
      { x: 65, y:  35, w: 200 }
    ],
    // 4-slot: right-weighted
    [
      { x:  8, y:  70, w: 160 },
      { x: 34, y:  15, w: 195 },
      { x: 60, y: 100, w: 172 },
      { x: 83, y:  40, w: 185 }
    ]
  ];

  /* Parallax speeds (viewport-relative, tiny values = subtle drift) */
  var IMG_SPEEDS    = [ 0.14, -0.10, 0.17, -0.13, 0.11, -0.15, 0.12, -0.09 ];
  var SCATTER_SPEEDS = [-0.09, 0.12, -0.11, 0.08, -0.13, 0.10 ];

  /* Friction coefficient for lerp — lower = more lag / inertia */
  var LERP_FRICTION = 0.028;

  /* Parallax element registry */
  var parallaxItems = [];

  /* ----------------------------------------------------------------
     RENDER ALL PROJECTS
  ---------------------------------------------------------------- */
  function renderProjects() {
    var container = document.getElementById('projects-container');
    if (!container) return;

    if (typeof projects === 'undefined' || !Array.isArray(projects) || !projects.length) {
      container.innerHTML =
        '<p style="text-align:center;font-style:italic;color:#AAAAAA;padding:6rem 0;">' +
        'No projects yet. Add entries to data/projects.js.' + '</p>';
      return;
    }

    var fragment = document.createDocumentFragment();

    projects.forEach(function (project, i) {
      // Project section
      fragment.appendChild(buildSection(project, i));

      // Scatter zone between projects (not after the last one)
      if (i < projects.length - 1) {
        fragment.appendChild(buildScatterZone(project, projects[i + 1], i));
      }
    });

    container.appendChild(fragment);

    initLazyVideo();
    initReveal();
    initParallax();
  }

  /* ----------------------------------------------------------------
     BUILD ONE PROJECT SECTION
  ---------------------------------------------------------------- */
  function buildSection(project, index) {
    var section = document.createElement('article');
    section.className = 'project-section';
    section.id = 'project-' + index;

    var num   = String(index + 1).padStart(2, '0');
    var cat   = esc((project.category || '').toUpperCase());
    var year  = esc(project.year || '');
    var title = esc(project.title || 'Untitled');
    var desc  = esc(project.description || '');
    var url   = project.url || '#';
    var embed = getEmbedUrl(project);

    /* Header row */
    var header = el('div', 'project-header');
    header.innerHTML =
      '<span class="project-index">' + num + '</span>' +
      '<span class="project-meta-label">' + cat +
        (year ? ' &middot; ' + year : '') + '</span>';

    /* Body grid — alternate left / right */
    var align = (index % 2 === 0) ? 'left' : 'right';
    var body  = el('div', 'project-body project-body--' + align);

    /* Main column: video */
    var isShorts = project.format === 'shorts';
var main = el('div', isShorts ? 'project-main project-main--shorts' : 'project-main');
if (embed) {
  var videoDiv = el('div', 'video-embed');
  videoDiv.dataset.src = embed;
  videoDiv.innerHTML =
    '<div class="video-loading">' +
      '<span class="video-loading-text">Loading&hellip;</span>' +
    '</div>' +
    '<iframe title="' + title + '" ' +
      'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>' +
    '</iframe>';
  main.appendChild(videoDiv);

  var embed2 = project.url2
    ? getEmbedUrl({ type: project.type, url: project.url2 })
    : null;
  if (embed2) {
    var videoDiv2 = el('div', 'video-embed');
    videoDiv2.dataset.src = embed2;
    videoDiv2.style.marginTop = '1.5rem';
    videoDiv2.innerHTML =
      '<div class="video-loading">' +
        '<span class="video-loading-text">Loading&hellip;</span>' +
      '</div>' +
      '<iframe title="' + title + ' (part 2)" ' +
        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>' +
      '</iframe>';
    main.appendChild(videoDiv2);
  }

  var embed3 = project.url3
    ? getEmbedUrl({ type: project.type, url: project.url3 })
    : null;
  if (embed3) {
    var videoDiv3 = el('div', 'video-embed');
    videoDiv3.dataset.src = embed3;
    videoDiv3.style.marginTop = '1.5rem';
    videoDiv3.innerHTML =
      '<div class="video-loading">' +
        '<span class="video-loading-text">Loading&hellip;</span>' +
      '</div>' +
      '<iframe title="' + title + ' (part 3)" ' +
        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>' +
      '</iframe>';
    main.appendChild(videoDiv3);
  }

  var embed4 = project.url4
    ? getEmbedUrl({ type: project.type, url: project.url4 })
    : null;
  if (embed4) {
    var videoDiv4 = el('div', 'video-embed');
    videoDiv4.dataset.src = embed4;
    videoDiv4.style.marginTop = '1.5rem';
    videoDiv4.innerHTML =
      '<div class="video-loading">' +
        '<span class="video-loading-text">Loading&hellip;</span>' +
      '</div>' +
      '<iframe title="' + title + ' (part 4)" ' +
        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>' +
      '</iframe>';
    main.appendChild(videoDiv4);
  }

} else {
      var fallback = el('div', 'project-fallback');
      fallback.innerHTML = '<p>Embed unavailable.</p>' +
        (url !== '#'
          ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="btn-open">' +
            'Open project &nearr;</a>'
          : '');
      main.appendChild(fallback);
    }

    /* Aside column: description + floating images */
    var aside = el('div', 'project-aside');

    var descDiv = el('div', 'project-desc');
    var tagsHtml = '';
    if (Array.isArray(project.tags) && project.tags.length) {
      tagsHtml = '<div class="project-tags">' +
        project.tags.map(function (t) {
          return '<span class="project-tag">' + esc(t) + '</span>';
        }).join('') + '</div>';
    }
    var linkHtml = (url && url !== '#')
      ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="project-link">' +
        'View original &nearr;</a>'
      : '';

    descDiv.innerHTML =
      '<h2 class="project-title">' + title + '</h2>' +
      '<p class="project-description">' + desc + '</p>' +
      tagsHtml + linkHtml;
    aside.appendChild(descDiv);

    /* Floating images */
    var imgList = Array.isArray(project.processImages) ? project.processImages : [];
    if (imgList.length) {
      var imgs = el('div', 'project-images');
      imgList.forEach(function (imgData) {
        imgs.appendChild(buildImgWrap(imgData));
      });
      aside.appendChild(imgs);
    }

    body.appendChild(main);
    body.appendChild(aside);
    section.appendChild(header);
    section.appendChild(body);
    return section;
  }

  /* ----------------------------------------------------------------
     BUILD SCATTER ZONE between two projects
     Pulls images from the outgoing project's processImages/detailImages.
  ---------------------------------------------------------------- */
  function buildScatterZone(projectA, projectB, zoneIndex) {
    var zone = document.createElement('div');
    zone.className = 'scatter-zone';
    zone.setAttribute('aria-hidden', 'true');

    /* Collect candidates: detailImages from A, then processImages from B */
    var candidates = [];
    if (Array.isArray(projectA.detailImages)) {
      candidates = candidates.concat(projectA.detailImages);
    }
    if (Array.isArray(projectB.processImages)) {
      candidates = candidates.concat(projectB.processImages.slice(0, 2));
    }

    /* Pick the preset for this zone */
    var preset = SCATTER_PRESETS[zoneIndex % SCATTER_PRESETS.length];
    var count  = Math.min(preset.length, Math.max(2, candidates.length || preset.length));

    /* Aspect ratio for each slot: vary between landscape and portrait */
    var RATIOS = [4/3, 3/4, 5/4, 4/3];

    for (var i = 0; i < count; i++) {
      var pos     = preset[i];
      var ratio   = RATIOS[i % RATIOS.length];
      var imgData = candidates[i] || null;

      var wrapper = el('div', 'scatter-img');
      wrapper.style.left  = pos.x + '%';
      wrapper.style.top   = pos.y + 'px';
      wrapper.style.width = pos.w + 'px';

      var h = Math.round(pos.w / ratio);

      if (imgData && imgData.src) {
        var imgEl = document.createElement('img');
        imgEl.src     = imgData.src;
        imgEl.alt     = imgData.alt || '';
        imgEl.loading = 'lazy';
        imgEl.style.height = h + 'px';

        var ph = el('div', 'scatter-placeholder');
        ph.style.height = h + 'px';
        ph.textContent  = 'Add image';
        ph.style.display = 'none';

        imgEl.addEventListener('error', function () {
          this.style.display = 'none';
          this.nextElementSibling.style.display = 'flex';
        });

        wrapper.appendChild(imgEl);
        wrapper.appendChild(ph);

        if (imgData.caption) {
          var cap = el('span', 'scatter-caption');
          cap.textContent = imgData.caption;
          wrapper.appendChild(cap);
        }
      } else {
        /* No image data: show a placeholder box */
        var phOnly = el('div', 'scatter-placeholder');
        phOnly.style.height = h + 'px';
        phOnly.textContent  = 'Add image';
        wrapper.appendChild(phOnly);
      }

      zone.appendChild(wrapper);
    }

    return zone;
  }

  /* ----------------------------------------------------------------
     GENERIC IMAGE WRAP (aside column images)
  ---------------------------------------------------------------- */
  function buildImgWrap(imgData) {
    var wrap = el('div', 'img-wrap');

    var imgEl = document.createElement('img');
    imgEl.src     = imgData.src || '';
    imgEl.alt     = imgData.alt || '';
    imgEl.loading = 'lazy';

    var placeholder = el('div', 'img-placeholder');
    placeholder.textContent = 'Add image';
    placeholder.style.display = 'none';

    imgEl.addEventListener('error', function () {
      this.style.display = 'none';
      placeholder.style.display = 'flex';
    });

    wrap.appendChild(imgEl);
    wrap.appendChild(placeholder);

    if (imgData.caption) {
      var cap = el('span', 'img-caption');
      cap.textContent = imgData.caption;
      wrap.appendChild(cap);
    }

    return wrap;
  }

  /* ----------------------------------------------------------------
     PARALLAX  — scroll-linked, lerp inertia, viewport-relative offset

     Each element tracks its own `current` value that lags toward
     `target` via lerp. Target is derived from the element's vertical
     position inside the viewport:
       normalised = (elementCenterY / viewportH) - 0.5
       target     = normalised × speed × viewportH × dampening

     This keeps displacement bounded to ≈ 10–25 px regardless of
     how tall the page is. Lerp coefficient 0.065 ≈ ~6% per frame,
     giving a ~16-frame lag at 60 fps — a gentle trailing inertia.
  ---------------------------------------------------------------- */
  function initParallax() {
    /* Respect user preference — make images immediately visible */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* Mobile: skip parallax, keep images visible */
    if (window.innerWidth < 760) return;

    /* Tell CSS to hide images until JS reveals them */
    document.body.classList.add('parallax-active');

    /* Register .img-wrap — alternate diagonal entry: left / right */
    document.querySelectorAll('.img-wrap').forEach(function (el, i) {
      var fromLeft = (i % 2 === 0);
      parallaxItems.push({
        el:         el,
        speed:      IMG_SPEEDS[i % IMG_SPEEDS.length],
        current:    0,  target: 0,
        enterX:     fromLeft ? -30 : 28,
        enterXCur:  fromLeft ? -30 : 28,
        enterYCur:  -42,
        opacityCur: 0,
        revealed:   false
      });
    });

    /* Register .scatter-img — vary direction by index */
    document.querySelectorAll('.scatter-img').forEach(function (el, i) {
      var fromLeft = (i % 3 !== 1);
      parallaxItems.push({
        el:         el,
        speed:      SCATTER_SPEEDS[i % SCATTER_SPEEDS.length],
        current:    0,  target: 0,
        enterX:     fromLeft ? -24 : 24,
        enterXCur:  fromLeft ? -24 : 24,
        enterYCur:  -32,
        opacityCur: 0,
        revealed:   false
      });
    });

    if (!parallaxItems.length) return;

    /* IntersectionObserver fires the diagonal entry per element */
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        for (var j = 0; j < parallaxItems.length; j++) {
          if (parallaxItems[j].el === e.target) {
            parallaxItems[j].revealed = true;
            break;
          }
        }
        revealObs.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    parallaxItems.forEach(function (item) { revealObs.observe(item.el); });

    var vh = window.innerHeight;
    window.addEventListener('resize', function () {
      vh = window.innerHeight;
      if (window.innerWidth < 760) {
        parallaxItems.forEach(function (item) {
          item.el.style.transform = '';
          item.el.style.opacity   = '1';
          item.current = 0;
        });
      }
    });

    /* REVEAL_LERP controls how fast the diagonal entry plays out.
       Higher = snappier entry; LERP_FRICTION stays for ongoing parallax. */
    var REVEAL_LERP = 0.055;

    function loop() {
      for (var i = 0; i < parallaxItems.length; i++) {
        var item = parallaxItems[i];
        var rect = item.el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;

        /* Ongoing parallax scroll offset */
        var elCentreY  = rect.top + rect.height * 0.5;
        var normalised = elCentreY / vh - 0.5;
        item.target  = normalised * item.speed * vh * 0.25;
        item.current += (item.target - item.current) * LERP_FRICTION;

        /* Diagonal entry — lerp entry offsets toward 0 once revealed */
        if (item.revealed) {
          item.enterXCur  += (0 - item.enterXCur)  * REVEAL_LERP;
          item.enterYCur  += (0 - item.enterYCur)  * REVEAL_LERP;
          item.opacityCur += (1 - item.opacityCur) * (REVEAL_LERP * 1.6);
        }

        item.el.style.transform =
          'translateX(' + item.enterXCur.toFixed(2) + 'px) ' +
          'translateY(' + (item.current + item.enterYCur).toFixed(2) + 'px)';
        item.el.style.opacity = item.opacityCur.toFixed(3);
      }
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  /* ----------------------------------------------------------------
     LAZY VIDEO
  ---------------------------------------------------------------- */
  function initLazyVideo() {
    var embeds = document.querySelectorAll('.video-embed[data-src]');
    if (!('IntersectionObserver' in window)) {
      embeds.forEach(loadEmbed); return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { loadEmbed(e.target); obs.unobserve(e.target); }
      });
    }, { rootMargin: '400px' });
    embeds.forEach(function (e) { obs.observe(e); });
  }

  function loadEmbed(embedEl) {
    var src = embedEl.dataset.src;
    if (!src) return;
    var iframe = embedEl.querySelector('iframe');
    if (!iframe) return;
    iframe.onload = function () { embedEl.classList.add('loaded'); };
    iframe.src = src;
  }

  /* ----------------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('.project-section, .section-reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-visible'); }); return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { obs.observe(e); });
  }

  /* ----------------------------------------------------------------
     ABOUT PORTRAIT FALLBACK
  ---------------------------------------------------------------- */
  function initPortrait() {
    var img = document.querySelector('.about-portrait img');
    if (!img) return;
    img.addEventListener('error', function () {
      this.style.display = 'none';
      var ph = this.nextElementSibling;
      if (ph && ph.hasAttribute('hidden')) ph.removeAttribute('hidden');
    });
  }

  /* ----------------------------------------------------------------
     MOBILE NAV
  ---------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------------
     SMOOTH SCROLL
  ---------------------------------------------------------------- */
  function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var hh = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 56;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - hh - 12,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ----------------------------------------------------------------
     URL HELPERS
  ---------------------------------------------------------------- */
  function getEmbedUrl(project) {
    var url  = (project.url  || '').trim();
    var type = (project.type || '').toLowerCase();
    if (!url) return null;
    if (type === 'youtube') {
      var id = ytId(url);
      if (!id) return null;
      /* Autoplay only works on HTTPS — skip it for local file:// preview */
      var live = window.location.protocol !== 'file:';
      var params = live
        ? '?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=' + id + '&playsinline=1&vq=hd1080'
        : '?rel=0&modestbranding=1';
      return 'https://www.youtube.com/embed/' + id + params;
    }
    if (type === 'google-drive') {
      var fid = driveId(url);
      return fid ? 'https://drive.google.com/file/d/' + fid + '/preview' : null;
    }
    return null;
  }

  function ytId(url) {
    var ps = [/[?&]v=([A-Za-z0-9_-]{11})/, /youtu\.be\/([A-Za-z0-9_-]{11})/, /embed\/([A-Za-z0-9_-]{11})/, /shorts\/([A-Za-z0-9_-]{11})/];
    for (var i = 0; i < ps.length; i++) { var m = url.match(ps[i]); if (m) return m[1]; }
    return null;
  }

  function driveId(url) {
    var m = url.match(/\/file\/d\/([^/?#&]+)/);
    return m ? m[1] : null;
  }

  /* ----------------------------------------------------------------
     HELPERS
  ---------------------------------------------------------------- */
  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  /* ----------------------------------------------------------------
     INIT
  ---------------------------------------------------------------- */
  renderProjects();
  initPortrait();
  initMobileNav();
  initScroll();
  initReveal(); /* catches static .section-reveal elements too */

}());

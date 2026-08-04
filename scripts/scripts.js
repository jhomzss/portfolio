document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------- */
  /* Mobile nav toggle */
  /* ---------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------------------------------------------------- */
  /* Resume modal */
  /* ---------------------------------------------------- */
  const resumeModal = document.getElementById("resumeModal");
  const openResumeBtn = document.getElementById("resumeBtn");
  const closeResumeBtn = document.getElementById("closeModal");

  if (resumeModal && openResumeBtn && closeResumeBtn) {
    openResumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resumeModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
    closeResumeBtn.addEventListener("click", () => {
      resumeModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        resumeModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  /* ---------------------------------------------------- */
  /* Project cards: auto scope badge + media flags         */
  /* ---------------------------------------------------- */
  const videoExts = ["mp4", "webm", "ogg", "mov"];

  function getExt(src) {
    return (src || "").split(".").pop().toLowerCase().split("?")[0];
  }

  const scopeLabels = { academic: "School", personal: "Personal" };

  document.querySelectorAll(".project-card").forEach(card => {
    const scope = card.dataset.scope;
    const thumb = card.querySelector(".project-thumb");
    const info = card.querySelector(".project-info");

    // Scope badge on the thumbnail (only for cards that have an image)
    if (scope && thumb && thumb.classList.contains("clickable")) {
      const badge = document.createElement("span");
      badge.className = `scope-badge ${scope}`;
      badge.textContent = scopeLabels[scope] || scope;
      thumb.prepend(badge);
    }

    // Media flags: what extra content this card has beyond the thumbnail
    // (Note: no "Link" flag here on purpose — the Source Code / link button
    // already visible on the card says the same thing, so a badge for it
    // was just duplicate clutter.)
    if (info) {
      const flags = [];
      const gallery = card.querySelector(".project-gallery");
      const mainSrc = thumb ? thumb.dataset.src : null;

      if ((mainSrc && videoExts.includes(getExt(mainSrc))) || thumb.dataset.video) flags.push("Video");
      if (mainSrc && getExt(mainSrc) === "gif") flags.push("GIF");
      if (gallery && gallery.querySelectorAll("img").length > 1) {
        flags.push(`Gallery · ${gallery.querySelectorAll("img").length}`);
      }

      if (flags.length) {
        const flagRow = document.createElement("div");
        flagRow.className = "media-flags";
        flagRow.innerHTML = flags.map(f => `<span class="media-flag">${f}</span>`).join("");
        const tagList = info.querySelector(".tag-list");
        if (tagList) {
          tagList.insertAdjacentElement("afterend", flagRow);
        } else {
          info.appendChild(flagRow);
        }
      }
    }
  });

  /* ---------------------------------------------------- */
  /* Filters (scope + discipline)                          */
  /* ---------------------------------------------------- */
  const scopeFilterBar = document.getElementById("scopeFilters");
  const disciplineFilterBar = document.getElementById("disciplineFilters");
  const grid = document.getElementById("projectGrid");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");

  if (grid && scopeFilterBar && disciplineFilterBar) {
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    let activeScope = "all";
    let activeDiscipline = "all";

    function applyFilters() {
      let visibleCount = 0;

      cards.forEach(card => {
        const matchesScope = activeScope === "all" || card.dataset.scope === activeScope;
        const matchesDiscipline = activeDiscipline === "all" || card.dataset.discipline === activeDiscipline;
        const visible = matchesScope && matchesDiscipline;
        card.classList.toggle("is-hidden", !visible);
        if (visible) visibleCount++;
      });

      resultsCount.textContent = `Showing ${visibleCount} of ${cards.length} works`;
      noResults.classList.toggle("show", visibleCount === 0);
    }

    scopeFilterBar.querySelectorAll(".filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        scopeFilterBar.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeScope = btn.dataset.scopeFilter;
        applyFilters();
      });
    });

    disciplineFilterBar.querySelectorAll(".filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        disciplineFilterBar.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeDiscipline = btn.dataset.disciplineFilter;
        applyFilters();
      });
    });

    applyFilters();
  }

  /* ---------------------------------------------------- */
  /* Lightbox — media left, details right; supports a
     multi-image gallery, tags, links, scope, and an
     optional case-study detail block per project          */
  /* ---------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxMedia = document.getElementById("lightboxMedia");
  const lightboxScope = document.getElementById("lightboxScope");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxTags = document.getElementById("lightboxTags");
  const lightboxLinks = document.getElementById("lightboxLinks");
  const lightboxDetails = document.getElementById("lightboxDetails");
  const closeLightboxBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  function buildMediaEl(item, alt) {
    if (typeof item === "object" && item.embed) {
      const iframe = document.createElement("iframe");
      iframe.src = item.embed + "?autoplay=0";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      return iframe;
    }
    const src = item;
    if (videoExts.includes(getExt(src))) {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      return video;
    }
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "Project preview";
    img.draggable = false; 
    return img;
  }

  let galleryItems = [];
  let galleryIndex = 0;

  function renderGalleryItem() {
    lightboxMedia.innerHTML = "";
    lightboxMedia.appendChild(buildMediaEl(galleryItems[galleryIndex], lightboxTitle.textContent));

    const multi = galleryItems.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
    lightboxCounter.textContent = multi ? `${galleryIndex + 1} / ${galleryItems.length}` : "";
  }

  function openLightbox(card) {
    if (!lightbox) return;

    const thumb = card.querySelector(".project-thumb");
    const galleryEl = card.querySelector(".project-gallery");

    galleryItems = thumb.dataset.video
      ? [{ embed: thumb.dataset.video }]
      : galleryEl
        ? Array.from(galleryEl.querySelectorAll("img")).map(el => el.getAttribute("src"))
        : [thumb.dataset.src];
    galleryIndex = 0;

    lightboxTitle.textContent = thumb.dataset.title || "";
    lightboxDesc.textContent = thumb.dataset.desc || "";

    const scope = card.dataset.scope;
    lightboxScope.textContent = scope ? (scopeLabels[scope] === "School" ? "School Project" : "Personal Project") : "";
    lightboxScope.className = `lightbox-scope ${scope || ""}`;

    const tagsSource = card.querySelector(".project-info .tag-list");
    lightboxTags.innerHTML = tagsSource ? tagsSource.innerHTML : "";

    const linksSource = card.querySelector(".project-links");
    lightboxLinks.innerHTML = linksSource ? linksSource.innerHTML : "";

    const detailsSource = card.querySelector(".project-details");
    lightboxDetails.innerHTML = detailsSource ? detailsSource.innerHTML : "";

    renderGalleryItem();

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = "none";
    lightboxMedia.innerHTML = "";
    document.body.style.overflow = "auto";
  }

  function showPrev() {
    if (galleryItems.length < 2) return;
    galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    renderGalleryItem();
  }

  function showNext() {
    if (galleryItems.length < 2) return;
    galleryIndex = (galleryIndex + 1) % galleryItems.length;
    renderGalleryItem();
  }

  if (lightbox) {
    document.querySelectorAll(".project-card").forEach(card => {
      const thumb = card.querySelector(".project-thumb.clickable");
      if (!thumb) return;

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      const trigger = () => openLightbox(card);

      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        trigger();
      });
      card.addEventListener("keydown", (e) => {
        if (e.target.closest("a")) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    });

    closeLightboxBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display !== "flex") return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }

  /* ---------------------------------------------------- */
  /* Lightbox image zoom — scroll-to-zoom (desktop),
     pinch-to-zoom (mobile), drag to pan when zoomed        */
  /* ---------------------------------------------------- */
  if (lightboxMedia) {
    let scale = 1, panX = 0, panY = 0;
    const minScale = 1, maxScale = 4;
    const activePointers = new Map();
    let pinchStartDist = 0, pinchStartScale = 1;
    let isDragging = false, dragStartX = 0, dragStartY = 0, dragStartPanX = 0, dragStartPanY = 0;

    function getZoomImg() {
      return lightboxMedia.querySelector("img");
    }

    let baseImgWidth = 0, baseImgHeight = 0;

    function measureBaseImageSize(img) {
      // Measure the image's rendered size BEFORE any zoom transform is applied,
      // so later clamp math is based on a stable, untransformed reference.
      const prevTransform = img.style.transform;
      img.style.transform = "none";
      const rect = img.getBoundingClientRect();
      baseImgWidth = rect.width;
      baseImgHeight = rect.height;
      img.style.transform = prevTransform;
    }

    function clampPan(img) {
      if (!baseImgWidth || !baseImgHeight) measureBaseImageSize(img);

      const wrapRect = lightboxMedia.getBoundingClientRect();
      const scaledWidth = baseImgWidth * scale;
      const scaledHeight = baseImgHeight * scale;

      const maxPanX = Math.max(0, (scaledWidth - wrapRect.width) / 2);
      const maxPanY = Math.max(0, (scaledHeight - wrapRect.height) / 2);

      panX = Math.min(maxPanX, Math.max(-maxPanX, panX));
      panY = Math.min(maxPanY, Math.max(-maxPanY, panY));
    }

    function applyZoomTransform(img) {
      if (!img) return;
      clampPan(img);
      img.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }

    function resetZoom() {
      scale = 1; panX = 0; panY = 0;
      baseImgWidth = 0; baseImgHeight = 0;
      const img = getZoomImg();
      if (img) {
        img.classList.remove("zoomed", "panning");
        applyZoomTransform(img);
      }
      activePointers.clear();
      pinchStartDist = 0;
      isDragging = false;
    }

    const _origRenderGalleryItem = renderGalleryItem;
    renderGalleryItem = function () {
      _origRenderGalleryItem();
      resetZoom();
    };

    const _origCloseLightbox = closeLightbox;
    closeLightbox = function () {
      resetZoom();
      _origCloseLightbox();
    };

    lightboxMedia.addEventListener("wheel", (e) => {
      const img = getZoomImg();
      if (!img) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.2 : -0.2;
      const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
      if (newScale === scale) return;
      scale = newScale;
      if (scale === minScale) { panX = 0; panY = 0; }
      img.classList.toggle("zoomed", scale > minScale);
      applyZoomTransform(img);
    }, { passive: false });

    lightboxMedia.addEventListener("pointerdown", (e) => {
      const img = getZoomImg();
      if (!img) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      lightboxMedia.setPointerCapture(e.pointerId);

      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartScale = scale;
      } else if (activePointers.size === 1 && scale > minScale) {
        isDragging = true;
        img.classList.add("panning");
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragStartPanX = panX;
        dragStartPanY = panY;
      }
    });

    lightboxMedia.addEventListener("pointermove", (e) => {
      const img = getZoomImg();
      if (!img || !activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDist > 0) {
          scale = Math.min(maxScale, Math.max(minScale, pinchStartScale * (dist / pinchStartDist)));
          if (scale === minScale) { panX = 0; panY = 0; }
          img.classList.toggle("zoomed", scale > minScale);
          applyZoomTransform(img);
        }
      } else if (isDragging) {
        panX = dragStartPanX + (e.clientX - dragStartX);
        panY = dragStartPanY + (e.clientY - dragStartY);
        applyZoomTransform(img);
      }
    });

    function endZoomPointer(e) {
      const img = getZoomImg();
      activePointers.delete(e.pointerId);
      if (activePointers.size < 2) pinchStartDist = 0;
      if (activePointers.size === 0) {
        isDragging = false;
        if (img) img.classList.remove("panning");
      }
    }
    lightboxMedia.addEventListener("pointerup", endZoomPointer);
    lightboxMedia.addEventListener("pointercancel", endZoomPointer);
    lightboxMedia.addEventListener("pointerleave", endZoomPointer);

    lightboxMedia.addEventListener("dblclick", () => {
      const img = getZoomImg();
      if (!img) return;
      if (scale > minScale) {
        resetZoom();
      } else {
        scale = 2;
        img.classList.add("zoomed");
        applyZoomTransform(img);
      }
    });
  }

});

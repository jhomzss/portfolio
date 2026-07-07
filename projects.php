<!--projects.php-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects & Works | Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/x-icon" href="file/Jt.png">

  <style>
    /* ── Carousel wrapper ── */
    .carousel-wrapper {
      position: relative;
    }

    .carousel-track-outer {
      overflow: hidden;
    }

    .carousel-track {
      margin-top: 10px;
      display: flex;
      gap: 24px;
      transition: transform 0.4s ease;
    }

    /* Fixed-width cards inside carousel */
    .carousel-track .project-card {
      flex: 0 0 280px;
      width: 260px;
    }

    /* Make thumb a proper block so the image fills it */
    .project-thumb {
      width: 100%;
      height: 160px;
      overflow: hidden;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }

    .project-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Arrow buttons ── */
    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;

      width: 36px;
      height: 36px;
      border-radius: 50%;

      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      font-size: 16px;
      line-height: 1;

      transition: background 0.2s, border-color 0.2s;
      user-select: none;
    }

    .carousel-btn:hover {
      background: var(--tag-bg);
      border-color: var(--muted);
    }

    .carousel-btn.prev { left: -18px; }
    .carousel-btn.next { right: -18px; }

    .carousel-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }
  </style>
</head>
<body>

  <nav>
    <div class="nav-logo" id="nav-name"><a href="index.php">Jhomel Togado</a></div>
    <div class="nav-links">
      <a href="index.php">About</a>
      <a href="skills.php">Skills</a>
      <a href="projects.php" id="highlight">Projects & Works</a>
      <a href="contact.php">Contacts</a>
      <a href="#" id="resumeBtn" class="resume-link">View Resume</a>
    </div>
  </nav>

  <main>
    <section class="page-header">
      <p class="eyebrow">Selected work</p>
      <h1 class="page-title">Projects & Works</h1>
      <p class="page-lead">A collection of things I've built and designed, grouped by category.</p>
    </section>

    <!-- WEB DEVELOPMENT -->
    <section class="section">
      <h2 class="section-title">Web Development</h2>
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" data-target="webdev-track">&#8249;</button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="webdev-track">

            <div class="project-card">
              <div class="project-thumb"><img src="images/smartbarangay.png" alt="Smart Barangay"></div>
              <div class="project-info">
                <h3>SmartBarangay (Capstone Project)</h3>
                <p class="project-desc">Short description of the project goes here.</p>
                <div class="tag-list small">
                  <span class="tag">HTML</span>
                  <span class="tag">CSS</span>
                  <span class="tag">JavaScript</span>
                  <span class="tag">PHP</span>
                  <span class="tag">MySQL</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/nyitikshop.png" alt="NyitikShop"></div>
              <div class="project-info">
                <h3>NyitikShop</h3>
                <p class="project-desc">Gaming and Tech Shopping Website</p>
                <div class="tag-list small">
                  <span class="tag">Django</span>
                  <span class="tag">Python</span>
                  <span class="tag">Static Site</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"></div>
              <div class="project-info">
                <h3>Project Title</h3>
                <p class="project-desc">Short description of the project goes here.</p>
                <div class="tag-list small">
                  <span class="tag">HTML</span>
                  <span class="tag">CSS</span>
                </div>
              </div>
            </div>

          </div><!-- /track -->
        </div><!-- /outer -->
        <button class="carousel-btn next" data-target="webdev-track">&#8250;</button>
      </div>
    </section>

    <!-- UI/UX DESIGN -->
    <section class="section">
      <h2 class="section-title">UI/UX Design</h2>
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" data-target="uiux-track">&#8249;</button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="uiux-track">

            <div class="project-card">
              <div class="project-thumb"><img src="images/SmartbrgyPrototype.png" alt="SmartBarangay Prototype"></div>
              <div class="project-info">
                <h3>SmartBarangay Prototype</h3>
                <p class="project-desc">A prototype for the SmartBarangay Website.</p>
                <div class="tag-list small">
                  <span class="tag">Figma</span>
                  <span class="tag">UI/UX Design</span>
                  <span class="tag">Wireframing</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/amIUI.png" alt="Am I UI Design Prototype"></div>
              <div class="project-info">
                <h3>Am I UI Design prototype</h3>
                <p class="project-desc">A prototype for the Am I UI Design project.</p>
                <div class="tag-list small">
                  <span class="tag">Figma</span>
                  <span class="tag">UI/UX Design</span>
                  <span class="tag">Wireframing</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/softdev.png" alt="Software Development Prototype"></div>
              <div class="project-info">
                <h3>Software Development prototype</h3>
                <p class="project-desc">A prototype for the Software Development project.</p>
                <div class="tag-list small">
                  <span class="tag">Figma</span>
                  <span class="tag">UI/UX Design</span>
                  <span class="tag">Wireframing</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/hciProject.png" alt="HCI Project Prototype"></div>
              <div class="project-info">
                <h3>HCI Project prototype</h3>
                <p class="project-desc">A prototype for the HCI Project.</p>
                <div class="tag-list small">
                  <span class="tag">Figma</span>
                  <span class="tag">UI/UX Design</span>
                  <span class="tag">Wireframing</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/hciActivity.png" alt="HCI Activity Prototype"></div>
              <div class="project-info">
                <h3>HCI Activity prototype</h3>
                <p class="project-desc">A prototype for the HCI Activity.</p>
                <div class="tag-list small">
                  <span class="tag">Figma</span>
                  <span class="tag">UI/UX Design</span>
                  <span class="tag">Wireframing</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button class="carousel-btn next" data-target="uiux-track">&#8250;</button>
      </div>
    </section>

    <!-- Game Development -->
    <section class="section">
      <h2 class="section-title">Graphic Animation (Game Development)</h2>
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" data-target="graphic-track">&#8249;</button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="graphic-track">

            <div class="project-card">
              <div class="project-thumb"><img src="images/magicleap.gif" alt="Magic Leap Logo Animation"></div>
              <div class="project-info">
                <h3>Magic Leap Logo Animation</h3>
                <p class="project-desc">An animated sequence showcasing the Magic Leap logo.</p>
                <div class="tag-list small">
                  <span class="tag">Alight Motion</span>
                  <span class="tag">Animation</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/3reserved.gif" alt="3 Reserved Cards Animation"></div>
              <div class="project-info">
                <h3>Am I? (3 reserved cards Animation)</h3>
                <p class="project-desc">An animated sequence showcasing the 3 reserved cards in the game.</p>
                <div class="tag-list small">
                  <span class="tag">Alight Motion</span>
                  <span class="tag">Animation</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/6cards.gif" alt="6 Cards Animation"></div>
              <div class="project-info">
                <h3>Am I? (6 cards Animation)</h3>
                <p class="project-desc">An animated sequence showcasing the 6 cards in the game.</p>
                <div class="tag-list small">
                  <span class="tag">Alight Motion</span>
                  <span class="tag">Animation</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button class="carousel-btn next" data-target="graphic-track">&#8250;</button>
      </div>
    </section>

    <!-- Graphic Design -->
    <section class="section">
      <h2 class="section-title">Graphic Design</h2>
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" data-target="graphic-track">&#8249;</button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="graphic-track">

            <div class="project-card">
              <div class="project-thumb"><img src="images/technologo.png" alt="AquaSnap Innocation Logo"></div>
              <div class="project-info">
                <h3>AquaSnap Innocation Logo</h3>
                <p class="project-desc">A modern and minimalist logo design for AquaSnap Innocation.</p>
                <div class="tag-list small">
                  <span class="tag">Illustrator</span>
                  <span class="tag">Graphic Design</span>
                  <span class="tag">Logo Design</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/ecoflood.png" alt="ECOFLOOD Smart Solutions Logo"></div>
              <div class="project-info">
                <h3>ECOFLOOD Smart Solutions Logo</h3>
                <p class="project-desc">A modern and minimalist logo design for ECOFLOOD Smart Solutions.</p>
                <div class="tag-list small">
                  <span class="tag">Illustrator</span>
                  <span class="tag">Graphic Design</span>
                  <span class="tag">Logo Design</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/logo.jpg" alt="Jhomel Togado Logo"></div>
              <div class="project-info">
                <h3>Jhomel Togado Logo</h3>
                <p class="project-desc">A modern and minimalist logo design for Jhomel Togado.</p>
                <div class="tag-list small">
                  <span class="tag">Photoshop</span>
                  <span class="tag">Graphic Design</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/manok.png" alt="Brand Poster"></div>
              <div class="project-info">
                <h3>Chick n' Jhoms Stall Logo</h3>
                <p class="project-desc">A modern and minimalist logo design for Chick n' Jhoms Stall.</p>
                <div class="tag-list small">
                  <span class="tag">Illustrator</span>
                  <span class="tag">Graphic Design</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/fish.jpg" alt="Multimedia Activity"></div>
              <div class="project-info">
                <h3>Multimedia Activity</h3>
                <p class="project-desc">A creative multimedia activity design.</p>
                <div class="tag-list small">
                  <span class="tag">Illustrator</span>
                  <span class="tag">Graphic Design</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/Poster2.jpg" alt="Multimedia Activity"></div>
              <div class="project-info">
                <h3>Self Poster Design</h3>
                <p class="project-desc">A personal poster design for self-promotion.</p>
                <div class="tag-list small">
                  <span class="tag">Photoshop</span>
                  <span class="tag">Graphic Design</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button class="carousel-btn next" data-target="graphic-track">&#8250;</button>
      </div>
    </section>

    <!-- BLENDER OUTPUTS -->
    <section class="section">
      <h2 class="section-title">Blender Outputs</h2>
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" data-target="blender-track">&#8249;</button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="blender-track">

            <div class="project-card">
              <div class="project-thumb"><img src="images/highlight.png" alt="Blender Output"></div>
              <div class="project-info">
                <h3>Chick n' Jhoms Stall</h3>
                <p class="project-desc">I build a small business stall using Blender and used pre-made meshes for the interior.</p>
                <div class="tag-list small">
                  <span class="tag">Blender</span>
                  <span class="tag">3D Modeling</span>
                  <span class="tag">Texturing</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"><img src="images/hotairballoon.png" alt="Hotair Balloon"></div>
              <div class="project-info">
                <h3>Hotair Balloon</h3>
                <p class="project-desc">A 3D model of a hotair balloon created in Blender.</p>
                <div class="tag-list small">
                  <span class="tag">Blender</span>
                  <span class="tag">3D Modeling</span>
                </div>
              </div>
            </div>

            <div class="project-card">
              <div class="project-thumb"></div>
              <div class="project-info">
                <h3>Project Title</h3>
                <p class="project-desc">Short description of the project goes here.</p>
                <div class="tag-list small">
                  <span class="tag">Blender</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button class="carousel-btn next" data-target="blender-track">&#8250;</button>
      </div>
    </section>

  </main>

  <footer>
    <span id="footer-text">Designed & built by Jhomel Togado</span>
  </footer>

  <div id="resumeModal" class="modal">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <iframe src="file/JhomelTogado_Resume.pdf#view=FitH"></iframe>
    </div>
  </div>

  <script src="scripts/scripts.js"></script>
  <script>
    // ── Carousel logic ──────────────────────────────────────────
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
      const prevBtn = wrapper.querySelector('.carousel-btn.prev');
      const nextBtn = wrapper.querySelector('.carousel-btn.next');
      const trackId = prevBtn.dataset.target;
      const track   = document.getElementById(trackId);

      const CARD_WIDTH = 260;
      const GAP        = 24;
      const STEP       = CARD_WIDTH + GAP;

      let current = 0;

      function getMax() {
        const visible = Math.floor(wrapper.offsetWidth / STEP);
        return Math.max(0, track.children.length - visible);
      }

      function update() {
        track.style.transform = `translateX(-${current * STEP}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= getMax();
      }

      prevBtn.addEventListener('click', () => {
        if (current > 0) { current--; update(); }
      });

      nextBtn.addEventListener('click', () => {
        if (current < getMax()) { current++; update(); }
      });

      update(); // set initial state
    });
  </script>
</body>
</html>
 const popup           = document.getElementById("popup");
    const step1           = document.getElementById("step1");
    const step2           = document.getElementById("step2");
    const step3           = document.getElementById("step3");
    const planBtn         = document.getElementById("planAdventureBtn");
    const backToStep1     = document.getElementById("backToStep1");
    const changeDuration  = document.getElementById("changeDuration");
    const changeDifficulty= document.getElementById("changeDifficulty");

    let userChoice = { difficulty: null, duration: null };

    // Show/hide popup
    planBtn.addEventListener("click", () => {
      popup.style.display = "flex";
      showStep(1);
    });
    document.querySelectorAll(".close-btn").forEach(btn =>
      btn.addEventListener("click", () => popup.style.display = "none")
    );
    popup.addEventListener("click", e => {
      if (e.target === popup) popup.style.display = "none";
    });

    function showStep(n) {
      [step1, step2, step3].forEach((s, i) => 
        s.classList.toggle("active", i + 1 === n)
      );
    }

    // User picks difficulty → go to duration
    step1.querySelectorAll(".option").forEach(opt => {
      opt.addEventListener("click", () => {
        userChoice.difficulty = opt.dataset.difficulty;
        showStep(2);
      });
    });

    // User picks duration → render recs
    step2.querySelectorAll(".option").forEach(opt => {
      opt.addEventListener("click", () => {
        userChoice.duration = opt.dataset.duration;
        renderRecommendations();
      });
    });

    // Change links
    changeDuration.addEventListener("click", () => showStep(2));
    changeDifficulty.addEventListener("click", () => showStep(1));
    backToStep1.addEventListener("click", () => showStep(1));

    // Expanded recommendations mapping
    const recommendations = {
      Easy: {
        '1–7 days': [
          { dest:'Ghorepani Poon Hill', desc:'Sunrise vistas over Himalaya.', cost:'$500-800' },
          { dest:'Helambu Trek', desc:'Lush forests & Sherpa villages.', cost:'$450-700' },
          { dest:'Chisapani Nagarkot', desc:'Sunset & sunrise panoramas.', cost:'$300-500' },
          { dest:'Tamang Heritage Trek', desc:'Culture-rich forest paths.', cost:'$550-850' }
        ],
        '8–14 days': [
          { dest:'Langtang Valley', desc:'Glaciers & Tamang culture.', cost:'$900-1,400' },
          { dest:'Khaptad Trek', desc:'Alpine meadows & lakes.', cost:'$950-1,500' },
          { dest:'Upper Mustang', desc:'Desert landscapes & caves.', cost:'$1,100-1,600' },
          { dest:'Rara Lake', desc:'Nepal’s largest alpine lake.', cost:'$1,000-1,500' }
        ],
        '15–21 days': [
          { dest:'Nar Phu Valley', desc:'Remote high passes.', cost:'$1,200-1,800' },
          { dest:'Shey Phoksundo', desc:'Pristine sacred lake.', cost:'$1,100-1,700' },
          { dest:'Singalila Ridge', desc:'Pan‐Nepal skyline.', cost:'$1,300-1,900' },
          { dest:'Makalu Base Camp', desc:'Jaw-dropping peaks.', cost:'$1,400-2,000' }
        ],
        '22+ days': [
          { dest:'Great Himalaya Trail', desc:'Nepal end-to-end trek.', cost:'$2,500-3,500' },
          { dest:'Trans-Himalayan Expedition', desc:'Ultimate high passes.', cost:'$2,200-3,200' },
          { dest:'Kanchenjunga Circuit', desc:'Eastern frontier trek.', cost:'$2,000-3,000' },
          { dest:'Nepal-China Border Trail', desc:'Off-grid mountaineering.', cost:'$2,800-4,000' }
        ]
      },
      Moderate: {
        '1–7 days': [
          { dest:'Panch Pokhari', desc:'High-elevation lakes.', cost:'$600-1,000' },
          { dest:'Langtang Gosaikunda', desc:'Lakes & monasteries.', cost:'$750-1,200' },
          { dest:'Khayer Lake', desc:'Hidden turquoise gem.', cost:'$700-1,100' },
          { dest:'Pikey Peak', desc:'Everest views.', cost:'$650-1,000' }
        ],
        '8–14 days': [
          { dest:'Annapurna Base Camp', desc:'Classic Himalayan circuit.', cost:'$1,200-1,800' },
          { dest:'Manaslu Circuit', desc:'Remote high-pass trek.', cost:'$1,300-2,000' },
          { dest:'Dhaulagiri Circuit', desc:'Glacial crossings.', cost:'$1,400-2,200' },
          { dest:'Gosainkunda Dolpo Link', desc:'Off-beat high trails.', cost:'$1,500-2,300' }
        ],
        '15–21 days': [
          { dest:'Upper Dolpo', desc:'Wild trans-Himalaya.', cost:'$1,800-2,600' },
          { dest:'Rolwaling Valley', desc:'Glacier-fed rivers.', cost:'$1,700-2,400' },
          { dest:'Makalu Barun', desc:'Untouched biodiversity.', cost:'$1,900-2,700' },
          { dest:'Manaslu Tsum Valley', desc:'Cultural immersion.', cost:'$1,600-2,300' }
        ],
        '22+ days': [
          { dest:'Dolpo to Manang Link', desc:'Extended wilderness.', cost:'$2,400-3,200' },
          { dest:'Far West Nepal Expedition', desc:'Hidden kingdoms.', cost:'$2,500-3,300' },
          { dest:'Trans-Himalayan Crossing', desc:'Ultimate endurance.', cost:'$2,800-3,800' },
          { dest:'Kanchenjunga North Circuit', desc:'Remote highlands.', cost:'$2,600-3,400' }
        ]
      },
      Challenging: {
        '1–7 days': [
          { dest:'Hinku Cave Trek', desc:'High-altitude caves.', cost:'$700-1,200' },
          { dest:'Gosainkunda Express', desc:'Speed-run lakes.', cost:'$800-1,300' },
          { dest:'Pikey Peak Quick', desc:'Summit & return.', cost:'$750-1,250' },
          { dest:'Tamang Heritage Loop', desc:'Rapid culture tour.', cost:'$680-1,100' }
        ],
        '8–14 days': [
          { dest:'Everest Base Camp', desc:'Iconic Himalayan trek.', cost:'$1,800-2,500' },
          { dest:'Island Peak Climb', desc:'Beginner summit.', cost:'$2,000-2,800' },
          { dest:'Ama Dablam Base Camp', desc:'Stunning mountain amphitheater.', cost:'$1,900-2,600' },
          { dest:'Lhotse Face Approach', desc:'Dramatic seracs & walls.', cost:'$2,200-3,000' }
        ],
        '15–21 days': [
          { dest:'Everest Three Passes', desc:'Technical high passes.', cost:'$2,800-3,600' },
          { dest:'Annapurna Circuit + Tilicho', desc:'Lakes & passes.', cost:'$2,500-3,300' },
          { dest:'Rolwaling + Gosainkunda', desc:'Extended loop.', cost:'$2,400-3,200' },
          { dest:'Makalu Base & Summit Prep', desc:'Alpine challenge.', cost:'$3,000-4,000' }
        ],
        '22+ days': [
          { dest:'Full Annapurna Circuit', desc:'Complete grand tour.', cost:'$3,200-4,200' },
          { dest:'Great Himalaya Trail Sec 2', desc:'Deep wilderness.', cost:'$3,500-4,500' },
          { dest:'Manaslu Extended Circuit', desc:'Remote highlands.', cost:'$3,600-4,800' },
          { dest:'Nepal-China Ultra Link', desc:'Trans-border epic.', cost:'$4,000-5,000' }
        ]
      },
      Extreme: {
        '1–7 days': [
          { dest:'Gokyo Lakes Dash', desc:'Speed-trek high lakes.', cost:'$900-1,400' },
          { dest:'Chukung Ri Summit', desc:'Technical ridge hike.', cost:'$1,000-1,600' },
          { dest:'Gokyo to Tengboche', desc:'Skyline traverse.', cost:'$950-1,500' },
          { dest:'Everest View Quick', desc:'Heli-out return.', cost:'$1,200-1,800' }
        ],
        '8–14 days': [
          { dest:'Everest Summit Prep', desc:'Basecamp to C2.', cost:'$3,500-4,500' },
          { dest:'Island Peak Ascent', desc:'Steep ice & snow.', cost:'$2,800-3,600' },
          { dest:'Annapurna South Face', desc:'Tech basecamp.', cost:'$3,000-4,000' },
          { dest:'Dolma La High Pass', desc:'Extreme elevation.', cost:'$2,600-3,400' }
        ],
        '15–21 days': [
          { dest:'Everest Summit Attempt', desc:'Full expedition.', cost:'$10,000-13,000' },
          { dest:'Makalu Summit Prep', desc:'High-tech alpine.', cost:'$9,500-12,000' },
          { dest:'Kanchenjunga North Summit', desc:'Remote big wall.', cost:'$11,000-14,000' },
          { dest:'Cho Oyu Advanced', desc:'Oxygen & crampons.', cost:'$8,500-11,000' }
        ],
        '22+ days': [
          { dest:'Pole to Pole Nepal', desc:'Trans-Nepal ultra.', cost:'$5,000-7,000' },
          { dest:'Great Himalayan Ultra', desc:'Longest endurance.', cost:'$6,000-8,000' },
          { dest:'High Altitude Mountaineering Circuit', desc:'All peaks link.', cost:'$7,000-9,000' },
          { dest:'Nepal Alpini Extreme Expedition', desc:'Elite routes.', cost:'$8,500-11,500' }
        ]
      }
    };

    // Render trek cards and show Step 3
    function renderRecommendations() {
      const { difficulty, duration } = userChoice;
      const recArray = (recommendations[difficulty] || {})[duration] || [];
      const container = document.getElementById('recList');
      container.innerHTML = '';

      recArray.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'rec-card';
        card.innerHTML = `
          <h3>${rec.dest}</h3>
          <p>${rec.desc}</p>
          <p class="cost">Cost: ${rec.cost}</p>
          <a href="/trek-details?name=${encodeURIComponent(rec.dest)}"
             class="explore-btn">Explore</a>
        `;
        container.appendChild(card);
      });

      showStep(3);
    }
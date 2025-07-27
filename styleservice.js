// Tab Switching Logic
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active classes
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // Activate clicked tab and corresponding content
    tab.classList.add('active');
    const contentId = tab.getAttribute('data-tab');
    document.getElementById(contentId).classList.add('active');
  });
});

// Book Button Click
// const bookBtn = document.querySelector('.book-btn');
// if (bookBtn) {
//   bookBtn.addEventListener('click', () => {
//     alert("Awesome choice! One of our team members will contact you shortly.");
//   });
// }
// Element References
// script.js

// Element references
// Element references
const liveChatBtn = document.getElementById('liveChatBtn');
const chatModal   = document.getElementById('chatModal');
const chatClose   = document.getElementById('chatCloseBtn');
const chatBody    = document.getElementById('chatBody');
const chatInput   = document.getElementById('chatInput');
const chatSend    = document.getElementById('chatSendBtn');

// Predefined fallback Q&A
const fallbackQA = [
  {
    questionKeywords: ['package', 'packages'],
    answer:
      'We offer Everest Base Camp, Annapurna Circuit, and Langtang Valley treks. Visit our Packages page for details.'
  },
  {
    questionKeywords: ['include', 'inclusions'],
    answer:
      'All packages include licensed guide, porters, accommodation, meals, and permits. Gear rental is optional.'
  },
  {
    questionKeywords: ['book', 'booking', 'reserve'],
    answer:
      'To book, select your trek, fill out our online form, and pay a 20% deposit. We’ll confirm within 24 hours.'
  },
  {
    questionKeywords: ['price', 'cost', 'pricing'],
    answer:
      'Pricing varies by season and group size. Email us at info@trekking.com for a customized quote.'
  },
  {
    questionKeywords: ['cancel', 'cancellation', 'refund'],
    answer:
      'You can cancel up to 30 days before departure for a full refund minus transaction fees.'
  },
  {
    questionKeywords: ['visa', 'immigration'],
    answer:
      'Nepal offers visa-on-arrival. For details, visit nepalimmigration.gov.np or ask us for guidance.'
  }
  , {
    questionKeywords: ['weather', 'climate', 'season'],
    answer:
      'Best trekking seasons are March-May and September-November. Winter treks are possible but colder.'
  },
  {
    questionKeywords: ['gear', 'equipment', 'packing'],
    answer:
      'We provide a packing list. Gear rental is available in Kathmandu for an additional fee.'
  },
  {
    questionKeywords: ['guide', 'guides'],
    answer:
      'All treks include a licensed English-speaking guide. Additional language guides can be arranged.'
  },
  {
    questionKeywords: ['safety', 'emergency'],
    answer:
      'Your safety is our priority. Guides are trained in first aid and emergency procedures.'
  },
  {
    questionKeywords: ['insurance', 'travel insurance'],
    answer:
      'We recommend comprehensive travel insurance covering trekking, evacuation, and medical emergencies.'
  },
  {
    questionKeywords:['ok', 'okay', 'alright', 'fine'],
    answer:
      'Great! If you have any other questions, feel free to ask. I’m here to help!'
  },
  {
    questionKeywords: ['hello', 'hi', 'hey'],
    answer:
      'Hello! How can I assist you today? If you have questions about our treks, I’m here to help!'
  },
  {
    questionKeywords: ['help', 'support', 'assistance'],
    answer:
      'I’m here to help with any questions about our trekking packages, bookings, or services. Just ask!'
  },
  {
    questionKeywords: ['thank you', 'thanks'],
    answer:
      'You’re welcome! If you need anything else, just let me know. Happy trekking!'
  },
  {
    questionKeywords: ['bye', 'goodbye', 'see you'],
    answer:
      'Goodbye! Have a great day and happy trekking! Feel free to return anytime.'
  }
];

// Render a chat message
function renderMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.innerHTML = `<div class="text">${text}</div>`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Open chat with greeting once
let hasGreeted = false;
function openChat() {
  chatBody.innerHTML = '';
  if (!hasGreeted) {
    renderMessage('Hello! How can I help you plan your perfect trek?', 'bot');
    hasGreeted = true;
  }
  chatModal.style.display = 'flex';
  chatInput.focus();
}

// Close chat
function closeChat() {
  chatModal.style.display = 'none';
}

// Match user text to fallback answers
function getFallbackReply(userText) {
  const txt = userText.toLowerCase();
  for (const qa of fallbackQA) {
    if (qa.questionKeywords.some(k => txt.includes(k))) {
      return qa.answer;
    }
  }
  return null;
}

// Send message: try API, otherwise fallback
async function sendMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  renderMessage(userText, 'user');
  chatInput.value = '';

  // Attempt API call
  try {
    const res = await fetch('https://aistudio.google.com/apikey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    let botReply = null;
    if (res.ok) {
      const data = await res.json();
      console.log('API response:', data);
      // Adjust path according to your API shape
      botReply = data.choices?.[0]?.message?.content || data.candidates?.[0]?.content;
    }

    // If API failed or no reply, use fallback
    if (!botReply) {
      const fallback = getFallbackReply(userText);
      botReply =
        fallback ||
        "I’m off-trail here—could you rephrase or give me more details?";
    }

    renderMessage(botReply, 'bot');
  } catch (err) {
    console.error('Chat error:', err);
    // On error, fallback
    const fallback = getFallbackReply(userText);
    const reply =
      fallback ||
      "I’m having trouble reaching our service right now. Please try again or email info@trekking.com.";
    renderMessage(reply, 'bot');
  }
}

// Event listeners
liveChatBtn.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
// Animate each .number from 0 to its data-target when visible
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.number');
  const options = { threshold: 0.5 };
  
  const startCounter = (entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const isFloat = el.dataset.target.includes('.');
    const duration = 1500;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / (isFloat ? target * 10 : target)));
    
    const increment = () => {
      start += isFloat ? 0.1 : 1;
      if (start >= target) {
        el.textContent = isFloat ? target.toFixed(1) : target;
      } else {
        el.textContent = isFloat ? start.toFixed(1) : start;
        setTimeout(increment, stepTime);
      }
    };
    increment();
    observer.unobserve(el);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(startCounter);
  }, options);
  
  counters.forEach(counter => observer.observe(counter));
});
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.service-card');

  // Content mapping for each service
  const contentMap = {
    'guided-treks': {
      slides: [
        { src: 'guided1.jpg', alt: 'Trekking group on Himalayan trail' },
        { src: 'guided2.jpg', alt: 'Sherpa guide assisting hikers' },
        { src: 'guided3.jpg', alt: 'Sunrise from mountain summit' }
      ],
      testimonial: {
        stars: 5,
        quote:
          '“Joining the Everest Base Camp trek with their expert guides was a dream come true — every step was safe and inspiring!”',
        author: '— Aashish Gurung',
        buttons: [
          { text: 'Book Guided Treks', link: '#guided-treks', cls: 'primary' },
          { text: 'Learn More',        link: '#guided-treks', cls: 'secondary' }
        ]
      }
    },

    'equipment-rental': {
      slides: [
        { src: 'gear1.jpeg', alt: 'Quality tents setup' },
        { src: 'gear2.jpeg', alt: 'Hikers carrying backpacks' },
        { src: 'gear3.jpeg', alt: 'Climbing boots up close' }
      ],
      testimonial: {
        stars: 4,
        quote:
          '“Renting equipment saved me so much hassle and cost. The gear was top-notch and perfectly maintained.”',
        author: '— Emily Chen',
        buttons: [
          { text: 'Rent Equipment', link: '#equipment-rental', cls: 'primary' },
          { text: 'View Gear List', link: '#equipment-rental', cls: 'secondary' }
        ]
      }
    },

    'photo-expeditions': {
      slides: [
        { src: 'photo1.jpeg', alt: 'Photographer capturing mountain panorama' },
        { src: 'photo2.jpeg', alt: 'Night-sky astrophotography session' },
        { src: 'photo3.jpeg', alt: 'Portrait shoot in a mountain village' }
      ],
      testimonial: {
        stars: 5,
        quote:
          '“I captured shots I never thought possible — the photographers were true artists guiding me to the best compositions.”',
        author: '— Carlos Martín',
        buttons: [
          { text: 'Join Photo Trips', link: '#photo-expeditions', cls: 'primary' },
          { text: 'Explore Packages', link: '#photo-expeditions', cls: 'secondary' }
        ]
      }
    },

    'gourmet-meals': {
      slides: [
        { src: 'meal1.jpeg', alt: 'Gourmet dal bhat at campsite' },
        { src: 'meal2.jpeg', alt: 'Mountain chef preparing meal' },
        { src: 'meal3.jpeg', alt: 'Luxurious dining tent set-up' }
      ],
      testimonial: {
        stars: 4,
        quote:
          '“Dining at 14,000ft with gourmet meals was unbelievable — a culinary experience as memorable as the trek itself.”',
        author: '— Priya Rana',
        buttons: [
          { text: 'Book Gourmet Meals', link: '#gourmet-meals', cls: 'primary' },
          { text: 'See Sample Menu',    link: '#gourmet-meals', cls: 'secondary' }
        ]
      }
    },

    'wellness-retreats': {
      slides: [
        { src: 'wellness1.jpg', alt: 'Morning yoga at mountain sunrise' },
        { src: 'wellness2.jpg', alt: 'Meditation session by alpine lake' },
        { src: 'wellness3.jpg', alt: 'Traditional Himalayan herbal spa' }
      ],
      testimonial: {
        stars: 5,
        quote:
          '“I returned home rejuvenated; the Himalayan wellness retreat was transformative for my body and mind.”',
        author: '— Jennifer Lee',
        buttons: [
          {
            text: 'Book Wellness Retreat',
            link: '#wellness-retreats',
            cls: 'primary'
          },
          {
            text: 'Learn More',
            link: '#wellness-retreats',
            cls: 'secondary'
          }
        ]
      }
    }
  };

  // Elements for slider & testimonial
  const slidesEl = document.querySelector('.slider .slides');
  const dotsEl   = document.querySelector('.slider .dots');
  const starsEl  = document.querySelector('.testimonial-card .stars');
  const quoteEl  = document.querySelector('.testimonial-card .quote');
  const authorEl = document.querySelector('.testimonial-card .author');
  const btnsEl   = document.querySelector('.testimonial-card .buttons');

  let current     = 0;
  let slideInterval;

  // Render slides & testimonial for a given key
  function renderSlider(key) {
    const cfg = contentMap[key];
    slidesEl.innerHTML = '';
    dotsEl.innerHTML   = '';

    cfg.slides.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `<img src="${s.src}" alt="${s.alt}" />`;
      slidesEl.append(slide);

      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dotsEl.append(dot);
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartInterval(key);
      });
    });

    // Testimonial
    starsEl.innerHTML = '★'.repeat(cfg.testimonial.stars);
    quoteEl.textContent = cfg.testimonial.quote;
    authorEl.textContent = cfg.testimonial.author;
    btnsEl.innerHTML = cfg.testimonial.buttons
      .map(
        b =>
          `<a href="${b.link}" class="${b.cls}">${b.text}</a>`
      )
      .join('');

    current = 0;
    restartInterval(key);
  }

  // Go to a specific slide
  function goToSlide(n) {
    const allSlides = slidesEl.querySelectorAll('.slide');
    const allDots   = dotsEl.querySelectorAll('.dot');
    allSlides[current].classList.remove('active');
    allDots[current].classList.remove('active');
    current = n;
    allSlides[current].classList.add('active');
    allDots[current].classList.add('active');
  }

  // Auto‐advance slider
  function restartInterval(key) {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      goToSlide((current + 1) % contentMap[key].slides.length);
    }, 4000);
  }

  // Filter buttons behavior
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(c => {
        c.style.display =
          filter === 'all' || c.dataset.service === filter
            ? 'flex'
            : 'none';
      });

      renderSlider(filter === 'all' ? 'guided-treks' : filter);
    });
  });

  // Initial render
  renderSlider('guided-treks');
});
// Function to toggle the visibility of a step
// function toggleStep(step) {
//   step.classList.toggle('active');
// } 

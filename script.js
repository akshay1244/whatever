const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero headline typewriter — cycles the highlighted word through what
// Adios kicks off your feed, with a cursor that types/deletes it live.
const heroWord = document.getElementById('heroWord');

if (heroWord && !reduceMotion) {
  const words = ['ai', 'bots', 'slop', 'ads', 'spam'];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = false;

  function typeStep() {
    const word = words[wordIndex];
    let delay;

    if (deleting) {
      charIndex--;
      heroWord.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      } else {
        delay = 45;
      }
    } else {
      charIndex++;
      const current = words[wordIndex];
      heroWord.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        delay = 1600;
      } else {
        delay = 70;
      }
    }
    setTimeout(typeStep, delay);
  }

  setTimeout(() => {
    deleting = true;
    typeStep();
  }, 1800);
}

// Hero feed toggle (Before / Adios On demo)
const feedSwitch = document.getElementById('feedSwitch');
const feedGrid = document.getElementById('feedGrid');
const feedLabel = document.getElementById('feedLabel');

feedSwitch.addEventListener('click', () => {
  const isOn = feedSwitch.getAttribute('aria-checked') === 'true';
  feedSwitch.setAttribute('aria-checked', String(!isOn));
  feedGrid.classList.toggle('clean', !isOn);
  feedLabel.textContent = !isOn ? 'Adios: On' : 'Adios: Off';
});

// Auto-demo the toggle once on load so visitors notice it
window.addEventListener('load', () => {
  setTimeout(() => {
    if (feedSwitch.getAttribute('aria-checked') === 'false') {
      feedSwitch.click();
    }
  }, 1200);
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((open) => open.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Waitlist forms (no backend yet — shows a local success state)
function wireWaitlistForm(formId, noteId) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form) return;
  const originalNote = note.textContent;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = "You're on the list — we'll email you when Adios launches.";
    note.classList.add('success');
    form.reset();
    setTimeout(() => {
      note.textContent = originalNote;
      note.classList.remove('success');
    }, 5000);
  });
}

wireWaitlistForm('waitlistForm2', 'formNote2');

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('in-view'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  // Safety net: a fast fling/scrollbar-drag/keyboard jump can move the
  // viewport past a section between two observer samples, leaving it
  // permanently at opacity:0. Once scrolling settles, reveal anything
  // the observer missed instantly (no animation, since it's already
  // been scrolled past).
  let sweepTimer;
  function sweepMissed() {
    document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in-view');
      } else if (rect.bottom <= 0) {
        el.style.transition = 'none';
        el.classList.add('in-view');
      }
    });
  }
  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(sweepTimer);
      sweepTimer = setTimeout(sweepMissed, 200);
    },
    { passive: true }
  );
}

/* =========================================================
   Event Handling Demo — script.js
   Events covered: click, input, change, submit,
                   keyup, mouseover, mouseout, focus, blur
   ========================================================= */

// ── Subtask 4.1: Access DOM elements ──────────────────────

// Click card
const clickBtn       = document.getElementById('clickBtn');
const clickOutput    = document.getElementById('clickOutput');
const resetBtn       = document.getElementById('resetBtn');
const counterVal     = document.getElementById('counterVal');

// Input / Change card
const liveInput      = document.getElementById('liveInput');
const liveOutput     = document.getElementById('liveOutput');
const colorSelect    = document.getElementById('colorSelect');
const changeOutput   = document.getElementById('changeOutput');

// Keyup card
const keyInput       = document.getElementById('keyInput');
const keyBadge       = document.getElementById('keyBadge');
const keyName        = document.getElementById('keyName');

// Mouseover / mouseout card
const hoverBox       = document.getElementById('hoverBox');
const hoverOutput    = document.getElementById('hoverOutput');

// Focus / blur card
const focusInput1    = document.getElementById('focusInput1');
const focusInput2    = document.getElementById('focusInput2');
const focusOutput    = document.getElementById('focusOutput');

// Form card
const demoForm       = document.getElementById('demoForm');
const formName       = document.getElementById('formName');
const formEmail      = document.getElementById('formEmail');
const formMsg        = document.getElementById('formMsg');
const formSuccess    = document.getElementById('formSuccess');

// Event log
const logBox         = document.getElementById('logBox');
const clearLogBtn    = document.getElementById('clearLogBtn');

// ── Helpers ────────────────────────────────────────────────

let clickCount = 0;

/**
 * Append a row to the global event log.
 * @param {string} eventName - e.g. "click"
 * @param {string} message   - human-readable description
 */
function log(eventName, message) {
  const now  = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML =
    `<span class="log-time">${time}</span>` +
    `<span class="log-evt">[${eventName}]</span>` +
    `<span class="log-msg">${message}</span>`;

  logBox.appendChild(entry);
  logBox.scrollTop = logBox.scrollHeight; // auto-scroll to bottom
}

// ── Subtask 4.2: click event ───────────────────────────────

clickBtn.addEventListener('click', () => {
  clickCount++;
  counterVal.textContent = clickCount;

  // Brief scale animation
  counterVal.classList.remove('bump');
  void counterVal.offsetWidth; // reflow trick to restart animation
  counterVal.classList.add('bump');
  setTimeout(() => counterVal.classList.remove('bump'), 150);

  clickOutput.textContent = `Button clicked ${clickCount} time${clickCount === 1 ? '' : 's'}.`;
  clickOutput.className = 'output';
  log('click', `Button clicked — count: ${clickCount}`);
});

resetBtn.addEventListener('click', () => {
  clickCount = 0;
  counterVal.textContent = 0;
  clickOutput.textContent = 'Counter reset to 0.';
  clickOutput.className = 'output red';
  log('click', 'Counter reset');
});

// ── Subtask 4.3: input and change events ───────────────────

// input fires on every keystroke
liveInput.addEventListener('input', (e) => {
  const val = e.target.value;
  if (val.length === 0) {
    liveOutput.textContent = '…waiting for input';
    liveOutput.className = 'output muted';
  } else {
    liveOutput.textContent = `"${val}" — ${val.length} char${val.length === 1 ? '' : 's'}`;
    liveOutput.className = 'output';
  }
  log('input', `Text field changed: "${val}"`);
});

// change fires when the select loses focus after a new value is picked
colorSelect.addEventListener('change', (e) => {
  const chosen = e.target.value;
  changeOutput.textContent = chosen
    ? `Selected color: ${chosen}`
    : 'No color selected.';
  changeOutput.className = chosen ? 'output purple' : 'output muted';
  log('change', `Select changed to "${chosen || 'none'}"`);
});

// ── Subtask 4.4: submit event ──────────────────────────────

demoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop page reload

  const name  = formName.value.trim();
  const email = formEmail.value.trim();
  const msg   = formMsg.value.trim();

  if (!name || !email) {
    log('submit', 'Form validation failed — missing required fields');
    formSuccess.textContent = '⚠ Please fill in Name and Email.';
    formSuccess.style.background = 'rgba(255,107,107,0.08)';
    formSuccess.style.borderColor = 'rgba(255,107,107,0.25)';
    formSuccess.style.color = 'var(--accent2)';
    formSuccess.classList.add('show');
    return;
  }

  formSuccess.textContent = `✓ Submitted! Hello, ${name} — we'll reach you at ${email}.`;
  formSuccess.style.background = '';
  formSuccess.style.borderColor = '';
  formSuccess.style.color = '';
  formSuccess.classList.add('show');

  log('submit', `Form submitted — name: "${name}", email: "${email}"`);

  // Reset after brief delay
  setTimeout(() => {
    demoForm.reset();
    formSuccess.classList.remove('show');
  }, 3500);
});

// ── Subtask 4.5: keyup event ───────────────────────────────

keyInput.addEventListener('keyup', (e) => {
  const key = e.key === ' ' ? 'Space' : e.key;
  keyBadge.textContent = key.length === 1 ? key.toUpperCase() : key;

  // Brief "pressed" visual
  keyBadge.classList.add('pressed');
  setTimeout(() => keyBadge.classList.remove('pressed'), 120);

  keyName.textContent = `Key: "${e.key}"  |  Code: ${e.code}`;
  log('keyup', `Key released — key: "${e.key}", code: ${e.code}`);
});

// ── Subtask 4.6: mouseover and mouseout events ─────────────

hoverBox.addEventListener('mouseover', () => {
  hoverBox.textContent = '🟢 Mouse is INSIDE';
  hoverBox.classList.add('hovered');
  hoverOutput.textContent = 'mouseover fired — pointer entered the box.';
  hoverOutput.className = 'output';
  log('mouseover', 'Pointer entered hover box');
});

hoverBox.addEventListener('mouseout', () => {
  hoverBox.textContent = 'Hover over me';
  hoverBox.classList.remove('hovered');
  hoverOutput.textContent = 'mouseout fired — pointer left the box.';
  hoverOutput.className = 'output red';
  log('mouseout', 'Pointer left hover box');
});

// ── Subtask 4.7: focus and blur events ─────────────────────

function attachFocusBlur(input, label) {
  input.addEventListener('focus', () => {
    input.classList.add('focused');
    focusOutput.textContent = `"${label}" is focused.`;
    focusOutput.className = 'output purple';
    log('focus', `Input focused: ${label}`);
  });

  input.addEventListener('blur', () => {
    input.classList.remove('focused');
    focusOutput.textContent = `"${label}" lost focus. Value: "${input.value || '(empty)'}"`;
    focusOutput.className = 'output muted';
    log('blur', `Input blurred: ${label} — value: "${input.value || ''}"`);
  });
}

attachFocusBlur(focusInput1, 'First Name');
attachFocusBlur(focusInput2, 'Last Name');

// ── Clear log ──────────────────────────────────────────────

clearLogBtn.addEventListener('click', () => {
  logBox.innerHTML = '';
  log('system', 'Log cleared');
});
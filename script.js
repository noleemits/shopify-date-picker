document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("delivery-date");
  if (!dateInput) return; // 👈 Exit early if not on a cart/cart drawer page

  // CONFIGURATION
  const targetsToDisable = ['#CartDrawer-Checkout', '.shop-pay-button'];
  const targetsToHide = ['.promo-banner'];
  const noteFieldId = 'delivery-date-note';
  const notePrefix = 'Delivery Date: ';

  function ensureNoteFieldExists() {
    if (!document.getElementById(noteFieldId)) {
      const noteField = document.createElement('textarea');
      noteField.name = 'note';
      noteField.id = noteFieldId;
      noteField.style.display = 'none';
      dateInput?.parentNode?.appendChild(noteField);
    }
  }

  function updateNoteField() {
    const noteField = document.getElementById(noteFieldId);
    if (noteField && dateInput && dateInput.value) {
      noteField.value = `${notePrefix}${dateInput.value}`;
    }
  }

  function setDisabledState(selectors, shouldDisable) {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.disabled = shouldDisable;
        if (shouldDisable) {
          el.classList.add('is-disabled');
        } else {
          el.classList.remove('is-disabled');
        }
      });
    });
  }

  function setVisibilityState(selectors, shouldHide) {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = shouldHide ? 'none' : '';
      });
    });
  }

  function evaluateDateSelection() {
    const isValid = dateInput && dateInput.value;
    setDisabledState(targetsToDisable, !isValid);
    setVisibilityState(targetsToHide, !isValid);
    updateNoteField();
  }

  ensureNoteFieldExists();
  evaluateDateSelection();

  dateInput.addEventListener('change', evaluateDateSelection);

  fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
      const savedDate = data.attributes && data.attributes['Delivery Date'];
      if (savedDate && !dateInput.value) {
        dateInput.value = savedDate;
      }

      updateNoteField();
      evaluateDateSelection();
    });
});

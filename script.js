document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("delivery-date");

  if (!dateInput) return;

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
      dateInput.parentNode.appendChild(noteField);
    }
  }

  function updateNoteField() {
    const noteField = document.getElementById(noteFieldId);
    if (noteField && dateInput.value) {
      noteField.value = `${notePrefix}${dateInput.value}`;
    }
  }

  function setDisabledState(selectors, shouldDisable) {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.disabled = shouldDisable;
        el.classList.toggle('is-disabled', shouldDisable);
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

  function saveDeliveryDateToCart(dateValue) {
    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attributes: {
          "Delivery Date": dateValue
        }
      })
    });
  }

  function evaluateDateSelection() {
    const isValid = dateInput && dateInput.value;
    setDisabledState(targetsToDisable, !isValid);
    setVisibilityState(targetsToHide, !isValid);
    updateNoteField();
    if (isValid) saveDeliveryDateToCart(dateInput.value);
  }

  // Initial setup
  ensureNoteFieldExists();
  evaluateDateSelection();

  // On date change
  dateInput.addEventListener('change', evaluateDateSelection);

  // Restore saved value from Shopify
  fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
      const savedDate = data.attributes?.['Delivery Date'];
      if (savedDate && !dateInput.value) {
        dateInput.value = savedDate;
        updateNoteField();
        evaluateDateSelection();
      }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal      = document.getElementById('bookingModal');
  const trekNameEl = document.getElementById('modalTrekName');
  const form       = document.getElementById('bookingForm');
  const successMsg = document.getElementById('bookingSuccess');
  const STORAGE_KEY = 'trekBookings';

  // Utility: read/write array from localStorage
  const getBookings = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const saveBookings = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // Open modal
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      trekNameEl.textContent = btn.dataset.trekName;
      form.reset();
      form.classList.remove('hidden');
      successMsg.classList.add('hidden');
      modal.classList.remove('hidden');
    });
  });

  // Close modal
  modal.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
    el.addEventListener('click', () => modal.classList.add('hidden'));
  });

  // Form submission
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Collect data
    const booking = {
      trek: trekNameEl.textContent,
      name: form.bookName.value.trim(),
      email: form.bookEmail.value.trim(),
      phone: form.bookPhone.value.trim(),
      date: form.bookDate.value,
      group: +form.bookGroup.value,
      notes: form.bookNotes.value.trim(),
      timestamp: new Date().toISOString()
    };

    // Persist
    const all = getBookings();
    all.push(booking);
    saveBookings(all);

    // Show success
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
  });
});

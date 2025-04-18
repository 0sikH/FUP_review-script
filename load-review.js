
(async () => {
  const response = await fetch('https://fup-review-script.vercel.app/converted_reviews.json');
  const reviews = await response.json();

  const container = document.getElementById("review-box");
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-text">
        <div class="review-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <div class="review-content">${r.content}</div>
      </div>
      ${r.image ? `<div class="review-image"><img src="${r.image}" /></div>` : ""}
    </div>
  `).join('');
})();

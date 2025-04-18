(async () => {
  const response = await fetch('https://fup-review-script.vercel.app/converted_reviews.json');
  const reviews = await response.json();

  const container = document.querySelector(".review-list");
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <div class="review-text">${r.content}</div>
      ${r.image ? `<div class="review-img"><img src="${r.image}" alt="리뷰 이미지"></div>` : ''}
    </div>
  `).join('');
})();

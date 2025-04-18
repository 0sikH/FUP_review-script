(async () => {
  const response = await fetch('https://fup-review-script.vercel.app/converted_reviews.json');
  const reviews = await response.json();

  const container = document.querySelector(".review-list");
  if (!container) return;

  const reviewsPerPage = 3;
  let currentPage = 1;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  function renderPage(page) {
    const start = (page - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    const sliced = reviews.slice(start, end);

    container.innerHTML = sliced.map(r => `
      <div class="review-item">
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <div class="review-text">${r.content}</div>
        ${r.image && r.image !== '' ? `<div class="review-img"><img src="${r.image}" alt="리뷰 이미지"></div>` : ''}
        ${r.reviewer ? `<div class="review-user" style="font-size: 12px; color: #999; margin-top: 4px;">작성자: ${r.reviewer}</div>` : ''}
      </div>
    `).join('');

    const pagination = document.getElementById("review-pagination");
    if (pagination) {
      pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button style="margin-right: 5px; padding: 4px 8px; font-size: 12px;" onclick="window.changeReviewPage(${i + 1})">
          ${i + 1}
        </button>
      `).join('');
    }
  }

  window.changeReviewPage = function (page) {
    currentPage = page;
    renderPage(currentPage);
  }

  renderPage(currentPage);
})();

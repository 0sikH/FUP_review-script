(async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('productId') || 'default';

  const response = await fetch('https://your-server.com/sample_reviews.json');
  const reviews = await response.json();

  const container = document.getElementById("review-box");
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div class="review-item" style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd;">
      <p style="font-size: 16px; color: #444;"><strong>${"★".repeat(r.rating)}</strong></p>
      <p style="font-size: 14px;">${r.content}</p>
      ${r.image ? `<img src="${r.image}" width="120" style="margin-top:10px;">` : ""}
    </div>
  `).join('');
})();
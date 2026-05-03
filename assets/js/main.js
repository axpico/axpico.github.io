(function () {
  const products = (window.PRODUCTS || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');

  if (!products.length) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  grid.innerHTML = products.map(renderCard).join('');

  function renderCard(p) {
    const discountBadge = p.discount
      ? `<span class="badge-discount">${esc(p.discount)}</span>`
      : '';
    const originalPrice = p.original_price
      ? `<span class="card-original-price">${esc(p.original_price)}</span>`
      : '';

    const imgSrc = escAttr(p.image.replace(/^\//, ''));
    return `<article class="card">
  <a href="posts/${esc(p.asin)}.html" class="card-image-wrap">
    <img src="${imgSrc}" alt="${escAttr(p.title)}" loading="lazy" width="300" height="300">
    ${discountBadge}
  </a>
  <div class="card-body">
    <a href="posts/${esc(p.asin)}.html" class="card-title-link">
      <p class="card-title">${esc(p.title)}</p>
    </a>
    <div class="card-price-row">
      <span class="card-price">${esc(p.price)}</span>
      ${originalPrice}
    </div>
    <a href="${escAttr(p.affiliate_link)}" class="card-cta" target="_blank" rel="noopener nofollow sponsored">
      Acquista su Amazon
    </a>
  </div>
</article>`;
  }

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escAttr(str) {
    if (str == null) return '';
    return String(str).replace(/"/g, '&quot;');
  }
})();

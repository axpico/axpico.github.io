"""
Converts _posts/*.md (Jekyll front matter + Markdown) into:
  - posts/{ASIN}.html  — standalone product page
  - data/products.json — product database for the homepage
"""

import os
import re
import json
import html as html_lib
import markdown
import yaml

POSTS_DIR = "_posts"
OUTPUT_DIR = "posts"
PRODUCTS_JSON = os.path.join("data", "products.json")

HTML_TEMPLATE = """\
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title_safe} | Axpico</title>
  <meta name="description" content="{description}">
  <meta property="og:title" content="{title_safe}">
  <meta property="og:image" content="https://axpico.github.io{image}">
  <meta property="og:type" content="product">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="logo">axpico</a>
      <p class="tagline">Le migliori offerte Amazon, selezionate per te</p>
    </div>
  </header>

  <main>
    <div class="product-page">
      <nav class="breadcrumb">
        <a href="/">Home</a> &rsaquo; {title_safe}
      </nav>

      <div class="product-layout">
        <div class="product-image-wrap">
          <img src="{image_rel}" alt="{title_safe}" width="500" height="500">
        </div>

        <div class="product-info">
          <h1 class="product-title">{title_safe}</h1>
{discount_badge}
          <div class="product-price-block">
            <span class="product-price">{price}</span>
{original_price_html}
          </div>
{rating_html}
          <a
            href="{affiliate_link}"
            class="product-cta"
            target="_blank"
            rel="noopener nofollow sponsored"
          >
            &#128073; Acquista su Amazon
          </a>
          <p class="product-disclaimer">
            &#9888;&#65039; Il prezzo potrebbe variare. Verifica il prezzo aggiornato su Amazon prima di acquistare.
            In qualit&agrave; di Affiliato Amazon ricevo un guadagno dagli acquisti idonei.
          </p>
        </div>
      </div>

      <div class="product-description">
{body_html}
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p class="disclaimer">
        In qualit&agrave; di Affiliato Amazon ricevo un guadagno dagli acquisti idonei.
        I prezzi potrebbero variare. Verifica il prezzo attuale su Amazon prima dell'acquisto.
      </p>
    </div>
  </footer>
</body>
</html>
"""


def parse_front_matter(content):
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)", content, re.DOTALL)
    if not match:
        return {}, content
    meta = yaml.safe_load(match.group(1)) or {}
    body = match.group(2).strip()
    return meta, body


def render_stars(rating):
    if not rating:
        return ""
    try:
        r = float(rating)
    except ValueError:
        return ""
    full = round(r)
    return "★" * full + "☆" * (5 - full)


def extract_date(raw):
    if not raw:
        return ""
    return str(raw)[:10]


def extract_category(categories):
    if not categories:
        return ""
    if isinstance(categories, list):
        non_generic = [c for c in categories if c not in ("offerte", "deals")]
        return non_generic[0] if non_generic else categories[-1]
    return str(categories)


def build_page(meta, body_html):
    title = meta.get("title", "")
    title_safe = html_lib.escape(title)
    price = html_lib.escape(str(meta.get("price", "")))
    original_price = str(meta.get("original_price", ""))
    discount = str(meta.get("discount", ""))
    rating = str(meta.get("rating", ""))
    image = html_lib.escape(str(meta.get("image", "")))
    image_rel = html_lib.escape("../" + str(meta.get("image", "")).lstrip("/"))
    affiliate_link = html_lib.escape(str(meta.get("affiliate_link", "#")))

    discount_badge = (
        f'          <span class="badge-discount-lg">{html_lib.escape(discount)}</span>\n'
        if discount
        else ""
    )
    original_price_html = (
        f'            <span class="product-original-price">{html_lib.escape(original_price)}</span>\n'
        if original_price
        else ""
    )

    stars = render_stars(rating)
    rating_html = (
        f'          <div class="product-rating">\n'
        f'            <span class="stars">{stars}</span>\n'
        f"            <span>{html_lib.escape(rating)} / 5</span>\n"
        f"          </div>\n"
        if stars
        else ""
    )

    # Indent body_html for readability
    indented_body = "\n".join("        " + line for line in body_html.splitlines())

    description = title[:160]

    return HTML_TEMPLATE.format(
        title_safe=title_safe,
        description=html_lib.escape(description),
        image=image,
        image_rel=image_rel,
        price=price,
        discount_badge=discount_badge,
        original_price_html=original_price_html,
        rating_html=rating_html,
        affiliate_link=affiliate_link,
        body_html=indented_body,
    )


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs("data", exist_ok=True)

    products = []

    for filename in sorted(os.listdir(POSTS_DIR)):
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(POSTS_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        meta, body = parse_front_matter(content)
        asin = meta.get("asin")
        if not asin:
            print(f"  Skipping {filename} — no ASIN")
            continue

        body_html = markdown.markdown(body, extensions=["extra"])
        page_html = build_page(meta, body_html)

        out_path = os.path.join(OUTPUT_DIR, f"{asin}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(page_html)
        print(f"  {filename} → {out_path}")

        products.append(
            {
                "asin": asin,
                "title": meta.get("title", ""),
                "price": str(meta.get("price", "")),
                "original_price": str(meta.get("original_price", "")),
                "discount": str(meta.get("discount", "")),
                "rating": str(meta.get("rating", "")),
                "rating_count": str(meta.get("rating_count", "")),
                "affiliate_link": meta.get("affiliate_link", ""),
                "tracking_link": meta.get("tracking_link", ""),
                "image": meta.get("image", ""),
                "category": extract_category(meta.get("categories")),
                "date": extract_date(meta.get("date")),
            }
        )

    products.sort(key=lambda p: p["date"], reverse=True)

    products_json = json.dumps(products, ensure_ascii=False, indent=2)

    with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
        f.write(products_json)

    products_js = os.path.join("data", "products.js")
    with open(products_js, "w", encoding="utf-8") as f:
        f.write(f"window.PRODUCTS = {products_json};\n")

    print(f"  data/products.json + data/products.js — {len(products)} product(s)")


if __name__ == "__main__":
    main()

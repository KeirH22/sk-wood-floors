# S&K search and advertising setup

Updated 5 November 2026.

## Website changes completed

- Original S&K logo retained with a centred presentation. White image padding is hidden with CSS.
- Supplied pine restoration photograph used for the homepage. Responsive WebP variants are available at 480, 960 and 1440 pixels.
- Descriptive page titles, search descriptions, sharing images and business identity are consistent.
- Service pages identify the work and the London and Eastbourne bases. Polegate remains a service area.
- Canonical homepage links use `/`. Permanent redirects consolidate the bare domain and `/index.html` on the www homepage and corresponding www pages.
- Visible breadcrumbs and matching structured data describe the page hierarchy.
- The sitemap contains indexable canonical pages and representative images. Confirmation, 404 and legacy dynamic project pages remain excluded.
- Images have intrinsic dimensions. Below-the-fold images load lazily and decode asynchronously. The main homepage photograph has responsive preload and high fetch priority.
- Phone, email and WhatsApp links have stable `data-lead-action` selectors. These are selectors for future measurement, not active conversion tracking.
- Enquiry forms accept service presets and include the originating page. Campaign labels present in the current landing URL can be included with an enquiry. No advertising click IDs or cross-page campaign cookies are stored.

## Suggested advertising destinations

| Search intent | Landing page |
| --- | --- |
| Floor sanding in London | `https://www.skwoodfloorspecialists.co.uk/floor-sanding.html` |
| Sanding in Eastbourne, Polegate or Brighton | `https://www.skwoodfloorspecialists.co.uk/floor-sanding-eastbourne.html` |
| Wood floor repairs | `https://www.skwoodfloorspecialists.co.uk/floor-restoration.html` |
| Floor fitting | `https://www.skwoodfloorspecialists.co.uk/floor-installation.html` |
| Engineered wood fitting | `https://www.skwoodfloorspecialists.co.uk/floor-installation.html?service=engineered` |
| Solid wood fitting | `https://www.skwoodfloorspecialists.co.uk/floor-installation.html?service=solid` |
| Laminate fitting | `https://www.skwoodfloorspecialists.co.uk/floor-installation.html?service=laminate` |
| Parquet and herringbone fitting | `https://www.skwoodfloorspecialists.co.uk/floor-installation.html?service=parquet` |

Keep sanding and fitting search intent separate when reviewing any future campaigns. No campaigns, budgets or bids were changed in this website update.

## Required before claiming verified Google Ads measurement

1. Confirm the actual Google Ads account and conversion actions. There is no Google Ads or GA4 tag in the current source.
2. Configure the real tag and the appropriate consent settings. Do not insert an example or invented identifier.
3. Verify a successful enquiry through the existing form processor and the receiving inbox. No test message was sent during the website update.
4. Treat a successful form enquiry as a primary lead. Use a verified success event or the confirmed thank-you redirect. A submit-button click is not proof of delivery.
5. Treat phone, email and WhatsApp clicks as separate contact actions. Do not label clicks as answered calls or confirmed jobs.
6. Test deduplication and reporting using the account's diagnostic tools, then review qualified enquiries and booked work against spend.
7. Check Search Console indexing, search terms, landing pages and actual Core Web Vitals when account access is available. No ranking, Ads cost or Lighthouse score is claimed by this update.

The account connection was declined for this request. Campaign settings, conversion reporting and Search Console data have not been inspected.

## References

- [Google: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Google: organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Ads: landing page performance](https://support.google.com/google-ads/answer/7543502)
- [Google Ads: URL conversions](https://support.google.com/google-ads/answer/12676738)

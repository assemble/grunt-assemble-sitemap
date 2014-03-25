See [sitemaps.org](http://www.sitemaps.org/protocol.html#xmlTagDefinitions) for detail XML tag definitions.

### dest
Type: `String`  
Default: `undefined`

Sitemap destination. If not set, fallback to assemble destination.

## homepage
Type: `String`  
Default: `homepage` (from package.json)

Site URL

## changefreq
Type: `String`  
Default: `weekly`

How frequently the page is likely to change. This value provides general information to search engines and may not correlate exactly to how often they crawl the page. Valid values are:

 - always
 - hourly
 - daily
 - weekly
 - monthly
 - yearly
 - never

## priority
Type: `Float`  
Default: `0.5`

The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0. This value does not affect how your pages are compared to pages on other sites—it only lets the search engines know which pages you deem most important for the crawlers.

## exclusions
Type: `Array`  
Default: `['404']`

Page to omit from the sitemap.

```js
options: {
  sitemap: {
    exclusions: ["foo", "bar"],
  },
  files: {
    ...
  }
}
```

### robot
Type: `Boolean`  
Default: `true`

Generate robots.txt from `exclusions` list.

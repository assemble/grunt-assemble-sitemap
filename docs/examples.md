## Simple

To simplify might do something like:

```js
assemble: {
  blog: {
    options: {
      plugins: ['sitemap'],
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}

```

## Advanced

```js
assemble: {
  blog: {
    options: {
      plugins: ['sitemap'],
      sitemap: {
        homepage: 'http://assemble.io',
        changefreq: 'daily',
        priority: '0.8'
      }
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}
```

## Result

```js
./blog/sitemap.xml
```

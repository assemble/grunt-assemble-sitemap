## Simple

To simplify might do something like:

```js
assemble: {
  blog: {
    options: {
      plugins: ['{%= name %}'],
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
./blog/robots.txt
```

## Advanced

```js
assemble: {
  blog: {
    options: {
      plugins: ['{%= name %}'],
      sitemap: {
        homepage: 'http://assemble.io',
            changefreq: 'daily',
            priority: '0.8',
            exclude: ['50x', 'foo'],
            robot: false
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

# sakomg.github.io

Personal page of Alexander Komegunov, live at [sakomg.github.io](https://sakomg.github.io/).

One HTML file, one stylesheet, one short script. No build step, no dependencies, no fonts to download.

- Light and dark themes. The page follows the system setting; the button in the masthead overrides it and remembers the choice.
- A quiet star field appears in the dark theme, outside the text column.
- System serif stack: Charter, Sitka Text, Cambria, Georgia.
- Print styles: decoration is hidden, external links print with their addresses.
- `404.html` is what GitHub Pages serves for unknown paths.

## Files

```
index.html
404.html
assets/css/site.css   layout, themes, print
assets/js/site.js     theme switch, star field, the mark in the masthead
assets/img/           favicon as SVG with PNG fallbacks, social preview image
assets/pdfs/          resume versions; index.html links the current one
```

## Running locally

Any static server will do:

```
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## License

MIT, see [LICENSE](./LICENSE).

# GFR Calculator

Free GFR calculator using the 2021 CKD-EPI creatinine equation.

## Features

- 2021 CKD-EPI creatinine equation (race-free)
- Automatic mg/dL and µmol/L conversion
- Color-coded CKD stage result
- 8 languages with independent URLs: /, /zh/, /zh-tw/, /ja/, /ko/, /de/, /ru/, /es/
- Runs entirely in the browser, no data stored

## Local development

Because locales are loaded via fetch, you need a local server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Deploy

Push to GitHub, then import the repo on Vercel or Netlify. Static site, no build step needed.

Before deploying, replace `yourdomain.com` in:
- index.html and all language index.html files
- robots.txt
- sitemap.xml

## License

MIT

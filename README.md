# BTCUSD SMC Assistant

A mobile-first progressive web app starter for monitoring Coinbase BTC-USD public market data.

## Included now
- Live BTC-USD ticker and 24-hour high, low, and volume.
- Selectable 1m, 5m, 15m, 1h and 4h candle chart.
- Basic installable PWA shell.
- Browser notification permission prompt.

## Not implemented yet
- SMC signal detection (H4 bias, H1 structure, M15 liquidity sweep, M5 confirmation).
- Reliable background alerts.
- Trade execution or MT5/prop-firm integration.

## Run locally
Open `index.html` in a modern browser, or serve this folder using a static web server. For GitHub Pages, upload all files to the repository root and enable Pages from the `main` branch and `/ (root)`.

On Android Chrome, open the deployed site and use the browser menu to choose **Install app** or **Add to Home screen**.

## Important
Coinbase BTC-USD is spot market data and may differ from a broker's BTCUSD CFD price. Browser notifications are not guaranteed when the browser is closed.

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Indian Markets · dhru.ltd</h1>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Live Ticker</h2>
        <div id="tv-ticker" className="w-full h-12 bg-black/40 rounded" />
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Market Overview</h2>
        <div id="tv-market-overview" className="w-full h-[420px] bg-black/40 rounded" />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Screener · Gainers / Losers</h2>
        <div id="tv-screener" className="w-full h-[500px] bg-black/40 rounded" />
      </section>

      <script src="https://s3.tradingview.com/tv.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          function mk(id, config){
            if(window.TradingView && !document.getElementById(id)){
              const container = document.getElementById(id);
              if(!container) return;
              new window.TradingView.widget(Object.assign({container_id: id, theme: 'dark'}, config));
            }
          }
          // Ticker tape
          mk('tv-ticker', {
            "symbols": [
              {"proName": "NSE:NIFTY 50", "title": "Nifty 50"},
              {"proName": "NSE:BANKNIFTY", "title": "Bank Nifty"},
              {"proName": "NSE:SENSEX", "title": "Sensex"}
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "showSymbolLogo": false
          });

          // Market overview (example setup)
          mk('tv-market-overview', {
            "colorTheme": "dark",
            "isTransparent": false,
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": 420,
            "tabs": [
              {"title": "Indices", "symbols": [
                {"s":"NSE:NIFTY 50"},
                {"s":"NSE:BANKNIFTY"},
                {"s":"NSE:SENSEX"},
                {"s":"MCX:GOLD"},
                {"s":"INDEX:USDINR"}
              ]}
            ]
          });

          // Screener placeholder
          mk('tv-screener', {
            "width": "100%",
            "height": 500,
            "defaultColumn": "overview",
            "locales": "en",
            "colorTheme": "dark",
            "isTransparent": false
          });
        })();
      `}} />
    </main>
  )
}

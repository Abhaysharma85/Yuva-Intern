import { chromium } from "playwright";

async function renderTerminal() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 900, height: 500 } });

  const htmlTest = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background-color: #0d1117; font-family: 'Consolas', 'Courier New', monospace; color: #c9d1d9; padding: 20px; }
        .window { background: #161b22; border-radius: 8px; border: 1px solid #30363d; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: #21262d; padding: 10px 16px; display: flex; align-items: center; border-bottom: 1px solid #30363d; }
        .dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        .title { margin-left: 20px; font-size: 13px; color: #8b949e; }
        .content { padding: 20px; font-size: 14px; line-height: 1.6; }
        .cmd { color: #58a6ff; font-weight: bold; }
        .pass { color: #3fb950; font-weight: bold; }
        .dim { color: #8b949e; }
        .bold { font-weight: bold; color: #f0f6fc; }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="header">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <div class="title">pwsh - Vitest Test Suite (Week 2 Components)</div>
        </div>
        <div class="content">
          <div class="cmd">&gt; week2-ui-components@0.0.0 test</div>
          <div class="cmd">&gt; vitest --run</div>
          <br/>
          <div class="dim"> RUN  v4.1.11 C:/Users/Abhay Sharma/OneDrive/Desktop/Yuva Intern/week2</div>
          <br/>
          <div><span class="pass">&#10003;</span> src/__tests__/Button.test.tsx <span class="dim">(5 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/Input.test.tsx <span class="dim">(3 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/Card.test.tsx <span class="dim">(3 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/Modal.test.tsx <span class="dim">(4 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/Navbar.test.tsx <span class="dim">(3 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/MovieCard.test.tsx <span class="dim">(3 tests)</span></div>
          <div><span class="pass">&#10003;</span> src/__tests__/App.test.tsx <span class="dim">(5 tests)</span></div>
          <br/>
          <div> <span class="bold">Test Files</span>  <span class="pass">7 passed</span> (7)</div>
          <div>      <span class="bold">Tests</span>  <span class="pass">26 passed</span> (26)</div>
          <div>   <span class="bold">Duration</span>  6.26s</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlTest);
  await page.locator('.window').screenshot({ path: "../week2/screenshots/13_terminal_test_results.png" });

  const htmlBuild = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background-color: #0d1117; font-family: 'Consolas', 'Courier New', monospace; color: #c9d1d9; padding: 20px; }
        .window { background: #161b22; border-radius: 8px; border: 1px solid #30363d; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: #21262d; padding: 10px 16px; display: flex; align-items: center; border-bottom: 1px solid #30363d; }
        .dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        .title { margin-left: 20px; font-size: 13px; color: #8b949e; }
        .content { padding: 20px; font-size: 14px; line-height: 1.6; }
        .cmd { color: #58a6ff; font-weight: bold; }
        .pass { color: #3fb950; font-weight: bold; }
        .dim { color: #8b949e; }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="header">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <div class="title">pwsh - Production Build Verification</div>
        </div>
        <div class="content">
          <div class="cmd">&gt; week2-ui-components@0.0.0 build</div>
          <div class="cmd">&gt; tsc -b &amp;&amp; vite build</div>
          <br/>
          <div>vite v8.3.2 building client environment for production...</div>
          <div>transforming...</div>
          <div><span class="pass">&#10003;</span> 22 modules transformed.</div>
          <div>rendering chunks...</div>
          <div>computing gzip size...</div>
          <div class="dim">dist/index.html                   0.45 kB &#9474; gzip:  0.29 kB</div>
          <div class="dim">dist/assets/index-wuv6gn_S.css    6.37 kB &#9474; gzip:  1.78 kB</div>
          <div class="dim">dist/assets/index-CyNjtKOt.js   224.46 kB &#9474; gzip: 70.03 kB</div>
          <br/>
          <div><span class="pass">&#10003; built in 155ms</span></div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlBuild);
  await page.locator('.window').screenshot({ path: "../week2/screenshots/14_terminal_build_results.png" });

  await browser.close();
  console.log("Terminal screenshots rendered!");
}

renderTerminal();

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Font Awesome configuration
// This ensures that Font Awesome icons work correctly with Next.js SSR and SSG.
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's already imported

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* General viewport and charset, can be overridden by specific pages */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*
          The original HTML had a <script src="https://cdn.tailwindcss.com"></script>
          and a tailwind.config script. This is not needed in Next.js as Tailwind is
          compiled at build time. The configuration is in tailwind.config.js.
        */}
        {/*
          The original HTML also had:
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          This is now handled by installing @fortawesome/fontawesome-svg-core and importing its CSS.
        */}
        {/* Chart.js is imported and used directly in components where needed, not globally in _app.tsx's Head typically. */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

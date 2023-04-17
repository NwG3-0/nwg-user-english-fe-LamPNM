import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="keywords"
            content="Nwg english is use for the person who need to improve their skill in english."
          />
          <meta
            name="description"
            // eslint-disable-next-line max-len
            content="The Nwg English provide to you some features that help you improve your skills in english. On
          the other hand, there are some games that interested the your mind and help you learn faster"
          />

          <meta name="application-name" content="Nwg English" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Nwg English" />

          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#1285d2" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://ielts.lampnm.com" />
          <meta name="twitter:title" content="Lam Pham" />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Nwg english is use for the person who need to improve their skill in english."
          />
          <meta
            property="og:description"
            // eslint-disable-next-line max-len
            content="The Nwg English provide to you some features that help you improve your skills in english. On
          the other hand, there are some games that interested the your mind and help you learn faster"
          />
          <meta property="og:site_name" content="Nwg English" />
          <meta property="og:url" content="https://ielts.lampnm.com" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/website-selling-game/image/upload/v1679454331/english-project/Screenshot_19_pw4tnj.png"
          />

          <link rel="apple-touch-icon" sizes="152x152" href="/app-icons/152.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/app-icons/167.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/app-icons/180.png" />
          <link rel="apple-touch-icon" href="/app-icons/256.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/app-icons/32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/app-icons/16.png" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="icon" href="/images/logo.svg" />
          <link rel="shortcut icon" href="/images/logo.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://cdn-homepage.cloudfront.net" />
          <link
            href="https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,400;0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

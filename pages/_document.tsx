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
          <meta name="keywords" content="The website is using to teach people" />
          <meta
            name="description"
            // eslint-disable-next-line max-len
            content="The only official domain: Lam Pham"
          />

          <meta name="application-name" content="Lam Pham" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Lam Pham" />

          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#1285d2" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://ielts.lampnm.com" />
          <meta name="twitter:title" content="Lam Pham" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Lam Pham Portfolio" />
          <meta
            property="og:description"
            // eslint-disable-next-line max-len
            content="Hi! My name is Lam. Iam a web developer and welcome to my portfolio."
          />
          <meta property="og:site_name" content="Titan Hunters" />
          <meta property="og:url" content="https://ielts.lampnm.com" />
          <meta
            property="og:image"
            content="https://media.discordapp.net/attachments/1048815885265141770/1070630351430488105/IMG_2192.jpeg?width=507&height=676"
          />

          <link rel="apple-touch-icon" sizes="152x152" href="/app-icons/152.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/app-icons/167.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/app-icons/180.png" />
          <link rel="apple-touch-icon" href="/app-icons/256.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/app-icons/32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/app-icons/16.png" />

          <link rel="manifest" href="/manifest.json" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
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

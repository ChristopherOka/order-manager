import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-default-100 overflow-auto">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="overflow-auto">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

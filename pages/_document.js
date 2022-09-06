import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-default-100 overflow-auto font-source-sans-pro">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&family=Fjalla+One"
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

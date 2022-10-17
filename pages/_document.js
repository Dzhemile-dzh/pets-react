/* eslint-disable @next/next/no-document-import-in-page */
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react';
import Document, {
    Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang = "en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <div id = "overlay" />
                    <div id = "modal" />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

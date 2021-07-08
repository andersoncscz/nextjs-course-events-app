import Document, { Html, Head, Main, NextScript} from 'next/document'

/* 
    1 - Works different than _app.js which is the root component inside the body section. 
    2 - This component allows you to customize the entire HTML document.

    3 - We can override the default structure:
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
    
    The NextJS application is rendered in the <Main /> component.

    4 - reasons to override it:
    - Set a language <Html lang="en">
    - Add a element inside the <Html>, this way we add html content outside of the application component tree like react portals.

*/


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
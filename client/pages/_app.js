import DefaultLayout from "@/components/layout/DefaultLayout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    const Layout = Component.Layout || DefaultLayout;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

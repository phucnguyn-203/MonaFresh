import DefaultLayout from "@/components/layout/DefaultLayout";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

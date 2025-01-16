import "./_styles/globals.css";
import { NewsProvider } from "@/app/_context/NewsContext";
import ToastProvider from "@/app/_providers/ToastProvider";

export default async function LocaleLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <NewsProvider>
          <ToastProvider>
            <main>{children}</main>
          </ToastProvider>
        </NewsProvider>
      </body>
    </html>
  );
}

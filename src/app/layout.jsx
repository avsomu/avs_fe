import "@/app/globals.scss";
import Layout from "@/components/Layout/Layout";
import { AuthWrapper } from "@/lib/authProvider";
import { Providers } from "@/lib/provider";

export const metadata = {
  title: "IDG Summary Portal",
};
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        </AuthWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
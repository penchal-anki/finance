'use client'
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { ThemeProvider } from "@/app/shared/theme-provider";
import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@/utils/class-names";
import { AppProvider } from "./root-lib";
import localFont from "@next/font/local";

// const NextProgress = dynamic(() => import('@/components/next-p     rogress'), {
//   ssr: false,
// });
// styles
import "@/app/global.css";

const olga = localFont({
  src: [
    {
      path: "../../public/fonts/Olga.ttf",
      weight: "700",
    },
  ],
  variable: "--font-olga",
});

// export const metadata = {
//   title: siteConfig.title,
//   description: siteConfig.description,
// };

// const toastOptions = {
//   success: {
//     style: {
//       background: '#EBF8F3',
//       color:'green'
//     },
//   },
//   error: {
//     style: {
//       background: '#FFECF0',
//       color:'#F0416C'
//     },
//   },
// }

const toastOptions: any = {
  success: {
    style: {
      background: "#EBF8F3",
      color: "green",
    },
    position: "top-right",
  },
  error: {
    style: {
      background: "#FFECF0",
      color: "#F0416C",
    },
    position: "top-right",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(
          inter.variable,
          lexendDeca.variable,
          olga.variable,
          "font-inter"
        )}
      >
        {/* <AuthProvider session={session}> */}
        <AppProvider>
          <ThemeProvider>
            {/* <NextProgress /> */}
            {children}
            <Toaster toastOptions={toastOptions} />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </AppProvider>
        {/* </AuthProvider> */}
        {/* <script>
          {`
          window.onmessage = function (e) {
            if (e.data && e.data.language) {
              console.log(e.data);
              // handle the e.data which contains the code object
            }
          };
          `}
        </script> */}
      </body>
    </html>
  );
}

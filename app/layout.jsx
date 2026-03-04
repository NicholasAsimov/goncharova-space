import "./globals.css";

export const metadata = {
  title: "Kate Goncharova — Artsy Portfolio v2",
  description:
    "Artsy portfolio of Ekaterina Goncharova — Visual Marketing Designer, UX/UI and AI-Driven Design.",
  icons: {
    icon: "/resources/favicon.svg",
    shortcut: "/resources/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Syne:wght@500;700;800&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

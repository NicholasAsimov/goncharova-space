import "./globals.css";

export const metadata = {
  title: "Kate Goncharova — Visual & Product Designer",
  description:
    "Visual and product design portfolio by Ekaterina Goncharova.",
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400&family=Libre+Baskerville:ital,wght@0,400;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

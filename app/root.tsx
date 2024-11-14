import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import {apiPlugin, storyblokInit} from "@storyblok/react/rsc";
import page from "~/components/content_types/page";
import {GeneralErrorBoundary} from "~/components/error-boundary";

storyblokInit({
  accessToken: "<your-access-token>",
  use: [apiPlugin],
  components: {
    // content types
    page,
  }
});


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className="h-full w-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary/>
  )
}

# Remix + Storyblok + Tailwind CSS + shadcn/ui

To get started replace `<your-access-token>` in [root.tsx](app/root.tsx) with your Storyblok access token, 
and `<your-space-id>` in [package.json](package.json) with your Storyblok space id.


## Development

Run the dev server:

```shellscript
npm run dev
```

And open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Generate types for Storyblok components

```sh
npm run pull-components
```
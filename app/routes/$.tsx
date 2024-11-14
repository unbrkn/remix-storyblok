import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {useStoryblokState} from "@storyblok/react";
import {getStoryblokApi, StoryblokStory} from "@storyblok/react/rsc";
import {useLoaderData} from "@remix-run/react";
import {isStoryblokPreview} from "~/lib/utils";
import {BRAND_NAME} from "~/lib/constants";
import {getSbParams} from "~/lib/storyblok.server";

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const story = data?.story

  if (!story) {
    return [
      {title: `Oops! · ${BRAND_NAME}`},
      {name: "robots", content: "noindex, nofollow"}
    ]
  }

  const title = story.content?.seoTitle || story.name
  const description = story.content?.seoDescription
  const url = new URL(data?.url as string)
  const fullUrl = `${url.origin}/${story.full_slug}`

  const currentLang = "de-CH"

  return [
    {title: `${title} · ${BRAND_NAME}`},
    description && {name: "description", content: description, lang: currentLang},
    {name: "created", content: story?.published_at},
    {name: "robots", content: "index, follow"},
    {property: "og:type", content: "website"},
    {name: "twitter:title", property: "og:title", content: title},
    {name: "twitter:url", property: "og:url", content: fullUrl},
    {name: "twitter:card", content: "summary"},
    {name: "twitter:domain", property: "og:site_name", content: BRAND_NAME},
    description && {name: "twitter:description", property: "og:description", content: description},
    {name: "twitter:image", property: "og:image", content: "/og.png"},
    {name: "twitter:image:alt", content: title},
    {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png", tagName: "link"},
    {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png", tagName: "link"},
    {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png", tagName: "link"},
    {rel: "manifest", href: "/site.webmanifest", tagName: "link"},
    // {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#ab2221", tagName: "link"},
    {name: "msapplication-TileColor", content: "#0A123E"},
    {name: "theme-color", content: "#f3f3f3"},
    {rel: "canonical", href: fullUrl, tagName: "link"},
  ];
};

export const loader = async ({params, request}: LoaderFunctionArgs) => {
  const slug = params["*"] ?? "home";
  const preview = isStoryblokPreview(request);

  const sbParams = getSbParams(request);

  const {data} = await getStoryblokApi()
    .get(`cdn/stories/${slug}`, sbParams)
    .catch((e) => {
      console.log("e", e);
      return {data: null};
    });

  if (!data) {
    throw new Response(`Not Found: ${slug}`, {status: 404});
  }

  let globalData = data;
  if (data.story.slug !== "global") {
    const response = await getStoryblokApi()
      .get(`cdn/stories/global`, sbParams)
      .catch((e) => {
        console.log("e", e);
        return {data: null};
      });
    globalData = response.data;
  }

  return Response.json({
    story: data?.story,
    global: globalData?.story,
    preview,
    url: request.url
  });
}

export default function Page() {
  const data = useLoaderData<typeof loader>()

  const story = useStoryblokState(data.story)

  return (
    <>
      <main className="flex-1">
        <StoryblokStory story={story} references={data.references} bridgeOptions={{}}/>
      </main>
    </>
  )
}
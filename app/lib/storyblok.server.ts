import {isStoryblokPreview} from "~/lib/utils";
import {ISbStoriesParams} from "@storyblok/react";

export const getSbParams = (request: Request): ISbStoriesParams => {
  const preview = isStoryblokPreview(request);

  const sbParams: ISbStoriesParams = {
    version: "draft", // @todo change back when going live
    resolve_links: "url",
  };

  if (preview) {
    sbParams.version = "draft"
    sbParams.cv = Date.now()
  }

  return sbParams;
}
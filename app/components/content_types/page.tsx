import {storyblokEditable} from '@storyblok/react/rsc'
import {PageStoryblok} from "../../../types/component-types-sb";
import {StoryblokComponent} from "@storyblok/react";

type PageProps = {
  blok: PageStoryblok,
}

const Page = ({blok}: PageProps) => (
  <div {...storyblokEditable(blok)}>
    {blok.body &&
      blok.body.map(nestedBlok => <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid}/>)}
  </div>
)

export default Page

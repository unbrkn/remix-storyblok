import { render } from 'storyblok-rich-text-react-renderer-ts'
import { StoryblokComponent } from '@storyblok/react'
import {RichtextStoryblok} from "../../types/component-types-sb";

type RichTextRendererProps = {
  text: RichtextStoryblok | undefined
}

const RichTextRenderer = ({ text }: RichTextRendererProps) => {
  return (
    <>
      {render(text, {
        defaultBlokResolver: (name, props) => (
          <StoryblokComponent blok={{ component: name, ...props }} />
        ),
      })}
    </>
  )
}

export default RichTextRenderer

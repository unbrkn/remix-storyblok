import {MultilinkStoryblok} from "../../types/component-types-sb";
import {HTMLProps, ReactNode} from "react";
import {Link} from "@remix-run/react";

export default function StoryblokLink({link, children, ...props}: {link: MultilinkStoryblok | undefined, children: ReactNode} & HTMLProps<HTMLAnchorElement>) {
  return (
    <Link
      to={{
        pathname: link?.story ? `/${link.story.full_slug}` : link?.cached_url,
        hash: link?.anchor ? `#${link.anchor}` : undefined,
      }}
      target={link?.link?.target}
      rel={link?.link?.target === '_blank' ? 'noreferrer noopener' : ''}
      {...props}
    >
      {children}
    </Link>
  )
}
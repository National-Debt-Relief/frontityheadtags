import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import { Packages } from "../../types";

/**
 * Render all head tags from the current entity.
 *
 * @param props - Frontity props injected by {@link connect}.
 * @returns A <Head> element with all head tags inside.
 */
const Root: React.FC<Connect<Packages>> = ({ state }) => {
  // Get current link.
  const { link } = state.router;
  const { transformLinks } = state.headTags;

  // Get if current link is ready.
  const { isReady } = state.source.get(link);

  // Get the head tags for that link.
  const headTags = React.useMemo(() => state.headTags.get(link), [
    state.frontity.url,
    state.router.link,
    state.source.api,
    transformLinks,
    transformLinks && transformLinks.base,
    transformLinks && transformLinks.ignore,
    isReady,
  ]);
  //console.log('headtags', headTags);
const newTags = headTags.filter((tag)=> { if(tag.tag=="link"){
  if(tag.attributes['rel']){
    return tag.attributes['rel']!='icon'}}else{return tag}});
//console.log('new tags', newTags)
  // Render all tags inside <head>.
  return (
    <Head>
      {newTags.map(({ tag: Tag, attributes, content }, index) => {
      /*  if(state.router.link.includes("apply")==true){
          console.log('tg', Tag);
          console.log('attributes', attributes['rel']);
        }*/
        return (
          <Tag key={index} {...attributes}>
            {content}
          </Tag>
        );
      })}
    </Head>
  );
};

export default connect(Root);

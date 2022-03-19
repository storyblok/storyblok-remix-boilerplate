import { json, useLoaderData } from "remix";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export const loader = async ({ params }) => {
  const slug = params.slug ?? "home";

  let sbParams = {
    version: "draft",
  };

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);

  return json(data?.story);
};

export default function Page() {
  const story = useLoaderData();

  const newStory = useStoryblokState(story);

  return <StoryblokComponent blok={newStory.content} />;
}

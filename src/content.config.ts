import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Dormant blog collection — ready for posts, but no posts and no route/nav link yet.
 * Add a Markdown file under src/content/blog/ and wire a route when the first post exists.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

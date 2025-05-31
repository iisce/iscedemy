import { type SchemaTypeDefinition } from "sanity";
import { post } from "./blog-schemas/post";
import { tag } from "./blog-schemas/tag";
import { author } from "./blog-schemas/author";

export const schema: { types: SchemaTypeDefinition[] } = {
     types: [post, tag, author],
};

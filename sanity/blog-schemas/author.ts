import { Rule } from "sanity";

export const author = {
     name: 'author',
     title: 'Author',
     type: 'document',
     fields: [
          {
               name: 'name',
               title: 'Name',
               type: 'string',
               validation: (Rule: Rule) => Rule.required().error('Author name is required'),
          },
          {
               name: 'slug',
               title: 'Slug',
               type: 'slug',
               options: { source: 'name' },
          },
          {
               name: 'image',
               title: 'Image',
               type: 'image',
               options: { hotspot: true },
          },
          {
               name: 'bio',
               title: 'Bio',
               type: 'text',
          },
     ],
     preview: {
     select: {
      title: "name",
      media: "image",
    },
  },
};
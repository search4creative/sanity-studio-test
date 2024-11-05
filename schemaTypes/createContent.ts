import { defineArrayMember, defineConfig, defineField, defineType } from 'sanity';
import FPVideoInput from '../components/fpCustomField';
import FPComponent from '../components/fpComponent';

export const createContent = defineType({
    name: 'createContent',
    title: 'Content',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: "Title",
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        /*  defineField({
             name: 'description',
             title: "Description",
             type: 'array',
             of: [{ type: 'block' }],
         }),
         defineField({
             name: 'language',
             title: "Language",
             type: 'string',
             validation: (rule) => rule.required(),
         }),
         defineField({
             name: 'genre',
             title: "Genre",
             type: 'string',
             validation: (rule) => rule.required(),
         }),
         defineField({
             name: 'year',
             title: "Year",
             type: 'string',
             validation: (rule) => rule.required(),
         }),
         defineField({
             name: 'bannerImage',
             title: "Banner Image",
             type: 'image',
             validation: (rule) => rule.required(),
         }),
         defineField({
             name: 'cardImage',
             title: "Card Image",
             type: 'image',
             validation: (rule) => rule.required(),
         }), */
        defineField({
            name: "videoObject",
            title: "Video Url",
            type: "object",
            validation: (Rule) => Rule.required().error('This field is mandatory.'),
            components: {
                input: FPComponent
            },
            fields: [
                {
                    type: 'string',
                    name: 'videourl',
                    title: 'Video URL',
                },
                {
                    type: 'string',
                    name: 'id',
                    title: 'MediaId',
                    hidden: true
                },
                {
                    type: 'string',
                    name: 'thumbnail',
                    title: 'Thumbnmail',
                    hidden: true
                },
                {
                    type: 'string',
                    name: 'status',
                    title: 'Status',
                    hidden: true,
                },
                {
                    type: 'string',
                    name: 'playbackId',
                    title: 'Playback Id',
                    hidden: true,
                },
                {
                    type: 'string',
                    name: 'maxResolution',
                    title: 'Max Resolution',
                    hidden: true,
                },
            ],
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            hidden: true,
            initialValue: () => new Date().toISOString(),
            validation: (rule) => [
                rule.required(),
            ],
        }),

    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'videoObject.status'
        }
    }


})

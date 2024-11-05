import { defineConfig, defineField, defineType } from 'sanity';
import FPVideoInput from '../components/fpCustomField';
import FPComponent from '../components/fpComponent';

export const videoPost = defineType({
    name: 'videoPost',
    title: 'Videos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        /* defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }), */
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => [
                rule.required(),
            ],
            hidden: true
        }),
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
                    name: 'mediaid',
                    title: 'MediaId',
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
    ],

})
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { HelloWorldAction } from './components/helloWorld'

export default defineConfig({
  name: 'default',
  title: 'Videos',

  projectId: '0pmc68zj',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    /* actions: (prev, context) => {
      // Only add the action for documents of type "movie"
      // for other types return the current array of actions as is
      return context.schemaType === 'videoPost' ? [HelloWorldAction, ...prev] : prev;
    }, */
    // actions: [HelloWorldAction]
  }
})

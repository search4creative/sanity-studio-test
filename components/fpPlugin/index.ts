import { definePlugin, defineConfig } from 'sanity'

interface VideoPost {
    // Define the specific fields for your video post type
    title: string;
    videoUrl: string;
    url: string; // Field to store the API endpoint
    // ... other fields
}

export default definePlugin((config) => {

    return {
        name: 'fpVideoPlugin',

        patch: {
            beforePublish: async (event) => {
                const { documentId, schemaType } = event;

                if (schemaType !== 'videoPost') {
                    return;
                }

                const document: VideoPost = event.document as VideoPost;
                const apiEndpoint = document.apiEndpoint;

                try {
                    const response = await fetch(apiEndpoint);
                    const data = await response.json();

                    // Use useDocumentOperation to update the document
                    useDocumentOperation((patch) => {
                        patch.set({ fetchedData: data });
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Handle the error, e.g., display an error message to the user
                }
            },
        },
    };
});
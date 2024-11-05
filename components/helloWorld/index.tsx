// actions.js
import { set, unset } from 'sanity'
import { patch } from 'sanity/migrate';

export function HelloWorldAction(props) {

    const submitUrl = async (url: string) => {

        try {
            const body = JSON.stringify({
                inputs: [
                    {
                        type: 'video',
                        url: url || "https://cdn.pixabay.com/video/2024/06/08/215762_large.mp4"
                    }
                ],
                metadata: {
                    key1: 'value1'
                },
                accessPolicy: 'public'
            });

            const response = await fetch("https://v1.fastpix.io/on-demand", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(`4305eccb-9b10-41e6-8189-28b2727c03a6:448185a2-5bd8-48a4-bc4f-5cd0692a52da`)
                },
                body: body
            });
            const data = await response.json();

            if (!response.ok) {
                props.error
            }

            patch(props.id, data);
        } catch (err) {
            console.error("Submitting err - ", err);

        }
    }

    return {
        onHandle: () => {
            if (props.draft) {
                submitUrl(props.draft.url)
            }
        },
    }
}
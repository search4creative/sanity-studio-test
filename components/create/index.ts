import { useEffect, useState } from "react";
import { DocumentActionProps, DocumentActionsContext } from 'sanity'

interface GetMediaInfoInterface {
    // url: string;
}

export default function validateAndPublishAction(props: DocumentActionProps) {
    const originalPublishAction = props.published
        ? props.unpublish
        : props.publish

    return {
        ...originalPublishAction,
        label: 'Validate & Publish',
        onHandle: async () => {
            const doc = props.draft || props.published

            try {
                const body = JSON.stringify({
                    inputs: [
                        {
                            type: 'video',
                            url: doc?.url || "https://cdn.pixabay.com/video/2024/06/08/215762_large.mp4",
                        }
                    ],
                    metadata: {
                        key1: 'value1'
                    },
                    createSubtitles: {
                        name: 'name',
                        metadata: {
                            key1: 'value1'
                        },
                        languageCode: 'en-us'
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

                if (!response.ok) {
                    props.onError([{
                        message: 'Failed to validate with third party service',
                        status: 'error'
                    }])
                    return
                }

                await originalPublishAction.onHandle()
            } catch (error) {
                console.error('Validation error:', error)
                props.onError([{
                    message: 'Error occurred during validation',
                    status: 'error'
                }])
            }
        }
    }
}
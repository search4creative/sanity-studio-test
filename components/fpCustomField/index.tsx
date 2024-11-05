// ./components/ProductSelector.tsx

import React, { useCallback, useEffect, useState } from 'react'
import { SanityDefaultPreview, StringInputProps, set, unset } from 'sanity'
import { Select, Card, Spinner, Text, TextInput } from '@sanity/ui'

export default function FPVideoInput(props: any) {
    // The onChange handler can write new changes to the field
    const { onChange, value, readOnly } = props;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const cardProps = { shadow: 1, padding: 3, radius: 2 }

    // This function will run each time the select menu is used
    const handleChange = useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (value !== "") {
            try {
                setLoading(true);
                const body = JSON.stringify({
                    inputs: [
                        {
                            type: 'video',
                            url: value
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
                        'Authorization': 'Basic ' + btoa(`6b18fbbf-b31c-47ce-8958-fa43476c9140:8403401b-2993-4a6d-a06b-bcccb2d26ea6`)
                    },
                    body: body
                });
                const responseData = await response.json();
                setLoading(false);
                if (!response.ok) {
                    setError(responseData)
                }

                onChange(responseData?.success ? set(JSON.stringify(responseData?.data)) : unset())

            } catch (err) {
                setError(err)
            }

        }
    }, [onChange])

    if (error)
        return (
            <Card tone="critical" {...cardProps}>
                <Text>There has been an error, check with Access Token or Secret Key or with Permissions</Text>
            </Card>
        )

    return (
        <TextInput readOnly={loading} onBlur={handleChange} value={value} />
    )
}
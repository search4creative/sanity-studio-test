import { Stack, Text, Card, Button, TextInput, Spinner } from '@sanity/ui'
import { set, unset } from 'sanity'
import { useCallback, useState } from 'react';

const FPComponent = (props: any) => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const { onChange } = props;

    const handleClick = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        if (inputValue !== "") {
            try {
                setLoading(true);
                const body = JSON.stringify({
                    inputs: [
                        {
                            type: 'video',
                            url: inputValue
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
                onChange(responseData?.success ? set({
                    mediaId: responseData?.data?.id,
                    status: responseData?.data?.status,
                    playbackId: responseData?.data?.playbackIds[0]?.id,
                    maxResolution: responseData?.data?.maxResolution,
                    thumbnail: "https://images.fastpix.io/" + responseData?.data?.playbackIds[0]?.id + "/thumbnail.png"
                }) : unset())
                setData(responseData);

            } catch (err) {
                setError(err);
                setData(null);
                setLoading(false);
            }
        }
    }, [onChange, inputValue])

    return (
        <Card border padding={3}>
            <Stack space={3}>
                {
                    data === null ? (
                        <>
                            <TextInput
                                placeholder="Type something..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.currentTarget.value)}
                                disabled={loading || data !== null}
                            />
                            <Button onClick={handleClick} text="Add Video" tone="primary" disabled={loading || data !== null} />
                        </>
                    ) : ""
                }
                {
                    loading ? <Spinner /> : ""
                }
                {
                    data !== null ? (
                        <pre style={{ overflow: "auto", lineHeight: "1.5", width: "90%" }}>
                            <code>
                                {JSON.stringify(data)}
                            </code>
                        </pre>
                    ) : ""
                }
                {
                    error ? (
                        <pre>
                            <code>
                                {error}
                            </code>
                        </pre>
                    ) : ""
                }
            </Stack>
        </Card>
    )
}

export default FPComponent;
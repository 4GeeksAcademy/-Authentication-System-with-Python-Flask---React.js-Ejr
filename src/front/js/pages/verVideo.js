import React, { useEffect, useState } from 'react';

const VerVideo = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://yt-api.p.rapidapi.com/dl?id=arj7oStGLkU';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'cc9f42dc01msh6e75c1774fdae52p1b03e2jsnf594dc9b1506',
                    'x-rapidapi-host': 'yt-api.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json(); // Use .json() if API returns JSON
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once after initial render

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Video Data</h1>
            <div> </div>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Format JSON for better readability */}
        </div>
    );
};

export default VerVideo;

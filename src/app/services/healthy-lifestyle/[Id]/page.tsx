"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';


const HealthyLifestyleDetail = () => {
    const { Id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Replace with your actual data fetching logic
                // This is a placeholder, you'll need to connect to your data source
                const response = await fetch(`/api/healthy-lifestyle/${Id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDetail(data);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('An error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [Id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!detail) {
        return <div>Detail not found</div>;
    }

    return (
        <div>
            <h1>Healthy Lifestyle Detail</h1>
            
        </div>
    );
};

export default HealthyLifestyleDetail;
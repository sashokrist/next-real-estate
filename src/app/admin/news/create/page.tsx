// File: src/app/admin/news/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button } from 'react-bootstrap';

export default function CreateNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const res = await fetch('/api/news', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/admin/news');
        } else {
            alert('Failed to create news');
        }

        setLoading(false);
    };

    return (
        <Container className="my-5">
            <h1>Create News</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={4} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" required />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </Container>
    );
}

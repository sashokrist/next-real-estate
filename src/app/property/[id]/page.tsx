export default function PropertyDetail({ params }: { params: { id: string } }) {
    return (
        <div className="p-5">
            <h1>Property Detail Page</h1>
            <p>Property ID: {params.id}</p>
            <p>Details would be fetched from a real database here.</p>
        </div>
    );
}
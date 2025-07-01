import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/debug')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <header className="bg-red-500">Test Headeri</header>
      <div style={{ width: '100vw', height: 'calc(100vh - 48px)' }}>
        <iframe
          src="https://vestel.getcorpeo.com/editor"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
      <footer className="bg-blue-500">Test Footeri</footer>
    </div>
  );
}

export default function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="bg-errorbg/60 backdrop-blur-lg border border-error border-dashed rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-error">{error}</p>
        </div>
      </div>
    </div>
  );
}
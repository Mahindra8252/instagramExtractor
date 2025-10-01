function NoPosts({ message }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts found</h3>
      <p className="text-gray-400">{message || 'This profile might be private or have no posts yet.'}</p>
    </div>
  );
}

export default NoPosts;
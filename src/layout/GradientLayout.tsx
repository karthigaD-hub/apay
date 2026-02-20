export default function GradientLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-orange-200 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-5">
        {children}
      </div>
    </div>
  );
}

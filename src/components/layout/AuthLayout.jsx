/**
 * Structural shell for auth pages: brand panel on the left (desktop only),
 * form content on the right. Reusable for login, forgot-password, etc.
 */
export default function AuthLayout({ brandPanel, children }) {
  return (
    <div className="min-h-screen w-full bg-[#FAF3E8] lg:grid lg:grid-cols-2">
      {brandPanel}
      <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

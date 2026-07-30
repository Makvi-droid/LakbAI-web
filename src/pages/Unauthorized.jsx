import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FAF3E8] px-6 text-center">
      <h1 className="font-display text-3xl text-[#12202B]">Access denied</h1>
      <p className="max-w-sm text-sm text-[#7C93A3]">
        Your account doesn't have permission to view this page.
      </p>
      <Link to="/" className="mt-4 font-medium text-[#0D9488] hover:underline">
        Go back
      </Link>
    </div>
  );
}

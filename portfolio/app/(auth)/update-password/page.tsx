import { Suspense } from "react";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Suspense fallback={<div className="w-full max-w-md animate-pulse">Loading...</div>}>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
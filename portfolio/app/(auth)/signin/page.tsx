import { Suspense } from "react";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Suspense fallback={<div className="w-full max-w-md animate-pulse">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
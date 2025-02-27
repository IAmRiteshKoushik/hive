import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '../../components/signup-form';

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-1/4 max-w-sm md:max-w-3xl">
      <SignupForm />
    </div>
  </div>
  );
}

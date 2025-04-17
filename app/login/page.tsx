import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      <LoginForm />
    </main>
  )
}

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bins Developing World</h1>

      <ul className="space-y-2">
        <li>
          <Link href="/signup" className="text-blue-500 hover:underline">
            SignUp
          </Link>
        </li>
        <li>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link href="/posts" className="text-blue-500 hover:underline">
            Posts
          </Link>
        </li>
        <li>
          <Link href="/editor" className="text-blue-500 hover:underline">
            New Post
          </Link>
        </li>
        
      </ul>
    </main>
  )
}
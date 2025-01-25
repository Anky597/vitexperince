import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} VIT Interview Experiences</p>
            <p className="text-sm text-gray-400">All rights reserved</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}


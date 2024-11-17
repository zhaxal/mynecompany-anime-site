import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-700 py-6 mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="text-gray-400 text-sm">
          © 2024 Zhakhangir Anuarbek
        </span>
        <Link
          href="https://github.com/zhaxal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
        >
          <FiGithub className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
}

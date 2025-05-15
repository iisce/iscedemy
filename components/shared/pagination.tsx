import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <Link
        href={`${baseUrl}?page=${Math.max(1, page - 1)}`}
        className={`px-4 py-2 rounded-full h-full text-white ${
          page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-green-600"
        }`}
      >
        Previous
      </Link>
      <span className=" py-2 text-gray-600">
        Page {page} of {totalPages}
      </span>
      <Link
        href={`${baseUrl}?page=${Math.min(totalPages, page + 1)}`}
        className={`px-4 py-2 rounded-full h-full text-white ${
          page === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-green-600"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
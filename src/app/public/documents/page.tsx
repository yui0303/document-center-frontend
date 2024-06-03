"use client";
import DocumentTableWithPagination from "@/components/documents/documentTableWithPagination";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex flex-col h-screen p-10 w-full">
        <h1 className="text-4xl font-bold">公開文件</h1>
        <hr className="my-6 w-full" />
        <DocumentTableWithPagination type="public_all" />
      </div>
    </div>
  );
}

"use client";
import AddDocumentBtn from "@/components/documents/addDocumentBtn";
import DocumentTableWithPagination from "@/components/documents/documentTableWithPagination";

export default function Page() {
  return (
    <div className="flex flex-col h-screen p-10 w-full">
      <h1 className="text-4xl font-bold">我的文件</h1>
      <hr className="my-6 w-full" />
      <div className="w-full flex justify-end mb-2">
        <AddDocumentBtn />
      </div>
      <DocumentTableWithPagination type="me" />
    </div>
  );
}

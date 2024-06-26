import useSWR from "swr"
import { DataTable } from "./documentTable"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect, useState } from "react"
import LoadingContext from "@/context/loadingContext"

const DocumentTableWithPagination = ({
  type,
}: {
  type: "me" | "public_all"
}) => {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const route =
    type === "me" ? "/api/documents/me" : "/api/documents/public/all"
  const [globalLoading, setGlobalLoading] = useContext(LoadingContext)

  const { data, error, isLoading } = useSWR(
    `${route}?page=${pageIndex}&limit=${pageSize}`,
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      return response.json()
    }
  )
  useEffect(() => {
    setGlobalLoading(isLoading)
  }, [isLoading])
  if (isLoading) return <div>載入中...</div>
  if (error) return <div>Failed to fetch data</div>
  return (
    <div className="flex items-center justify-between flex-col gap-2">
      <DataTable data={data.data} />
      {data.data.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">每頁顯示：</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm font-medium">筆</p>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              第 {pageIndex} 頁，共 {data.totalPage} 頁
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPageIndex(1)}
                disabled={pageIndex === 1}
              >
                <span className="sr-only">首頁</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex(pageIndex > 1 ? 1 : pageIndex - 1)}
                disabled={pageIndex === 1}
              >
                <span className="sr-only">前一頁</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setPageIndex(
                    pageIndex + 1 > data.totalPage
                      ? data.totalPage
                      : pageIndex + 1
                  )
                }}
                disabled={pageIndex === data.totalPage}
              >
                <span className="sr-only">下一頁</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPageIndex(data.totalPage)}
                disabled={pageIndex === data.totalPage}
              >
                <span className="sr-only">末頁</span>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentTableWithPagination

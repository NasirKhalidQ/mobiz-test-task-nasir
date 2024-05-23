"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { APIEndpoints } from "@/apiEndpoints";
import { axiosInstance } from "@/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@uidotdev/usehooks";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 } },
});
export default function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Products />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("none");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const rowsPerPage = 20;
  const [page, setPage] = useState(0);
  const headers = [
    "",
    "title",
    "description",
    "price",
    "category",
    "brand",
    "stock",
  ];

  const fetchProducts = async (category: string = "none", q: string = "") => {
    let url = APIEndpoints.GET_PRODUCTS;
    if (category.length && category !== "none") {
      url = `${APIEndpoints.GET_PRODUCTS}/category/${category}`;
    }
    if (q.length && category === "none") {
      url = `${APIEndpoints.GET_PRODUCTS}/search`;
    }
    try {
      const response = await axiosInstance({
        method: "get",
        url,
        params: {
          skip: page * rowsPerPage,
          limit: rowsPerPage,
          q,
        },
      });
      return response.data;
    } catch (error) {
      // toast.error("There has been a problem with your fetch operation:");
    }
  };

  const productsQuery = useQuery({
    queryKey: ["products", page, selectedCategory, debouncedQuery],
    queryFn: () => fetchProducts(selectedCategory, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories", null],
    queryFn: () => fetchCategories(),
    placeholderData: keepPreviousData,
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: APIEndpoints.GET_CATEGORIES,
      });
      return response.data;
    } catch (error) {
      // toast.error("There has been a problem with your fetch operation:");
    }
  };

  const selectCategory = (value: string) => {
    setSelectedCategory(value);
    setQuery("");
  };

  const searchProducts = (value: string) => {
    setSelectedCategory("none");
    setQuery(value);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white rounded-3xl min-h-[722px] mt-4">
        <div className="rounded-xl mt-4 mx-10">
          <div className="flex gap-4">
            <Input
              onChange={(e) => searchProducts(e.currentTarget.value)}
              placeholder="Search here..."
              className="h-10"
            />
            <Select onValueChange={(value) => selectCategory(value)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">None</SelectItem>
                  {categoriesQuery.data?.map(
                    (category: string, index: number) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[68vh] rounded-md border p-4 mt-6">
            {productsQuery.isLoading ? (
              <div className="flex items-center justify-center h-[70vh] gap-2">
                <Loader2 className="animate-spin h-8 w-8" />
                Loading
              </div>
            ) : (
              <Table>
                <TableCaption className="text-right">
                  Total Products: {productsQuery.data?.total}
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {headers.map((header, index) => (
                      <TableHead key={index} className="capitalize">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsQuery.data?.products?.map(
                    (row: any, index: number) => (
                      <>
                        <TableRow key={index}>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={row.thumbnail} />
                              <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            $ {row.price}
                          </TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.brand}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                        </TableRow>
                      </>
                    )
                  )}
                </TableBody>
              </Table>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem
                onClick={() => setPage(page - 1)}
                className={`${
                  page === 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                } `}
              >
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem
                onClick={() => setPage(page + 1)}
                className={`${
                  (page + 1) * rowsPerPage >= productsQuery.data?.total
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                } `}
              >
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

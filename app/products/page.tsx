"use client";

import { useEffect, useState } from "react";
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

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("none");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 20;
  const [skip, setSkip] = useState(0);
  const headers = [
    "",
    "title",
    "description",
    "price",
    "category",
    "brand",
    "stock",
  ];

  const fetchProducts = async (
    next: boolean,
    skipExists?: boolean,
    category: string = "none"
  ) => {
    let url = APIEndpoints.GET_PRODUCTS;
    if (category.length && category !== "none") {
      url = `${APIEndpoints.GET_PRODUCTS}/category/${category}`;
    }
    setLoading(true);
    const skipRecords = next ? skip + rowsPerPage : skip - rowsPerPage;
    const sk = skipExists ? skipRecords : undefined;
    try {
      const response = await axiosInstance({
        method: "get",
        url,
        params: {
          skip: sk,
          limit: rowsPerPage,
        },
      });
      setProducts(response.data.products);
      setCount(response.data.total);

      if (!skipExists) return;
      setSkip(next ? skip + rowsPerPage : skip - rowsPerPage);
    } catch (error) {
      // toast.error("There has been a problem with your fetch operation:");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: APIEndpoints.GET_CATEGORIES,
      });
      setCategories(response.data);
    } catch (error) {
      // toast.error("There has been a problem with your fetch operation:");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts(true, false);
  }, []);

  const selectCategory = (value: string) => {
    setSelectedCategory(value);
    fetchProducts(false, false, value);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white rounded-3xl min-h-[722px] mt-4">
        <div className="rounded-xl mt-4 mx-10">
          <div className="flex gap-4">
            <Input placeholder="Search here..." className="h-10" />
            <Select onValueChange={(value) => selectCategory(value)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[70vh] rounded-md border p-4 mt-6">
            {loading ? (
              <div className="flex items-center justify-center h-[70vh] gap-2">
                <Loader2 className="animate-spin h-8 w-8" />
                Loading
              </div>
            ) : (
              <Table>
                {count ? (
                  <TableCaption className="text-right">
                    Total Products: {count}
                  </TableCaption>
                ) : null}
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
                  {products?.map((row, index) => (
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
                  ))}
                </TableBody>
              </Table>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem
                onClick={() => fetchProducts(false, true, selectedCategory)}
                className={`${
                  skip === 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                } `}
              >
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem
                onClick={() => fetchProducts(true, true, selectedCategory)}
                className={`${
                  skip + rowsPerPage >= count
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

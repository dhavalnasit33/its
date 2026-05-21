'use client';

import { useCallback, useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2, Search, Eye, Check, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Blog } from "@/types";
import DeleteBlogDialog from "@/components/dashboard/Blogs/DeleteBlogDialog";
import { EditBlogDialog } from "@/components/dashboard/Blogs/EditBlogDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CategoryOption {
  category: string;
  subCategories: string[];
}


export default function Blog() {
  const router = useRouter();

  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pages: 1,
  //   total: 0,
  // });

  const [items, setItems] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [limit] = useState(10);

  // Search and filter state
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isSubCategoryPopoverOpen, setIsSubCategoryPopoverOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<CategoryOption[]>([]);
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);


  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Blog | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchItems = async (
    page: number = 1,
    search = searchValue,
    category = selectedCategory,
    subCategory = selectedSubCategory
  ) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search ? { value: search } : {}),
        ...(category ? { category } : {}),
        ...(subCategory ? { subCategories: subCategory } : {}),
      });

      const res = await apiService<{
        success: boolean;
        data: Blog[];
        pagination?: { current: number; pages: number; total: number };
      }>(`/blogs/admin?${query.toString()}`, { method: "GET" });
      console.log("API RESPONSE:", res);

      if (res.success) {
        setItems(res.data);
        if (res.pagination) setPagination(res.pagination);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await apiService<{ success: boolean; data: CategoryOption[] }>(
        '/blogs/categorieswithsubcategories'
      );
      if (res.success) {
        setFilterOptions(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  };

  useEffect(() => {
    fetchItems(1);
    fetchFilterOptions();
  }, []);

  // Update table when search or filters change
  useEffect(() => {
    fetchItems( pagination.current, searchValue, selectedCategory, selectedSubCategory);
  }, [ pagination.current, searchValue, selectedCategory, selectedSubCategory]);

  // Update available subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const selected = filterOptions.find(opt => opt.category === selectedCategory);
      setAvailableSubCategories(selected ? selected.subCategories : []);
      setSelectedSubCategory(null);
    } else {
      setAvailableSubCategories([]);
      setSelectedSubCategory(null);
    }
  }, [selectedCategory, filterOptions]);


  const handleEditDialogOpen = (item: Blog) => {
   router.push(`/dashboard/Blog/${item._id}/edit`);
};


  const handleDeleteDialogOpen = (item: Blog) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (!open) setSelectedItem(null);
    setDeleteDialogOpen(open);
  };


  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
    fetchItems(pagination.current, searchValue, selectedCategory, selectedSubCategory);
  };

    const resetFilters = () => {
    setSearchValue("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  return (
    <div data-cursor >
      <PageHeader
        title="Blogs"
        description="Manage all blog posts"
        actionButtons={
          <div className="flex items-center gap-3">

            <Link href="/dashboard/Blog/create">
              <Button

              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Blog
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex items-center justify-between gap-3  mb-4">

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
              placeholder="Search by title or SEO title..."
              className="pl-9 h-10 rounded-lg border-gray-300 focus:ring-blue-500"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  current: 1,
                }));
              }}
            />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Category Filter */}
          <Popover open={isCategoryPopoverOpen} onOpenChange={setIsCategoryPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {selectedCategory || "Filter by Category"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2 max-h-72 overflow-y-auto">
              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setIsCategoryPopoverOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${!selectedCategory ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
              >
                {!selectedCategory && <Check className="h-4 w-4" />} All Categories
              </button>

              {/* Category Options */}
              {filterOptions.map((opt) => (
                <button
                  key={opt.category}
                  onClick={() => {
                    setSelectedCategory(opt.category);
                    setIsCategoryPopoverOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${selectedCategory === opt.category ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                >
                  {selectedCategory === opt.category && <Check className="h-4 w-4" />}
                  {opt.category}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Subcategory Filter */}
          <Popover open={isSubCategoryPopoverOpen} onOpenChange={setIsSubCategoryPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto" disabled={!selectedCategory}>
                <Filter className="mr-2 h-4 w-4" />
                {selectedSubCategory || "Filter by Subcategory"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2 max-h-72 overflow-y-auto">
              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedSubCategory(null);
                  setIsSubCategoryPopoverOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${!selectedSubCategory ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
              >
                {!selectedSubCategory && <Check className="h-4 w-4" />} All Subcategories
              </button>

              {/* Subcategory Options */}
              {availableSubCategories.map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => {
                    setSelectedSubCategory(subCat);
                    setIsSubCategoryPopoverOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${selectedSubCategory === subCat ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                >
                  {selectedSubCategory === subCat && <Check className="h-4 w-4" />}
                  {subCat}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Reset Filters Button */}
          {(searchValue || selectedCategory || selectedSubCategory) && (
            <Button
              variant="outline"
              onClick={resetFilters}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Clear Filters
            </Button>
          )}
        </div>
        {/* {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setBulkDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected ({selectedIds.length})
          </Button>
        )} */}
      </div>
      {/* Table */}
      <div className="rounded-md  border shadow-sm">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden xl:table-cell">Author</TableHead>
              <TableHead className="hidden xl:table-cell">Category</TableHead>
              <TableHead className="hidden xl:table-cell">Sub Category</TableHead>
              <TableHead className="hidden xl:table-cell">SEO Title</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>

          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-26 " /></TableCell>
                  <TableCell><Skeleton className="hidden xl:table-cell h-5 w-22" /></TableCell>
                  <TableCell><Skeleton className="hidden xl:table-cell h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="hidden xl:table-cell h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="hidden xl:table-cell h-5 w-40" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))

              : items.length > 0
                ? items.map((item, index) => (
                  <TableRow key={item._id}

                  >
                    <TableCell>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.details.title}
                          className="h-10 w-10 object-cover rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell className="max-w-44 xl:max-w-xs truncate font-medium">{item.details.title.replace(/<[^>]*>?/gm, "")}</TableCell>
                    <TableCell className="hidden xl:table-cell">{item.details.author.replace(/<[^>]*>?/gm, "")}</TableCell>
                    <TableCell className="hidden xl:table-cell">{item.categories}</TableCell>
                    <TableCell className="hidden xl:table-cell">{item.subCategories}</TableCell>
                    <TableCell className="hidden xl:table-cell">{item.seo_title ? (
                        <span className="  truncate max-w-xs block">{item.seo_title}</span>
                      ) : (
                        <span className="text-sm ">-</span>
                      )}</TableCell>
                     <TableCell className="text-right">
                      <DropdownMenu
                        open={dropdownOpen === item._id}
                        onOpenChange={(open) => setDropdownOpen(open ? item._id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item);
                              setViewDialogOpen(true);
                              setDropdownOpen(null);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => {
                              handleEditDialogOpen(item);
                              setDropdownOpen(null);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              handleDeleteDialogOpen(item);
                              setDropdownOpen(null);
                            }}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No entries found.</TableCell>
                  </TableRow >

                )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <p className="text-sm text-muted-foreground">
            Showing page {pagination.current} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.current === 1}
              onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.current === pagination.pages}
              onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {selectedItem && (
        <DeleteBlogDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          blogId={selectedItem._id}
          onSuccess={handleDeleteSuccess}
        />
      )}

    
    </div>

  );
}

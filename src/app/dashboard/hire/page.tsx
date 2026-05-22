"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  PlusCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Check,
  Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { HirePageData } from "@/types";
import DeleteHirePageDataDialog from "@/components/dashboard/hire/DeleteHirePageDataDialog";
import BulkDeleteHirePageDataDialog from "@/components/dashboard/hire/BulkDeleteHirePageDataDialog";

// Interface for the structured filter options
interface CategoryOption {
  category: string;
  subCategories: string[];
}

export default function HirePageDataPage() {
  const router = useRouter();

  // Page and data state
  const [items, setItems] = useState<HirePageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const [limit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  // Filter state
  const [filters, setFilters] = useState({ category: "", subCategory: "" });
  const [filterOptions, setFilterOptions] = useState<CategoryOption[]>([]);
  const [availableSubCategories, setAvailableSubCategories] = useState<
    string[]
  >([]);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isSubCategoryPopoverOpen, setIsSubCategoryPopoverOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HirePageData | null>(null);

  // Bulk delete state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch table data based on current page, filters, and search query
  const fetchItems = async (page = 1, currentFilters = filters, search = searchValue) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (currentFilters.category)
        query.append("category", currentFilters.category);
      if (currentFilters.subCategory)
        query.append("subCategory", currentFilters.subCategory);
      if (search)
        query.append("search", search);

      const res = await apiService<{
        success: boolean;
        data: HirePageData[];
        pagination: { current: number; pages: number; total: number };
      }>(`/hire-page?${query.toString()}`);

      if (res.success) {
        setItems(res.data);
        setPagination(res.pagination);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Error fetching hire page data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all possible filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: CategoryOption[];
        }>("/hire-page/categorieswithsubcategories");
        if (res.success) setFilterOptions(res.data);
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
      }
    };
    fetchFilterOptions();
  }, []);

  // Update table data when filters, pagination, or search changes with a debounce on search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(pagination.current, filters, searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, filters, searchValue]);

  // Update available subcategories when the main category filter changes
  useEffect(() => {
    if (filters.category) {
      const selected = filterOptions.find(
        (opt) => opt.category === filters.category,
      );
      setAvailableSubCategories(selected ? selected.subCategories : []);
    } else {
      setAvailableSubCategories([]);
    }
  }, [filters.category, filterOptions]);

  // Reset selectedIds when filters, page, or search changes
  useEffect(() => {
    setSelectedIds([]);
  }, [filters, pagination.current, searchValue]);

  // Handlers for checkboxes
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id!));
    }
  };

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

  const handleDeleteDialogOpen = (item: HirePageData) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogChange = (open: boolean) => {
    if (!open) setSelectedItem(null);
    setDeleteDialogOpen(open);
  };

  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
    setSelectedIds((prev) => prev.filter((id) => id !== selectedItem?._id));
    fetchItems(pagination.current);
  };

  const handleBulkDeleteSuccess = () => {
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    fetchItems(pagination.current);
  };

  return (
    <div>
      <PageHeader
        title="Hire Page Data"
        description="Manage Hire Page content for categories & subcategories."
        actionButtons={
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button
              onClick={() => router.push("/dashboard/hire/create")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        }
      />

      {/* Search and Popover Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or description..."
            className="pl-8 w-full"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Category Filter */}
          <Popover
            open={isCategoryPopoverOpen}
            onOpenChange={setIsCategoryPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {filters.category || "Filter by Category"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2 max-h-72 overflow-y-auto">
              {/* Reset Button */}
              <button
                onClick={() => {
                  setFilters({ category: "", subCategory: "" });
                  setIsCategoryPopoverOpen(false);
                  setPagination((prev) => ({ ...prev, current: 1 }));
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${!filters.category ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                {!filters.category && <Check className="h-4 w-4" />} All
                Categories
              </button>
              {/* Category Options */}
              {filterOptions.map((opt) => (
                <button
                  key={opt.category}
                  onClick={() => {
                    setFilters({ category: opt.category, subCategory: "" });
                    setIsCategoryPopoverOpen(false);
                    setPagination((prev) => ({ ...prev, current: 1 }));
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${filters.category === opt.category ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {filters.category === opt.category && (
                    <Check className="h-4 w-4" />
                  )}{" "}
                  {opt.category}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Subcategory Filter */}
          <Popover
            open={isSubCategoryPopoverOpen}
            onOpenChange={setIsSubCategoryPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                disabled={!filters.category}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filters.subCategory || "Filter by Subcategory"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2 max-h-72 overflow-y-auto">
              {/* Reset Button */}
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, subCategory: "" }));
                  setIsSubCategoryPopoverOpen(false);
                  setPagination((prev) => ({ ...prev, current: 1 }));
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${!filters.subCategory ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                {!filters.subCategory && <Check className="h-4 w-4" />} All
                Subcategories
              </button>
              {/* Subcategory Options */}
              {availableSubCategories.map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, subCategory: subCat }));
                    setIsSubCategoryPopoverOpen(false);
                    setPagination((prev) => ({ ...prev, current: 1 }));
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${filters.subCategory === subCat ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {filters.subCategory === subCat && (
                    <Check className="h-4 w-4" />
                  )}{" "}
                  {subCat}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  className="cursor-pointer w-4 h-4"
                />
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-40" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <TableRow
                  key={item._id}
                  className={`border dark:border-gray-300 ${index % 2 !== 0 ? "bg-gray-200" : ""} `}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item._id!)}
                      onChange={() => handleCheckboxChange(item._id!)}
                      className="cursor-pointer w-4 h-4"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {typeof item.category === "object" && item.category
                      ? (item.category as any).category
                      : item.category}
                  </TableCell>
                  <TableCell>
                    {typeof item.subCategory === "object" && item.subCategory
                      ? (item.subCategory as any).subcategory
                      : item.subCategory}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="text-gray-600">{item.slug}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={dropdownOpen === item._id}
                      onOpenChange={(open) =>
                        setDropdownOpen(open ? (item._id ?? null) : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(`/dashboard/hire/${item._id}/edit`);
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
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No hire page data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center gap-2 mt-4">
        <div>
          <span className="text-sm text-gray-600">
            Total Items: {pagination.total}
            {selectedIds.length > 0 && (
              <span className="ml-3 text-blue-600 font-medium">
                {selectedIds.length} selected
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={pagination.current <= 1}
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {pagination.current} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            disabled={pagination.current >= pagination.pages}
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      {selectedItem && (
        <>
          <DeleteHirePageDataDialog
            isOpen={deleteDialogOpen}
            onOpenChange={handleDeleteDialogChange}
            item={selectedItem}
            onSuccess={handleDeleteSuccess}
          />
        </>
      )}

      <BulkDeleteHirePageDataDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>
  );
}

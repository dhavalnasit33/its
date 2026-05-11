'use client';

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react";
import DeleteServiceManagerDialog from "@/components/dashboard/service-manager/DeleteServiceManagerDialog";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ServiceManager } from "@/types/index";
import { useToast } from "@/hooks/use-toast";
import BulkDeleteServiceManagerDialog from "@/components/dashboard/service-manager/BulkDeleteServiceManagerDialog";

export default function ServiceManagerPage() {
  const [items, setItems] = useState<ServiceManager[]>([]);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [limit] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState("");
  const router = useRouter();
  const params = useParams();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ServiceManager | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const fetchItems = async (page = 1, category = categoryFilter) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(category ? { category } : {}),
      });

      const res = await apiService<{
        success: boolean;
        data: ServiceManager[];
        pagination: { current: number; pages: number; total: number };
      }>(`/service?${query.toString()}`, { method: "GET" });

      if (res.success) {
        setItems(res.data);
        setPagination(res.pagination);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
    setSelectedIds([]);
  }, [categoryFilter]);

  const handleDeleteDialogOpen = (item: ServiceManager) => {
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


  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id));
    }
  };

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setIsBulkDeleting(true);
    try {
      const res = await apiService<{ success: boolean; message: string; deletedCount: number }>(
        `/service/bulk-delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ ids: selectedIds }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.success) {
        toast({
          title: "Success",
          description: "Service created successfully",
        });
        setSelectedIds([]);
        setBulkDeleteConfirm(false);
        fetchItems(pagination.current);
      } else {
        toast({ title: "Failed to delete selected services" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong" });
    } finally {
      setIsBulkDeleting(false);
    }
  };
  return (
    <div>
      <PageHeader
        title="Service Manager"
        description="Manage your services"
        actionButtons={
          <>
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

              < Button onClick={() => router.push("/dashboard/service-manager/create")}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </>
        }
      />

      <div className="flex items-center justify-between gap-3  mb-4">

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            className="felx h-10 w-full rounded-md border-input bg-background px-3 py-2 pl-[30px] "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages..."
            type="search"
          /></div>

        <div>
          <label className="font-medium">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
            className="border rounded px-3 py-1 border-gray-300"
          >
            <option value="">All</option>
            {[
              ...new Set(
                items.map((s) =>
                  (s.category || "").toString().trim().replace(/\s+/g, " ")
                )
              ),
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-md  shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-200">
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
              <TableHead>Main Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
              : items.length > 0
                ? items.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`border hover:bg-gray-200 dark:border-gray-300 ${selectedIds.includes(item._id)
                      ? "bg-gray-300"
                      : ""
                      }`}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.subCategory}</TableCell>
                    <TableCell>{item.mainTitle}</TableCell>
                    <TableCell>{item.slug}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu
                        open={dropdownOpen === item._id}
                        onOpenChange={(open) =>
                          setDropdownOpen(open ? item._id : null)
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
                              router.push(
                                `/dashboard/service-manager/${item._id}/edit`
                              );
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
                  <TableRow className="hover:bg-gray-200">
                    <TableCell colSpan={6} className="text-center py-4">
                      No services found.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center gap-2 mt-4">
        <span className="text-sm">
          Page {pagination.current} of {pagination.pages}
          {selectedIds.length > 0 && (
            <span className="ml-3 text-blue-600 font-medium">
              {selectedIds.length} selected
            </span>
          )}
        </span>
        <div className="flex gap-3">
          <Button
            className="bg-blue-600 text-white"
            disabled={pagination.current === 1}
            onClick={() => fetchItems(pagination.current - 1)}
          >
            Previous
          </Button>
          <Button
            className="bg-blue-600 text-white"
            disabled={pagination.current === pagination.pages}
            onClick={() => fetchItems(pagination.current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedItem && (
        <DeleteServiceManagerDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          item={selectedItem}
          onSuccess={handleDeleteSuccess}
        />
      )}
      <BulkDeleteServiceManagerDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>
  );
}
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
import { PlusCircle, MoreHorizontal, Edit, Trash2, Search } from "lucide-react";
import DeleteReadOurReviewDialog from "@/components/dashboard/ReadOurReview/DeleteReadOurReviewDialog";
import BulkDeleteReadOurReviewDialog from "@/components/dashboard/ReadOurReview/BulkDeleteReadOurReviewDialog";
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
import type { ReadOurReview, PaginatedResponse } from "@/types";

export default function ReadOurReviewPage() {
  const router = useRouter();
  const [items, setItems] = useState<ReadOurReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ReadOurReview | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  const fetchItems = useCallback(async (page: number = 1, search: string = "") => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: search,
      });

      const res = await apiService<PaginatedResponse<ReadOurReview>>(`/read-our-review/admin?${params.toString()}`, { method: "GET" });

      if (res.success) {
        setItems(res.data);
        setPagination(res.pagination);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(pagination.current, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, searchQuery, fetchItems]);

  const handleEditDialogOpen = (item: ReadOurReview) => {
    router.push(`/dashboard/ReadOurReview/${item._id}/edit`);
  };

  const handleDeleteDialogOpen = (item: ReadOurReview) => {
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

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id || ""));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Read Our Reviews"
        description="Manage external review links and logos"
        actionButtons={
          <Link href="/dashboard/ReadOurReview/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        }
      />

      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setBulkDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected ({selectedIds.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedIds.length === items.length && items.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedIds.includes(item._id || "")}
                      onChange={() => toggleSelectItem(item._id || "")}
                    />
                  </TableCell>
                  <TableCell>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 object-contain rounded border p-1"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={dropdownOpen === item._id}
                      onOpenChange={(open) => setDropdownOpen(open ? item._id || null : null)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDialogOpen(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteDialogOpen(item)}
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
                <TableCell colSpan={4} className="text-center h-24">No entries found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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

      {selectedItem && (
        <DeleteReadOurReviewDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          item={selectedItem}
          onSuccess={handleDeleteSuccess}
        />
      )}

      <BulkDeleteReadOurReviewDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>
  );
}

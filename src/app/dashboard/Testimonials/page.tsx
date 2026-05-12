"use client";

import { useEffect, useState } from "react";
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
import DeleteTestimonialsDialog from "@/components/dashboard/Testimonials/DeleteTestimonialsDialog";
import BulkDeleteTestimonialsDialog from "@/components/dashboard/Testimonials/BulkDeleteTestimonialsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Testimonials } from "@/types";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";


export default function TestimonialsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonials[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Testimonials | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchItems = useCallback(async (page: number = 1, search: string = "") => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: search,
      });

      const res = await apiService<{
        success: boolean;
        data: Testimonials[];
        pagination: { current: number; pages: number; total: number };
      }>(`/testimonials/admin?${params.toString()}`, { method: "GET" });

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
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(pagination.current, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, searchQuery, fetchItems]);

  useEffect(() => {
    setSelectedIds([]);
  }, [searchQuery]);

  const handleEditDialogOpen = (item: Testimonials) => {
    router.push(`/dashboard/Testimonials/${item._id}/edit`);
  };

  const handleDeleteDialogOpen = (item: Testimonials) => {
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
    fetchItems(pagination.current, searchQuery);
  };

  const handleBulkDeleteSuccess = () => {
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    fetchItems(pagination.current, searchQuery);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length && items.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id).filter((id): id is string => !!id));
    }

  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };


  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage your client testimonials"
        actionButtons={
          <div className="flex items-center gap-3">
            <Link href="/dashboard/Testimonials/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <TableHead className="w-20">Image</TableHead>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-1/6">Location</TableHead>
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
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))

            ) : items.length > 0 ? (
               items.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={item._id ? selectedIds.includes(item._id) : false}
                      onChange={() => item._id && toggleSelectItem(item._id)}

                    />
                  </TableCell>
                  <TableCell>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-md truncate">{item.description}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={dropdownOpen === item._id}
                      onOpenChange={(open) => setDropdownOpen(open ? (item._id ?? null) : null)}
                    >


                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-white border dark:border-gray-300"
                        >
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
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No testimonials found.
                </TableCell>
              </TableRow>
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
        <DeleteTestimonialsDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          item={selectedItem as any}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Bulk Delete Dialog */}
      <BulkDeleteTestimonialsDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>

  );
}

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
import DeleteEngagementModelDialog from "@/components/dashboard/EngagementModel/DeleteEngagementModelDialog";
import BulkDeleteEngagementModelDialog from "@/components/dashboard/EngagementModel/BulkDeleteEngagementModelDialog";
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
import type { EngagementModel } from "@/types";



export default function EngagementModelPage() {
  const router = useRouter();
  const [items, setItems] = useState<EngagementModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EngagementModel | null>(null);
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

      const res = await apiService<{
        success: boolean;
        data: EngagementModel[];
        pagination: { current: number; pages: number; total: number };
      }>(`/engagement-model/admin?${params.toString()}`, { method: "GET" });

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

  useEffect(() => {
    setSelectedIds([]);
  }, [searchQuery]);

  const handleEditDialogOpen = (item: EngagementModel) => {
    router.push(`/dashboard/EngagementModel/${item._id}/edit`);
  };

  const handleDeleteDialogOpen = (item: EngagementModel) => {
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
      setSelectedIds(items.map((item) => item._id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };


  return (
    <div data-cursor >
      <PageHeader
        title="Engagement Models"
        description="Manage Engagement Model entries"
        actionButtons={
          <div className="flex items-center gap-3">

            <Link href="/dashboard/EngagementModel/create">
              <Button

              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex items-center justify-between gap-3  mb-4">

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            // className="pl-9 h-10 rounded-lg border-gray-300 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
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
      {/* Table */}
      <div className="rounded-md  border shadow-sm">
        <Table className="">
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
              <TableHead className="w-1/4">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>

          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))

              : items.length > 0
                ? items.map((item, index) => (
                  <TableRow key={item._id}

                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelectItem(item._id)}
                      />

                    </TableCell>
                    <TableCell>
                      {item.modelImage && (
                        <img src={item.modelImage} data-cursor alt={item.modelTitle} className="h-8 w-10 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.modelTitle}</TableCell>
                    <TableCell className="max-w-md truncate">{item.modelDescription}</TableCell>
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


                        <DropdownMenuContent align="end" className="bg-white border dark:border-gray-300">
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
        <DeleteEngagementModelDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          item={selectedItem}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Bulk Delete Dialog */}
      <BulkDeleteEngagementModelDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>

  );
}

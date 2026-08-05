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
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ExpertiesIndustries } from "@/types";
import DeleteExpertiesIndustryDialog from "@/components/dashboard/experties-industries/DeleteExpertiesIndustryDialog";
import BulkDeleteExpertiseIndustriesDialog from "@/components/dashboard/experties-industries/BulkDeleteExpertiseIndustriesDialog";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";



export default function ExpertiesIndustriesPage() {
  const router = useRouter();
  const [items, setItems] = useState<ExpertiesIndustries[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExpertiesIndustries | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchItems = useCallback(async (page: number = 1, search: string = "") => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        value: search,
      });

      const res = await apiService<{
        success: boolean;
        data: ExpertiesIndustries[];
        pagination: { current: number; pages: number; total: number };
      }>(`/expertise-industries/admin?${params.toString()}`, { method: "GET" });

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
      fetchItems(pagination.current, searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, searchValue, fetchItems]);

  useEffect(() => {
    setSelectedIds([]);
  }, [searchValue]);

  const handleEditDialogOpen = (item: ExpertiesIndustries) => {
    router.push(`/dashboard/expertise-industry/${item._id}/edit`);
  };

  const handleDeleteDialogOpen = (item: ExpertiesIndustries) => {
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
    fetchItems(pagination.current, searchValue);
  };

  const handleBulkDeleteSuccess = () => {
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    fetchItems(pagination.current, searchValue);
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
        title="Expertise Industries"
        description="Manage industries of expertise"
        actionButtons={
          <div className="flex items-center gap-3">
            <Link href="/dashboard/expertise-industry/create">
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
            placeholder="Search by title..."
            className="pl-8 w-full"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
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
              <TableHead className="w-20">Icon</TableHead>
              <TableHead className="w-28">Background Image</TableHead>
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
                    <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-16 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))

              : items.length > 0
              ? items.map((item, index) => (

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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      {item.bgImage ? (
                        <img
                          src={item.bgImage}
                          alt={`${item.title} bg`}
                          className="h-10 w-16 rounded object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">Default</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-md truncate">{item.description}</TableCell>


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

                        <DropdownMenuContent
                          align="end"
                          
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
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"

                            onClick={() => {
                              handleDeleteDialogOpen(item);
                              setDropdownOpen(null);
                            }}
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
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No industries found.
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
        <DeleteExpertiesIndustryDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          industry={selectedItem}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Bulk Delete Dialog */}
      <BulkDeleteExpertiseIndustriesDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>

  );
}

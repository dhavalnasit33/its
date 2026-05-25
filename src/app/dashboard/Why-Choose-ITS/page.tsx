
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

import DeleteHomeChooseItsDialog from "@/components/dashboard/Why-Choose-ITS/DeleteHomeChooseItsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import Link from "next/link";
import { useRouter } from "next/navigation";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { HomeChooseIts } from "@/types";
import BulkDeleteHomeChooseItsDialog from "@/components/dashboard/Why-Choose-ITS/BulkDeleteHomeChooseItsDialog";
import { Input } from "@/components/ui/input";


export default function WhyChooseITSPage() {
  const router = useRouter();
  const [items, setItems] = useState<HomeChooseIts[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HomeChooseIts | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // track open menu by item id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [limit] = useState(10);



  const fetchItems = useCallback(async (page : number = 1, search = searchQuery) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
      });

      const res = await apiService<{
        success: boolean;
        data: HomeChooseIts[];
        pagination: { current: number; pages: number; total: number };
      }>(`/choose_its_home/admin?${query.toString()}`, { method: "GET" });

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
  }, [limit, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(pagination.current, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, searchQuery, fetchItems]);

  useEffect(() => {
    setSelectedIds([]);
  }, [searchQuery]);



  const handleEditDialogOpen = (item: HomeChooseIts) => {
    router.push(`/dashboard/Why-Choose-ITS/${item._id}/edit`);
  };

  const handleDeleteDialogOpen = (item: HomeChooseIts) => {
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


  return (
    <div>
      <PageHeader
        title="Why Choose ITS"
        description="Manage the Why Choose ITS entries"
        actionButtons={
          <div className="flex items-center gap-2">

            <Link href="/dashboard/Why-Choose-ITS/create">
              <Button
              // className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
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
            // className="felx h-10 w-full rounded-md border-input bg-background px-3 py-2 pl-[30px] "
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
            placeholder="Search why choose its..."
            type="search"
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
      <div className="rounded-md border shadow-sm ">
        <Table>
          <TableHeader>
            <TableRow >
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
              <TableHead >Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody >
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto"></Skeleton></TableCell>
                </TableRow>
              ))

              : items.length > 0
                ? items.map((item) => (
                  <TableRow
                    key={item._id}

                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </TableCell>

                    <TableCell>
                      {item.image && (
                        <img src={item.image} alt={item.title} className="h-8 w-10 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right ">
                      <DropdownMenu
                        open={dropdownOpen === item._id}
                        onOpenChange={(open) => setDropdownOpen(open ? item._id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4 " />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="">
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


      {/* Delete Dialog */}
      {selectedItem && (
        <DeleteHomeChooseItsDialog
          isOpen={deleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
          item={selectedItem}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Bulk Delete Dialog */}
      <BulkDeleteHomeChooseItsDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={handleBulkDeleteSuccess}
      />
    </div>

  );
}

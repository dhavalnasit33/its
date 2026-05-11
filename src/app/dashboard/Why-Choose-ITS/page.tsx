
'use client';

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
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import CreateHomeChooseItsDialog from "@/components/dashboard/Why-Choose-ITS/CreateHomeChooseItsDialog";
import EditHomeChooseItsDialog from "@/components/dashboard/Why-Choose-ITS/EditHomeChooseItsDialog";
import DeleteHomeChooseItsDialog from "@/components/dashboard/Why-Choose-ITS/DeleteHomeChooseItsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { HomeChooseIts } from "@/types";

export default function WhyChooseITSPage() {
  const [items, setItems] = useState<HomeChooseIts[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HomeChooseIts | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // track open menu by item id

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await apiService<{ success: boolean; data: HomeChooseIts[] }>("/choose_its_home", { method: "GET" });
      if (res.success) setItems(res.data);
      else setItems([]);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleEditDialogOpen = (item: HomeChooseIts) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleEditDialogChange = (open: boolean) => {
    if (!open) setSelectedItem(null);
    setEditDialogOpen(open);
  };

  const handleDeleteDialogOpen = (item: HomeChooseIts) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (!open) setSelectedItem(null);
    setDeleteDialogOpen(open);
  };

  const handleEditSuccess = () => {
    fetchItems();
  };

  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
    fetchItems();
  };

  return (
    <div>
      <PageHeader
        title="Why Choose ITS"
        description="Manage the Why Choose ITS entries"
        actionButtons={
          <Button
            onClick={() => setDialogOpen(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New
          </Button>
        }
      />

      {/* Table */}
      <div className="rounded-md shadow-sm ">
        <Table>
          <TableHeader>
            <TableRow className="border dark:border-gray-300">
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
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-10" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
              : items.length > 0
                ? items.map((item) => (
                  <TableRow key={item._id} className="border dark:border-gray-300">
                    <TableCell>
                      {item.image && (
                        <img src={item.image} alt={item.title} className="h-8 w-10 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
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

                        <DropdownMenuContent align="end" className="bg-white border dark:border-gray-300">
                          <DropdownMenuItem
                            onClick={() => {
                              handleEditDialogOpen(item);
                              setDropdownOpen(null);
                            }}
                            className="hover:bg-gray-100 dark:hover:bg-blue-300 rounded-md transition-colors"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              handleDeleteDialogOpen(item);
                              setDropdownOpen(null);
                            }}
                            className="text-destructive hover:bg-red-100 dark:hover:bg-red-300 rounded-md transition-colors "
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
                    <TableCell colSpan={4} className="text-center h-24">No entries found.</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* Create Dialog */}
      <CreateHomeChooseItsDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchItems}
      />

      {/* Edit Dialog */}
      {selectedItem && (
        <EditHomeChooseItsDialog
          isOpen={editDialogOpen}
          onOpenChange={handleEditDialogChange}
          item={selectedItem}
          onSuccess={handleEditSuccess}
        />
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
    </div>
  );
}

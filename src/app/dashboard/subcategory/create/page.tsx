
// 'use client';
// import SubCategoryFrom, { subcategorycreateFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
// import { Button } from '@/components/ui/button'
// import { useToast } from '@/hooks/use-toast';
// import apiService from '@/lib/apiService';
// import { ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';


// interface CreateSubCategoryManagerDialogProps {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   onSuccess: () => void;
// }

// export default function CreateSubCategoryManagerDialogProps({
//   isOpen,
//   onOpenChange,
//   onSuccess
// }: CreateSubCategoryManagerDialogProps) {

//   const { toast } = useToast();

//   const router = useRouter();
//   const handleCreate = async (data: subcategorycreateFormValues) => {
//     try {
//       const res = await apiService<{ success: boolean; message: string }>("/subcategory", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.success) {
//         toast({ title: "Success", description: res.message });
//         onSuccess();
//       } else {
//         toast({ title: "Error", description: res.message, variant: "destructive" });
//       }
//     } catch (error: any) {
//       toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between itmes-center border-b py-4 mb-4">
//         <h1 className="text-2xl font-bold">Create subcategory</h1>
//         <Button
//           onClick={() => router.push("/dashboard/subcategory")}
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Button>
//       </div>
//       <SubCategoryFrom onSubmit={handleCreate} initialData={null} />

//     </>
//   )
// }


'use client';
import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/subcategoryFrom';
// import SubCategoryForm, { SubcategoryFormValues } from '@/components/dashboard/subcategory/SubCategoryForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateSubCategoryPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async (data: SubcategoryFormValues) => {
    const res = await apiService<{ success: boolean; message: string }>('/subcategory', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.success) {
      toast({ title: 'Success', description: res.message });
      router.push('/dashboard/subcategory');
    } else {
      throw new Error(res.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b py-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create Subcategory</h1>
          <p className="text-sm text-muted-foreground mt-1">Add a new subcategory to the system</p>
        </div>
        <Button onClick={() => router.push('/dashboard/subcategory')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <SubCategoryForm onSubmit={handleCreate} initialData={null} />
    </>
  );
}
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Category } from '@/types';
import { categorySchema, type CategoryFormData } from '@/features/categories/schemas/category.schema';

// Mock data based on backend CategorySeeder.php
const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Fiction', books_count: 2, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 2, name: 'Non-Fiction', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 3, name: 'Science Fiction', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 4, name: 'Fantasy', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 5, name: 'Mystery', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 6, name: 'Romance', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 7, name: 'Biography', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 8, name: 'Self-Help', books_count: 1, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 9, name: 'History', books_count: 1, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 10, name: 'Technology', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 11, name: 'Philosophy', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 12, name: 'Poetry', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 13, name: 'Drama', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 14, name: 'Children', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 15, name: 'Young Adult', books_count: 0, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 16, name: 'Programming', books_count: 5, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 17, name: 'Science', books_count: 1, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (formData: CategoryFormData) => {
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingCategory) {
      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name, updated_at: new Date().toISOString() }
          : cat
      ));
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: formData.name,
        books_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCategories(prev => [...prev, newCategory]);
    }

    reset();
    setEditingCategory(null);
    setShowForm(false);
    setIsSubmitting(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    reset({ name: category.name });
    setShowForm(true);
  };

  const handleDelete = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleCancel = () => {
    reset();
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage book categories ({categories.length} total)</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingCategory ? (
                    'Update'
                  ) : (
                    'Create'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.books_count ?? 0} books
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{category.name}"? This action cannot
                            be undone. Books in this category will not be deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-muted-foreground">No categories found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;

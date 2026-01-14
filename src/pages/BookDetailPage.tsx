import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { ArrowLeft, CheckCircle, XCircle, FileText, User, Calendar, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/common';
import type { Book, ApiResponse } from '@/types';
import { API_CONFIG } from '@/config/api.config';
import axiosInstance from '@/lib/axios';
import { useState } from 'react';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-600 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, isLoading, error, mutate } = useSWR<ApiResponse<Book>>(
    id ? API_CONFIG.endpoints.books.detail(Number(id)) : null
  );

  const book = data?.data;

  const handleApprove = async () => {
    if (!book) return;
    setIsUpdating(true);
    try {
      await axiosInstance.post(API_CONFIG.endpoints.books.approve(book.id));
      mutate();
    } catch (err) {
      console.error('Failed to approve book:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!book) return;
    setIsUpdating(true);
    try {
      await axiosInstance.post(API_CONFIG.endpoints.books.reject(book.id));
      mutate();
    } catch (err) {
      console.error('Failed to reject book:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" text="Loading book details..." />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <XCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg font-medium">Book not found</p>
        <Button variant="outline" onClick={() => navigate('/books')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/books')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{book.title}</h1>
          <p className="text-muted-foreground">by {book.author}</p>
        </div>
        <Badge className={statusColors[book.status]}>{book.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Info */}
          <Card>
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {book.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="mt-1">{book.description}</p>
                </div>
              )}
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Type</p>
                    <p className="font-medium uppercase">{book.file_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{book.category?.name ?? 'Uncategorized'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">
                      {new Date(book.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submitter Info */}
          {book.submitted_by && (
            <Card>
              <CardHeader>
                <CardTitle>Submitted By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {book.submitted_by.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{book.submitted_by.name}</p>
                    <p className="text-sm text-muted-foreground">{book.submitted_by.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {book.status === 'pending' && (
                <>
                  <Button
                    className="w-full"
                    onClick={handleApprove}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Approve Book
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleReject}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Reject Book
                  </Button>
                </>
              )}
              {book.status !== 'pending' && (
                <p className="text-center text-sm text-muted-foreground">
                  This book has already been {book.status}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

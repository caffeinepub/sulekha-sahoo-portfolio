import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { usePortfolioItems } from '../hooks/usePortfolioItems';
import { usePortfolioMutations } from '../hooks/usePortfolioMutations';
import {
  Palette, LogOut, Upload, Trash2, RefreshCw, ImagePlus,
  Loader2, X, CheckCircle, Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { Portfolio } from '../backend';

const CATEGORIES = ['Branding', 'Social Media', 'Print Media'] as const;
type Category = (typeof CATEGORIES)[number];

export default function AdminDashboard() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: '/admin' });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/admin' });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* Header */}
      <header className="bg-white border-b border-ink/8 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-ink tracking-tight">
                Sulekha<span className="text-sky">.</span>
              </span>
              <span className="ml-2 text-xs font-semibold text-sky bg-sky/10 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-ink/50 font-mono truncate max-w-[180px]">
              {identity?.getPrincipal().toString().slice(0, 20)}…
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 text-ink/70 hover:text-ink border-ink/15"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <QuickUploadForm />
        <PortfolioGrid />
      </main>
    </div>
  );
}

// ── Quick Upload Form ──────────────────────────────────────────────────────────

function QuickUploadForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = usePortfolioMutations();

  const handleFile = (f: File) => {
    if (!f.type.match(/image\/(png|jpeg|webp)/)) {
      toast.error('Only PNG, JPG, or WEBP images are supported.');
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePublish = async () => {
    if (!file || !title.trim() || !category) {
      toast.error('Please fill in all fields and select an image.');
      return;
    }

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      await addItem.mutateAsync(
        {
          title: title.trim(),
          category,
          bytes,
          onProgress: setUploadProgress,
        },
        {
          onSuccess: () => {
            toast.success('Portfolio item published successfully!');
            clearForm();
          },
          onError: (err) => {
            toast.error(`Failed to publish: ${(err as Error).message}`);
            setUploadProgress(0);
          },
        }
      );
    } catch (err) {
      toast.error(`Error: ${(err as Error).message}`);
      setUploadProgress(0);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center">
          <ImagePlus className="w-4 h-4 text-sky" />
        </div>
        <h2 className="font-display text-xl font-black text-ink">Quick Upload</h2>
      </div>

      <div className="bg-white rounded-2xl border border-ink/8 p-6 shadow-xs">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Drop Zone */}
          <div>
            <Label className="text-sm font-semibold text-ink/70 mb-2 block">Image File</Label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden ${
                isDragging
                  ? 'border-sky bg-sky/5'
                  : preview
                  ? 'border-sky/30 bg-sky/3'
                  : 'border-ink/15 hover:border-sky/40 hover:bg-sky/3'
              }`}
              style={{ minHeight: '200px' }}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                    style={{ maxHeight: '240px' }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/70 text-white flex items-center justify-center hover:bg-ink transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                  <Upload className="w-10 h-10 text-ink/25 mb-3" />
                  <p className="text-sm font-semibold text-ink/50">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-ink/35 mt-1">PNG, JPG, WEBP supported</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold text-ink/70 mb-2 block">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brand Identity for XYZ"
                className="rounded-xl border-ink/15 focus:border-sky focus:ring-sky/20"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-ink/70 mb-2 block">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="rounded-xl border-ink/15 focus:border-sky">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Progress */}
            {addItem.isPending && uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-xs text-ink/50 mb-1">
                  <span>Uploading…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-ink/10 rounded-full h-1.5">
                  <div
                    className="bg-sky h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-auto pt-2">
              <Button
                onClick={handlePublish}
                disabled={addItem.isPending || !file || !title.trim() || !category}
                className="flex-1 bg-sky hover:bg-sky-dark text-white rounded-xl shadow-sky-sm font-semibold"
              >
                {addItem.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Publish
                  </>
                )}
              </Button>
              {(file || title || category) && (
                <Button
                  variant="outline"
                  onClick={clearForm}
                  disabled={addItem.isPending}
                  className="rounded-xl border-ink/15"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Portfolio Grid ─────────────────────────────────────────────────────────────

function PortfolioGrid() {
  const { data: items, isLoading, error } = usePortfolioItems();
  const { deleteItem, replaceItem, editItem } = usePortfolioMutations();

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center">
            <Palette className="w-4 h-4 text-sky" />
          </div>
          <h2 className="font-display text-xl font-black text-ink">Manage Portfolio</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-semibold">Failed to load portfolio items.</p>
          <p className="text-red-400 text-sm mt-1">{(error as Error).message}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center">
          <Palette className="w-4 h-4 text-sky" />
        </div>
        <h2 className="font-display text-xl font-black text-ink">
          Manage Portfolio
          {items && items.length > 0 && (
            <span className="ml-2 text-sm font-semibold text-ink/40">({items.length} items)</span>
          )}
        </h2>
      </div>

      {!items || items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-ink/15 p-12 text-center">
          <ImagePlus className="w-12 h-12 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/50 font-semibold">No portfolio items yet</p>
          <p className="text-ink/35 text-sm mt-1">Use the Quick Upload form above to add your first piece.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <AdminPortfolioCard
              key={item.id}
              item={item}
              onDelete={async () => {
                try {
                  await deleteItem.mutateAsync(item.id);
                  toast.success(`"${item.title}" deleted.`);
                } catch (err) {
                  toast.error(`Delete failed: ${(err as Error).message}`);
                }
              }}
              onReplace={async (file: File) => {
                try {
                  const bytes = new Uint8Array(await file.arrayBuffer());
                  await replaceItem.mutateAsync({ item, bytes });
                  toast.success(`"${item.title}" image replaced.`);
                } catch (err) {
                  toast.error(`Replace failed: ${(err as Error).message}`);
                }
              }}
              onEdit={async (title: string, category: string) => {
                try {
                  await editItem.mutateAsync({ item, title, category });
                  toast.success(`"${title}" updated successfully.`);
                } catch (err) {
                  toast.error(`Edit failed: ${(err as Error).message}`);
                }
              }}
              isDeleting={deleteItem.isPending}
              isReplacing={replaceItem.isPending}
              isEditing={editItem.isPending}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Admin Portfolio Card ───────────────────────────────────────────────────────

function AdminPortfolioCard({
  item,
  onDelete,
  onReplace,
  onEdit,
  isDeleting,
  isReplacing,
  isEditing,
}: {
  item: Portfolio;
  onDelete: () => void;
  onReplace: (file: File) => void;
  onEdit: (title: string, category: string) => Promise<void>;
  isDeleting: boolean;
  isReplacing: boolean;
  isEditing: boolean;
}) {
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const imageUrl = item.imageData.getDirectURL();

  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editCategory, setEditCategory] = useState<Category | ''>(
    CATEGORIES.includes(item.category as Category) ? (item.category as Category) : ''
  );

  const handleEditOpen = () => {
    setEditTitle(item.title);
    setEditCategory(
      CATEGORIES.includes(item.category as Category) ? (item.category as Category) : ''
    );
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editTitle.trim() || !editCategory) {
      toast.error('Please fill in all fields.');
      return;
    }
    await onEdit(editTitle.trim(), editCategory);
    setEditOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-ink/8 overflow-hidden shadow-xs group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-ink text-sm leading-tight">{item.title}</h3>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-sky/10 text-sky text-xs font-semibold">
                {item.category}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* Edit */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditOpen}
              disabled={isEditing || isDeleting || isReplacing}
              className="flex-1 rounded-lg border-ink/15 text-ink/60 hover:bg-ink/5 hover:border-ink/30 text-xs font-semibold"
            >
              {isEditing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
              ) : (
                <Pencil className="w-3.5 h-3.5 mr-1" />
              )}
              Edit
            </Button>

            {/* Replace */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => replaceInputRef.current?.click()}
              disabled={isReplacing || isDeleting || isEditing}
              className="flex-1 rounded-lg border-sky/20 text-sky hover:bg-sky/5 hover:border-sky/40 text-xs font-semibold"
            >
              {isReplacing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
              )}
              Replace
            </Button>

            {/* Delete */}
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting || isReplacing || isEditing}
              className="rounded-lg border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 text-xs font-semibold"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Hidden replace input */}
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onReplace(f);
            if (replaceInputRef.current) replaceInputRef.current.value = '';
          }}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display font-black text-ink text-lg">
              Edit Portfolio Item
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Thumbnail preview */}
            <div className="w-full h-36 rounded-xl overflow-hidden bg-surface">
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <Label htmlFor="edit-title" className="text-sm font-semibold text-ink/70 mb-2 block">
                Title
              </Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Brand Identity for XYZ"
                className="rounded-xl border-ink/15 focus:border-sky focus:ring-sky/20"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-ink/70 mb-2 block">Category</Label>
              <Select value={editCategory} onValueChange={(v) => setEditCategory(v as Category)}>
                <SelectTrigger className="rounded-xl border-ink/15 focus:border-sky">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-ink/15"
                disabled={isEditing}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleEditSave}
              disabled={isEditing || !editTitle.trim() || !editCategory}
              className="bg-sky hover:bg-sky-dark text-white rounded-xl shadow-sky-sm font-semibold"
            >
              {isEditing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving…
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

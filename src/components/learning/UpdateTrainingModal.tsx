import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { TrainingManagementService } from '@/api';
import { CreateTrainingDto } from '@/api/models/CreateTrainingDto';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAccessToken } from '@/hooks/useAccessToken';

interface UpdateTrainingModalProps {
  id: string | null;
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onUpdated: () => void;
}

const INITIAL_FORM = {
  title: '',
  description: '',
  note: '',
  resourceLink: '',
  provider: '',
  category: '',
  level: '' as CreateTrainingDto.level | '',
  durationMinutes: '',
  language: '',
  tags: '',
};

export function UpdateTrainingModal({
  id,
  open,
  onOpenChange,
  onUpdated,
}: UpdateTrainingModalProps) {
  const token = useAccessToken();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const fetchTraining = useCallback(async () => {
    if (!token || !id) return;
    setFetching(true);
    try {
      const res = await TrainingManagementService.trainingControllerFindOne({
        id,
        authorization: token,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (res as { data?: any })?.data;
      if (data) {
        setForm({
          title: data.title || '',
          description: data.description || '',
          note: data.note || '',
          resourceLink: data.resourceLink || '',
          provider: data.provider || '',
          category: data.category || '',
          level: (data.level as CreateTrainingDto.level) || '',
          durationMinutes: data.durationMinutes ? String(data.durationMinutes) : '',
          language: data.language || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        });
      }
    } catch {
      toast.error('Failed to load training details');
      onOpenChange(false);
    } finally {
      setFetching(false);
    }
  }, [id, token, onOpenChange]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void fetchTraining();
    } else {
      setForm(INITIAL_FORM);
    }
  }, [open, fetchTraining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;
    if (!form.title.trim()) return toast.error('Title is required');
    if (!form.resourceLink.trim()) return toast.error('Resource Link is required');

    setLoading(true);
    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        resourceLink: form.resourceLink,
        description: form.description || null,
        note: form.note || null,
        provider: form.provider || null,
        category: form.category || null,
        level: form.level || null,
        durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : null,
        language: form.language || null,
        tags: form.tags
          ? form.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      await TrainingManagementService.trainingControllerUpdate({
        id,
        authorization: token,
        requestBody: payload,
      });

      toast.success('Training updated successfully!');
      onUpdated();
      onOpenChange(false);
    } catch (err: unknown) {
      const e = err as { body?: { message?: string | string[] } };
      const msg = e?.body?.message || 'Failed to update training';
      toast.error(typeof msg === 'string' ? msg : msg[0] || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-3xl overflow-y-auto rounded-sm sm:max-h-[85vh]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-foreground'>Edit Training</DialogTitle>
        </DialogHeader>

        {fetching ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='mt-4 space-y-6'>
            <div className='grid gap-6 sm:grid-cols-2'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>
                  Title <span className='text-red-500'>*</span>
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder='e.g. Advanced Negotiation Skills'
                  required
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>
                  Resource Link <span className='text-red-500'>*</span>
                </label>
                <Input
                  type='url'
                  value={form.resourceLink}
                  onChange={(e) => set('resourceLink', e.target.value)}
                  placeholder='https://...'
                  required
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Category</label>
                <Input
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  placeholder='e.g. Sales'
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Provider</label>
                <Input
                  value={form.provider}
                  onChange={(e) => set('provider', e.target.value)}
                  placeholder='e.g. Udemy'
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Level</label>
                <Select value={form.level} onValueChange={(v) => set('level', v)}>
                  <SelectTrigger className='h-9 w-full rounded-sm border-border/60 text-sm'>
                    <SelectValue placeholder='Select level...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='BEGINNER'>Beginner</SelectItem>
                    <SelectItem value='INTERMEDIATE'>Intermediate</SelectItem>
                    <SelectItem value='ADVANCED'>Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Duration (Mins)</label>
                <Input
                  type='number'
                  min='1'
                  value={form.durationMinutes}
                  onChange={(e) => set('durationMinutes', e.target.value)}
                  placeholder='e.g. 120'
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Language</label>
                <Input
                  value={form.language}
                  onChange={(e) => set('language', e.target.value)}
                  placeholder='e.g. English'
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>
                  Tags (comma separated)
                </label>
                <Input
                  value={form.tags}
                  onChange={(e) => set('tags', e.target.value)}
                  placeholder='e.g. sales, negotiation'
                  className='h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>

              <div className='sm:col-span-2 space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Description</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  className='rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>

              <div className='sm:col-span-2 space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Note</label>
                <Textarea
                  value={form.note}
                  onChange={(e) => set('note', e.target.value)}
                  rows={2}
                  className='rounded-sm border-border/60 text-sm focus-visible:ring-1'
                />
              </div>
            </div>

            {/* Footer */}
            <div className='flex justify-end gap-3 border-t border-border/40 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className='h-9 rounded-sm px-4 text-sm font-medium text-foreground'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className='h-9 rounded-sm bg-brand-navy px-6 text-sm font-medium text-white shadow-sm hover:bg-brand-navy-dark'
              >
                {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Update Training'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

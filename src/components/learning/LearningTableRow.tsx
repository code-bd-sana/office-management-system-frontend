import { TrainingManagementService } from '@/api';
import { Switch } from '@/components/ui/switch';
import { TableCell, TableRow } from '@/components/ui/table';
import { useAccessToken } from '@/hooks/useAccessToken';
import type { Training } from '@/types/learning';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface LearningTableRowProps {
  training: Training;
  rowNumber: number;
  isManager: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}

export function LearningTableRow({
  training,
  rowNumber,
  isManager,
  onEdit,
  onDelete,
  onRefresh,
}: LearningTableRowProps) {
  const token = useAccessToken();
  const [updatingActive, setUpdatingActive] = useState(false);

  // const resolveName = (field: unknown) => {
  //   if (!field) return '—';
  //   if (typeof field === 'string') return field;
  //   if (typeof field === 'object' && field !== null && 'name' in field)
  //     return (field as { name: string }).name || '—';
  //   return '—';
  // };

  const handleToggleActive = async () => {
    if (!token || updatingActive) return;
    setUpdatingActive(true);
    try {
      await TrainingManagementService.trainingControllerUpdateActiveStatus({
        id: training._id,
        authorization: token,
        requestBody: { isActive: !training.isActive },
      });
      toast.success(`Training ${!training.isActive ? 'deactivated' : 'activated'} successfully`);
      onRefresh();
    } catch (err: unknown) {
      const e = err as { body?: { message?: string } };
      toast.error(e?.body?.message || 'Failed to update active status');
    } finally {
      setUpdatingActive(false);
    }
  };

  const uploadDate = training.createdAt
    ? format(new Date(training.createdAt), 'MMM dd, yyyy')
    : '—';

  return (
    <TableRow className='border-b border-border/40 hover:bg-muted/30'>
      <TableCell className='py-3.5 pl-5 text-sm font-medium text-foreground/70'>
        {rowNumber}
      </TableCell>
      <TableCell className='py-3.5 text-sm font-semibold text-foreground max-w-50 truncate'>
        {training.title}
      </TableCell>
      <TableCell className='py-3.5 text-sm text-foreground/70'>
        {training.category || '—'}
      </TableCell>
      {/* <TableCell className='py-3.5 text-sm text-foreground/70'>
        {resolveName(training.createdBy)}
      </TableCell> */}
      <TableCell className='py-3.5 text-sm max-w-50 truncate'>
        <Link
          href={training.resourceLink}
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-dark'
        >
          {training.resourceLink}
        </Link>
      </TableCell>
      <TableCell className='py-3.5 text-sm text-foreground/70 whitespace-nowrap'>
        {uploadDate}
      </TableCell>
      <TableCell className='py-3.5 whitespace-nowrap text-sm'>
        <div className='flex flex-col gap-2'>
          {isManager ? (
            <>
              <div className='flex items-center gap-2'>
                <Switch
                  checked={training.isActive}
                  onCheckedChange={handleToggleActive}
                  disabled={updatingActive}
                />
                <span className='text-xs text-muted-foreground w-16'>
                  {updatingActive ? 'Wait...' : training.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </>
          ) : (
            <>
              <span
                className={`inline-flex items-center justify-center px-2 py-0.5 rounded-sm text-xs font-semibold ${training.isActive ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
              >
                {training.isActive ? 'Active' : 'Inactive'}
              </span>
            </>
          )}
        </div>
      </TableCell>
      {isManager && (
        <TableCell className='py-3.5 text-right pr-5'>
          <div className='flex items-center justify-end gap-3'>
            <button
              onClick={onEdit}
              className='text-orange-500 hover:text-orange-600 transition-colors'
              title='Edit Training'
            >
              <Edit2 className='h-4 w-4' />
            </button>
            <button
              onClick={onDelete}
              className='text-red-500 hover:text-red-600 transition-colors'
              title='Delete Training'
            >
              <Trash2 className='h-4 w-4' />
            </button>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}

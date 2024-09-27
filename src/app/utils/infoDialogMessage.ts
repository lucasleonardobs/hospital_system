import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

export function openInfoDialog({
  dialogRef,
  type,
  operation,
}: {
  dialogRef: MatDialog;
  type: 'success' | 'error';
  operation: 'create' | 'edit' | 'delete';
}): any {
    dialogRef.open(InfoDialogComponent, {
    data: { type, operation },
    width: '700px',
    maxHeight: '500px',
  });
}

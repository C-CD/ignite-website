import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SuccessDialogData {
  title: string;
  body: string;
  success?: boolean
}

@Component({
  selector: 'app-status-modals',
  templateUrl: './status-modals.component.html',
  styleUrls: ['./status-modals.component.css']
})
export class StatusModalsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StatusModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
    ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

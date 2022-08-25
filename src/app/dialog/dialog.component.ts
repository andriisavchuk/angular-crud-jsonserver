import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  itemForm!: FormGroup;

  itemsCategory = [
    { category: 'Appliances' },
    { category: 'Electronics' },
    { category: 'Electrical' },
    { category: 'Building Materials' },
  ];

  itemStatuses: string[] = ['New', 'Pre-Owned', 'Used'];
  selectedStatus: string = '';
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemCategory: ['', Validators.required],
      dateSubmitted: ['', Validators.required],
      itemStatus: ['', Validators.required],
      itemPrice: ['', Validators.required],
      userComment: ['', Validators.required],
    });

    this.itemForm.get('itemStatus')?.valueChanges.subscribe((value) => {
      this.selectedStatus = value;
    });

    if (this.editData) {
      this.itemForm.controls['itemName'].setValue(this.editData.itemName);
      this.itemForm.controls['itemCategory'].setValue(
        this.editData.itemCategory
      );
      this.itemForm.controls['dateSubmitted'].setValue(
        this.editData.dateSubmitted
      );
      this.itemForm.controls['itemStatus'].setValue(this.editData.itemStatus);
      this.itemForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.itemForm.controls['userComment'].setValue(this.editData.userComment);
      this.actionButton = 'Update';
    }
  }

  saveItem() {
    if (!this.editData) {
      if (this.itemForm.valid) {
        this.api.addItemToList(this.itemForm.value).subscribe({
          next: () => {
            this.snackBar.open('Item is added to the Data Base');
            this.itemForm.reset();
            this.dialogRef.close('saved');
          },
          error: (err) => {
            this.snackBar.open(
              'Error while adding the item to the Data Base',
              err
            );
          },
        });
      }
    } else {
      this.updateItem(this.itemForm.value, this.editData.id);
    }
  }

  updateItem(data: any, id: number) {
    this.api.updateItemInTheList(data, id).subscribe({
      next: () => {
        this.snackBar.open('Item is updated');
        this.itemForm.reset();
        this.dialogRef.close('updated');
      },
      error: (err) => {
        this.snackBar.open('Error while editing the item', err);
      },
    });
  }
}

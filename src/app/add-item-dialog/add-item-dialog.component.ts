import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
})
export class AddItemDialogComponent implements OnInit {
  itemForm!: FormGroup;

  itemsCategory = [
    { category: 'Appliances' },
    { category: 'Electronics' },
    { category: 'Electrical' },
    { category: 'Building Materials' },
  ];

  itemStatuses: string[] = ['New', 'Pre-Owned', 'Used'];
  selectedStatus: string = '';

  constructor(private formBuilder: FormBuilder) {}

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
  }

  saveItem() {
    console.log(this.itemForm?.value);
  }
}

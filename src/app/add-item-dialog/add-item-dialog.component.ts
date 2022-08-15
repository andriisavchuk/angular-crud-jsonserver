import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
})
export class AddItemDialogComponent implements OnInit {
  itemsCategory = [
    { category: 'Appliances' },
    { category: 'Electronics' },
    { category: 'Electrical' },
    { category: 'Building Materials' },
  ];
  itemStatuses: string[] = ['New', 'Pre-Owned', 'Used'];
  selectedStatus: string = '';

  constructor() {}

  ngOnInit(): void {}
}

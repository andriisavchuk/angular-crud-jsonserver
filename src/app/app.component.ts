import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit() {
    this.getAllItems();
  }

  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllItems() {
    this.api.getItemsFromList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        alert('Error while fetching the Items for Data Base');
      },
    });
  }
}

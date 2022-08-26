import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'itemName',
    'itemCategory',
    'dateSubmitted',
    'itemStatus',
    'itemPrice',
    'userComment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllItems();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.getAllItems();
      }
    });
  }

  getAllItems() {
    this.api.getItemsFromList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.snackBar.open('Error while fetching the Items for Data Base');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(row: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.getAllItems();
      }
    });
  }

  deleteItem(id: number) {
    this.api.deleteItemFromList(id).subscribe({
      next: () => {
        this.snackBar.open('Item is deleted from the Data Base');
        this.getAllItems();
      },
      error: () => {
        this.snackBar.open('Error while deleting the Item');
      },
    });
  }
}

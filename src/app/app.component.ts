import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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

  constructor(private dialog: MatDialog, private api: ApiService) {}

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
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Items for Data Base');
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
}

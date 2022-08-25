import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addItemToList(data: any) {
    return this.http.post<any>('http://localhost:3000/itemsList', data);
  }

  getItemsFromList() {
    return this.http.get<any>('http://localhost:3000/itemsList');
  }

  updateItemInTheList(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/itemsList/${id}`, data)
  }

  deleteItemFromList(id: number) {
    return this.http.delete<any>(`http://localhost:3000/itemsList/${id}`)
  }

  signupUser(data: any) {
    return this.http.post<any>('http://localhost:3000/signedUsers', data);
  }
}

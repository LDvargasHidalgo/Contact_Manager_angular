import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private  serverUrl:string = `http://localhost:9000`; //json-server url

  constructor(private httpClient: HttpClient) { 

  }

  //GET ALL CONTACTS
  public getAllContacs(): Observable<IContact[]>{
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //GET SINGLE CONTACT
  public getContact(contactId:string):Observable<IContact>{
    let dataURL : string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  // CREATE CONTACT
  public createContact(contact : IContact): Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  // UPDATE CONTACT
  public updateContact(contact : IContact, contactId:string): Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  // DELETE CONTACT
  public deleteContact(contactId:string): Observable< {}>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{ }>(dataURL).pipe(catchError(this.handleError));
  }

  //GET ALL GROUPS 
  public getGroups():Observable<IGroup[]>{
  let dataURL : string=`${this.serverUrl}/groups`;
  return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
}


//GET SINGLE GROUPS
public getGroup(contact:IContact):Observable<IGroup>{
  let dataURL : string=`${this.serverUrl}/groups/${contact.groupId}`;
  return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
}
  //ERROR HANDLING
  public handleError(error: HttpErrorResponse) {
    let erorMessage: string='';
    if(error.error instanceof ErrorEvent){
      //client error
      erorMessage = `Erro: ${error.error.message}`
    }else{
      //serve error
      erorMessage = `Status: ${error.status}\ Message: ${error.message}`
    }
    return throwError(erorMessage);
  }

}

import {Injectable} from '@angular/core'
import {SEARCHCACHE} from './searchCache'
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchHistoryService{
  searchCache = SEARCHCACHE;

  add(message: string){
    this.searchCache.push(message);
  }

  clear(){
    this.searchCache = [];
  }

  getCache(): Observable<string[]>{
    return of(SEARCHCACHE);
  }
}
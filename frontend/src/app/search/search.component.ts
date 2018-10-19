import { Component, OnInit } from '@angular/core';
import { SearchHistoryService } from '../search-history.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  queries: string[];
  value = '';
  
  constructor(private searchHistoryService: SearchHistoryService) { }

  addToCache(input: string){
    this.searchHistoryService.add(input);
  }

  clearCache(){
    this.searchHistoryService.clear();
  }

  getCache(){
    this.searchHistoryService.getCache()
      .subscribe(message => this.queries = message);
  }

  search(input: string){
    if(input){
      this.value = input;
    }
  }

  ngOnInit() {
    this.getCache();
  }

}

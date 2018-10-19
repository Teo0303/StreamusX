import { Component, OnInit } from '@angular/core';
import { faSearch, faHome, faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  icons = [{ home: faHome, search: faSearch, book: faBook }];
  constructor() {}

  ngOnInit() {}
}

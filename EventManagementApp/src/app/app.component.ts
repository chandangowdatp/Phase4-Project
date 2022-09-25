import { Component } from '@angular/core';
import { CrudHTTPService } from './crud-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EventManagementApp';

  constructor(private crudHTTPService: CrudHTTPService) {}

  ngOnInit(): void {}
}

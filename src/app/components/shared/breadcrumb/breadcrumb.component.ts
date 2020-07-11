import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbItem} from "../../../models/breadcrumb-item";


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  links: BreadcrumbItem[];

  constructor() { }

  ngOnInit(): void {
  }

}

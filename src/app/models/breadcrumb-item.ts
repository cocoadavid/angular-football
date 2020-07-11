export class BreadcrumbItem {
  name: string;
  routerLink: string;
  active: boolean;

  constructor(name: string, routerLink: string, active: boolean) {
    this.name = name;
    this.routerLink = routerLink;
    this.active = active;
  }
}

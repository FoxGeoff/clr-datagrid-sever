import { Component, EventEmitter } from "@angular/core";
import { ClrDatagridStringFilterInterface } from "@clr/angular";
import { User } from "../inventory/user";
import { COLORS } from "../inventory/values";


@Component({
  selector: "app-color-filter",
  template: `
        <span *ngFor="let color of allColors" class="color-square color-selectable"
            (click)="toggleColor(color)"
            [style.backgroundColor]="color"
            [class.color-selected]="selectedColors[color]"></span>`,
  styleUrls: ["../app.component.css"]
})
export class ColorFilterComponent implements ClrDatagridStringFilterInterface<User> {
  allColors = COLORS;
  selectedColors: { [color: string]: boolean } = {};
  nbColors = 0;

  changes: EventEmitter<any> = new EventEmitter<any>(false);

  constructor() { }

  onI

  listSelected(): string[] {
    const list: string[] = [];
    for (const color in this.selectedColors) {
      if (this.selectedColors[color]) {
        list.push(color);
      }
    }
    return list;
  }

  toggleColor(color: string) {
    this.selectedColors[color] = !this.selectedColors[color];
    this.selectedColors[color] ? this.nbColors++ : this.nbColors--;
    this.changes.emit(true);
  }

  accepts(user: User) {
    return this.nbColors === 0 || this.selectedColors[user.color];
  }

  isActive(): boolean {
    return this.nbColors > 0;
  }
}

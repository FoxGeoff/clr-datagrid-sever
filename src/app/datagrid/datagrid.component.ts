import { Component, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-datagrid',
  providers: [Inventory],
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {

  users: User[];
  total: number;
  loading: boolean = true;
  page: number;

  constructor(private inventory: Inventory) {
    inventory.size = 103;
    this.inventory.latency = 500;
    inventory.reset();
  }

  ngOnInit(): void {

  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    const filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (const filter of state.filters) {
        const { property, value } = <{ property: string; value: string }>filter;
        filters[property] = [value];
      }
    }
    if (!state.page) {
      state.page = {
        from: 0,
        to: 9,
        size: 10,
      };
    }
    this.inventory
      .filter(filters)
      .sort(<{ by: string; reverse: boolean }>state.sort)
      .fetch(state.page.from, state.page.size)
      .then((result: FetchResult) => {
        this.users = result.users;
        this.total = result.length;
        this.loading = false;
      });
  }
}


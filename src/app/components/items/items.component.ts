import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Items } from '../../models/items';
import { Item } from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input() items: Items;
  @Output() toOpen = new EventEmitter<string>();

  openPage(url: any) {
    this.toOpen.emit(url);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item;
  @Output() toOpen = new EventEmitter<string>();

  openPage(url: string) {
    this.toOpen.emit(url);
  }

}

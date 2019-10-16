import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, merge, combineLatest } from 'rxjs';
import { Items } from 'src/app/models/items';
import { AngularFireDatabase } from '@angular/fire/database';
import { HACKER_NEWS_DB } from '../../hackernews-db';
import { map, mergeMap, filter, take, skip, withLatestFrom, switchAll } from 'rxjs/operators';
import { Item } from '../../models/item';


export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable()
export class ItemService {
  private queries: Subject<Query>;

  constructor(@Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {
    this.queries = new Subject<Query>();
  }

  load(query: Query) {
    this.queries.next(query);
  }
  get(): Observable<Items> {    
    const rawItemIds = this.db.list<number>('/v0/topstories')
      .valueChanges();
    const itemIds = combineLatest(
      rawItemIds,
      this.queries
    ).pipe(
      filter(([ids, query]) => query.refresh),
      map(([ids, query]) => ids)
    );
    const selector = ({ offset, limit }, ids) =>
      combineLatest(...(ids.slice(offset, offset + limit)
        .map(id => this.db.object<Item>('/v0/item/' + id).valueChanges()))
      ) as Observable<Items>;
    return merge(
      combineLatest(this.queries, itemIds).pipe(
        map(([query, ids]) => selector(query, ids).pipe(take(1)))
      ),
      this.queries.pipe(
        skip(1),
        withLatestFrom(itemIds, selector)
      )
    ).pipe(switchAll());
  }
}

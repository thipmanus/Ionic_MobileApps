import { Logout } from './../auth/actions/auth';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Items } from '../models/items';
import { LoadingController, ToastController } from '@ionic/angular';
import * as fromTopStories from './reducers';
import * as topStoriesActions from './actions/top-stories';
import * as fromItems from '../reducers/items';
import * as fromAuth from '../auth/reducers';
import * as gravatar from 'gravatar';
import { OpenPageService } from '../services/open-page/open-page.service';
import { concatMap, filter } from 'rxjs/operators';
import { User } from '../models/user';
@Component({
  selector: 'app-top-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent implements OnInit, OnDestroy {

  items$: Observable<Items>;
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;
  private itemsLoading$: Observable<boolean>;
  private idsLoading$: Observable<boolean>;
  private errors$: Observable<any>;
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  private loading: HTMLIonLoadingElement;
  private subscriptions: Subscription[];

  constructor(
    private store: Store<fromTopStories.State>,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private openPageService: OpenPageService,
  ) {
    this.items$ = store.pipe(select(fromTopStories.getDisplayItems));
    this.loggedIn$ = store.pipe(select(fromAuth.getLoggedIn));
    this.user$ = store.pipe(select(fromAuth.getUser));
    this.itemsLoading$ = store.pipe(select(fromItems.isItemsLoading));
    this.idsLoading$ = store.pipe(select(fromTopStories.isTopStoriesLoading));
    this.errors$ = store.pipe(select(fromTopStories.getError), filter(error => error != null));
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.itemsLoading$.subscribe(loading => {
        if (!loading) {
          this.notifyScrollComplete();
        }
      })
    );
    this.subscriptions.push(this.idsLoading$.pipe(concatMap(loading => {
      return loading ? from(this.showLoading()) : from(this.hideLoading());
    })).subscribe());
    this.subscriptions.push(this.errors$.pipe(concatMap(error => from(this.showError(error)))).subscribe());
    this.doLoad(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.
    unsubscribe());
  }

  openUrl(url) {
    this.openPageService.open(url);
  }

  getPhotoURL(user: User) {
    return user && (user.photoURL || gravatar.url(user.email));
  }

  load(event: Event) {
    this.infiniteScrollComponent = event.target;
    this.doLoad(false);
  }

  refresh(event: Event) {
    this.refresherComponent = event.target;
    this.doLoad(true);
  }

  doLoad(refresh: boolean) {
    if (refresh) {
      this.store.dispatch(new topStoriesActions.Refresh());
    } else {
      this.store.dispatch(new topStoriesActions.LoadMore());
    }
  }
  
  logout() {
    this.store.dispatch(new Logout());
  }
  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

  private showLoading(): Promise<void> {
    return this.hideLoading().then(() => {
      return this.loadingCtrl.create({
        message: 'Loading...',
      }).then(loading => {
        this.loading = loading;
        return this.loading.present();
      });
    });
  }

  private hideLoading(): Promise<void> {
    if (this.loading) {
      this.notifyRefreshComplete();
      return this.loading.dismiss().then(() => null);
    }
    return Promise.resolve();
  }

  private showError(error: any): Promise<void> {
    return this.toastCtrl.create({
      message: `An error occurred: ${error}`,
      duration: 3000,
      showCloseButton: true,
    }).then(toast => toast.present());
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';

const routes: Routes = [
  { path: 'top-stories', loadChildren: () => import('./top-stories/top-stories.module').then( m => m.TopStoriesModule)},
  { path: 'comments/:id', loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)},
  { path: 'favorites', loadChildren: () => import('./favorites-list/favorites-list.module').then(m => m.FavoritesListModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '', redirectTo: '/top-stories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

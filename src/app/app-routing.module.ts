import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'top-stories', loadChildren: () => import('./top-stories/top-stories.module').then( m => m.TopStoriesModule)},
  { path: 'comments/:id', loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)},
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

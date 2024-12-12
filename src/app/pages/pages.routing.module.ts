import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { UsersComponent } from './users/users.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'event',
    component: EventsComponent,
    data: {
      title: 'Event',
    },
  },
  {
    path: 'user',
    component: UsersComponent,
    data: {
      title: 'User',
    },
  }
];

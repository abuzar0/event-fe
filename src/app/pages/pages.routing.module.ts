import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { UsersComponent } from './users/users.component';
import { RolePremissionComponent } from './role-premission/role-premission.component';

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
    path: 'role-permission',
    component: RolePremissionComponent,
    data: {
      title: 'Role & Permission',
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

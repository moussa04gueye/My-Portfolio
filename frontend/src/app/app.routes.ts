import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/home/home.component';
import { ProjectListComponent } from './features/public/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/public/projects/project-detail/project-detail.component';
import { BlogListComponent } from './features/public/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './features/public/blog/blog-detail/blog-detail.component';
import { AboutComponent } from './features/public/about/about.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { ExperienceComponent } from './features/public/experience/experience.component';

import { AdminLoginComponent } from './features/admin/login/login.component';
import { AdminLayoutComponent } from './features/admin/layout/layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ProjectListAdminComponent } from './features/admin/projects-manage/project-list-admin/project-list-admin.component';
import { ProjectFormComponent } from './features/admin/projects-manage/project-form/project-form.component';
import { BlogListAdminComponent } from './features/admin/blog-manage/blog-list-admin/blog-list-admin.component';
import { BlogFormComponent } from './features/admin/blog-manage/blog-form/blog-form.component';
import { SkillsManageComponent } from './features/admin/skills-manage/skills-manage.component';
import { ExperiencesManageComponent } from './features/admin/experiences-manage/experiences-manage.component';
import { EducationManageComponent } from './features/admin/education-manage/education-manage.component';
import { MessagesComponent } from './features/admin/messages/messages.component';
import { SettingsComponent } from './features/admin/settings/settings.component';

import { adminGuard } from './core/guards/admin';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projets', component: ProjectListComponent },
  { path: 'projets/:slug', component: ProjectDetailComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: 'a-propos', component: AboutComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'projets', component: ProjectListAdminComponent },
      { path: 'projets/nouveau', component: ProjectFormComponent },
      { path: 'projets/:id/edit', component: ProjectFormComponent },

      { path: 'blog', component: BlogListAdminComponent },
      { path: 'blog/nouveau', component: BlogFormComponent },
      { path: 'blog/:id/edit', component: BlogFormComponent },

      { path: 'competences', component: SkillsManageComponent },
      { path: 'experiences', component: ExperiencesManageComponent },
      { path: 'formations', component: EducationManageComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'settings', component: SettingsComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];

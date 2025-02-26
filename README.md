# DOCUMENTACION

_Sitio oficial, Gestion Escolar._

### Estructura del sitio

```
📂 src/
│──📂 app/
│   ├──📂 api/
│   │   │   ├──📂 register/
│   │   │   │   ├──📄 route.ts
│   │   ├──📂 instituciones/
│   │   │   ├──📂 [id]/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 nueva/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 alumnos/
│   │   │   ├──📂 [id]/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 nuevo/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 asistencia/
│   │   │   ├──📂 [id]/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 estadisticas/
│   │   │   ├──📂 rendimiento/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 asistencia/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 normativas/
│   │   │   ├──📂 [id]/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 nueva/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 notificaciones/
│   │   │   ├──📂 configuracion/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 mensajeria/
│   │   │   ├──📂 nuevo/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 calendario/
│   │   │   ├──📂 evento/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📄 page.tsx
│   │   ├──📂 auth/
│   │   │   ├──📂 login/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 register/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 logout/
│   │   │   │   ├──📄 page.tsx
│   │   │   ├──📂 two-factor/
│   │   │   │   ├──📄 page.tsx
│──📂 components/
│   ├──📂 auth/
│   │   ├──📄 LoginForm.tsx
│   │   ├──📄 RegisterForm.tsx
│   │   ├──📄 LogoutButton.tsx
│   │   ├──📄 TwoFactorAuth.tsx
│   ├──📂 institutions/
│   │   ├──📄 InstitutionList.tsx
│   │   ├──📄 InstitutionForm.tsx
│   │   ├──📄 InstitutionCard.tsx
│   ├──📂 students/
│   │   ├──📄 StudentList.tsx
│   │   ├──📄 StudentForm.tsx
│   │   ├──📄 StudentCard.tsx
│   ├──📂 attendance/
│   │   ├──📄 AttendanceTable.tsx
│   │   ├──📄 AttendanceSummary.tsx
│   │   ├──📄 AttendanceAlerts.tsx
│   ├──📂 stats/
│   │   ├──📄 OverviewStats.tsx
│   │   ├──📄 PerformanceChart.tsx
│   │   ├──📄 AbsenceStats.tsx
│   ├──📂 regulations/
│   │   ├──📄 RegulationList.tsx
│   │   ├──📄 RegulationDetail.tsx
│   │   ├──📄 RegulationForm.tsx
│   ├──📂 notifications/
│   │   ├──📄 NotificationList.tsx
│   │   ├──📄 NotificationSettings.tsx
│   ├──📂 messaging/
│   │   ├──📄 MessageList.tsx
│   │   ├──📄 MessageComposer.tsx
│   ├──📂 calendar/
│   │   ├──📄 CalendarView.tsx
│   │   ├──📄 EventForm.tsx
│──📂 hooks/
│   ├──📄 useAuth.ts
│   ├──📄 useInstitutions.ts
│   ├──📄 useStudents.ts
│   ├──📄 useAttendance.ts
│   ├──📄 useNotifications.ts
│   ├──📄 useMessaging.ts
│──📂 libs/
│   ├──📄 supabase.ts
│   ├──📄 auth.ts
│   ├──📄 api.ts
│──📂 utils/
│   ├──📄 formatDate.ts
│   ├──📄 calculateAverages.ts
│   ├──📄 calculateAbsences.ts
│   ├──📄 exportData.ts
│   ├──📄 cache.ts
│──📂 public/
│──📂 types/
│──📂 i18n/
│──📄 middleware.ts
│──📄 layout.tsx
│──📄 theme.ts
│──📄 accessibility.ts
│──📄 security.ts


```

# DEPENDENCIAS

`npm install zustand`
`npm install @supabase/supabase-js`
`npm install @supabase/auth-helpers-nextjs`
`npm install -D tailwindcss postcss autoprefixer`
`npm install lucide-react`
`npm install zod`
`npm install react-hot-toast`

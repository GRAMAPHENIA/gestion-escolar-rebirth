# DOCUMENTACION
*Sitio oficial, Gestion Escolar.*

### Estructura del sitio

```
📂 src/
│──📂 app/                             # Rutas y páginas de Next.js
│   ├──📂 (routes)/
│   │   ├──📂 instituciones/
│   │   │   ├──📂 [id]/                # Ruta dinámica para detalles de institución
│   │   │   │   ├──📄 page.tsx    ✅     # Detalles de una institución específica
│   │   │   ├──📂 nueva/               # Ruta para crear una nueva institución
│   │   │   │   ├──📄 page.tsx         # Formulario para crear institución
│   │   │   ├──📄 page.tsx             # Página principal de instituciones
│   │   ├──📂 alumnos/
│   │   │   ├──📂 [id]/           ✅     # Ruta dinámica para detalles de alumno
│   │   │   │   ├──📄 page.tsx    ✅     # Detalles de un alumno específico
│   │   │   ├──📂 nuevo/          ✅     # Ruta para registrar un nuevo alumno
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario para registrar alumno
│   │   │   ├──📄 page.tsx        ✅     # Página principal de alumnos
│   │   ├──📂 asistencia/
│   │   │   ├──📂 [id]/           ✅     # Ruta dinámica para detalles de asistencia
│   │   │   │   ├──📄 page.tsx    ✅     # Detalles de asistencia específica
│   │   │   ├──📄 page.tsx        ✅     # Página principal de asistencia
│   │   ├──📂 estadisticas/
│   │   │   ├──📂 rendimiento/    ✅     # Ruta para estadísticas de rendimiento
│   │   │   │   ├──📄 page.tsx    ✅     # Estadísticas de rendimiento académico
│   │   │   ├──📂 asistencia/     ✅     # Ruta para estadísticas de asistencia
│   │   │   │   ├──📄 page.tsx    ✅     # Estadísticas de asistencia
│   │   │   ├──📄 page.tsx        ✅     # Página principal de estadísticas
│   │   ├──📂 normativas/
│   │   │   ├──📂 [id]/           ✅     # Ruta dinámica para detalles de normativa
│   │   │   │   ├──📄 page.tsx    ✅     # Detalles de una normativa específica
│   │   │   ├──📂 nueva/          ✅     # Ruta para crear una nueva normativa
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario para crear normativa
│   │   │   ├──📄 page.tsx        ✅     # Página principal de normativas
│   │   ├──📂 notificaciones/
│   │   │   ├──📂 configuracion/  ✅     # Ruta para configurar notificaciones
│   │   │   │   ├──📄 page.tsx    ✅     # Configuración de notificaciones
│   │   │   ├──📄 page.tsx        ✅     # Página principal de notificaciones
│   │   ├──📂 mensajeria/
│   │   │   ├──📂 nuevo/          ✅     # Ruta para enviar un nuevo mensaje
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario para enviar mensaje
│   │   │   ├──📄 page.tsx        ✅     # Página principal de mensajería
│   │   ├──📂 calendario/
│   │   │   ├──📂 evento/         ✅     # Ruta para crear un nuevo evento
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario para crear evento
│   │   │   ├──📄 page.tsx        ✅     # Página principal de calendario
│   │   ├──📂 auth/
│   │   │   ├──📂 login/          ✅     # Ruta para iniciar sesión
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario de inicio de sesión
│   │   │   ├──📂 register/       ✅     # Ruta para registrarse
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario de registro
│   │   │   ├──📂 logout/         ✅     # Ruta para cerrar sesión
│   │   │   │   ├──📄 page.tsx    ✅     # Página de cierre de sesión
│   │   │   ├──📂 two-factor/     ✅     # Ruta para autenticación de dos factores
│   │   │   │   ├──📄 page.tsx    ✅     # Formulario de autenticación de dos factores
│──📂 components/                      # Componentes reutilizables
│   ├──📂 auth/
│   │   ├──📄 LoginForm.tsx            # Formulario de inicio de sesión
│   │   ├──📄 RegisterForm.tsx         # Formulario de registro
│   │   ├──📄 LogoutButton.tsx         # Botón de cierre de sesión
│   │   ├──📄 TwoFactorAuth.tsx        # Autenticación de dos factores
│   ├──📂 institutions/
│   │   ├──📄 InstitutionList.tsx      # Lista de instituciones
│   │   ├──📄 InstitutionForm.tsx      # Formulario de instituciones
│   │   ├──📄 InstitutionCard.tsx      # Tarjeta de institución
│   ├──📂 students/
│   │   ├──📄 StudentList.tsx          # Lista de alumnos por grado
│   │   ├──📄 StudentForm.tsx          # Formulario de alumnos
│   │   ├──📄 StudentCard.tsx          # Tarjeta de alumno
│   ├──📂 attendance/
│   │   ├──📄 AttendanceTable.tsx      # Tabla de asistencia
│   │   ├──📄 AttendanceSummary.tsx    # Gráfico de asistencia
│   │   ├──📄 AttendanceAlerts.tsx     # Alertas de asistencia
│   ├──📂 stats/
│   │   ├──📄 OverviewStats.tsx        # Panel de estadísticas generales
│   │   ├──📄 PerformanceChart.tsx     # Gráfico de rendimiento académico
│   │   ├──📄 AbsenceStats.tsx         # Estadísticas de asistencia
│   ├──📂 regulations/
│   │   ├──📄 RegulationList.tsx       # Lista de normativas educativas
│   │   ├──📄 RegulationDetail.tsx     # Vista detallada de normativas
│   │   ├──📄 RegulationForm.tsx       # Formulario de normativas
│   ├──📂 notifications/
│   │   ├──📄 NotificationList.tsx     # Lista de notificaciones
│   │   ├──📄 NotificationSettings.tsx # Configuración de notificaciones
│   ├──📂 messaging/
│   │   ├──📄 MessageList.tsx          # Lista de mensajes
│   │   ├──📄 MessageComposer.tsx      # Compositor de mensajes
│   ├──📂 calendar/
│   │   ├──📄 CalendarView.tsx         # Vista de calendario
│   │   ├──📄 EventForm.tsx            # Formulario de eventos
│──📂 hooks/
│   ├──📄 useAuth.ts                   # Hook para autenticación
│   ├──📄 useInstitutions.ts           # Hook para manejar instituciones
│   ├──📄 useStudents.ts               # Hook para manejar alumnos
│   ├──📄 useAttendance.ts             # Hook para manejar asistencia
│   ├──📄 useNotifications.ts          # Hook para manejar notificaciones
│   ├──📄 useMessaging.ts              # Hook para manejar mensajería
│──📂 libs/
│   ├──📄 supabase.ts                  # Configuración de Supabase
│   ├──📄 auth.ts                      # Funciones de autenticación
│   ├──📄 api.ts                       # Funciones para interactuar con APIs externas
│──📂 utils/
│   ├──📄 formatDate.ts                # Formateo de fechas
│   ├──📄 calculateAverages.ts         # Cálculo de promedios de calificaciones
│   ├──📄 calculateAbsences.ts         # Detección de alertas por faltas
│   ├──📄 exportData.ts                # Exportación de datos a CSV/PDF
│   ├──📄 cache.ts                     # Funciones de caché
│──📂 public/                          # Archivos estáticos
│──📂 types/                           # Definición de tipos (TypeScript)
│──📂 i18n/                            # Archivos de internacionalización
│──📄 middleware.ts                    # Middleware de autenticación (opcional)
│──📄 layout.tsx                       # Layout principal
│──📄 theme.ts                         # Configuración de temas y personalización
│──📄 accessibility.ts                 # Configuración de accesibilidad
│──📄 security.ts                      # Configuración de seguridad


```

# DEPENDENCIAS

`npm install zustand`
`npm install @supabase/supabase-js`
`npm install @supabase/auth-helpers-nextjs`
`npm install -D tailwindcss postcss autoprefixer`
`npm install lucide-react`
`npm install zod`
`npm install react-hot-toast`
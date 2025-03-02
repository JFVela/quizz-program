import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, Link } from "react-router-dom";

// Definición de la navegación del dashboard
const NAVIGATION = [
  {
    kind: "header",
    title: "Mi Cuenta",
  },
  {
    segment: "profile",
    title: "Perfil",
    icon: <PersonIcon />,
    link: "/admin/profile",
  },
  {
    segment: "settings",
    title: "Configuración",
    icon: <SettingsIcon />,
    link: "/admin/settings",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Estadísticas",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
  },
  {
    segment: "activity",
    title: "Actividad",
    icon: <BarChartIcon />,
    link: "/admin/activity",
  },
  {
    segment: "notifications",
    title: "Notificaciones",
    icon: <NotificationsIcon />,
    link: "/admin/notifications",
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Un router de demostración (puedes integrarlo con react-router si lo deseas)
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

export default function AdminLayout(props) {
  const { window } = props;
  const router = useDemoRouter("/profile");
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {/* Barra de navegación dinámica */}
          <nav style={{ marginBottom: "20px" }}>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
              {NAVIGATION.filter((item) => item.segment).map((item) => (
                <li key={item.segment}>
                  <Link to={item.link} style={{ textDecoration: "none" }}>
                    {item.icon} {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Aquí se renderiza el componente de la ruta anidada */}
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

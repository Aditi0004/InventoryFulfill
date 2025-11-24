import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  Warehouse,
  Package,
  GitBranch,
  TrendingUp,
  Activity,
} from 'lucide-react';

const menuItems = [
  { title: 'System Overview', url: '/', icon: LayoutDashboard },
  { title: 'Warehouse Manager', url: '/warehouses', icon: Warehouse },
  { title: 'Inventory Explorer', url: '/inventory', icon: Package },
  { title: 'Order Flow', url: '/orders', icon: GitBranch },
  { title: 'Predictions Console', url: '/predictions', icon: TrendingUp },
  { title: 'Distributed Tracing', url: '/tracing', icon: Activity },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <div>
            <div className="font-bold text-sm">IDIFOS</div>
            <div className="text-xs text-muted-foreground">Distributed System</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

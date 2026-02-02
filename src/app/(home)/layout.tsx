import SidebarHome from './_components/sidebar';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

  return (
    <SidebarHome>
      {children}
    </SidebarHome>
  )
}

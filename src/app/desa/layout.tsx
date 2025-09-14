import DesaNavbar from "@/components/navbar/DesaNavbar";

export default function DesaLayout({ children }: { children: React.ReactNode }) {
  return <DesaNavbar>{children}</DesaNavbar>;
}

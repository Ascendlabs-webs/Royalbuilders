import {
  ShieldCheck, IndianRupee, Users, PenTool, Clock3, Tags, Gavel, MapPin,
  Gem, Ruler, Lightbulb, TrendingUp, FileCheck2, UserCheck,
  Building2, Search, Handshake, ChartLine,
} from "lucide-react";

const icons = {
  shield: ShieldCheck,
  rupee: IndianRupee,
  users: Users,
  pen: PenTool,
  clock: Clock3,
  tag: Tags,
  gavel: Gavel,
  map: MapPin,
  gem: Gem,
  ruler: Ruler,
  light: Lightbulb,
  trend: TrendingUp,
  safe: ShieldCheck,
  file: FileCheck2,
  user: UserCheck,
  building: Building2,
  buy: Handshake,
  sell: Handshake,
  chart: ChartLine,
  search: Search,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Cmp = icons[name as IconName] ?? Building2;
  return <Cmp size={size} className={className} aria-hidden />;
}

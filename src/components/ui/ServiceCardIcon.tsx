import {
  AppWindow,
  BadgeCheck,
  BarChart3,
  Bath,
  BatteryCharging,
  Bell,
  Bike,
  Bot,
  Briefcase,
  Bug,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Compass,
  Droplet,
  Droplets,
  Eye,
  Factory,
  FileText,
  FlaskConical,
  Flower2,
  FolderOpen,
  Handshake,
  HardHat,
  Home,
  Hospital,
  Hotel,
  Inbox,
  Info,
  Layers,
  Leaf,
  Lock,
  Mail,
  Mailbox,
  Mountain,
  Package,
  Radio,
  Recycle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  SprayCan,
  Sprout,
  Store,
  Target,
  Thermometer,
  Timer,
  Trees,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const serviceIcons = {
  AppWindow,
  BadgeCheck,
  BarChart3,
  Bath,
  BatteryCharging,
  Bell,
  Bike,
  Bot,
  Briefcase,
  Bug,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Compass,
  Droplet,
  Droplets,
  Eye,
  Factory,
  FileText,
  FlaskConical,
  Flower2,
  FolderOpen,
  Handshake,
  HardHat,
  Home,
  Hospital,
  Hotel,
  Inbox,
  Info,
  Layers,
  Leaf,
  Lock,
  Mail,
  Mailbox,
  Mountain,
  Package,
  Radio,
  Recycle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  SprayCan,
  Sprout,
  Store,
  Target,
  Thermometer,
  Timer,
  Trees,
  Truck,
  Wrench,
  Zap,
} as const satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof serviceIcons;

type Props = {
  name?: string
  className?: string
  iconClassName?: string
};

export function ServiceCardIcon({ name, className, iconClassName }: Props) {
  const Icon = name && name in serviceIcons ? serviceIcons[name as ServiceIconName] : Layers;

  return (
    <span
      className={cn(
        "mb-4 inline-flex size-11 items-center justify-center rounded-[14px] bg-leaf-soft text-leaf",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={cn("size-5", iconClassName)} strokeWidth={1.75} />
    </span>
  );
}

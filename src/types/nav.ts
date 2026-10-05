import { type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

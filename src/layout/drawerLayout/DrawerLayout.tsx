import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ReactNode } from 'react';

interface DrawerLayoutProps {
  label?: string;
  children?: ReactNode;
}

function DrawerLayout({ label, children }: DrawerLayoutProps) {
  return (
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>{label}</SheetTitle>
        <VisuallyHidden>
          <SheetDescription></SheetDescription>
        </VisuallyHidden>
      </SheetHeader>
      <div className="grid gap-4 py-4">{children}</div>
    </SheetContent>
  );
}

export default DrawerLayout;

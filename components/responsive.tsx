"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { DialogContent } from "@radix-ui/react-dialog";

interface Props {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  sizePoints?: Partial<SizePoints>;
}

interface SizePoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

interface Size {
  width: number;
  height: number;
}

export function ResposiveDialog({
  children,
  trigger,
  className,
  style,
  open,
  onOpenChange,
  title,
  description,
  footer,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Dialog open={open ?? isOpen} onOpenChange={onOpenChange ?? setIsOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className={className} style={style}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    </>
  );
}

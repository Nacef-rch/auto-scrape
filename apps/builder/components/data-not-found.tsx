import { LucideProps } from "lucide-react";
import React from "react";

// Props definition
interface UserDataNotFoundProps {
  title?: string;
  description?: string;
  icon?: React.FC<LucideProps>;
  children?: React.ReactNode;
}

const UserDataNotFound: React.FC<UserDataNotFoundProps> = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {Icon && (
        <div className="flex items-center justify-center w-20 h-20 bg-accent rounded-full">
          <Icon size={40} className="stroke-primary" />
        </div>
      )}

      {(title || description) && (
        <div className="flex flex-col gap-1 text-center">
          {title && <p className="font-bold text-lg">{title}</p>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {children && <div className="w-full">{children}</div>}
    </div>
  );
};

export default UserDataNotFound;

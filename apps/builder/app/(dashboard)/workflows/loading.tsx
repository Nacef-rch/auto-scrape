import { Skeleton } from "@workspace/ui/components/skeleton";

type Props = {
  count?: number; // Number of skeleton items to render
};

export const WorkFlowSkeleton = ({ count = 4 }: Props) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

export default WorkFlowSkeleton;

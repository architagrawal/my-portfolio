import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProjectsSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="flex gap-6 overflow-hidden pb-8">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] h-[600px] border-2 bg-card/50">
                    <Skeleton className="w-full aspect-video rounded-t-lg" />
                    <CardHeader className="space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-5/6" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/3 mb-4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-5/6" />
                        </div>
                        <div className="space-y-3">
                             <Skeleton className="h-4 w-1/4" />
                             <div className="flex gap-2 flex-wrap">
                                {[1, 2, 3, 4, 5].map((j) => (
                                    <Skeleton key={j} className="h-8 w-16 rounded-md" />
                                ))}
                             </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                           <Skeleton className="h-9 w-28 rounded-md" />
                           <Skeleton className="h-9 w-28 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, SortDesc } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const Route = createFileRoute("/dashboard/channels/videos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">All Videos</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="main">Main Channel</SelectItem>
              <SelectItem value="second">Second Channel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <SortDesc className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg"
          >
            <div className="h-32 w-56 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
              Thumbnail
            </div>
            <div className="space-y-2 flex-1">
              <Link
                to={`/dashboard/channels/videos/${i + 1}`}
                className="hover:underline"
              >
                <h3 className="text-lg font-medium">
                  {i % 5 === 0
                    ? "How to Grow Your YouTube Channel in 2023"
                    : i % 5 === 1
                      ? "10 Tips for Better Video Quality"
                      : i % 5 === 2
                        ? "YouTube Algorithm Explained"
                        : i % 5 === 3
                          ? "Best Camera Settings for YouTube"
                          : "How I Got 100K Subscribers"}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">
                Published on{" "}
                {new Date(
                  2023,
                  5 + (i % 3),
                  10 + (i % 15),
                ).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="text-sm font-medium">{120000 - i * 10000}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Watch Time</p>
                  <p className="text-sm font-medium">{1200 - i * 100} hours</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Likes</p>
                  <p className="text-sm font-medium">{8000 - i * 500}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Comments</p>
                  <p className="text-sm font-medium">{500 - i * 30}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">CTR</p>
                  <p className="text-sm font-medium">
                    {(12 - i * 0.5).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 md:mt-0"
              asChild
            >
              <Link to={`/dashboard/channels/videos/${i + 1}`}>
                View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          1
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          2
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          3
        </Button>
        <span>...</span>
        <Button variant="outline" size="sm" className="px-3">
          10
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}

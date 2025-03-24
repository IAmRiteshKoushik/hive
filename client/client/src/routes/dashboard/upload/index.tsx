import { Link, createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Youtube,
  Clock,
  Globe,
  Lock,
  MessageSquare,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";
export const Route = createFileRoute("/dashboard/upload/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoTags, setVideoTags] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [category, setCategory] = useState("22"); // People & Blogs
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setThumbnailPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          toast({
            title: "Upload complete",
            description:
              "Your video has been uploaded to YouTube successfully.",
          });

          // In a real app, you would redirect to the video details page
          // router.push(`/dashboard/videos/${videoId}`)
        }

        const newProgress = prev + 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    if (!videoTitle) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload the video to YouTube via the API
    simulateUpload();
  };

  const handleApplyAiSuggestion = (
    type: "title" | "description",
    content: string,
  ) => {
    if (type === "title") {
      setVideoTitle(content);
    } else {
      setVideoDescription(content);
    }

    setIsAiDialogOpen(false);

    toast({
      title: `${type === "title" ? "Title" : "Description"} updated`,
      description: `The AI suggestion has been applied to your video ${type}.`,
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Upload to YouTube</h2>
        <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>AI Content Assistant</DialogTitle>
              <DialogDescription>
                Get AI-powered suggestions for your video title and description.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Tabs defaultValue="title">
                <TabsList className="mb-4">
                  <TabsTrigger value="title">Title Suggestions</TabsTrigger>
                  <TabsTrigger value="description">
                    Description Suggestions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="title" className="space-y-4">
                  <div className="space-y-2">
                    <Label>What is your video about?</Label>
                    <Textarea
                      placeholder="Describe your video content briefly..."
                      className="min-h-[100px]"
                    />
                    <Button className="w-full">Generate Title Ideas</Button>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <Label>AI Suggestions</Label>
                    <div className="space-y-2">
                      {[
                        "10 Advanced YouTube Growth Strategies That Actually Work in 2023",
                        "How I Grew My Channel from 0 to 100K Subscribers (Proven Method)",
                        "The YouTube Algorithm: Secrets Revealed by a Former Employee",
                      ].map((title, i) => (
                        <div key={i} className="p-3 border rounded-md">
                          <p className="font-medium mb-2">{title}</p>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleApplyAiSuggestion("title", title)
                              }
                            >
                              Use This
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-4">
                  <div className="space-y-2">
                    <Label>What should be included in your description?</Label>
                    <Textarea
                      placeholder="Key points, links, timestamps you want to include..."
                      className="min-h-[100px]"
                    />
                    <Button className="w-full">Generate Description</Button>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <Label>AI Suggestions</Label>
                    <div className="space-y-2">
                      {[
                        "In this video, I share my top strategies for growing a YouTube channel in 2023. These are the exact methods I used to grow from 0 to 100K subscribers in just 12 months.\n\n🔔 Subscribe for more tips: https://youtube.com/channel/example\n\n⏱️ Timestamps:\n00:00 Introduction\n01:23 Strategy #1: Content Research\n05:47 Strategy #2: Thumbnail Optimization\n10:32 Strategy #3: Title and Description SEO\n15:18 Strategy #4: Audience Retention\n20:05 Strategy #5: Promotion Tactics",
                      ].map((desc, i) => (
                        <div key={i} className="p-3 border rounded-md">
                          <p className="text-sm whitespace-pre-line mb-2">
                            {desc}
                          </p>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleApplyAiSuggestion("description", desc)
                              }
                            >
                              Use This
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAiDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Video File</CardTitle>
            <CardDescription>
              Select the video file you want to upload to YouTube.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedFile ? (
              <div
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">
                  Drag and drop or click to upload
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  MP4, MOV, or AVI up to 10GB
                </p>
                <Button variant="secondary" size="sm">
                  Select File
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/mp4,video/quicktime,video/x-msvideo"
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-md flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Custom Thumbnail (Optional)</Label>
              {!thumbnailPreview ? (
                <div
                  className="border rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    JPG, PNG or GIF (1280x720 recommended)
                  </p>
                  <Button variant="outline" size="sm">
                    Select Image
                  </Button>
                  <input
                    type="file"
                    id="thumbnail"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailSelect}
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={thumbnailPreview || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-full h-auto rounded-md object-cover aspect-video"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveThumbnail}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full gap-2"
            >
              <Youtube className="h-4 w-4" />
              {isUploading
                ? `Uploading (${uploadProgress}%)`
                : "Upload to YouTube"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>
              Enter information about your video.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Add a title that describes your video"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground text-right">
                {videoTitle.length}/100
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell viewers about your video"
                className="min-h-[120px]"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Add tags separated by commas"
                value={videoTags}
                onChange={(e) => setVideoTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Tags help viewers find your video through search
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Film & Animation</SelectItem>
                    <SelectItem value="2">Autos & Vehicles</SelectItem>
                    <SelectItem value="10">Music</SelectItem>
                    <SelectItem value="15">Pets & Animals</SelectItem>
                    <SelectItem value="17">Sports</SelectItem>
                    <SelectItem value="20">Gaming</SelectItem>
                    <SelectItem value="22">People & Blogs</SelectItem>
                    <SelectItem value="23">Comedy</SelectItem>
                    <SelectItem value="24">Entertainment</SelectItem>
                    <SelectItem value="25">News & Politics</SelectItem>
                    <SelectItem value="26">Howto & Style</SelectItem>
                    <SelectItem value="27">Education</SelectItem>
                    <SelectItem value="28">Science & Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Public</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="unlisted">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        <span>Unlisted</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>Private</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule (Optional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="schedule-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
                <Input id="schedule-time" type="time" />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Your video will be published automatically at the scheduled time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

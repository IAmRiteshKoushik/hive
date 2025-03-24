import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Copy, Check, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useToast } from "../../../hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type SuggestionType = "title" | "description" | "tags" | "thumbnail" | "script";
export const Route = createFileRoute("/dashboard/ai-assistant/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm your YouTube content assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<SuggestionType>("title");
  const [videoTopic, setVideoTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (message: string): string => {
    // This is a mock response generator
    // In a real app, you would call the Gemini API here

    if (message.toLowerCase().includes("title")) {
      return 'Here are some title suggestions for your YouTube video:\n\n1. "10 Proven Strategies to Grow Your YouTube Channel in 2023"\n2. "How I Gained 10,000 Subscribers in Just 30 Days"\n3. "The YouTube Algorithm: Secrets Revealed by a Former Employee"\n4. "Master YouTube SEO: Rank #1 in Search Results"\n5. "YouTube Growth Hacks That Actually Work in 2023"';
    }

    if (message.toLowerCase().includes("description")) {
      return "Here's a template for an effective YouTube video description:\n\n📱 In this video, I share my top strategies for growing a YouTube channel in 2023. These are the exact methods I used to grow from 0 to 100K subscribers in just 12 months.\n\n🔔 Subscribe for more tips: https://youtube.com/channel/example\n\n⏱️ Timestamps:\n00:00 Introduction\n01:23 Strategy #1: Content Research\n05:47 Strategy #2: Thumbnail Optimization\n10:32 Strategy #3: Title and Description SEO\n15:18 Strategy #4: Audience Retention\n20:05 Strategy #5: Promotion Tactics\n\n📚 Resources mentioned:\n- YouTube Creator Academy: https://example.com/resource1\n- TubeBuddy: https://example.com/resource2\n- VidIQ: https://example.com/resource3\n\n📱 Follow me on social media:\n- Instagram: https://instagram.com/example\n- Twitter: https://twitter.com/example\n\n#YouTubeTips #ContentCreator #GrowOnYouTube";
    }

    if (message.toLowerCase().includes("tags")) {
      return "Here are some effective tags for your YouTube growth video:\n\nyoutube growth, grow youtube channel, youtube algorithm, youtube seo, youtube tips, content creator tips, youtube strategy, increase subscribers, youtube 2023, video optimization, youtube analytics, youtube success, youtube marketing, social media growth, digital marketing, online presence, video marketing, youtube monetization";
    }

    if (
      message.toLowerCase().includes("script") ||
      message.toLowerCase().includes("outline")
    ) {
      return "Here's a script outline for your YouTube growth video:\n\n1. Introduction (0:00-1:00)\n   - Hook: Share an impressive statistic about your channel growth\n   - Introduce yourself and establish credibility\n   - Overview of what viewers will learn\n\n2. Strategy #1: Content Research (1:00-5:00)\n   - How to find trending topics in your niche\n   - Tools for keyword research\n   - Analyzing competitor videos\n\n3. Strategy #2: Thumbnail Optimization (5:00-9:00)\n   - Elements of high-CTR thumbnails\n   - Color psychology and text placement\n   - A/B testing thumbnails\n\n4. Strategy #3: Title and Description SEO (9:00-13:00)\n   - Keyword placement in titles\n   - Writing compelling descriptions\n   - Using tags effectively\n\n5. Strategy #4: Audience Retention (13:00-17:00)\n   - Hook techniques for the first 15 seconds\n   - Maintaining engagement throughout\n   - Pattern interrupts and visual variety\n\n6. Strategy #5: Promotion Tactics (17:00-21:00)\n   - Cross-promotion strategies\n   - Leveraging other social platforms\n   - Community engagement techniques\n\n7. Conclusion (21:00-22:00)\n   - Recap of strategies\n   - Call to action\n   - Teaser for next video";
    }

    return "I'm here to help with your YouTube content! I can suggest titles, descriptions, tags, thumbnail ideas, or even help outline your video script. What specific aspect of your video would you like assistance with?";
  };

  const handleGenerateSuggestion = () => {
    if (!videoTopic) {
      toast({
        title: "Topic required",
        description: "Please enter a video topic to generate suggestions.",
        variant: "destructive",
      });
      return;
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Can you suggest some ${selectedSuggestion}s for my video about "${videoTopic}" ${targetAudience ? `targeted at ${targetAudience}` : ""}?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateSuggestionResponse(
          selectedSuggestion,
          videoTopic,
          targetAudience,
        ),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateSuggestionResponse = (
    type: SuggestionType,
    topic: string,
    audience: string,
  ): string => {
    // This is a mock response generator
    // In a real app, you would call the Gemini API here

    const audienceStr = audience ? ` for ${audience}` : "";

    switch (type) {
      case "title":
        return `Here are some title suggestions for your video about "${topic}"${audienceStr}:\n\n1. "The Ultimate Guide to ${topic}: Everything You Need to Know"\n2. "${topic} Masterclass: From Beginner to Pro"\n3. "10 ${topic} Secrets Experts Don't Want You to Know"\n4. "How to ${topic} in 5 Simple Steps"\n5. "${topic} 101: A Complete Walkthrough${audienceStr}"`;

      case "description":
        return `Here's a template for your video description about "${topic}"${audienceStr}:\n\n📱 In this video, I break down everything you need to know about ${topic}. Whether you're a beginner or looking to level up your skills, this guide has you covered.\n\n🔔 Subscribe for more ${topic} content: https://youtube.com/channel/example\n\n⏱️ Timestamps:\n00:00 Introduction to ${topic}\n02:15 Common misconceptions\n05:30 Step-by-step tutorial\n12:45 Advanced techniques\n18:20 Resources and tools\n\n📚 Resources mentioned:\n- ${topic} Guide: https://example.com/resource1\n- Recommended Tools: https://example.com/resource2\n\n📱 Follow me on social media:\n- Instagram: https://instagram.com/example\n- Twitter: https://twitter.com/example\n\n#${topic.replace(/\s+/g, "")} #Tutorial #Guide`;

      case "tags":
        const baseTag = topic.toLowerCase().replace(/\s+/g, "");
        return `Here are some effective tags for your ${topic} video${audienceStr}:\n\n${baseTag}, ${topic.toLowerCase()}, ${topic.toLowerCase()} tutorial, ${topic.toLowerCase()} guide, ${topic.toLowerCase()} tips, ${topic.toLowerCase()} for beginners, learn ${topic.toLowerCase()}, ${topic.toLowerCase()} 2023, ${topic.toLowerCase()} masterclass, ${topic.toLowerCase()} secrets, ${topic.toLowerCase()} how to, ${topic.toLowerCase()} explained, ${topic.toLowerCase()} walkthrough`;

      case "thumbnail":
        return `Here are some thumbnail ideas for your ${topic} video${audienceStr}:\n\n1. A split-screen showing "before and after" results related to ${topic}\n2. A close-up of your face with an surprised expression + bold text saying "${topic} SECRETS REVEALED!"\n3. A minimalist design with a single object representing ${topic} on a contrasting background\n4. A numbered list format (e.g., "5 ${topic} HACKS") with a relevant icon\n5. A question-based thumbnail (e.g., "Is ${topic} worth it?") with a thoughtful expression\n\nRemember to use contrasting colors, readable fonts, and keep text to 3-4 words maximum for best results.`;

      case "script":
        return `Here's a script outline for your ${topic} video${audienceStr}:\n\n1. Introduction (0:00-1:30)\n   - Hook: Start with an intriguing fact or question about ${topic}\n   - Introduce yourself and establish credibility with ${topic}\n   - Overview of what viewers will learn\n\n2. Background & Context (1:30-3:30)\n   - Brief history or context of ${topic}\n   - Why ${topic} matters${audienceStr}\n   - Common misconceptions about ${topic}\n\n3. Main Content Section 1 (3:30-8:00)\n   - Core concept #1 about ${topic}\n   - Examples and demonstrations\n   - Tips for implementation\n\n4. Main Content Section 2 (8:00-12:30)\n   - Core concept #2 about ${topic}\n   - Step-by-step walkthrough\n   - Potential challenges and solutions\n\n5. Main Content Section 3 (12:30-17:00)\n   - Core concept #3 about ${topic}\n   - Advanced techniques or strategies\n   - Real-world applications\n\n6. Resources & Tools (17:00-19:00)\n   - Recommended resources for learning more about ${topic}\n   - Useful tools or services related to ${topic}\n   - Your personal recommendations\n\n7. Conclusion (19:00-20:00)\n   - Recap of key points about ${topic}\n   - Call to action (subscribe, comment, etc.)\n   - Teaser for related future content`;

      default:
        return `I'm here to help with your ${topic} video${audienceStr}! What specific aspect would you like assistance with?`;
    }
  };

  const handleCopyContent = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);

    toast({
      title: "Content copied",
      description: "The message has been copied to your clipboard.",
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          AI Content Assistant
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Generate Suggestions</CardTitle>
            <CardDescription>
              Get AI-powered content suggestions for your videos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Suggestion Type</label>
              <Select
                value={selectedSuggestion}
                onValueChange={(value) =>
                  setSelectedSuggestion(value as SuggestionType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Video Title</SelectItem>
                  <SelectItem value="description">Video Description</SelectItem>
                  <SelectItem value="tags">Video Tags</SelectItem>
                  <SelectItem value="thumbnail">Thumbnail Ideas</SelectItem>
                  <SelectItem value="script">Video Script/Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Video Topic</label>
              <Input
                placeholder="e.g., YouTube growth strategies"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Target Audience (Optional)
              </label>
              <Input
                placeholder="e.g., beginners, marketers, gamers"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateSuggestion}
              disabled={!videoTopic}
              className="w-full gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate{" "}
              {selectedSuggestion.charAt(0).toUpperCase() +
                selectedSuggestion.slice(1)}{" "}
              Suggestions
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
            <CardDescription>
              Ask questions and get help with your YouTube content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto border rounded-md p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "assistant" ? "items-start" : "items-start justify-end"}`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm">
                      {message.content}
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            handleCopyContent(message.id, message.content)
                          }
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Ask a question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                disabled={!inputMessage.trim() || isTyping}
                onClick={handleSendMessage}
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Suggestions</CardTitle>
          <CardDescription>
            Your recently generated content suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages
              .filter(
                (msg) =>
                  (msg.role === "assistant" &&
                    msg.content.includes("suggestions")) ||
                  msg.content.includes("template"),
              )
              .slice(-3)
              .map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      {suggestion.content.includes("title")
                        ? "Title Suggestions"
                        : suggestion.content.includes("description")
                          ? "Description Template"
                          : suggestion.content.includes("tags")
                            ? "Tag Suggestions"
                            : suggestion.content.includes("thumbnail")
                              ? "Thumbnail Ideas"
                              : "Script Outline"}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                      onClick={() =>
                        handleCopyContent(suggestion.id, suggestion.content)
                      }
                    >
                      {copiedId === suggestion.id ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-3">
                    {suggestion.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Generated on{" "}
                    {suggestion.timestamp.toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}

            {messages.filter(
              (msg) =>
                (msg.role === "assistant" &&
                  msg.content.includes("suggestions")) ||
                msg.content.includes("template"),
            ).length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  No suggestions generated yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use the form on the left to generate content suggestions
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

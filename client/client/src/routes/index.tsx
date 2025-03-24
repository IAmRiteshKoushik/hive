import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  LineChart,
  TrendingUp,
  Youtube,
  Users,
  Clock,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">Hive</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary">
              Demo
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium hover:text-primary">
              Log in
            </a>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your YouTube Channel's Full Potential
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Advanced analytics and insights to grow your audience,
                    optimize content, and increase revenue.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5">
                    Start Free Trial
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-background shadow-xl">
                  <img
                    src="/dashboard.jpeg?height=720&width=1280"
                    width={1280}
                    height={720}
                    alt="Dashboard preview"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Grow
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive analytics and tools to
                  help you understand your audience, optimize your content, and
                  grow your channel.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Deep insights into views, watch time, audience demographics,
                    and engagement metrics.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Performance Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor your channel's growth over time with customizable
                    dashboards and reports.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Audience Insights</h3>
                  <p className="text-muted-foreground">
                    Understand who your viewers are, where they come from, and
                    what content they prefer.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LineChart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Revenue Optimization</h3>
                  <p className="text-muted-foreground">
                    Track monetization performance and identify opportunities to
                    increase your earnings.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Publish Timing</h3>
                  <p className="text-muted-foreground">
                    Discover the optimal times to publish your videos for
                    maximum reach and engagement.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Keyword Analysis</h3>
                  <p className="text-muted-foreground">
                    Find the best keywords to improve your video's
                    discoverability and search ranking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="demo" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Dashboard
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get a comprehensive view of your channel's performance with
                  our intuitive dashboard.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-xl border bg-background p-2 shadow-lg">
                <img
                  src="/dashboard.jpeg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Dashboard screenshot"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Channel Overview</h3>
                  <p className="text-muted-foreground">
                    Get a quick snapshot of your channel's performance with key
                    metrics at a glance.
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="overview.jpeg"
                    width={500}
                    height={300}
                    alt="Channel overview"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Video Performance</h3>
                  <p className="text-muted-foreground">
                    Analyze individual video metrics to understand what content
                    resonates with your audience.
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="video-comparison.jpeg"
                    width={500}
                    height={300}
                    alt="Video performance"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Audience Demographics</h3>
                  <p className="text-muted-foreground">
                    Understand your audience's age, gender, location, and
                    viewing habits.
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="overview.jpeg"
                    width={500}
                    height={300}
                    alt="Audience demographics"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your channel size and needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">
                    Perfect for new creators just getting started.
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Up to 5 videos tracked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Weekly performance reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm ring-2 ring-primary">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <div className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                      Popular
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    For growing channels looking to scale.
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Up to 50 videos tracked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Daily performance reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Priority email support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">
                    For established creators and media companies.
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Custom analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Unlimited videos tracked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Real-time performance reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Advanced competitor analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>API access</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Contact Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trusted by Creators
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what content creators are saying about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 fill-primary text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Hive has been a game-changer for my channel. The insights
                    I've gained have helped me double my subscriber count in
                    just 3 months."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://yt3.ggpht.com/HR4ZLbOfutlJ1ThyODpPW-pXNSrG1qmWYXRIAU1TDXrv2B-rAqsw27yP-bPmobxN2IKErmq4gw=s176-c-k-c0x00ffffff-no-rj-mo"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Lovepreet Singh</p>
                      <p className="text-sm text-muted-foreground">
                        Tech Reviewer, 500K subscribers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 fill-primary text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The audience insights feature is incredible. I've been able
                    to tailor my content to exactly what my viewers want, and my
                    engagement rates have skyrocketed."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://yt3.ggpht.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s176-c-k-c0x00ffffff-no-rj-mo"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Mr.Beast</p>
                      <p className="text-sm text-muted-foreground">
                        Multi-Tenant Creator, 1.2M subscribers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 fill-primary text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "As a small business using YouTube for marketing, Hive has
                    given us the data we need to optimize our content strategy
                    and drive more conversions."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://yt3.ggpht.com/nZRsCgyfOVFhBzY-YFV8AhdMcYAybNZ8uttjcsrUGOnGRSVF5yKqRh6XHIs_o03TcbixvlOZ=s176-c-k-c0x00ffffff-no-rj-mo"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Dude Perfect</p>
                      <p className="text-sm text-muted-foreground">
                        Trickshot Creators, 250K subscribers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Grow Your Channel?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of creators who are using Hive to understand
                    their audience, optimize their content, and grow their
                    channels.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5">
                    Start Free Trial
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Growth chart"
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Youtube className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold">Hive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced analytics for YouTube creators and businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Demo
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Guides
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hive. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

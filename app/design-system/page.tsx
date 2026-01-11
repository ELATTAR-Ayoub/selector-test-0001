import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Design System</h1>
              <p className="text-muted-foreground text-lg">
                Complete component and style showcase for executive review
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Typography</h2>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Font Family: Public Sans (Primary)</p>
                <p className="font-sans text-2xl">The quick brown fox jumps over the lazy dog</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Font Family: Geist Mono (Monospace)</p>
                <p className="font-mono text-lg">const greeting = "Hello World";</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <h3 className="text-2xl font-medium">Heading 3</h3>
                <h4 className="text-xl">Heading 4</h4>
                <p className="text-base">Body Text - Base</p>
                <p className="text-sm">Body Text - Small</p>
                <p className="text-xs">Body Text - Extra Small</p>
              </div>
              <div className="space-y-2">
                <p className="font-normal">Normal Weight</p>
                <p className="font-medium">Medium Weight</p>
                <p className="font-semibold">Semibold Weight</p>
                <p className="font-bold">Bold Weight</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Color Palette</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primary Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Primary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-primary border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground">Main brand color</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-primary-foreground border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Primary Foreground</p>
                    <p className="text-xs text-muted-foreground">Text on primary</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Secondary Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Secondary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-secondary border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Secondary</p>
                    <p className="text-xs text-muted-foreground">Secondary color</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-secondary-foreground border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Secondary Foreground</p>
                    <p className="text-xs text-muted-foreground">Text on secondary</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Muted Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Muted</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-muted border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Muted</p>
                    <p className="text-xs text-muted-foreground">Subtle background</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-muted-foreground border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Muted Foreground</p>
                    <p className="text-xs text-muted-foreground">Subtle text</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Accent Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Accent</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-accent border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Accent</p>
                    <p className="text-xs text-muted-foreground">Accent color</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-accent-foreground border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Accent Foreground</p>
                    <p className="text-xs text-muted-foreground">Text on accent</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Destructive Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Destructive</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-destructive border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Destructive</p>
                    <p className="text-xs text-muted-foreground">Error/danger</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Background Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Background</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-background border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Background</p>
                    <p className="text-xs text-muted-foreground">Page background</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-foreground border-2 border-border"></div>
                  <div>
                    <p className="font-medium">Foreground</p>
                    <p className="text-xs text-muted-foreground">Main text</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Chart Colors */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Chart Colors</h3>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-lg border-2 border-border`}
                    style={{ backgroundColor: `var(--chart-${num})` }}
                  ></div>
                  <span className="text-sm font-medium">Chart {num}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Buttons</h2>

          <Card className="p-6 space-y-6">
            {/* Button Variants */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <Separator />

            {/* Button Sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Sizes</h3>
              <div className="flex flex-wrap items-end gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <Separator />

            {/* Button States */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Badges</h2>

          <Card className="p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Form Elements Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Form Elements</h2>

          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Enter password" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Disabled" disabled />
              </div>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Simple Card</h3>
              <p className="text-muted-foreground">
                This is a basic card component with padding and border radius.
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Card with Badge</h3>
              <Badge variant="secondary">New</Badge>
              <p className="text-muted-foreground">
                Cards can contain various components like badges.
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Card with Button</h3>
              <p className="text-muted-foreground">
                Cards can also include interactive elements.
              </p>
              <Button size="sm" variant="outline">Learn More</Button>
            </Card>
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Border Radius</h2>

          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-sm"></div>
                <p className="text-sm font-medium">Small</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-md"></div>
                <p className="text-sm font-medium">Medium</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-lg"></div>
                <p className="text-sm font-medium">Large</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-xl"></div>
                <p className="text-sm font-medium">Extra Large</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-2xl"></div>
                <p className="text-sm font-medium">2XL</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-3xl"></div>
                <p className="text-sm font-medium">3XL</p>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-20 bg-primary rounded-full"></div>
                <p className="text-sm font-medium">Full</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Spacing Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Spacing Scale</h2>

          <Card className="p-6 space-y-4">
            {[1, 2, 3, 4, 6, 8, 12, 16, 24].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <div className={`h-8 bg-primary`} style={{ width: `${size * 4}px` }}></div>
                <span className="text-sm font-medium w-16">{size} ({size * 4}px)</span>
              </div>
            ))}
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <p className="text-muted-foreground text-sm">
            Design System v1.0 - Built with shadcn/ui & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

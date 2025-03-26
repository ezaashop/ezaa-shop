import { ChevronDown, Flame } from "lucide-react";
import Container from "./container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories: string[] = [
  "Accessories",
  "Smartphone",
  "Computer",
  "Gaming Equipments",
  "TV & Monitors",
  "Wearables",
  "Smart Home",
  "Audio",
  "Cameras",
  "Drones",
  "Printers",
  "More...",
];

const CategoryNav = () => {
  return (
    <div className="bg-white border-b">
      <Container className="py-3">
        <ScrollArea className="w-full whitespace-nowrap pb-1">
          <div className="flex items-center gap-6 text-sm font-medium">
            {/* All Categories */}
            <div className="flex items-center gap-1 text-foreground font-semibold shrink-0 cursor-pointer">
              All Categories
              <ChevronDown size={16} className="text-signature" />
            </div>

            {/* Dynamic Categories */}
            {categories.map((category) => (
              <div
                key={category}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
              >
                {category}
              </div>
            ))}

            {/* Flash Sale */}
            <div className="flex items-center gap-1 text-signature font-semibold ml-auto shrink-0 cursor-pointer">
              <Flame size={16} className="text-black" />
              <span>Flash Sale</span>
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="h-1" />
        </ScrollArea>
      </Container>
    </div>
  );
};

export default CategoryNav;

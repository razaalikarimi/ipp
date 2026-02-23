import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const categories = [
  'Environmental Science',
  'Pharmaceutical Sciences',
  'Education Technology',
  'Neuroscience',
  'Urban Planning',
  'Supply Chain Management',
  'Computer Science',
  'Medical Research',
  'Engineering',
  'Social Sciences',
];

export function FilterPanel({ open, onClose, selectedCategories, onCategoryChange }: FilterPanelProps) {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  const handleSelectAll = () => {
    onCategoryChange(categories);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Articles</SheetTitle>
          <SheetDescription>
            Filter articles by category and other criteria
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Categories</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  All
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Publication Date</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last 30 days
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last 6 months
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last year
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                All time
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button className="w-full" onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

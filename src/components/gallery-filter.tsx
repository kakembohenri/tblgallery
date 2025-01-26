import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";

interface GalleryFiltersProps {
  options: any;
  onFilterChange: (key: string, value: string) => void;
  selectedFilters: Record<string, string>;
}

export function GalleryFilters({
  options,
  onFilterChange,
  selectedFilters,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Select
        value={selectedFilters.season}
        onValueChange={(value) => onFilterChange("season", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Season" />
        </SelectTrigger>
        <SelectContent>
          {options.seasons.map((season: any) => (
            <SelectItem key={season} value={season}>
              {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedFilters.matchDay}
        onValueChange={(value) => onFilterChange("matchDay", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Match Day" />
        </SelectTrigger>
        <SelectContent>
          {options.matchDays.map((matchDay: any) => (
            <SelectItem key={matchDay} value={matchDay}>
              {matchDay}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedFilters.category}
        onValueChange={(value) => onFilterChange("category", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {options.categories.map((category: any) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

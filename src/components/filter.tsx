import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";

import { FilterProps } from "../types/gallery";
import { Button } from "./shadcn/button";

export function Filter({
  categories,
  onCategoryChange,
  selectedCategory,
  selectedSeason,
  setSelectedSeason,
  seasons,
  matchdays,
  selectedMatchday,
  setSelectedMatchday,
}: FilterProps) {
  const resetSelects = () => {
    setSelectedSeason("");
    setSelectedMatchday("");
  };

  return (
    <div className="flex md:flex-row lg:flex-row sm:flex-col xs:flex-col gap-3 w-full max-w-xs mx-auto mb-8 justify-center">
      <div>
        <Select
          value={selectedSeason}
          onValueChange={setSelectedSeason}
          disabled={!Boolean(seasons)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            {Boolean(seasons?.result) !== false &&
              seasons.result.map((season: any) => (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              ))}
            {/* <SelectItem value="TBL8">TBL8</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <Select
        value={selectedMatchday}
        onValueChange={setSelectedMatchday}
        disabled={!Boolean(matchdays)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select matchday" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="all">All</SelectItem> */}
          {Boolean(matchdays?.result) !== false &&
            matchdays.result.map((matchday: any) => (
              <SelectItem key={matchday.id} value={matchday.id}>
                {matchday.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCategory}
        onValueChange={onCategoryChange}
        disabled={!Boolean(categories)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="all">Category</SelectItem> */}
          {Boolean(categories?.result) !== false &&
            categories.result.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button onClick={resetSelects}>Reset</Button>
    </div>
  );
}

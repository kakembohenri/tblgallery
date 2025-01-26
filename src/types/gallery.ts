export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  name: string;
}

export interface FilterProps {
  categories: any;
  onCategoryChange: (category: string) => void;
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  selectedCategory: string;
  seasons: any;
  matchdays: any;
  selectedMatchday: string;
  setSelectedMatchday: (matchday: string) => void;
}

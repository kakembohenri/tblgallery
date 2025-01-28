"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { BackgroundPattern } from "../components/background-pattern";
import { Filter } from "../components/filter";
import { ScrollToTop } from "../components/scroll-to-top";
import { Button } from "../components/shadcn/button";
import { Skeleton } from "../components/shadcn/skeleton";
import { Slideshow } from "../components/slideshow";
import { GalleryImage } from "../types/gallery";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedMatchday, setSelectedMatchday] = useState("");
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]); // Images displayed on the page
  const [currentPage, setCurrentPage] = useState<number>(0); // Track current page of images
  const imagesPerPage = 10; // Number of images per page (change as needed)

  const observer = useRef<IntersectionObserver | null>(null);

  const { data: seasons } = useSWR("/api/seasons", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 86400000,
  });
  const { data: matchdays } = useSWR(
    selectedSeason === "" ? null : `/api/matchdays?season=${selectedSeason}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000,
    }
  );
  const { data: categories } = useSWR(
    selectedMatchday === ""
      ? null
      : `/api/categories?folderId=${selectedMatchday}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000,
    }
  );

  const { data: requestedImages } = useSWR(
    selectedCategory === "" ? null : `/api/media?folderId=${selectedCategory}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000,
    }
  );

  const { data: initialImages } = useSWR("/api/intialstate", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 86400000,
  });

  const images = requestedImages
    ? requestedImages.result
    : initialImages
    ? initialImages.result
    : [];

  useEffect(() => {
    if (images.length > 0) {
      setDisplayedImages([]);
      setCurrentPage(0);
      loadMoreImages();
    }
  }, [images]);

  const loadMoreImages = () => {
    // Ensure we are not trying to load more images when the pool is empty
    if (images.length <= currentPage * imagesPerPage) return;

    // Get the next set of images to display
    const nextImages = images.slice(
      currentPage * imagesPerPage,
      (currentPage + 1) * imagesPerPage
    );

    // Add them to the displayedImages state
    setDisplayedImages((prevImages) => [...prevImages, ...nextImages]);

    // Increment the current page to load the next set on the next call
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreImages();
        }
      });

      if (node) observer.current.observe(node);
    },
    [currentPage] // Rerun observer on loading or page change
  );

  console.log("displayedImages:", displayedImages);

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4 relative">
      <BackgroundPattern />
      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          TBL Photo Gallery
        </h1>

        <div className="flex flex-col items-center mb-8">
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            seasons={seasons}
            matchdays={matchdays}
            selectedMatchday={selectedMatchday}
            setSelectedMatchday={setSelectedMatchday}
          />
          <Button
            variant="outline"
            onClick={() => setShowSlideshow(true)}
            className="mt-4"
            // disabled={!Boolean(images?.result)}
            disabled={displayedImages.length === 0}
          >
            View as Slideshow
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {displayedImages.length === 0
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any) => (
                <Skeleton
                  key={item}
                  className="w-full aspect-video object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                />
              ))
            : // : images?.result.map((image: any, index:number) => (
              displayedImages.map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative group"
                  ref={
                    index === displayedImages.length - 1 ? lastItemRef : null
                  }
                >
                  <Image
                    // src={image.url || "/placeholder.svg"}
                    src={`https://drive.google.com/thumbnail?id=${image?.id}&sz=w1000`}
                    loading="lazy"
                    // alt={image.title}
                    width={50}
                    height={50}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, (max-height: 768px) 100vh, (max-height: 1200px) 50vh, 33vh"
                    // fill={true}
                    alt={image?.name}
                    className="w-full object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                  />

                  {/* <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <p className="text-white text-lg font-medium">
                      {image?.name}
                    </p>
                  </div> */}
                </div>
              ))}
        </div>

        {/* {showSlideshow && Boolean(images) && ( */}
        {showSlideshow && displayedImages.length > 0 && (
          <Slideshow
            // images={images?.result}
            images={displayedImages}
            onClose={() => setShowSlideshow(false)}
          />
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}

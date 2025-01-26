"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react";
import { Button } from "./shadcn/button";
import type { GalleryImage } from "../types/gallery";
import Image from "next/image";

interface SlideshowProps {
  images: GalleryImage[];
  onClose: () => void;
}

export function Slideshow({ images, onClose }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full mx-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        {/* <img
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].title}
          className="w-full h-[60vh] object-contain"
        /> */}
        <Image
          // src={image.url || "/placeholder.svg"}
          src={`https://drive.google.com/thumbnail?id=${images[currentIndex]?.id}&sz=w1000`}
          // alt={image.title}
          width={50}
          height={50}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, (max-height: 768px) 100vh, (max-height: 1200px) 50vh, 33vh"
          alt={images[currentIndex]?.name}
          className="w-full object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % images.length)
            }
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

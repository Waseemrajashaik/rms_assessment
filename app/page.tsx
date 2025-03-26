"use client";
import { MenuBar } from "@/components/MenuBar";
import { SectionOne } from "@/components/SectionOne";
import { SectionTwo } from "@/components/SectionTwo";
import { useEarthquakes } from "@/hooks/useEarthquakes";

export default function Home() {
  const { error, isLoading } = useEarthquakes();
  return (
    <main className="h-screen bg-gray-50 flex flex-col">
      <MenuBar />
      <div className="flex-1 container mx-auto px-4 py-2 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          <SectionOne error={error} isLoading={isLoading} />
          <SectionTwo error={error} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}

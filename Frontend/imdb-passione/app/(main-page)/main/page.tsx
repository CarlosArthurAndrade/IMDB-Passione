'use client';

import MoviesList from "@/components/pages/(main-page)/moviesList";
import Profile from "@/components/pages/(main-page)/profile";
import SeriesList from "@/components/pages/(main-page)/seriesList";
import DarkBackground from "@/components/utils/darkBackground";
import SwipeTabs from "@/components/utils/swipeTabs";

export default function MainPage() {
  return (
    <div className="h-screen w-screen text-white">
      <DarkBackground />
        <SwipeTabs screens={[<MoviesList key="filmes"/>, <SeriesList key="series" />, <Profile key="perfil" />]} />
    </div>
  );
}
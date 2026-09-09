'use client';

import DarkBackground from "@/components/utils/darkBackground";
import SwipeTabs from "@/components/utils/swipeTabs";
import MoviesList from "@/components/pages/(main-page)/moviesList";
import SeriesList from "@/components/pages/(main-page)/seriesList";
import Profile from "@/components/pages/(main-page)/perfil";

export default function MainPage() {
  return (
    <div className="h-screen w-screen bg-main text-white">
        <DarkBackground />
        <SwipeTabs screens={[<MoviesList key="filmes" />, <SeriesList key="series" />, <Profile key="perfil" />]} />
    </div>
  );
}
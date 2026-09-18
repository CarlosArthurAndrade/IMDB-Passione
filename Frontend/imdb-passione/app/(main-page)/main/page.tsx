'use client';
import MoviesList from "@/components/pages/(main-page)/moviesList";
import Profile from "@/components/pages/(main-page)/profile";
import SeriesList from "@/components/pages/(main-page)/seriesList";
import DarkBackground from "@/components/utils/darkBackground";
import { SunsetBackground } from "@/components/utils/lightBackground";
import SwipeTabs from "@/components/utils/swipeTabs";
import MoviePageService from "@/services/(main-page)/moviePageService";

export default function MainPage() {
  const { filteredMovies, searchCard } = MoviePageService()
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <DarkBackground />
      <SunsetBackground />
        <SwipeTabs screens={[
          <MoviesList key="filmes" movies={filteredMovies} placeholder="Digite o nome do filme" searchCard={searchCard}/>, 
          <SeriesList key="series" />, 
          <Profile key="perfil" />
          ]} 
        />
    </div>
  );
}
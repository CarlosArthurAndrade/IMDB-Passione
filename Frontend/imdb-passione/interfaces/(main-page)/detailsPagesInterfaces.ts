import { Movie, Review, Serie } from "./mainPageInterfaces"

export interface MovieDetailsPageProps { 
    movie: Movie, 
    reviews: Review[] ,
    isOpenCreate: boolean,
    isOpenDelete: boolean,
    isOpenEdit: boolean,
    setOpenCreate: (boolean: boolean) => void,
    setOpenEdit: (boolean: boolean) => void,
    setOpenDelete: (boolean: boolean) => void,
    onCloseCreate: () => void,
    onConfirmCreate: (text: string, rating: number) => void
    onCloseEdit: () => void,
    onConfirmEdit: (text: string, rating: number) => void
    onCloseDelete: () => void,
    onConfirmDelete: () => void,
    initialReview: string,
    initialRating: number,
    setInitialReview: (text: string) =>  void,
    setInitialRating: (rating: number) => void,
    setSelectedReviewId: (reviewId: string) => void
}

export interface SerieDetailsPageProps { 
    serie: Serie, 
    reviews: Review[] ,
    isOpenCreate: boolean,
    isOpenDelete: boolean,
    isOpenEdit: boolean,
    setOpenCreate: (boolean: boolean) => void,
    setOpenEdit: (boolean: boolean) => void,
    setOpenDelete: (boolean: boolean) => void,
    onCloseCreate: () => void,
    onConfirmCreate: (text: string, rating: number) => void
    onCloseEdit: () => void,
    onConfirmEdit: (text: string, rating: number) => void
    onCloseDelete: () => void,
    onConfirmDelete: () => void,
    initialReview: string,
    initialRating: number,
    setInitialReview: (text: string) =>  void,
    setInitialRating: (rating: number) => void,
    setSelectedReviewId: (reviewId: string) => void
}
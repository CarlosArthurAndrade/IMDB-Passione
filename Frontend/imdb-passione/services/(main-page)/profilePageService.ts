import { Review, User } from "@/interfaces/(main-page)/mainPageInterfaces";
import { useEffect, useState } from "react";
import { getData } from "../utils/httpRequests/httpRequests";
import { useRouter } from "next/navigation";

export default function ProfilePageService() {
    const [userData, setUserData] = useState<User>()
    const [userReviews, setUserReviews] = useState<Review[]>([])

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('userId')

        async function GetUserData() {
            const user = await getData<User>('https://imdb-passione-backend.vercel.app/user/get-user', token!)
            if (user?.message === 'Token inválido' || user?.message === 'Não autenticado') {
                return router.push('/')
            }
            const reviews = await getData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/user-reviews', token!)

            setUserData(user?.data)
            setUserReviews(reviews?.data? reviews.data : [])
        }

        GetUserData()
    }, [])

    return { userData, userReviews }
}
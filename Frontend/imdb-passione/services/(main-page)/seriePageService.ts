import { useEffect, useMemo, useState } from "react";
import { getData } from "../utils/httpRequests/httpRequests";
import { Serie } from "@/interfaces/(main-page)/mainPageInterfaces";
import { useRouter } from "next/navigation";

export default function SeriesPageService() {
    const [series, setSeries] = useState<Serie[]>([])
    const [search, setSearch] = useState("")

    const router = useRouter()

    const filteredSeries = useMemo(() => {
        return series.filter((serie) => {
            const matchesSearch =
                serie.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

            return matchesSearch
        })
    }, [series, search])


    const seriesSearchCard = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('userId')
        const series = async () => {
            const response = await getData<Serie[]>('https://imdb-passione-backend.vercel.app/series/list', token!)
            if (response?.message === 'Token inválido') {
                return router.push('/')
            } 
            setSeries(response?.data ? response.data : [])
        }

        series()
    }, [])

    return({ filteredSeries, seriesSearchCard })
}
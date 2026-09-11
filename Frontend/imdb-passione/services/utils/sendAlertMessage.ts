import { SendAlertMessagePropTypes } from "@/interfaces/utils/sendAlertMessageProps"

export default function sendAlertMessage({ message, color, setShowAlert}: SendAlertMessagePropTypes) {
    return new Promise<void>((resolve, _reject) => {
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)
            resolve()
        }, 3000)
        })

}
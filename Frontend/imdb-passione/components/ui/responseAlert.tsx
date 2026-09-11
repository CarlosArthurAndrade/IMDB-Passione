import { TiWarning } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function ReponseAlert({ message, color }: { message: string, color: string }) {
    return(
        <AnimatePresence>
            <motion.div 
                className={`absolute bottom-5 lg:bottom-10 right-11 lg:right-20 px-2 lg:px-4 py-3 lg:py-6 w-3/4 md:w-1/3 lg:w-1/4 rounded-md ${ color == 'green' ? 'bg-green-alert' : 'bg-red-alert'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
                <div className={`absolute left-0 top-0 h-1 w-full animate-[timer_3s_linear_forwards] ${ color == 'green' ? 'bg-green-bar' : 'bg-red-bar'}`} />
                <div className="flex space-x-4 items-center">
                    <div>
                        {color === 'green' ? <FaCheckCircle size={15}/> : <TiWarning size={20}/> }
                    </div>
                    <p className="text-xs md:text-ls">{message}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
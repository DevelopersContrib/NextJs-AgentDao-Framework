import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
export default function LoadingState() {
    return (
        <>
            <div className="col-xl-12 tw-flex tw-items-center tw-justify-center tw-min-h-[350px] text-secondary tw-flex-col">
                <FontAwesomeIcon icon={faCircleNotch} className='tw-text-3xl' spin />
                <span className='tw-mt-3 tw-text-xs'>Loading...</span>
            </div>
        </>
    )
}

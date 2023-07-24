import { icons } from "../assets";
function LoadingSpinner() {
  return (
    <>
    <div className='text-center mt-3'>
        <img src={icons.loadingSpinner} height={30} alt="Loading..." />
    </div>
    </>
  );
}
export default LoadingSpinner;
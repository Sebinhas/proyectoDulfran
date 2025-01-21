// import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
// import img from '../../assets/images/heroLanding.png';
// import img2 from '../../assets/images/productsLanding.png';
// import img3 from '../../assets/images/aboutLanding.png';
import { IoShieldCheckmarkOutline, IoStar, IoArrowUpCircleOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import { useHome } from './useHome';
import { ProductPopup } from './components/ProductPopup/ProductPopup';

const Home = () => {
  // const { getItem } = useLocalStorage();
  // const userData = getItem("userData");
  const navigate = useNavigate();

  const {
  } = useHome();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1>Home</h1>
    </div>
  );
};

export default Home;

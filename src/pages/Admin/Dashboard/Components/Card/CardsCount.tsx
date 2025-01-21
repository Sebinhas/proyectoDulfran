import { useCardCount } from './useCardCount';

const CardsCount = () => {
  const data = useCardCount();

  return (
    <div className="w-full flex flex-row gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="w-full rounded-lg flex flex-row items-center gap-3 px-4 py-10 bg-gray-600">
          <div className='w-15 h-15 flex items-center rounded-full p-7 bg-slate-300'>
            
          </div>

          <div className='w-full flex flex-col items-start leading-6 text-white'>
            <span className='text-[28px]'>{item.value}</span>
            <h1 className='text-[17px]'>{item.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsCount;

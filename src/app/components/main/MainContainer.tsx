import Link from 'next/link';

const MainContainer = () => {
  return (
    <Link className="px-4 py-3 flex bg-white rounded-2xl" href={'/login'}>
      Z를 사용해봐여
    </Link>
  );
};

export default MainContainer;

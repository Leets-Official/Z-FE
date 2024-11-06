import WelcomeSignup from '@/app/components/auth/WelcomeSignup';

const welcome = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-black">
      <WelcomeSignup nickname={'일단하드코딩'} />
    </div>
  );
};
export default welcome;

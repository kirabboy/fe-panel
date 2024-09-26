import AuthForm from '../../../components/AuthForm';
import api from '../../../utils/axiosConfig';
api;
const Login = () => {
  return (
    <main className=' mx-auto flex min-h-screen sm:flex-col md:flex-row  items-center justify-between min-w-screen bg-[#eee7e7]'>
      <div className='hidden md:block sm:w-full lg:w-2/3 min-h-screen'>
        <div className='min-h-screen flex items-center justify-center relative '>
          <img
            src={'/images/banner.svg'}
            alt='banner-okvip'
            width={870}
            height={670}
          />
          <div className='absolute top-10 left-1/2 -translate-x-1/2'>
            <img
              src={'/images/logo.jpg'}
              alt='logo-okvip'
              width={200}
              height={70}
            />
          </div>
        </div>
      </div>

      <div className='min-h-screen w-full lg:w-1/3 bg-gradient-to-t from-[#ffefdd] to-white px-4 xl:px-10 flex justify-center items-center flex-col'>
        <h2 className='text-2xl lg:text-3xl font-medium mb-8 text-center'>
          Chào mừng đến với <span className='text-primary'>OKVIP</span>! 👋
        </h2>
        <AuthForm />
      </div>
    </main>
  );
};

export default Login;

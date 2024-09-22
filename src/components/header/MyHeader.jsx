import Avatar from './Avatar';
import Navbar from './Navbar';

const MyHeader = () => {
  return (
    <section className='flex flex-col items-center justify-between bg-[#353D44] h-screen py-[12px] min-h-[100vh]'>
      <div className='w-[200px]'>
        <div className=''>
          <img
            className='w-full'
            src='/images/logo.jpg'
            alt='logo'
          />
        </div>

        <Navbar />
      </div>

      <Avatar />
    </section>
  );
};

export default MyHeader;

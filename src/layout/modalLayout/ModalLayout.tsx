interface ModalLayoutProps {
  children: React.ReactNode
}

const ModalLayout = ({ children }:ModalLayoutProps) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-pattern bg-cover'>
       <div className='md:h-[85%] h-[95%] w-[95%] lg:w-[85%] xl:w-[75%] bg-background rounded-2xl overflow-y-auto scrollbar-hide'>
          {children}
       </div>
    </div>
  )
};

export default ModalLayout

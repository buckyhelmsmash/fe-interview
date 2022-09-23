const Wrapper = ({title, children}) => {
    return (
        <div className={"p-[5%] min-h-screen bg-[#fffae6] "}>
            <div className={" bg-white relative drop-shadow-sm"}>
                <div className={"rounded-2xl bg-[#fffae6] p-5 text-[#ff8f0a] font-bold text-lg w-3/6 text-center absolute -top-8 left-[25%]"}>
                    {title}
                </div>
                <div className={"w-full px-[5%] py-[8%]"}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Wrapper

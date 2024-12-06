const WMTitle = ({ title, data }) => {
  
  const category = data.find((item) => item[title]);
  const categoryCount = category ? category[title].length : 0;

  return (
    <div>
      <div className="flex justify-between font-bold text-3xl bg-[#c9c7f8cc] border-b-2 border-white shadow-sm w-full py-3 px-5 uppercase rounded kobita">
        <h2 className="text-[#003653] ">{title}</h2>
        <p className="text-[#d4ebf8]">{categoryCount}</p>
      </div>
    </div>
  );
};

export default WMTitle;

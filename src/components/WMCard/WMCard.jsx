const WMCard = ({ word, meaning }) => {
  return (
    <div className="">
      <p className="border-b-2 border-[#F2F2F2] py-3 px-5 kobita whitespace-pre-line">
        <span className="font-bold text-base text-[#003653] uppercase">
          {word} -
        </span>{" "}
        {meaning.replace(/\b\w/g, (i) => i.toUpperCase())}
      </p>
    </div>
  );
};

export default WMCard;

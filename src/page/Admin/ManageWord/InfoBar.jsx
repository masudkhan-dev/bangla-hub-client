import Clock from "@/components/Clock/Clock";

export default function InfoBar({ totalWords }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-base font-semibold kobita">
        Total Words: {totalWords}
      </p>
      <p className="text-base font-bold text-[#3333333b] kobita">
        {currentDate}
      </p>
      <Clock />
    </div>
  );
}

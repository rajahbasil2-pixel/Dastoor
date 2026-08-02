export default function AnnouncementBar() {
  const messages = [
    "Free delivery on orders above Rs. 3,000",
    "Cash on delivery available nationwide",
    "New arrivals every weekend — shop the latest",
    "Premium quality gents wear — Dastoor",
  ];
  const repeated = [...messages, ...messages];

  return (
    <div className="bg-[#0A0A0A] text-[#FAFAFA] py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((msg, i) => (
          <span key={i} className="text-xs tracking-widest uppercase mx-12 font-light">
            {msg}
            <span className="mx-12 text-[#C8A96E]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const SAMPLE_REVIEWS = [
  {
    name: "Nguyễn Thị Hương",
    rating: 5,
    content: "Tour Tân Cương tuyệt vời! Hướng dẫn viên rất am hiểu, dẫn đi những điểm chụp ảnh đẹp nhất. Ẩm thực địa phương ngon không thể tả!",
    tourTitle: "Tân Cương – Miền Tây Hoang Dã",
  },
  {
    name: "Trần Văn Minh",
    rating: 5,
    content: "Đoàn nhỏ nên được chăm sóc rất kỹ. Lịch trình hợp lý, không quá vội, có thời gian khám phá tự do. Sẽ đi tiếp tour Cáp Nhĩ Tân!",
    tourTitle: "Bắc Kinh – Cố Đô Ngàn Năm",
  },
  {
    name: "Lê Thu Trang",
    rating: 5,
    content: "Linh Đình Travel không chỉ là tour guide mà còn như người bạn đồng hành. Những bức ảnh mình chụp về được ai cũng khen!",
    tourTitle: "Thượng Hải – Thành phố không ngủ",
  },
];

export default function ReviewsSection() {
  const t = useTranslations("reviews");

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-brand-brown/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3 text-white">{t("title")}</h2>
        <div className="w-16 h-1 bg-brand-rust rounded-full mx-auto mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_REVIEWS.map((review, i) => (
            <div key={i} className="bg-brand-cream rounded-2xl p-6 relative">
              <div className="text-5xl text-brand-teal/20 font-display font-bold absolute top-4 right-6">"</div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-brand-brown text-sm leading-relaxed mb-4 italic">{review.content}</p>
              <div className="border-t border-brand-cream-dark pt-4">
                <p className="font-semibold text-brand-brown text-sm">{review.name}</p>
                <p className="text-brand-teal text-xs mt-0.5">{review.tourTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

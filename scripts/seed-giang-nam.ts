import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Thiếu MONGODB_URI trong .env.local");

const TourSchema = new mongoose.Schema({
  slug: String, title: Object, description: Object,
  destination: String, duration: Number, departures: Array,
  price: Number, currency: String, coverImage: String, images: Array,
  itinerary: Array, highlights: Array, includes: Array, excludes: Array,
  category: String, featured: Boolean, published: Boolean,
}, { timestamps: true });

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

const tour = {
  slug: "san-mua-thu-giang-nam-2025",
  title: {
    vi: "Săn Mùa Thu Giang Nam",
    en: "Autumn Foliage — Jiangnan Region",
    zh: "江南秋色之旅",
  },
  description: {
    vi: "Hành trình 10 ngày khám phá vẻ đẹp mùa thu rực rỡ tại vùng Giang Nam — Nam Kinh lá vàng, Cảnh Đức Trấn gốm sứ, Thiệu Hưng đèn lồng đỏ, Hàng Châu Tây Hồ thơ mộng và Thượng Hải phồn hoa. Đây là chuyến đi dành riêng cho những tâm hồn yêu nhiếp ảnh và muốn lưu giữ từng khoảnh khắc thu vàng.",
    en: "A 10-day journey through the golden autumn of Jiangnan — from the maple-lined avenues of Nanjing, ceramic villages of Jingdezhen, red lantern persimmons of Shaoxing, misty West Lake in Hangzhou, to the glittering Bund of Shanghai. A trip made for photography lovers.",
    zh: "10天穿越江南金秋——南京枫叶大道、景德镇陶瓷古村、绍兴红灯笼柿子、杭州西湖烟雨、上海外滩霓虹。专为热爱摄影的灵魂而设计的旅程。",
  },
  destination: "Giang Nam, Trung Quốc",
  duration: 10,
  category: "china",
  featured: true,
  published: true,
  price: 0,
  currency: "VND",
  departures: [
    {
      date: "19/11/2025",
      status: "open",
      maxPeople: 15,
      currentBookings: 0,
      registrationCloseDate: "10/11/2025",
    },
  ],
  highlights: [
    "Lá thu vàng Nam Kinh — Lăng Minh Hiếu Lăng, Hồ Yến Tước",
    "Cảnh Đức Trấn — Bảo tàng Lò Ngự, xưởng gốm làng cổ Tam Bảo",
    "Thiệu Hưng — hồng treo đỏ rực, thuyền truyền thống, nhà cũ Lỗ Tấn",
    "Hàng Châu — Tây Hồ, chùa Linh Ẩn, đường Vạn Quyền mùa thu",
    "Thượng Hải — Bến Thượng Hải, Tô giới Pháp, vườn Dự Viên",
  ],
  includes: [
    "Vé máy bay khứ hồi Hà Nội – Thượng Hải",
    "Tàu cao tốc giữa các thành phố",
    "Khách sạn 3-4 sao (phòng đôi/twin)",
    "Hướng dẫn viên tiếng Việt xuyên suốt",
    "Vé vào cửa các điểm tham quan trong lịch trình",
    "Bữa ăn theo lịch trình (sáng tại khách sạn)",
  ],
  excludes: [
    "Visa Trung Quốc (hỗ trợ làm hồ sơ)",
    "Bữa ăn trưa và tối (tự túc để linh hoạt)",
    "Chi phí cá nhân, mua sắm",
    "Bảo hiểm du lịch",
    "Phụ thu phòng đơn",
  ],
  itinerary: [
    {
      day: 1,
      titleVi: "Hà Nội → Thượng Hải → Nam Kinh | Phố Phu Tử Miếu",
      titleEn: "Hanoi → Shanghai → Nanjing | Confucius Temple District",
      titleZh: "河内→上海→南京 | 夫子庙秦淮风光",
      descVi: "Bay từ Hà Nội sang Thượng Hải, bắt tàu cao tốc về Nam Kinh. Buổi tối dạo bộ Phu Tử Miếu — khu phố cổ lung linh đèn lồng bên dòng Tần Hoài.",
      descEn: "Fly from Hanoi to Shanghai, then high-speed train to Nanjing. Evening stroll along Confucius Temple and the lantern-lit Qinhuai River.",
      descZh: "从河内飞上海，转乘高铁前往南京。晚上漫步夫子庙，欣赏秦淮河两岸的灯火倒影。",
    },
    {
      day: 2,
      titleVi: "Nam Kinh | Hồ Yến Tước · Minh Hiếu Lăng · Trung Sơn Lăng",
      titleEn: "Nanjing | Yanque Lake · Ming Xiaoling · Sun Yat-sen Mausoleum",
      titleZh: "南京 | 燕雀湖·明孝陵·中山陵",
      descVi: "Sáng khám phá Hồ Yến Tước giữa rừng lá đỏ. Chiều thăm Minh Hiếu Lăng — con đường thần đạo hàng ngàn cây phong vàng rực. Kết thúc tại Trung Sơn Lăng nhìn xuống Nam Kinh mùa thu.",
      descEn: "Morning at Yanque Lake amid crimson foliage. Afternoon at Ming Xiaoling Mausoleum — the Sacred Way lined with thousands of golden ginkgo trees. End at Sun Yat-sen Mausoleum overlooking autumn Nanjing.",
      descZh: "上午游燕雀湖，红叶如火。下午参观明孝陵神道两侧金黄银杏。傍晚登中山陵俯瞰秋色南京。",
    },
    {
      day: 3,
      titleVi: "Nam Kinh | Chùa Triều Thiên · Biệt thự Dân Quốc phố Di Hòa",
      titleEn: "Nanjing | Chaotian Palace · Republican-era Villas on Yihe Road",
      titleEn2: "",
      titleZh: "南京 | 朝天宫·颐和路民国公馆",
      descVi: "Buổi sáng tham quan Triều Thiên Cung — kiến trúc cổ điển giữa công viên lá thu. Chiều dạo phố Di Hòa — khu biệt thự thời Dân Quốc rêu phong, cây cao che bóng, góc nào cũng là bức ảnh.",
      descEn: "Morning at Chaotian Palace amid autumn foliage. Afternoon on Yihe Road — tree-lined streets of Republican-era mansions, every corner a perfect frame.",
      descZh: "上午游览朝天宫，秋叶掩映古建。下午走进颐和路民国公馆区，梧桐落叶，每一步都是老照片。",
    },
    {
      day: 4,
      titleVi: "Nam Kinh → Cảnh Đức Trấn | Núi Thê Hà · Chợ đêm gốm sứ",
      titleEn: "Nanjing → Jingdezhen | Qixia Mountain · Ceramic Night Market",
      titleZh: "南京→景德镇 | 栖霞山·陶瓷夜市",
      descVi: "Sáng sớm lên núi Thê Hà ngắm lá đỏ đẹp nhất Nam Kinh. Trưa bắt tàu đến Cảnh Đức Trấn — kinh đô gốm sứ nghìn năm. Tối khám phá chợ đêm sáng tạo với hàng trăm gian hàng gốm thủ công.",
      descEn: "Early morning at Qixia Mountain — Nanjing's most spectacular autumn foliage. Noon train to Jingdezhen, the porcelain capital. Evening at the creative ceramic night market.",
      descZh: "清晨登栖霞山赏南京最美红叶。午后乘高铁前往瓷都景德镇。晚上逛陶溪川创意陶瓷夜市。",
    },
    {
      day: 5,
      titleVi: "Cảnh Đức Trấn | Bảo tàng Lò Ngự · Làng cổ Tam Bảo",
      titleEn: "Jingdezhen | Imperial Kiln Museum · Sanbao Ancient Village",
      titleZh: "景德镇 | 御窑博物馆·三宝古村",
      descVi: "Sáng tham quan Bảo tàng Lò Ngự — kiến trúc hiện đại bao quanh lò gốm hoàng gia. Chiều xuống làng cổ Tam Bảo — xưởng gốm ẩn trong rừng tre, thử tự tay nặn một chiếc bát.",
      descEn: "Morning at the Imperial Kiln Museum — contemporary architecture around ancient royal kilns. Afternoon at Sanbao Village — pottery workshops hidden in bamboo groves, try throwing a bowl.",
      descZh: "上午参观御窑博物馆，现代建筑与千年窑火交融。下午走进三宝古村竹林深处的陶艺工坊，亲手拉坯体验。",
    },
    {
      day: 6,
      titleVi: "Cảnh Đức Trấn → Thiệu Hưng | Hồng treo đỏ rực · Nhà cũ Lỗ Tấn · Thuyền Ô Bồng",
      titleEn: "Jingdezhen → Shaoxing | Persimmon Harvest · Lu Xun's Home · Black Awning Boats",
      titleZh: "景德镇→绍兴 | 柿子红·鲁迅故里·乌篷船",
      descVi: "Tàu đến Thiệu Hưng — thành phố cổ đậm chất thủy hương. Đèn lồng đỏ và hồng treo trên những bức tường trắng phản chiếu xuống kênh nước xanh. Thăm cố cư Lỗ Tấn, đi thuyền Ô Bồng dọc kênh rạch.",
      descEn: "Train to Shaoxing — ancient water town draped in red. Red lanterns and hanging persimmons glow against whitewashed walls above jade canals. Visit Lu Xun's former residence; boat ride in a black awning sampan.",
      descZh: "乘车前往绍兴，江南水乡韵味浓郁。红灯笼与橙红柿子点缀白墙黛瓦，倒映碧水。游览鲁迅故里，乘乌篷船穿街走巷。",
    },
    {
      day: 7,
      titleVi: "Thiệu Hưng → Hàng Châu | Tây Hồ buổi chiều tà",
      titleEn: "Shaoxing → Hangzhou | West Lake at Golden Hour",
      titleZh: "绍兴→杭州 | 西湖黄昏",
      descVi: "Buổi sáng tự do thêm tại Thiệu Hưng. Trưa tàu đến Hàng Châu, nhận phòng và dạo bộ quanh Tây Hồ lúc chiều tà — ánh vàng trải trên mặt hồ, lá rụng theo gió.",
      descEn: "Free morning in Shaoxing. Noon train to Hangzhou. Check in and stroll West Lake at golden hour — sunlight on the water, leaves drifting in the breeze.",
      descZh: "上午自由活动。午后乘车前往杭州，入住酒店后漫步西湖，夕阳洒金，落叶随风。",
    },
    {
      day: 8,
      titleVi: "Hàng Châu | Chùa Linh Ẩn · Đường Vạn Quyền · Làng trà",
      titleEn: "Hangzhou | Lingyin Temple · Manjuelong Path · Tea Villages",
      titleZh: "杭州 | 灵隐寺·满觉陇·龙井茶村",
      descVi: "Sáng thăm chùa Linh Ẩn cổ kính giữa rừng thu. Chiều đi đường Vạn Quyền — con đường nổi tiếng mùa thu với hoa quế thơm ngát và lá vàng trải thảm. Ghé làng trà Long Tỉnh uống trà buổi chiều.",
      descEn: "Morning at Lingyin Temple surrounded by autumn forest. Afternoon on Manjuelong path — famous for osmanthus fragrance and golden carpet of fallen leaves. Tea tasting at Longjing tea village.",
      descZh: "上午游灵隐寺，古刹藏秋林。下午走满觉陇，桂花香里落叶铺地。傍晚在龙井茶村品一盏新茶。",
    },
    {
      day: 9,
      titleVi: "Hàng Châu → Thượng Hải | Tô giới Pháp · Bến Thượng Hải",
      titleEn: "Hangzhou → Shanghai | French Concession · The Bund",
      titleZh: "杭州→上海 | 法租界·外滩夜景",
      descVi: "Sáng tàu về Thượng Hải. Chiều khám phá Tô giới Pháp — đường cây bàng, cà phê vintage, shop độc lập. Tối ra Bến Thượng Hải ngắm skyline lung linh hai bờ Hoàng Phố.",
      descEn: "Morning train to Shanghai. Afternoon in the French Concession — plane tree avenues, vintage cafés, independent boutiques. Evening at the Bund for the iconic Huangpu River skyline.",
      descZh: "上午高铁回上海。下午漫步法租界，梧桐道、复古咖啡、独立小店。晚上外滩看黄浦江两岸灯火璀璨。",
    },
    {
      day: 10,
      titleVi: "Thượng Hải | Vườn Dự Viên · Bay về Hà Nội",
      titleEn: "Shanghai | Yuyuan Garden · Return to Hanoi",
      titleZh: "上海 | 豫园·返回河内",
      descVi: "Sáng cuối tham quan Dự Viên — khu vườn cổ điển Minh triều giữa lòng Thượng Hải hiện đại. Mua quà lưu niệm ở chợ Thành Hoàng rồi ra sân bay bay về Hà Nội, mang theo ký ức mùa thu Giang Nam.",
      descEn: "Final morning at Yuyuan Garden — classical Ming dynasty garden in the heart of modern Shanghai. Shopping at the Old City God Temple bazaar before heading to the airport and home.",
      descZh: "上午游览豫园，明代古典园林嵌入现代都市。城隍庙买手信后前往机场，带着江南秋色的记忆飞回河内。",
    },
  ],
};

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const existing = await Tour.findOne({ slug: tour.slug });
  if (existing) {
    await Tour.updateOne({ slug: tour.slug }, tour);
    console.log("✅ Tour updated:", tour.slug);
  } else {
    await Tour.create(tour);
    console.log("✅ Tour created:", tour.slug);
  }

  await mongoose.disconnect();
  console.log("✅ Done!");
}

seed().catch(console.error);

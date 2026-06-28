import mongoose from "mongoose";
import { Tour } from "../src/models/Tour";
import { Review } from "../src/models/Review";
import { Blog } from "../src/models/Blog";

const MONGODB_URI = "mongodb://localhost:27017/linh-dinh-travel";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Clear existing
  await Tour.deleteMany({});
  await Review.deleteMany({});
  await Blog.deleteMany({});
  console.log("🗑  Cleared existing data");

  // Seed Tours
  await Tour.insertMany([
    {
      slug: "thuong-hai-2026",
      title: {
        vi: "Thượng Hải – Thành phố không ngủ",
        en: "Shanghai – The City That Never Sleeps",
        zh: "上海——不夜城",
      },
      description: {
        vi: "Thượng Hải – thành phố hoa lệ nhất Trung Quốc, nơi giao thoa giữa phương Đông cổ kính và phương Tây hiện đại. Hành trình 7 ngày khám phá Phố Đông lung linh, Ngoại Than lịch sử, phố Pháp thơ mộng và những góc chụp ảnh đẹp xuất thần.",
        en: "Shanghai – China's most glamorous city, where ancient East meets modern West. A 7-day journey exploring the glittering Pudong skyline, historic Bund, charming French Concession, and the most photogenic spots.",
        zh: "上海——中国最繁华的城市，东西方文化交汇之地。7天行程探索浦东璀璨夜景、历史悠久的外滩、迷人的法租界和最佳摄影点。",
      },
      destination: "Thượng Hải, Trung Quốc",
      duration: 7,
      departures: [
        { date: "07-13/06/2026", status: "private" },
        { date: "26/11-01/12/2026", status: "open" },
      ],
      coverImage: "/images/shanghai.jpg",
      highlights: [
        "Chụp ảnh Bund về đêm với skyline Phố Đông",
        "Khám phá Thành Hoàng Miếu và chợ cổ D豫园",
        "Dạo phố Pháp – Xintiandi cà phê và nghệ thuật",
        "Trải nghiệm tàu cao tốc Maglev 431km/h",
        "Ẩm thực: Xiaolongbao, Shengjianbao tại những quán lâu đời nhất",
      ],
      includes: [
        "Vé máy bay khứ hồi Hà Nội – Thượng Hải",
        "Khách sạn 4 sao (6 đêm)",
        "Hướng dẫn viên tiếng Việt suốt hành trình",
        "Xe đưa đón sân bay và di chuyển nội địa",
        "Bữa ăn theo lịch trình (12 bữa)",
        "Vé vào cửa các điểm tham quan",
      ],
      excludes: [
        "Chi phí cá nhân và mua sắm",
        "Visa Trung Quốc (hỗ trợ làm hồ sơ)",
        "Tip hướng dẫn viên và tài xế",
        "Bảo hiểm du lịch",
      ],
      itinerary: [
        { day: 1, titleVi: "Hà Nội – Thượng Hải", descVi: "Bay sang Thượng Hải, nhận phòng khách sạn, dạo Bund về đêm ngắm toàn cảnh Phố Đông lung linh." },
        { day: 2, titleVi: "Phố Đông – Tháp Oriental Pearl", descVi: "Tham quan tháp Oriental Pearl, bảo tàng thành phố, trung tâm tài chính Lujiazui. Buổi tối chụp ảnh Bund khi hoàng hôn xuống." },
        { day: 3, titleVi: "Thành Hoàng Miếu – T豫园", descVi: "Khám phá khu phố cổ Thành Hoàng Miếu, vườn D豫园, thưởng thức Xiaolongbao tại quán 100 năm tuổi." },
        { day: 4, titleVi: "Phố Pháp – Xintiandi", descVi: "Dạo phố Pháp đẹp như châu Âu, tham quan Xintiandi, cà phê và chụp ảnh đường phố." },
        { day: 5, titleVi: "Zhujiajiao – Làng nước cổ", descVi: "Tham quan làng nước cổ Chu Gia Giác, chụp ảnh cầu đá, kênh đào và kiến trúc Minh – Thanh." },
        { day: 6, titleVi: "Mua sắm & Tự do", descVi: "Buổi sáng tự do mua sắm tại Nam Kinh Lộ. Buổi tối tiệc chia tay." },
        { day: 7, titleVi: "Thượng Hải – Hà Nội", descVi: "Trả phòng, ra sân bay, về Hà Nội với hành lý đầy kỷ niệm." },
      ],
      category: "china",
      featured: true,
      published: true,
    },
    {
      slug: "bac-kinh-2026",
      title: {
        vi: "Bắc Kinh – Cố Đô Ngàn Năm",
        en: "Beijing – The Ancient Capital",
        zh: "北京——千年古都",
      },
      description: {
        vi: "Bắc Kinh – trái tim của Trung Quốc với hơn 3.000 năm lịch sử. Tour 5 ngày chinh phục Vạn Lý Trường Thành, khám phá Tử Cấm Thành, dạo Hồ Houhai về đêm và thưởng thức Vịt Quay Bắc Kinh chính hiệu.",
        en: "Beijing – the heart of China with over 3,000 years of history. A 5-day tour conquering the Great Wall, exploring the Forbidden City, strolling Houhai Lake at night and savoring authentic Peking Duck.",
        zh: "北京——中国的心脏，拥有3000多年历史。5天游览长城、故宫、后海夜游，品尝正宗北京烤鸭。",
      },
      destination: "Bắc Kinh, Trung Quốc",
      duration: 5,
      departures: [
        { date: "13-17/06/2026", status: "private" },
        { date: "29/10-03/11/2026", status: "open" },
        { date: "05-10/11/2026", status: "open" },
      ],
      coverImage: "/images/beijing.jpg",
      highlights: [
        "Chinh phục Vạn Lý Trường Thành đoạn Mutianyu đẹp nhất",
        "Khám phá Tử Cấm Thành – cung điện lớn nhất thế giới",
        "Chụp ảnh Thiên An Môn lúc bình minh",
        "Dạo phố Hồ Đồng cổ kính bằng xe đạp",
        "Thưởng thức Vịt Quay Bắc Kinh tại nhà hàng Quanjude",
      ],
      includes: [
        "Vé máy bay khứ hồi HCM/HN – Bắc Kinh",
        "Khách sạn 4 sao (4 đêm)",
        "Hướng dẫn viên tiếng Việt",
        "Xe đưa đón và di chuyển nội địa",
        "9 bữa ăn theo lịch trình",
        "Vé vào Vạn Lý Trường Thành, Tử Cấm Thành",
      ],
      excludes: [
        "Chi phí cá nhân",
        "Visa Trung Quốc",
        "Tip hướng dẫn viên",
        "Bảo hiểm du lịch",
      ],
      itinerary: [
        { day: 1, titleVi: "Bay đến Bắc Kinh", descVi: "Nhận phòng, tối dạo Vương Phủ Tỉnh và thưởng thức phố ẩm thực đêm." },
        { day: 2, titleVi: "Thiên An Môn – Tử Cấm Thành", descVi: "Chụp ảnh Thiên An Môn lúc bình minh, tham quan toàn bộ Tử Cấm Thành, Bắc Hải Công Viên." },
        { day: 3, titleVi: "Vạn Lý Trường Thành Mutianyu", descVi: "Cả ngày chinh phục Trường Thành đoạn Mutianyu – đẹp và ít đông nhất. Cáp treo lên, toboggan xuống." },
        { day: 4, titleVi: "Thiên Đàn – Hồ Đồng – Houhai", descVi: "Tham quan Đàn Tế Thiên, dạo xe đạp phố Hồ Đồng, tối ngồi bar bên Hồ Houhai." },
        { day: 5, titleVi: "Tự do – Bay về", descVi: "Sáng tự do, mua quà lưu niệm, chiều ra sân bay về nước." },
      ],
      category: "china",
      featured: true,
      published: true,
    },
    {
      slug: "tan-cuong-2026",
      title: {
        vi: "Tân Cương – Miền Tây Hoang Dã",
        en: "Xinjiang – The Wild West",
        zh: "新疆——狂野西部",
      },
      description: {
        vi: "Tân Cương – vùng đất huyền bí phía tây Trung Quốc với cảnh quan thiên nhiên choáng ngợp: sa mạc Taklamakan, hồ Heavenly Lake xanh ngắt, núi tuyết Thiên Sơn hùng vĩ và nền văn hóa Duy Ngô Nhĩ độc đáo.",
        en: "Xinjiang – the mysterious western land of China with breathtaking landscapes: Taklamakan Desert, crystal-clear Heavenly Lake, majestic Tianshan snow mountains and unique Uyghur culture.",
        zh: "新疆——中国神秘的西部土地，塔克拉玛干沙漠、天池、天山雪峰和独特的维吾尔文化令人叹为观止。",
      },
      destination: "Tân Cương, Trung Quốc",
      duration: 10,
      departures: [
        { date: "19-28/06/2026", status: "open" },
      ],
      coverImage: "/images/xinjiang.jpg",
      highlights: [
        "Hồ Thiên Trì (Heavenly Lake) phản chiếu núi tuyết Thiên Sơn",
        "Sa mạc Taklamakan – sa mạc cát di động lớn thứ 2 thế giới",
        "Phố cổ Kashgar – giao lộ Con đường Tơ lụa",
        "Thung lũng Kanas với rừng lá vàng và hồ ngọc bích",
        "Ẩm thực Duy Ngô Nhĩ: thịt nướng, mì kéo tay, bánh nang",
      ],
      includes: [
        "Vé máy bay khứ hồi + nội địa trong Tân Cương",
        "Khách sạn 4 sao + lều trại sa mạc (9 đêm)",
        "Hướng dẫn viên tiếng Việt",
        "Toàn bộ di chuyển nội địa",
        "18 bữa ăn theo lịch trình",
        "Vé vào cửa tất cả điểm tham quan",
      ],
      excludes: [
        "Chi phí cá nhân",
        "Visa Trung Quốc",
        "Tip hướng dẫn viên",
        "Bảo hiểm du lịch",
      ],
      itinerary: [
        { day: 1, titleVi: "Bay đến Urumqi", descVi: "Nhận phòng, khám phá chợ quốc tế Urumqi." },
        { day: 2, titleVi: "Hồ Thiên Trì", descVi: "Cả ngày tại Heavenly Lake, chụp ảnh hồ phản chiếu núi tuyết Thiên Sơn." },
        { day: 3, titleVi: "Thổ Lỗ Phồn – Hỏa Châu Sơn", descVi: "Thăm thành cổ Giao Hà, Hỏa Châu Sơn nơi nóng nhất Trung Quốc." },
        { day: 4, titleVi: "Bay đến Kashgar", descVi: "Phố cổ Kashgar, chợ gia súc khổng lồ cuối tuần." },
        { day: 5, titleVi: "Kashgar – Cảnh quan xung quanh", descVi: "Thánh đường Id Kah, hẻm núi Shipton's Arch kỳ vĩ." },
        { day: 6, titleVi: "Bay đến Kanas", descVi: "Hồ Kanas ngọc bích trong rừng thông." },
        { day: 7, titleVi: "Bạch Hạc Than – Ngũ Sắc Than", descVi: "Chụp ảnh những bãi đá nhiều màu sắc độc đáo." },
        { day: 8, titleVi: "Sa mạc Taklamakan", descVi: "Cưỡi lạc đà, ngủ lều trại giữa sa mạc, ngắm sao." },
        { day: 9, titleVi: "Tự do tại Urumqi", descVi: "Mua đặc sản Tân Cương: nho khô, hạt dưa, lụa." },
        { day: 10, titleVi: "Bay về Việt Nam", descVi: "Chia tay Tân Cương, mang theo vô số kỷ niệm và ảnh đẹp." },
      ],
      category: "china",
      featured: true,
      published: true,
    },
    {
      slug: "ladakh-2026",
      title: {
        vi: "Ladakh – Ấn Độ Huyền Bí",
        en: "Ladakh – Mystical India",
        zh: "拉达克——神秘印度",
      },
      description: {
        vi: "Ladakh – 'Vùng đất của những đèo cao', nơi mái nhà của thế giới gặp bầu trời xanh thẳm. Hành trình 9 ngày khám phá tu viện trên đỉnh núi, hồ Pangong Tso xanh biếc, đèo Khardung La 5.600m và văn hóa Phật giáo Tây Tạng độc đáo.",
        en: "Ladakh – 'Land of High Passes', where the roof of the world meets the deepest blue sky. A 9-day journey discovering mountain-top monasteries, blue Pangong Tso lake, Khardung La pass at 5,600m and unique Tibetan Buddhist culture.",
        zh: "拉达克——'高山之乡'，世界屋脊与最深蓝天交汇之处。9天探索山顶寺庙、蓝色班公湖、海拔5600米的卡尔东拉山口和藏传佛教文化。",
      },
      destination: "Ladakh, Ấn Độ",
      duration: 9,
      departures: [
        { date: "28/08-05/09/2026", status: "open" },
      ],
      coverImage: "/images/ladakh.jpg",
      highlights: [
        "Hồ Pangong Tso – hồ muối xanh nổi tiếng phim 3 Idiots",
        "Đèo Khardung La – một trong những đèo cao nhất thế giới (5.600m)",
        "Tu viện Thiksey hùng vĩ trên đỉnh núi",
        "Lễ hội Ladakh (nếu trùng lịch)",
        "Chụp ảnh dải Ngân Hà giữa vùng núi cao không ô nhiễm ánh sáng",
      ],
      includes: [
        "Vé máy bay HN – Delhi – Leh và ngược lại",
        "Khách sạn + homestay (8 đêm)",
        "Hướng dẫn viên tiếng Việt",
        "Xe 4WD chuyên dụng địa hình cao",
        "16 bữa ăn",
        "Oxygen supplement hỗ trợ độ cao",
      ],
      excludes: [
        "Visa Ấn Độ (e-visa online ~$25)",
        "Chi phí cá nhân",
        "Tip hướng dẫn viên",
        "Bảo hiểm du lịch (bắt buộc)",
      ],
      itinerary: [
        { day: 1, titleVi: "HN – Delhi – Leh", descVi: "Bay đến Leh (3.500m), nghỉ ngơi hoàn toàn để acclimatize." },
        { day: 2, titleVi: "Nghỉ ngơi – acclimatize", descVi: "Dạo quanh chợ Leh, thăm cung điện Leh, thích nghi độ cao." },
        { day: 3, titleVi: "Tu viện Shey & Thiksey", descVi: "Tham quan tu viện Shey và Thiksey hùng vĩ nhìn ra thung lũng." },
        { day: 4, titleVi: "Hồ Pangong Tso", descVi: "Cả ngày đến hồ Pangong huyền thoại, ngủ lều bên hồ ngắm sao." },
        { day: 5, titleVi: "Pangong – Leh", descVi: "Sáng sớm chụp ảnh hồ khi bình minh, trở về Leh." },
        { day: 6, titleVi: "Đèo Khardung La", descVi: "Chinh phục đèo Khardung La 5.600m, thung lũng Nubra." },
        { day: 7, titleVi: "Thung lũng Nubra", descVi: "Cưỡi lạc đà Bactrian 2 bướu, đồi cát Hunder, tu viện Diskit." },
        { day: 8, titleVi: "Leh – tự do", descVi: "Mua đặc sản Ladakh, massage Ayurveda, buổi tối chia tay." },
        { day: 9, titleVi: "Bay về Hà Nội", descVi: "Leh – Delhi – Hà Nội, kết thúc hành trình đáng nhớ." },
      ],
      category: "india",
      featured: false,
      published: true,
    },
    {
      slug: "cap-nhi-tan-dec-2026",
      title: {
        vi: "Cáp Nhĩ Tân – Thành Phố Băng Tuyết",
        en: "Harbin – Ice & Snow City",
        zh: "哈尔滨——冰雪之城",
      },
      description: {
        vi: "Cáp Nhĩ Tân mùa đông là thiên đường băng tuyết với Lễ hội Băng đăng lớn nhất thế giới. Những cung điện băng khổng lồ phát sáng lung linh về đêm, tuyết rơi trắng xóa và nhiệt độ -30°C tạo nên trải nghiệm không thể quên.",
        en: "Harbin in winter is an ice and snow paradise hosting the world's largest Ice Festival. Gigantic illuminated ice palaces, pure white snowfall and -30°C temperatures create an unforgettable experience.",
        zh: "冬日哈尔滨是冰雪天堂，举办世界最大冰雪节。巨型冰宫璀璨夜景、漫天白雪和零下30度的温度创造了难忘的体验。",
      },
      destination: "Cáp Nhĩ Tân, Trung Quốc",
      duration: 6,
      departures: [
        { date: "17-22/12/2026", status: "open" },
        { date: "30/12/2026-05/01/2027", status: "open" },
      ],
      coverImage: "/images/harbin.jpg",
      highlights: [
        "Lễ hội Băng đăng & Tuyết điêu khắc quốc tế Cáp Nhĩ Tân",
        "Cung điện băng khổng lồ phát sáng nhiều màu về đêm",
        "Trượt tuyết tại khu resort Sun Island",
        "Phố đi bộ Trung Hoa Cổ Phong",
        "Tắm suối nước nóng ngoài trời giữa tuyết rơi",
      ],
      includes: [
        "Vé máy bay khứ hồi",
        "Khách sạn 4 sao (5 đêm)",
        "Hướng dẫn viên tiếng Việt",
        "Trang phục chống lạnh chuyên dụng cho thuê",
        "10 bữa ăn",
        "Vé vào Lễ hội Băng đăng",
      ],
      excludes: [
        "Chi phí cá nhân",
        "Visa Trung Quốc",
        "Tip hướng dẫn viên",
        "Bảo hiểm du lịch",
      ],
      itinerary: [
        { day: 1, titleVi: "Bay đến Cáp Nhĩ Tân", descVi: "Nhận phòng, dạo phố đêm Trung Hoa Cổ Phong, thưởng thức ẩm thực Đông Bắc." },
        { day: 2, titleVi: "Lễ hội Băng đăng", descVi: "Cả ngày tại Ice & Snow World – khu băng đăng lớn nhất thế giới lung linh về đêm." },
        { day: 3, titleVi: "Sun Island & Điêu khắc tuyết", descVi: "Tham quan khu điêu khắc tuyết khổng lồ tại Sun Island, trượt tuyết." },
        { day: 4, titleVi: "Nhà thờ Sophia – Phố Nga", descVi: "Khám phá kiến trúc Nga cổ điển, chụp ảnh nhà thờ Thánh Sofia tuyết phủ." },
        { day: 5, titleVi: "Siberia Tiger Park & Suối nước nóng", descVi: "Thăm công viên hổ Siberia, tắm suối nước nóng ngoài trời trong tuyết rơi." },
        { day: 6, titleVi: "Tự do – Bay về", descVi: "Mua đặc sản: xúc xích Harbin, rượu Mao Đài, mứt. Bay về Việt Nam." },
      ],
      category: "china",
      featured: true,
      published: true,
    },
  ]);
  console.log("✅ Seeded 5 tours");

  // Seed Reviews
  await Review.insertMany([
    {
      name: "Nguyễn Thị Hương",
      rating: 5,
      content: "Tour Tân Cương tuyệt vời! Hướng dẫn viên rất am hiểu, dẫn đi những điểm chụp ảnh đẹp nhất. Ẩm thực địa phương ngon không thể tả!",
      tourTitle: "Tân Cương – Miền Tây Hoang Dã",
      published: true,
    },
    {
      name: "Trần Văn Minh",
      rating: 5,
      content: "Đoàn nhỏ nên được chăm sóc rất kỹ. Lịch trình hợp lý, không quá vội, có thời gian khám phá tự do. Sẽ đi tiếp tour Cáp Nhĩ Tân!",
      tourTitle: "Bắc Kinh – Cố Đô Ngàn Năm",
      published: true,
    },
    {
      name: "Lê Thu Trang",
      rating: 5,
      content: "Linh Đình Travel không chỉ là tour guide mà còn như người bạn đồng hành. Những bức ảnh mình chụp về được ai cũng khen!",
      tourTitle: "Thượng Hải – Thành phố không ngủ",
      published: true,
    },
    {
      name: "Phạm Hoàng Nam",
      rating: 5,
      content: "Ladakh là giấc mơ mà mình không nghĩ sẽ thực hiện được. Cảm ơn Linh Đình đã tổ chức một hành trình hoàn hảo, an toàn và đầy cảm xúc!",
      tourTitle: "Ladakh – Ấn Độ Huyền Bí",
      published: true,
    },
  ]);
  console.log("✅ Seeded 4 reviews");

  // Seed Blog
  await Blog.insertMany([
    {
      slug: "kinh-nghiem-du-lich-tan-cuong",
      title: {
        vi: "Kinh nghiệm du lịch Tân Cương cho người đi lần đầu",
        en: "Xinjiang Travel Tips for First-Timers",
        zh: "初次游新疆的旅行经验分享",
      },
      excerpt: {
        vi: "Tân Cương – vùng đất phía tây Trung Quốc với những cảnh quan hùng vĩ. Bài viết chia sẻ kinh nghiệm thực tế từ hướng dẫn viên.",
        en: "Xinjiang travel tips from our experienced guides.",
        zh: "来自我们经验丰富的导游的新疆旅行贴士。",
      },
      content: {
        vi: "<h2>Tân Cương có gì đặc biệt?</h2><p>Tân Cương là khu tự trị lớn nhất Trung Quốc, chiếm 1/6 diện tích cả nước. Đây là nơi giao thoa giữa nhiều nền văn hóa: Hán, Duy Ngô Nhĩ, Kazakh, Mông Cổ...</p><h2>Thời điểm tốt nhất để đến</h2><p>Tháng 6-9 là lý tưởng nhất: hoa anh đào nở, cỏ xanh trên thảo nguyên, nhiệt độ dễ chịu 20-30°C ban ngày.</p><h2>Lưu ý quan trọng</h2><p>Cần có hộ chiếu còn hạn 6 tháng, visa Trung Quốc. Nên mặc quần áo nhiều lớp vì chênh lệch nhiệt độ ngày đêm lớn.</p>",
      },
      coverImage: "/images/xinjiang.jpg",
      tags: ["tân cương", "xinjiang", "trung quốc", "kinh nghiệm"],
      published: true,
    },
    {
      slug: "top-mon-an-thuong-hai",
      title: {
        vi: "Top 10 món ăn nhất định phải thử khi đến Thượng Hải",
        en: "Top 10 Must-Try Foods in Shanghai",
        zh: "上海必尝的10道美食",
      },
      excerpt: {
        vi: "Thượng Hải là thiên đường ẩm thực. Đừng bỏ qua những món này khi đến đây!",
        en: "Shanghai is a culinary paradise. Don't miss these dishes!",
        zh: "上海是美食天堂，别错过这些美食！",
      },
      content: {
        vi: "<h2>1. Xiaolongbao – Há Cảo Nước</h2><p>Món ăn biểu tượng của Thượng Hải. Bánh bao nhỏ nhân thịt với nước súp bên trong, ăn tại Din Tai Fung hoặc quán Nanxiang 100 năm tuổi.</p><h2>2. Shengjianbao – Bánh Bao Chiên</h2><p>Bánh bao đáy giòn, trên mềm, nhân thịt và nước súp. Xếp hàng tại Yang's Fry Dumpling để thưởng thức.</p><h2>3. Hairy Crab – Cua Lông</h2><p>Đặc sản mùa thu (tháng 9-11), cua lông Dương Trừng Hồ nổi tiếng nhất Trung Quốc.</p>",
      },
      coverImage: "/images/shanghai.jpg",
      tags: ["ẩm thực", "thượng hải", "shanghai", "món ngon"],
      published: true,
    },
    {
      slug: "chup-anh-dep-bac-kinh",
      title: {
        vi: "Bí kíp chụp ảnh đẹp tại các điểm nổi tiếng ở Bắc Kinh",
        en: "Photography Guide to Beijing's Famous Spots",
        zh: "北京著名景点摄影指南",
      },
      excerpt: {
        vi: "Góc máy nào cho Tử Cấm Thành đẹp nhất? Thời điểm nào chụp Vạn Lý Trường Thành ít người nhất?",
        en: "Best angles for the Forbidden City? When to shoot the Great Wall with fewest people?",
        zh: "故宫最佳拍摄角度？什么时候去长城人最少？",
      },
      content: {
        vi: "<h2>Thiên An Môn – Chụp lúc bình minh</h2><p>Đến Thiên An Môn lúc 5h30 sáng để chụp lễ thượng kỳ và quảng trường vắng người. Ánh sáng vàng bình minh cực đẹp.</p><h2>Tử Cấm Thành</h2><p>Góc chụp tốt nhất: từ Cảnh Sơn nhìn xuống toàn cảnh. Nên đến sớm trước 9h để tránh đông.</p><h2>Vạn Lý Trường Thành Mutianyu</h2><p>Đoạn đẹp và ít đông nhất, có cáp treo và toboggan. Chụp lúc sáng sớm hoặc chiều tà để có ánh sáng đẹp.</p>",
      },
      coverImage: "/images/beijing.jpg",
      tags: ["nhiếp ảnh", "bắc kinh", "beijing", "tips"],
      published: true,
    },
  ]);
  console.log("✅ Seeded 3 blog posts");

  console.log("\n🎉 Database seeded successfully!");
  await mongoose.disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });

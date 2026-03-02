import React, { createContext, useContext, useState, useCallback } from "react";

export type LangCode = "id" | "en" | "ms" | "zh" | "ar" | "ja" | "ko" | "th";

export const languages: { code: LangCode; label: string; flag: string }[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ms", label: "Melayu", flag: "🇲🇾" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
];

type Translations = Record<string, Record<LangCode, string>>;

const t: Translations = {
  // ═══ Bottom Nav ═══
  "nav.home": { id: "Home", en: "Home", ms: "Utama", zh: "首页", ar: "الرئيسية", ja: "ホーム", ko: "홈", th: "หน้าหลัก" },
  "nav.wallet": { id: "Dompet", en: "Wallet", ms: "Dompet", zh: "钱包", ar: "المحفظة", ja: "ウォレット", ko: "지갑", th: "กระเป๋า" },
  "nav.qr": { id: "QR", en: "QR", ms: "QR", zh: "二维码", ar: "QR", ja: "QR", ko: "QR", th: "QR" },
  "nav.activity": { id: "Aktivitas", en: "Activity", ms: "Aktiviti", zh: "活动", ar: "النشاط", ja: "アクティビティ", ko: "활동", th: "กิจกรรม" },
  "nav.account": { id: "Akun", en: "Account", ms: "Akaun", zh: "账户", ar: "الحساب", ja: "アカウント", ko: "계정", th: "บัญชี" },

  // ═══ Home Screen ═══
  "home.cashBalance": { id: "Saldo Tunai", en: "Cash Balance", ms: "Baki Tunai", zh: "现金余额", ar: "الرصيد النقدي", ja: "現金残高", ko: "현금 잔액", th: "ยอดเงินสด" },
  "home.points": { id: "Poin", en: "Points", ms: "Mata", zh: "积分", ar: "نقاط", ja: "ポイント", ko: "포인트", th: "แต้ม" },
  "home.transfer": { id: "Transfer", en: "Transfer", ms: "Pindahan", zh: "转账", ar: "تحويل", ja: "送金", ko: "이체", th: "โอน" },
  "home.topup": { id: "Top Up", en: "Top Up", ms: "Tambah Nilai", zh: "充值", ar: "شحن", ja: "チャージ", ko: "충전", th: "เติมเงิน" },
  "home.emoney": { id: "E-Money", en: "E-Money", ms: "E-Wang", zh: "电子钱包", ar: "محفظة إلكترونية", ja: "電子マネー", ko: "전자화폐", th: "อีมันนี่" },
  "home.more": { id: "Lainnya", en: "More", ms: "Lagi", zh: "更多", ar: "المزيد", ja: "その他", ko: "더보기", th: "เพิ่มเติม" },
  "home.encrypted": { id: "Encrypted", en: "Encrypted", ms: "Disulitkan", zh: "已加密", ar: "مشفر", ja: "暗号化", ko: "암호화", th: "เข้ารหัส" },
  "home.member": { id: "Member", en: "Member", ms: "Ahli", zh: "会员", ar: "عضو", ja: "メンバー", ko: "멤버", th: "สมาชิก" },
  "home.cashback": { id: "Cashback 20%", en: "Cashback 20%", ms: "Pulangan Tunai 20%", zh: "返现20%", ar: "استرداد 20%", ja: "キャッシュバック20%", ko: "캐시백 20%", th: "เงินคืน 20%" },
  "home.cashbackDesc": { id: "Top up saldo dan dapatkan cashback hingga Rp 50.000", en: "Top up balance and get cashback up to Rp 50,000", ms: "Tambah nilai dan dapatkan pulangan tunai sehingga Rp 50,000", zh: "充值余额，最高获得50,000印尼盾返现", ar: "اشحن رصيدك واحصل على استرداد يصل إلى 50,000 روبية", ja: "残高チャージで最大50,000ルピアのキャッシュバック", ko: "잔액 충전 후 최대 50,000루피아 캐시백", th: "เติมเงินและรับเงินคืนสูงสุด 50,000 รูเปียห์" },
  "home.referralBonus": { id: "Referral Bonus", en: "Referral Bonus", ms: "Bonus Rujukan", zh: "推荐奖励", ar: "مكافأة الإحالة", ja: "紹介ボーナス", ko: "추천 보너스", th: "โบนัสแนะนำ" },
  "home.referralDesc": { id: "Ajak teman bergabung & dapatkan Rp 25.000 per referral", en: "Invite friends & get Rp 25,000 per referral", ms: "Jemput rakan & dapatkan Rp 25,000 setiap rujukan", zh: "邀请朋友加入，每次推荐获得25,000印尼盾", ar: "ادعُ أصدقاءك واحصل على 25,000 روبية لكل إحالة", ja: "友達を招待して1件につき25,000ルピア獲得", ko: "친구 초대 시 건당 25,000루피아 획득", th: "เชิญเพื่อนและรับ 25,000 รูเปียห์ต่อการแนะนำ" },
  "home.flashSale": { id: "Flash Sale Token", en: "Flash Sale Token", ms: "Token Jualan Kilat", zh: "限时抢购代币", ar: "عرض فلاش توكن", ja: "フラッシュセールトークン", ko: "플래시 세일 토큰", th: "โทเค็นแฟลชเซล" },
  "home.flashSaleDesc": { id: "Beli token PLN & pulsa dengan diskon spesial hari ini", en: "Buy PLN tokens & credits with special discount today", ms: "Beli token PLN & pulsa dengan diskaun istimewa hari ini", zh: "今天以特别折扣购买PLN代币和话费", ar: "اشترِ رموز PLN والرصيد بخصم خاص اليوم", ja: "本日限定特別割引でPLNトークン＆プリペイド購入", ko: "오늘 특별 할인으로 PLN 토큰 및 크레딧 구매", th: "ซื้อโทเค็น PLN และเติมเงินด้วยส่วนลดพิเศษวันนี้" },
  "home.partner": { id: "Koperasi Cerdas Indonesia", en: "Smart Cooperative Indonesia", ms: "Koperasi Cerdas Indonesia", zh: "印尼智慧合作社", ar: "التعاونية الذكية الإندونيسية", ja: "インドネシアスマート協同組合", ko: "인도네시아 스마트 협동조합", th: "สหกรณ์อัจฉริยะอินโดนีเซีย" },
  "home.partnerSub": { id: "(KoaS) — Partner resmi PSNPAY", en: "(KoaS) — Official PSNPAY Partner", ms: "(KoaS) — Rakan rasmi PSNPAY", zh: "(KoaS) — PSNPAY官方合作伙伴", ar: "(KoaS) — شريك PSNPAY الرسمي", ja: "(KoaS) — PSNPAY公式パートナー", ko: "(KoaS) — PSNPAY 공식 파트너", th: "(KoaS) — พาร์ทเนอร์ทางการ PSNPAY" },
  "home.umkm": { id: "Mitra UMKM", en: "MSME Partners", ms: "Rakan UMKM", zh: "中小企业合作伙伴", ar: "شركاء UMKM", ja: "UMKMパートナー", ko: "UMKM 파트너", th: "พาร์ทเนอร์ UMKM" },
  "home.viewAll": { id: "lihat semua", en: "view all", ms: "lihat semua", zh: "查看全部", ar: "عرض الكل", ja: "すべて見る", ko: "모두 보기", th: "ดูทั้งหมด" },
  "home.copied": { id: "Tersalin!", en: "Copied!", ms: "Disalin!", zh: "已复制！", ar: "تم النسخ!", ja: "コピー済み！", ko: "복사됨!", th: "คัดลอกแล้ว!" },

  // ═══ Activity Screen ═══
  "activity.history": { id: "Riwayat Transaksi", en: "Transaction History", ms: "Sejarah Transaksi", zh: "交易记录", ar: "سجل المعاملات", ja: "取引履歴", ko: "거래 내역", th: "ประวัติการทำรายการ" },
  "activity.total": { id: "Total Transaksi", en: "Total Transactions", ms: "Jumlah Transaksi", zh: "总交易", ar: "إجمالي المعاملات", ja: "総取引数", ko: "총 거래", th: "ยอดรวมรายการ" },
  "activity.success": { id: "Berhasil", en: "Success", ms: "Berjaya", zh: "成功", ar: "ناجح", ja: "成功", ko: "성공", th: "สำเร็จ" },
  "activity.pending": { id: "Menunggu", en: "Pending", ms: "Menunggu", zh: "待处理", ar: "معلق", ja: "保留中", ko: "대기 중", th: "รอดำเนินการ" },
  "activity.failed": { id: "Gagal", en: "Failed", ms: "Gagal", zh: "失败", ar: "فشل", ja: "失敗", ko: "실패", th: "ล้มเหลว" },
  "activity.product": { id: "Produk", en: "Product", ms: "Produk", zh: "产品", ar: "المنتج", ja: "商品", ko: "상품", th: "สินค้า" },
  "activity.deposit": { id: "Deposit", en: "Deposit", ms: "Deposit", zh: "存款", ar: "إيداع", ja: "入金", ko: "입금", th: "ฝากเงิน" },
  "activity.bills": { id: "Tagihan", en: "Bills", ms: "Bil", zh: "账单", ar: "الفواتير", ja: "請求書", ko: "청구서", th: "บิล" },
  "activity.transferTab": { id: "Transfer", en: "Transfer", ms: "Pindahan", zh: "转账", ar: "تحويل", ja: "送金", ko: "이체", th: "โอน" },
  "activity.transactions": { id: "transaksi", en: "transactions", ms: "transaksi", zh: "笔交易", ar: "معاملة", ja: "件の取引", ko: "건 거래", th: "รายการ" },
  "activity.noTransaction": { id: "Tidak ada transaksi", en: "No transactions", ms: "Tiada transaksi", zh: "没有交易", ar: "لا توجد معاملات", ja: "取引なし", ko: "거래 없음", th: "ไม่มีรายการ" },
  "activity.noTransactionDesc": { id: "Belum ada transaksi yang tercatat", en: "No transactions recorded yet", ms: "Tiada transaksi yang direkodkan", zh: "尚未记录任何交易", ar: "لم يتم تسجيل أي معاملات بعد", ja: "まだ取引が記録されていません", ko: "아직 기록된 거래가 없습니다", th: "ยังไม่มีรายการที่บันทึก" },

  // ═══ Wallet Screen ═══
  "wallet.title": { id: "Dompet Kripto", en: "Crypto Wallet", ms: "Dompet Kripto", zh: "加密钱包", ar: "محفظة التشفير", ja: "暗号ウォレット", ko: "암호화폐 지갑", th: "กระเป๋าคริปโต" },
  "wallet.totalBalance": { id: "Total Saldo", en: "Total Balance", ms: "Jumlah Baki", zh: "总余额", ar: "الرصيد الإجمالي", ja: "合計残高", ko: "총 잔액", th: "ยอดรวม" },
  "wallet.send": { id: "Kirim", en: "Send", ms: "Hantar", zh: "发送", ar: "إرسال", ja: "送信", ko: "보내기", th: "ส่ง" },
  "wallet.receive": { id: "Terima", en: "Receive", ms: "Terima", zh: "接收", ar: "استقبال", ja: "受信", ko: "받기", th: "รับ" },
  "wallet.swap": { id: "Tukar", en: "Swap", ms: "Tukar", zh: "兑换", ar: "تبادل", ja: "スワップ", ko: "스왑", th: "แลก" },
  "wallet.privateKey": { id: "Private Key", en: "Private Key", ms: "Kunci Peribadi", zh: "私钥", ar: "المفتاح الخاص", ja: "秘密鍵", ko: "개인 키", th: "คีย์ส่วนตัว" },
  "wallet.assets": { id: "Aset Kripto", en: "Crypto Assets", ms: "Aset Kripto", zh: "加密资产", ar: "الأصول المشفرة", ja: "暗号資産", ko: "암호화폐 자산", th: "สินทรัพย์คริปโต" },
  "wallet.balance": { id: "Saldo", en: "Balance", ms: "Baki", zh: "余额", ar: "الرصيد", ja: "残高", ko: "잔액", th: "ยอดเงิน" },
  "wallet.backToWallet": { id: "Kembali ke Dompet", en: "Back to Wallet", ms: "Kembali ke Dompet", zh: "返回钱包", ar: "العودة للمحفظة", ja: "ウォレットに戻る", ko: "지갑으로 돌아가기", th: "กลับไปกระเป๋า" },
  "wallet.sendTitle": { id: "Kirim", en: "Send", ms: "Hantar", zh: "发送", ar: "إرسال", ja: "送信", ko: "보내기", th: "ส่ง" },
  "wallet.selectToken": { id: "Pilih Token", en: "Select Token", ms: "Pilih Token", zh: "选择代币", ar: "اختر الرمز", ja: "トークンを選択", ko: "토큰 선택", th: "เลือกโทเค็น" },
  "wallet.destAddress": { id: "Alamat Tujuan", en: "Destination Address", ms: "Alamat Tujuan", zh: "目标地址", ar: "عنوان الوجهة", ja: "送信先アドレス", ko: "수신 주소", th: "ที่อยู่ปลายทาง" },
  "wallet.amount": { id: "Jumlah", en: "Amount", ms: "Jumlah", zh: "数量", ar: "المبلغ", ja: "数量", ko: "수량", th: "จำนวน" },
  "wallet.confirm": { id: "Konfirmasi Pengiriman", en: "Confirm Send", ms: "Sahkan Penghantaran", zh: "确认发送", ar: "تأكيد الإرسال", ja: "送信確認", ko: "전송 확인", th: "ยืนยันการส่ง" },
  "wallet.txSent": { id: "Transaksi Terkirim!", en: "Transaction Sent!", ms: "Transaksi Dihantar!", zh: "交易已发送！", ar: "تم إرسال المعاملة!", ja: "トランザクション送信済み！", ko: "거래 전송 완료!", th: "ส่งรายการเรียบร้อย!" },
  "wallet.receiveCrypto": { id: "Terima Kripto", en: "Receive Crypto", ms: "Terima Kripto", zh: "接收加密货币", ar: "استقبال العملات المشفرة", ja: "暗号通貨を受信", ko: "암호화폐 받기", th: "รับคริปโต" },
  "wallet.copyAddress": { id: "Salin Alamat", en: "Copy Address", ms: "Salin Alamat", zh: "复制地址", ar: "نسخ العنوان", ja: "アドレスをコピー", ko: "주소 복사", th: "คัดลอกที่อยู่" },
  "wallet.swapToken": { id: "Tukar Token", en: "Swap Token", ms: "Tukar Token", zh: "兑换代币", ar: "تبادل الرمز", ja: "トークン交換", ko: "토큰 교환", th: "แลกโทเค็น" },
  "wallet.swapSuccess": { id: "Swap Berhasil!", en: "Swap Successful!", ms: "Pertukaran Berjaya!", zh: "兑换成功！", ar: "تم التبادل بنجاح!", ja: "スワップ成功！", ko: "스왑 성공!", th: "แลกเปลี่ยนสำเร็จ!" },
  "wallet.from": { id: "Dari", en: "From", ms: "Dari", zh: "从", ar: "من", ja: "送信元", ko: "보내는", th: "จาก" },
  "wallet.to": { id: "Ke", en: "To", ms: "Ke", zh: "到", ar: "إلى", ja: "送信先", ko: "받는", th: "ถึง" },
  "wallet.continue": { id: "Lanjut", en: "Continue", ms: "Teruskan", zh: "继续", ar: "متابعة", ja: "続行", ko: "계속", th: "ต่อไป" },
  "wallet.change": { id: "Ubah", en: "Change", ms: "Ubah", zh: "更改", ar: "تغيير", ja: "変更", ko: "변경", th: "เปลี่ยน" },
  "wallet.confirmSend": { id: "Konfirmasi & Kirim", en: "Confirm & Send", ms: "Sahkan & Hantar", zh: "确认并发送", ar: "تأكيد وإرسال", ja: "確認して送信", ko: "확인 및 전송", th: "ยืนยันและส่ง" },
  "wallet.estimateGas": { id: "Estimasi Gas", en: "Estimated Gas", ms: "Anggaran Gas", zh: "预估Gas", ar: "تقدير الغاز", ja: "推定ガス", ko: "예상 가스", th: "ประมาณค่าแก๊ส" },

  // ═══ QR Screen ═══
  "qr.title": { id: "QRIS Payment", en: "QRIS Payment", ms: "Pembayaran QRIS", zh: "QRIS支付", ar: "دفع QRIS", ja: "QRIS決済", ko: "QRIS 결제", th: "ชำระเงิน QRIS" },
  "qr.subtitle": { id: "Scan atau tunjukkan QR untuk transaksi", en: "Scan or show QR to transact", ms: "Imbas atau tunjukkan QR untuk transaksi", zh: "扫描或出示二维码进行交易", ar: "امسح أو اعرض QR للمعاملة", ja: "QRをスキャンまたは表示して取引", ko: "QR을 스캔하거나 보여주세요", th: "สแกนหรือแสดง QR เพื่อทำรายการ" },
  "qr.scanQr": { id: "Scan QR", en: "Scan QR", ms: "Imbas QR", zh: "扫描QR", ar: "مسح QR", ja: "QRスキャン", ko: "QR 스캔", th: "สแกน QR" },
  "qr.myQr": { id: "QR Saya", en: "My QR", ms: "QR Saya", zh: "我的QR", ar: "QR الخاص بي", ja: "マイQR", ko: "내 QR", th: "QR ของฉัน" },
  "qr.pointCamera": { id: "Arahkan kamera ke QR Code", en: "Point camera at QR Code", ms: "Halakan kamera ke Kod QR", zh: "将摄像头对准二维码", ar: "وجّه الكاميرا إلى رمز QR", ja: "カメラをQRコードに向けてください", ko: "카메라를 QR 코드에 대세요", th: "ชี้กล้องไปที่ QR Code" },
  "qr.flash": { id: "Flash", en: "Flash", ms: "Denyar", zh: "闪光灯", ar: "الفلاش", ja: "フラッシュ", ko: "플래시", th: "แฟลช" },
  "qr.gallery": { id: "Galeri", en: "Gallery", ms: "Galeri", zh: "相册", ar: "المعرض", ja: "ギャラリー", ko: "갤러리", th: "แกลเลอรี" },
  "qr.howToPay": { id: "Cara Pembayaran QRIS", en: "How to Pay with QRIS", ms: "Cara Pembayaran QRIS", zh: "QRIS支付方法", ar: "كيفية الدفع بـ QRIS", ja: "QRIS決済方法", ko: "QRIS 결제 방법", th: "วิธีชำระเงิน QRIS" },
  "qr.step1": { id: "Arahkan kamera ke QR merchant", en: "Point camera at merchant QR", ms: "Halakan kamera ke QR peniaga", zh: "将摄像头对准商家二维码", ar: "وجّه الكاميرا إلى QR التاجر", ja: "カメラを加盟店のQRに向ける", ko: "카메라를 가맹점 QR에 대세요", th: "ชี้กล้องไปที่ QR ร้านค้า" },
  "qr.step2": { id: "Periksa detail pembayaran", en: "Check payment details", ms: "Semak butiran pembayaran", zh: "检查付款详情", ar: "تحقق من تفاصيل الدفع", ja: "支払い詳細を確認", ko: "결제 내역 확인", th: "ตรวจสอบรายละเอียดการชำระ" },
  "qr.step3": { id: "Masukkan nominal & konfirmasi", en: "Enter amount & confirm", ms: "Masukkan nominal & sahkan", zh: "输入金额并确认", ar: "أدخل المبلغ وأكّد", ja: "金額入力＆確認", ko: "금액 입력 및 확인", th: "ใส่จำนวนเงินและยืนยัน" },
  "qr.step4": { id: "Transaksi selesai!", en: "Transaction complete!", ms: "Transaksi selesai!", zh: "交易完成！", ar: "تمت المعاملة!", ja: "取引完了！", ko: "거래 완료!", th: "รายการเสร็จสมบูรณ์!" },
  "qr.walletAddress": { id: "Alamat Wallet", en: "Wallet Address", ms: "Alamat Dompet", zh: "钱包地址", ar: "عنوان المحفظة", ja: "ウォレットアドレス", ko: "지갑 주소", th: "ที่อยู่กระเป๋า" },
  "qr.share": { id: "Bagikan", en: "Share", ms: "Kongsi", zh: "分享", ar: "مشاركة", ja: "共有", ko: "공유", th: "แชร์" },
  "qr.save": { id: "Simpan", en: "Save", ms: "Simpan", zh: "保存", ar: "حفظ", ja: "保存", ko: "저장", th: "บันทึก" },
  "qr.refresh": { id: "Refresh", en: "Refresh", ms: "Muat Semula", zh: "刷新", ar: "تحديث", ja: "更新", ko: "새로고침", th: "รีเฟรช" },
  "qr.recentReceived": { id: "Terakhir Diterima", en: "Recent Received", ms: "Terakhir Diterima", zh: "最近收到", ar: "المستلم مؤخراً", ja: "最近受信", ko: "최근 수신", th: "รับล่าสุด" },

  // ═══ Transfer Screen ═══
  "transfer.title": { id: "Transfer", en: "Transfer", ms: "Pindahan", zh: "转账", ar: "تحويل", ja: "送金", ko: "이체", th: "โอนเงิน" },
  "transfer.availableBalance": { id: "Saldo Tersedia", en: "Available Balance", ms: "Baki Tersedia", zh: "可用余额", ar: "الرصيد المتاح", ja: "利用可能残高", ko: "사용 가능 잔액", th: "ยอดเงินคงเหลือ" },
  "transfer.destBank": { id: "Bank Tujuan", en: "Destination Bank", ms: "Bank Tujuan", zh: "目标银行", ar: "البنك الوجهة", ja: "送金先銀行", ko: "수신 은행", th: "ธนาคารปลายทาง" },
  "transfer.selectBank": { id: "Pilih bank tujuan", en: "Select destination bank", ms: "Pilih bank tujuan", zh: "选择目标银行", ar: "اختر البنك الوجهة", ja: "送金先銀行を選択", ko: "수신 은행 선택", th: "เลือกธนาคารปลายทาง" },
  "transfer.accountNo": { id: "Nomor Rekening", en: "Account Number", ms: "Nombor Akaun", zh: "账号", ar: "رقم الحساب", ja: "口座番号", ko: "계좌번호", th: "หมายเลขบัญชี" },
  "transfer.enterAccountNo": { id: "Masukkan nomor rekening", en: "Enter account number", ms: "Masukkan nombor akaun", zh: "输入账号", ar: "أدخل رقم الحساب", ja: "口座番号を入力", ko: "계좌번호 입력", th: "กรอกหมายเลขบัญชี" },
  "transfer.amount": { id: "Jumlah Transfer", en: "Transfer Amount", ms: "Jumlah Pindahan", zh: "转账金额", ar: "مبلغ التحويل", ja: "送金額", ko: "이체 금액", th: "จำนวนเงินโอน" },
  "transfer.purpose": { id: "Tujuan Transaksi", en: "Transaction Purpose", ms: "Tujuan Transaksi", zh: "交易目的", ar: "غرض المعاملة", ja: "取引目的", ko: "거래 목적", th: "วัตถุประสงค์" },
  "transfer.selectPurpose": { id: "Pilih tujuan transaksi", en: "Select transaction purpose", ms: "Pilih tujuan transaksi", zh: "选择交易目的", ar: "اختر غرض المعاملة", ja: "取引目的を選択", ko: "거래 목적 선택", th: "เลือกวัตถุประสงค์" },
  "transfer.notes": { id: "Keterangan", en: "Notes", ms: "Keterangan", zh: "备注", ar: "ملاحظات", ja: "備考", ko: "비고", th: "หมายเหตุ" },
  "transfer.optional": { id: "opsional", en: "optional", ms: "pilihan", zh: "可选", ar: "اختياري", ja: "任意", ko: "선택사항", th: "ทางเลือก" },
  "transfer.addNotes": { id: "Tambahkan catatan...", en: "Add notes...", ms: "Tambah catatan...", zh: "添加备注...", ar: "أضف ملاحظات...", ja: "メモを追加...", ko: "메모 추가...", th: "เพิ่มหมายเหตุ..." },
  "transfer.nominal": { id: "Nominal", en: "Amount", ms: "Nominal", zh: "金额", ar: "المبلغ", ja: "金額", ko: "금액", th: "จำนวนเงิน" },
  "transfer.adminFee": { id: "Biaya Admin", en: "Admin Fee", ms: "Yuran Admin", zh: "管理费", ar: "رسوم الإدارة", ja: "手数料", ko: "수수료", th: "ค่าธรรมเนียม" },
  "transfer.total": { id: "Total", en: "Total", ms: "Jumlah", zh: "合计", ar: "الإجمالي", ja: "合計", ko: "합계", th: "รวม" },
  "transfer.sendTransfer": { id: "Kirim Transfer", en: "Send Transfer", ms: "Hantar Pindahan", zh: "发送转账", ar: "إرسال التحويل", ja: "送金する", ko: "이체 전송", th: "ส่งเงินโอน" },
  "transfer.confirmTransfer": { id: "Konfirmasi Transfer", en: "Confirm Transfer", ms: "Sahkan Pindahan", zh: "确认转账", ar: "تأكيد التحويل", ja: "送金確認", ko: "이체 확인", th: "ยืนยันการโอน" },
  "transfer.detail": { id: "Detail Transfer", en: "Transfer Details", ms: "Butiran Pindahan", zh: "转账详情", ar: "تفاصيل التحويل", ja: "送金詳細", ko: "이체 상세", th: "รายละเอียดการโอน" },
  "transfer.totalPayment": { id: "Total Pembayaran", en: "Total Payment", ms: "Jumlah Pembayaran", zh: "总付款", ar: "إجمالي الدفع", ja: "合計支払い", ko: "총 결제금액", th: "ยอดชำระรวม" },
  "transfer.fundSource": { id: "Sumber Dana", en: "Fund Source", ms: "Sumber Dana", zh: "资金来源", ar: "مصدر التمويل", ja: "資金源", ko: "자금 출처", th: "แหล่งเงิน" },
  "transfer.securityNote": { id: "Transaksi ini dilindungi enkripsi end-to-end", en: "This transaction is protected by end-to-end encryption", ms: "Transaksi ini dilindungi penyulitan hujung-ke-hujung", zh: "此交易受端到端加密保护", ar: "هذه المعاملة محمية بتشفير من طرف إلى طرف", ja: "この取引はエンドツーエンド暗号化で保護されています", ko: "이 거래는 종단간 암호화로 보호됩니다", th: "รายการนี้ได้รับการป้องกันด้วยการเข้ารหัสแบบครบวงจร" },
  "transfer.confirmAndSend": { id: "Konfirmasi & Kirim", en: "Confirm & Send", ms: "Sahkan & Hantar", zh: "确认并发送", ar: "تأكيد وإرسال", ja: "確認して送金", ko: "확인 및 전송", th: "ยืนยันและส่ง" },
  "transfer.cancel": { id: "Batal", en: "Cancel", ms: "Batal", zh: "取消", ar: "إلغاء", ja: "キャンセル", ko: "취소", th: "ยกเลิก" },
  "transfer.success": { id: "Transfer Berhasil!", en: "Transfer Successful!", ms: "Pindahan Berjaya!", zh: "转账成功！", ar: "تم التحويل بنجاح!", ja: "送金成功！", ko: "이체 성공!", th: "โอนเงินสำเร็จ!" },
  "transfer.successDesc": { id: "Dana telah dikirim ke rekening tujuan", en: "Funds have been sent to the destination account", ms: "Dana telah dihantar ke akaun tujuan", zh: "资金已发送到目标账户", ar: "تم إرسال الأموال إلى الحساب الوجهة", ja: "資金が送金先口座に送金されました", ko: "자금이 수신 계좌로 전송되었습니다", th: "โอนเงินไปยังบัญชีปลายทางเรียบร้อยแล้ว" },
  "transfer.txId": { id: "ID Transaksi", en: "Transaction ID", ms: "ID Transaksi", zh: "交易ID", ar: "معرف المعاملة", ja: "取引ID", ko: "거래 ID", th: "รหัสรายการ" },
  "transfer.time": { id: "Waktu", en: "Time", ms: "Masa", zh: "时间", ar: "الوقت", ja: "時間", ko: "시간", th: "เวลา" },
  "transfer.status": { id: "Status", en: "Status", ms: "Status", zh: "状态", ar: "الحالة", ja: "ステータス", ko: "상태", th: "สถานะ" },
  "transfer.backToHome": { id: "Kembali ke Beranda", en: "Back to Home", ms: "Kembali ke Utama", zh: "返回首页", ar: "العودة للرئيسية", ja: "ホームに戻る", ko: "홈으로 돌아가기", th: "กลับหน้าหลัก" },
  "transfer.payment": { id: "Pembayaran", en: "Payment", ms: "Pembayaran", zh: "支付", ar: "دفع", ja: "支払い", ko: "결제", th: "ชำระเงิน" },
  "transfer.purchase": { id: "Pembelian", en: "Purchase", ms: "Pembelian", zh: "购买", ar: "شراء", ja: "購入", ko: "구매", th: "ซื้อ" },
  "transfer.investment": { id: "Investasi", en: "Investment", ms: "Pelaburan", zh: "投资", ar: "استثمار", ja: "投資", ko: "투자", th: "ลงทุน" },
  "transfer.savings": { id: "Tabungan", en: "Savings", ms: "Simpanan", zh: "储蓄", ar: "مدخرات", ja: "貯蓄", ko: "저축", th: "ออมทรัพย์" },
  "transfer.loan": { id: "Pinjaman", en: "Loan", ms: "Pinjaman", zh: "贷款", ar: "قرض", ja: "ローン", ko: "대출", th: "สินเชื่อ" },
  "transfer.others": { id: "Lainnya", en: "Others", ms: "Lain-lain", zh: "其他", ar: "أخرى", ja: "その他", ko: "기타", th: "อื่นๆ" },

  // ═══ Top Up ═══
  "topup.title": { id: "Top Up", en: "Top Up", ms: "Tambah Nilai", zh: "充值", ar: "شحن", ja: "チャージ", ko: "충전", th: "เติมเงิน" },
  "topup.currency": { id: "Mata Uang", en: "Currency", ms: "Mata Wang", zh: "货币", ar: "العملة", ja: "通貨", ko: "통화", th: "สกุลเงิน" },
  "topup.selectNominal": { id: "Pilih Nominal", en: "Select Amount", ms: "Pilih Nominal", zh: "选择金额", ar: "اختر المبلغ", ja: "金額を選択", ko: "금액 선택", th: "เลือกจำนวนเงิน" },
  "topup.orEnterNominal": { id: "Atau Masukkan Nominal", en: "Or Enter Amount", ms: "Atau Masukkan Nominal", zh: "或输入金额", ar: "أو أدخل المبلغ", ja: "または金額を入力", ko: "또는 금액 입력", th: "หรือใส่จำนวนเงิน" },
  "topup.paymentMethod": { id: "Metode Pembayaran", en: "Payment Method", ms: "Kaedah Pembayaran", zh: "支付方式", ar: "طريقة الدفع", ja: "支払い方法", ko: "결제 수단", th: "วิธีการชำระเงิน" },
  "topup.bankTransfer": { id: "Transfer Bank", en: "Bank Transfer", ms: "Pindahan Bank", zh: "银行转账", ar: "تحويل بنكي", ja: "銀行振込", ko: "은행 이체", th: "โอนผ่านธนาคาร" },
  "topup.qris": { id: "QRIS", en: "QRIS", ms: "QRIS", zh: "QRIS", ar: "QRIS", ja: "QRIS", ko: "QRIS", th: "QRIS" },
  "topup.cashAgent": { id: "Bayar Tunai di Mitra/Agen", en: "Pay Cash at Partner/Agent", ms: "Bayar Tunai di Rakan/Agen", zh: "在合作伙伴/代理处现金支付", ar: "ادفع نقداً عند الشريك/الوكيل", ja: "パートナー/代理店で現金支払い", ko: "파트너/대리점에서 현금 결제", th: "ชำระเงินสดที่พาร์ทเนอร์/ตัวแทน" },
  "topup.topupNow": { id: "Top Up Sekarang", en: "Top Up Now", ms: "Tambah Nilai Sekarang", zh: "立即充值", ar: "اشحن الآن", ja: "今すぐチャージ", ko: "지금 충전", th: "เติมเงินเลย" },

  // ═══ E-Money ═══
  "emoney.title": { id: "Isi E-Money", en: "Top Up E-Money", ms: "Isi E-Money", zh: "充值电子钱包", ar: "شحن المحفظة الإلكترونية", ja: "電子マネーチャージ", ko: "전자화폐 충전", th: "เติมอีมันนี่" },
  "emoney.cardNumber": { id: "Nomor Kartu e-Money", en: "E-Money Card Number", ms: "Nombor Kad e-Money", zh: "电子钱包卡号", ar: "رقم بطاقة المحفظة", ja: "電子マネーカード番号", ko: "전자화폐 카드번호", th: "หมายเลขบัตรอีมันนี่" },
  "emoney.scanOrEnter": { id: "Scan kartu atau masukkan 16 digit nomor yang tercetak di kartu", en: "Scan card or enter the 16-digit number printed on the card", ms: "Imbas kad atau masukkan 16 digit nombor yang tercetak", zh: "扫描卡片或输入卡上印刷的16位数字", ar: "امسح البطاقة أو أدخل الرقم المكون من 16 رقمًا المطبوع", ja: "カードをスキャンするか、印刷されている16桁の番号を入力", ko: "카드를 스캔하거나 인쇄된 16자리 번호를 입력", th: "สแกนบัตรหรือกรอกหมายเลข 16 หลักที่พิมพ์บนบัตร" },
  "emoney.selectContact": { id: "Pilih dari Kontak", en: "Select from Contacts", ms: "Pilih dari Kenalan", zh: "从联系人选择", ar: "اختر من جهات الاتصال", ja: "連絡先から選択", ko: "연락처에서 선택", th: "เลือกจากรายชื่อ" },
  "emoney.selectNominal": { id: "Pilih Nominal", en: "Select Amount", ms: "Pilih Nominal", zh: "选择金额", ar: "اختر المبلغ", ja: "金額を選択", ko: "금액 선택", th: "เลือกจำนวนเงิน" },
  "emoney.payNow": { id: "Bayar Sekarang", en: "Pay Now", ms: "Bayar Sekarang", zh: "立即支付", ar: "ادفع الآن", ja: "今すぐ支払う", ko: "지금 결제", th: "ชำระเลย" },
  "emoney.paymentSuccess": { id: "Pembayaran Berhasil!", en: "Payment Successful!", ms: "Pembayaran Berjaya!", zh: "支付成功！", ar: "تم الدفع بنجاح!", ja: "支払い成功！", ko: "결제 성공!", th: "ชำระเงินสำเร็จ!" },
  "emoney.confirmPayment": { id: "Konfirmasi Pembayaran", en: "Confirm Payment", ms: "Sahkan Pembayaran", zh: "确认支付", ar: "تأكيد الدفع", ja: "支払い確認", ko: "결제 확인", th: "ยืนยันการชำระ" },
  "emoney.free": { id: "Gratis", en: "Free", ms: "Percuma", zh: "免费", ar: "مجاني", ja: "無料", ko: "무료", th: "ฟรี" },

  // ═══ Menu Screen ═══
  "menu.title": { id: "Pulsa, Tagihan & Tiket", en: "Credits, Bills & Tickets", ms: "Pulsa, Bil & Tiket", zh: "话费、账单和票务", ar: "الرصيد والفواتير والتذاكر", ja: "プリペイド・請求書・チケット", ko: "충전, 청구서 및 티켓", th: "เติมเงิน บิล และตั๋ว" },
  "menu.search": { id: "Cari layanan...", en: "Search services...", ms: "Cari perkhidmatan...", zh: "搜索服务...", ar: "ابحث عن الخدمات...", ja: "サービスを検索...", ko: "서비스 검색...", th: "ค้นหาบริการ..." },
  "menu.cheaper": { id: "Lebih Murah", en: "Cheaper", ms: "Lebih Murah", zh: "更便宜", ar: "أرخص", ja: "もっと安い", ko: "더 저렴", th: "ถูกกว่า" },
  "menu.topUpCat": { id: "Isi Ulang", en: "Top Up", ms: "Isi Semula", zh: "充值", ar: "إعادة الشحن", ja: "チャージ", ko: "충전", th: "เติมเงิน" },
  "menu.billsCat": { id: "Tagihan & Token Gratis Admin", en: "Bills & Token (Free Admin)", ms: "Bil & Token Percuma Admin", zh: "账单和代币（免管理费）", ar: "الفواتير والتوكن (مجاني)", ja: "請求書＆トークン（手数料無料）", ko: "청구서 및 토큰 (수수료 무료)", th: "บิลและโทเค็น (ฟรีค่าธรรมเนียม)" },
  "menu.entertainment": { id: "Hiburan", en: "Entertainment", ms: "Hiburan", zh: "娱乐", ar: "الترفيه", ja: "エンタメ", ko: "엔터테인먼트", th: "บันเทิง" },
  "menu.transport": { id: "Transportasi & Lainnya", en: "Transport & Others", ms: "Pengangkutan & Lain-lain", zh: "交通及其他", ar: "النقل وغيره", ja: "交通＆その他", ko: "교통 및 기타", th: "ขนส่งและอื่นๆ" },
  "menu.finance": { id: "Keuangan", en: "Finance", ms: "Kewangan", zh: "金融", ar: "المالية", ja: "金融", ko: "금융", th: "การเงิน" },

  // ═══ Account Screen ═══
  "account.title": { id: "Akun Saya", en: "My Account", ms: "Akaun Saya", zh: "我的账户", ar: "حسابي", ja: "マイアカウント", ko: "내 계정", th: "บัญชีของฉัน" },
  "account.memberInfo": { id: "Informasi Member", en: "Member Info", ms: "Maklumat Ahli", zh: "会员信息", ar: "معلومات العضو", ja: "メンバー情報", ko: "회원 정보", th: "ข้อมูลสมาชิก" },
  "account.memberId": { id: "ID Member", en: "Member ID", ms: "ID Ahli", zh: "会员ID", ar: "معرف العضو", ja: "メンバーID", ko: "회원 ID", th: "รหัสสมาชิก" },
  "account.status": { id: "Status", en: "Status", ms: "Status", zh: "状态", ar: "الحالة", ja: "ステータス", ko: "상태", th: "สถานะ" },
  "account.settings": { id: "Pengaturan Akun", en: "Account Settings", ms: "Tetapan Akaun", zh: "账户设置", ar: "إعدادات الحساب", ja: "アカウント設定", ko: "계정 설정", th: "ตั้งค่าบัญชี" },
  "account.profile": { id: "Profil", en: "Profile", ms: "Profil", zh: "个人资料", ar: "الملف الشخصي", ja: "プロフィール", ko: "프로필", th: "โปรไฟล์" },
  "account.password": { id: "Password", en: "Password", ms: "Kata Laluan", zh: "密码", ar: "كلمة المرور", ja: "パスワード", ko: "비밀번호", th: "รหัสผ่าน" },
  "account.pin": { id: "PIN", en: "PIN", ms: "PIN", zh: "PIN码", ar: "رقم التعريف", ja: "PIN", ko: "PIN", th: "PIN" },
  "account.services": { id: "Layanan & Lainnya", en: "Services & More", ms: "Perkhidmatan & Lain-lain", zh: "服务及其他", ar: "الخدمات والمزيد", ja: "サービス＆その他", ko: "서비스 및 기타", th: "บริการและอื่นๆ" },
  "account.kyc": { id: "KYC & Menjadi Mitra", en: "KYC & Become Partner", ms: "KYC & Jadi Rakan", zh: "KYC和成为合作伙伴", ar: "KYC وكن شريكاً", ja: "KYC＆パートナーになる", ko: "KYC 및 파트너 되기", th: "KYC และเป็นพาร์ทเนอร์" },
  "account.kycDesc": { id: "Verifikasi akun & jadi mitra", en: "Verify account & become partner", ms: "Sahkan akaun & jadi rakan", zh: "验证账户并成为合作伙伴", ar: "تحقق من الحساب وكن شريكاً", ja: "アカウント認証＆パートナーになる", ko: "계정 인증 및 파트너 되기", th: "ยืนยันบัญชีและเป็นพาร์ทเนอร์" },
  "account.mutation": { id: "Mutasi", en: "Transactions", ms: "Mutasi", zh: "交易记录", ar: "المعاملات", ja: "取引履歴", ko: "거래 내역", th: "รายการเคลื่อนไหว" },
  "account.mutationDesc": { id: "Riwayat transaksi lengkap", en: "Complete transaction history", ms: "Sejarah transaksi penuh", zh: "完整交易记录", ar: "سجل المعاملات الكامل", ja: "完全な取引履歴", ko: "전체 거래 내역", th: "ประวัติการทำรายการทั้งหมด" },
  "account.devApi": { id: "Developer API", en: "Developer API", ms: "API Pembangun", zh: "开发者API", ar: "واجهة برمجة المطورين", ja: "デベロッパーAPI", ko: "개발자 API", th: "API นักพัฒนา" },
  "account.devApiDesc": { id: "API keys & webhooks", en: "API keys & webhooks", ms: "Kunci API & webhooks", zh: "API密钥和webhooks", ar: "مفاتيح API وwebhooks", ja: "APIキー＆Webhook", ko: "API 키 & 웹후크", th: "API keys & webhooks" },
  "account.logout": { id: "Log Out", en: "Log Out", ms: "Log Keluar", zh: "退出登录", ar: "تسجيل الخروج", ja: "ログアウト", ko: "로그아웃", th: "ออกจากระบบ" },
  "account.others": { id: "Lainnya", en: "More", ms: "Lagi", zh: "更多", ar: "المزيد", ja: "その他", ko: "더보기", th: "เพิ่มเติม" },
  "account.generalSettings": { id: "Pengaturan Umum", en: "General Settings", ms: "Tetapan Umum", zh: "通用设置", ar: "الإعدادات العامة", ja: "一般設定", ko: "일반 설정", th: "ตั้งค่าทั่วไป" },
  "account.generalSettingsDesc": { id: "Notifikasi, bahasa, tampilan", en: "Notifications, language, display", ms: "Pemberitahuan, bahasa, paparan", zh: "通知、语言、显示", ar: "الإشعارات واللغة والعرض", ja: "通知、言語、表示", ko: "알림, 언어, 표시", th: "การแจ้งเตือน ภาษา การแสดงผล" },
  "account.security": { id: "Keamanan Akun", en: "Account Security", ms: "Keselamatan Akaun", zh: "账户安全", ar: "أمان الحساب", ja: "アカウントセキュリティ", ko: "계정 보안", th: "ความปลอดภัยบัญชี" },
  "account.securityDesc": { id: "Password, PIN, 2FA", en: "Password, PIN, 2FA", ms: "Kata laluan, PIN, 2FA", zh: "密码、PIN、双重验证", ar: "كلمة المرور، PIN، المصادقة الثنائية", ja: "パスワード、PIN、2FA", ko: "비밀번호, PIN, 2FA", th: "รหัสผ่าน PIN 2FA" },
  "account.inviteFriends": { id: "Undang Teman", en: "Invite Friends", ms: "Jemput Rakan", zh: "邀请朋友", ar: "ادعُ أصدقاءك", ja: "友達を招待", ko: "친구 초대", th: "เชิญเพื่อน" },
  "account.inviteDesc": { id: "Dapatkan bonus referral", en: "Get referral bonus", ms: "Dapatkan bonus rujukan", zh: "获得推荐奖励", ar: "احصل على مكافأة الإحالة", ja: "紹介ボーナスを獲得", ko: "추천 보너스 받기", th: "รับโบนัสแนะนำ" },
  "account.helpCenter": { id: "Pusat Bantuan", en: "Help Center", ms: "Pusat Bantuan", zh: "帮助中心", ar: "مركز المساعدة", ja: "ヘルプセンター", ko: "고객센터", th: "ศูนย์ช่วยเหลือ" },
  "account.helpDesc": { id: "FAQ & bantuan lainnya", en: "FAQ & other help", ms: "FAQ & bantuan lain", zh: "常见问题和其他帮助", ar: "الأسئلة الشائعة والمساعدة", ja: "よくある質問＆その他のヘルプ", ko: "FAQ 및 기타 도움말", th: "คำถามที่พบบ่อยและอื่นๆ" },
  "account.chatbot": { id: "Chat Bot Admin", en: "Admin Chat Bot", ms: "Bot Sembang Admin", zh: "管理员聊天机器人", ar: "روبوت محادثة المشرف", ja: "管理者チャットボット", ko: "관리자 챗봇", th: "แชทบอทแอดมิน" },
  "account.chatbotDesc": { id: "Tanya langsung ke admin", en: "Ask admin directly", ms: "Tanya terus kepada admin", zh: "直接咨询管理员", ar: "اسأل المشرف مباشرة", ja: "管理者に直接質問", ko: "관리자에게 직접 문의", th: "ถามแอดมินโดยตรง" },
  "account.lumadex": { id: "Lumadex Website", en: "Lumadex Website", ms: "Laman Web Lumadex", zh: "Lumadex 网站", ar: "موقع Lumadex", ja: "Lumadex ウェブサイト", ko: "Lumadex 웹사이트", th: "เว็บไซต์ Lumadex" },

  // ═══ Settings ═══
  "settings.title": { id: "Pengaturan Umum", en: "General Settings", ms: "Tetapan Umum", zh: "通用设置", ar: "الإعدادات العامة", ja: "一般設定", ko: "일반 설정", th: "ตั้งค่าทั่วไป" },
  "settings.notification": { id: "Notifikasi", en: "Notifications", ms: "Pemberitahuan", zh: "通知", ar: "الإشعارات", ja: "通知", ko: "알림", th: "การแจ้งเตือน" },
  "settings.notifDesc": { id: "Atur notifikasi push & email", en: "Manage push & email notifications", ms: "Atur pemberitahuan tolak & e-mel", zh: "管理推送和邮件通知", ar: "إدارة إشعارات الدفع والبريد الإلكتروني", ja: "プッシュ＆メール通知を管理", ko: "푸시 및 이메일 알림 관리", th: "จัดการการแจ้งเตือนและอีเมล" },
  "settings.language": { id: "Bahasa", en: "Language", ms: "Bahasa", zh: "语言", ar: "اللغة", ja: "言語", ko: "언어", th: "ภาษา" },
  "settings.display": { id: "Tampilan", en: "Display", ms: "Paparan", zh: "显示", ar: "العرض", ja: "表示", ko: "디스플레이", th: "การแสดงผล" },
  "settings.darkMode": { id: "Mode Gelap", en: "Dark Mode", ms: "Mod Gelap", zh: "深色模式", ar: "الوضع الداكن", ja: "ダークモード", ko: "다크 모드", th: "โหมดมืด" },
  "settings.lightMode": { id: "Mode Terang", en: "Light Mode", ms: "Mod Terang", zh: "浅色模式", ar: "الوضع الفاتح", ja: "ライトモード", ko: "라이트 모드", th: "โหมดสว่าง" },
  "settings.selectLanguage": { id: "Pilih Bahasa", en: "Select Language", ms: "Pilih Bahasa", zh: "选择语言", ar: "اختر اللغة", ja: "言語を選択", ko: "언어 선택", th: "เลือกภาษา" },
  "settings.about": { id: "Tentang Aplikasi", en: "About App", ms: "Tentang Aplikasi", zh: "关于应用", ar: "حول التطبيق", ja: "アプリについて", ko: "앱 정보", th: "เกี่ยวกับแอป" },
  "settings.version": { id: "Versi", en: "Version", ms: "Versi", zh: "版本", ar: "الإصدار", ja: "バージョン", ko: "버전", th: "เวอร์ชัน" },
  "settings.build": { id: "Build", en: "Build", ms: "Binaan", zh: "构建", ar: "البناء", ja: "ビルド", ko: "빌드", th: "บิลด์" },
  "settings.languageChanged": { id: "Bahasa diubah ke", en: "Language changed to", ms: "Bahasa ditukar ke", zh: "语言已更改为", ar: "تم تغيير اللغة إلى", ja: "言語が変更されました：", ko: "언어가 변경되었습니다:", th: "เปลี่ยนภาษาเป็น" },

  // ═══ Common ═══
  "common.back": { id: "Kembali", en: "Back", ms: "Kembali", zh: "返回", ar: "رجوع", ja: "戻る", ko: "뒤로", th: "กลับ" },
  "common.save": { id: "Simpan", en: "Save", ms: "Simpan", zh: "保存", ar: "حفظ", ja: "保存", ko: "저장", th: "บันทึก" },
  "common.close": { id: "Tutup", en: "Close", ms: "Tutup", zh: "关闭", ar: "إغلاق", ja: "閉じる", ko: "닫기", th: "ปิด" },
  "common.search": { id: "Cari", en: "Search", ms: "Cari", zh: "搜索", ar: "بحث", ja: "検索", ko: "검색", th: "ค้นหา" },
  "common.checkout": { id: "Checkout", en: "Checkout", ms: "Daftar Keluar", zh: "结账", ar: "الدفع", ja: "チェックアウト", ko: "결제하기", th: "ชำระเงิน" },
  "common.freeAdmin": { id: "Gratis Admin", en: "Free Admin Fee", ms: "Percuma Admin", zh: "免管理费", ar: "رسوم مجانية", ja: "手数料無料", ko: "수수료 무료", th: "ฟรีค่าธรรมเนียม" },
  "common.success": { id: "Berhasil", en: "Success", ms: "Berjaya", zh: "成功", ar: "ناجح", ja: "成功", ko: "성공", th: "สำเร็จ" },
  "common.continue": { id: "Lanjutkan", en: "Continue", ms: "Teruskan", zh: "继续", ar: "متابعة", ja: "続行", ko: "계속", th: "ต่อไป" },
  "common.endToEnd": { id: "Transaksi ini dilindungi enkripsi end-to-end", en: "Protected by end-to-end encryption", ms: "Dilindungi penyulitan hujung-ke-hujung", zh: "受端到端加密保护", ar: "محمي بتشفير من طرف إلى طرف", ja: "エンドツーエンド暗号化で保護", ko: "종단간 암호화로 보호", th: "ป้องกันด้วยการเข้ารหัสครบวงจร" },
};

type I18nContextType = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: "id",
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem("app-lang");
    return (saved as LangCode) || "id";
  });

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    localStorage.setItem("app-lang", newLang);
  }, []);

  const translate = useCallback((key: string): string => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang] || entry["id"] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

import { useState } from "react";
import { ArrowLeft, BookOpen, Clock, TrendingUp, Share2, Bookmark, Newspaper, Award, Tag, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Article {
  id: number;
  titleKey: string;
  descKey: string;
  mins: number;
  category: string;
  icon: typeof BookOpen;
  date: string;
  featured?: boolean;
}

const articles: Article[] = [
  { id: 1, titleKey: "home.article1Title", descKey: "home.article1Desc", mins: 5, category: "finance", icon: BookOpen, date: "2025-03-01", featured: true },
  { id: 2, titleKey: "home.article2Title", descKey: "home.article2Desc", mins: 4, category: "tips", icon: TrendingUp, date: "2025-02-28" },
  { id: 3, titleKey: "home.article3Title", descKey: "home.article3Desc", mins: 3, category: "tech", icon: ShieldCheck, date: "2025-02-27" },
  { id: 4, titleKey: "news.article4Title", descKey: "news.article4Desc", mins: 6, category: "tech", icon: ShieldCheck, date: "2025-02-25" },
  { id: 5, titleKey: "news.article5Title", descKey: "news.article5Desc", mins: 3, category: "finance", icon: Award, date: "2025-02-23", featured: true },
  { id: 6, titleKey: "news.article6Title", descKey: "news.article6Desc", mins: 2, category: "promo", icon: Tag, date: "2025-02-20" },
];

interface NewsScreenProps {
  onBack: () => void;
}

export default function NewsScreen({ onBack }: NewsScreenProps) {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filters = [
    { key: "all", label: t("news.all") },
    { key: "finance", label: t("news.finance") },
    { key: "tech", label: t("news.tech") },
    { key: "tips", label: t("news.tips") },
    { key: "promo", label: t("news.promo") },
  ];

  const filtered = activeFilter === "all" ? articles : articles.filter(a => a.category === activeFilter);
  const featured = articles.find(a => a.featured);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedArticle(null)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground truncate flex-1">{t("news.title")}</h1>
            <button onClick={(e) => toggleBookmark(selectedArticle.id, e)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
              <Bookmark className={`w-4 h-4 ${bookmarked.has(selectedArticle.id) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
            </button>
          </div>
        </div>
        <div className="px-4 pt-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{selectedArticle.category}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {selectedArticle.mins} {t("home.minRead")}
            </span>
            <span className="text-xs text-muted-foreground">{selectedArticle.date}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground leading-tight">{t(selectedArticle.titleKey)}</h2>
          <div className="w-full h-48 rounded-2xl bg-secondary flex items-center justify-center">
            <selectedArticle.icon className="w-16 h-16 text-muted-foreground/30" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedArticle.descKey)}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedArticle.descKey)}</p>
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium text-foreground flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> {t("news.shareArticle")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">{t("news.title")}</h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Featured Article */}
        {activeFilter === "all" && featured && (
          <button
            onClick={() => setSelectedArticle(featured)}
            className="w-full text-left glass-card overflow-hidden neon-border"
          >
            <div className="w-full h-36 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
              <featured.icon className="w-12 h-12 text-primary/40" />
              <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> {t("news.trending")}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{featured.category}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" /> {featured.mins} {t("home.minRead")}
                </span>
              </div>
              <p className="font-bold text-foreground">{t(featured.titleKey)}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t(featured.descKey)}</p>
            </div>
          </button>
        )}

        {/* Article List */}
        {filtered.map(article => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="w-full text-left glass-card p-4 flex gap-3 items-start group hover:border-primary/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <article.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{article.category}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" /> {article.mins} {t("home.minRead")}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto">{article.date}</span>
              </div>
              <p className="font-medium text-sm text-foreground line-clamp-1">{t(article.titleKey)}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{t(article.descKey)}</p>
            </div>
            <button
              onClick={(e) => toggleBookmark(article.id, e)}
              className="mt-1 flex-shrink-0"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked.has(article.id) ? "text-primary fill-primary" : "text-muted-foreground/40"}`} />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
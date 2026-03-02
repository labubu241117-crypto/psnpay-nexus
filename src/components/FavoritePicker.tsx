import { useState } from "react";
import { Star, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { type Favorite, removeFavorite } from "@/lib/favorites";

interface FavoritePickerProps {
  favorites: Favorite[];
  onSelect: (values: Record<string, string>) => void;
  onRemove: (id: string) => void;
}

export default function FavoritePicker({ favorites, onSelect, onRemove }: FavoritePickerProps) {
  const [expanded, setExpanded] = useState(false);

  if (favorites.length === 0) return null;

  const shown = expanded ? favorites : favorites.slice(0, 3);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Star className="w-4 h-4 text-primary fill-primary" />
        <p className="text-sm font-medium text-muted-foreground">Nomor Tersimpan</p>
      </div>
      <div className="space-y-2">
        {shown.map((fav) => (
          <div
            key={fav.id}
            className="glass-card p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-muted/50 transition-all group"
            onClick={() => onSelect(fav.values)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{fav.label}</p>
              <p className="text-xs text-muted-foreground truncate">
                {Object.values(fav.values).filter(Boolean).join(" · ")}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(fav.id);
              }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      {favorites.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-xs text-primary flex items-center justify-center gap-1 py-1"
        >
          {expanded ? <><ChevronUp className="w-3 h-3" /> Sembunyikan</> : <><ChevronDown className="w-3 h-3" /> Lihat semua ({favorites.length})</>}
        </button>
      )}
    </div>
  );
}

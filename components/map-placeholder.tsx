"use client";

import { MapPin } from "lucide-react";

export function MapPlaceholder() {
  return (
    <section className="px-6 md:px-0">
      <div className="container">
        <div className="relative h-[380px] rounded-3xl overflow-hidden border border-espresso/10 bg-[repeating-linear-gradient(45deg,#F6E4E2,#F6E4E2_10px,#FFF8F2_10px,#FFF8F2_20px)]">
          {/*
            Replace this block with a real embed, e.g.:
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone/70 backdrop-blur-sm">
            <span className="h-14 w-14 rounded-full bg-brown flex items-center justify-center shadow-card">
              <MapPin className="h-6 w-6 text-paper" />
            </span>
            <p className="font-display text-xl text-espresso">Tapiola, Espoo, Finland</p>
            <p className="text-sm text-espresso/60 font-mono">Google Maps embed goes here</p>
          </div>
        </div>
      </div>
    </section>
  );
}

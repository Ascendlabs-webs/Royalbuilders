'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEFAULT_LISTINGS, type ListingProperty } from '@/data/site-data';
import { MapPin, Tag, Search } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const STORAGE_KEY = 'royal-builders-listings';

function loadListings(): ListingProperty[] {
  if (typeof window === 'undefined') return [...DEFAULT_LISTINGS];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...DEFAULT_LISTINGS];
    }
  }
  return [...DEFAULT_LISTINGS];
}

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function RealEstateListings() {
  const [listings, setListings] = useState<ListingProperty[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    // CMS-first: live properties from /api/properties, localStorage as fallback.
    fetch("/api/properties", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && Array.isArray(data.properties) && data.properties.length > 0) {
          setListings(data.properties);
        } else if (!cancelled) {
          setListings(loadListings());
        }
      })
      .catch(() => {
        if (!cancelled) setListings(loadListings());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredListings = listings
    .filter(l => {
      const matchesType = filter === 'all' || l.type.toLowerCase() === filter.toLowerCase();
      const matchesSearch = !search ||
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase()) ||
        l.id.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      // Available first, then reserved, then sold; drafts last.
      const rank = (s: string) => (s === 'available' ? 0 : s === 'reserved' ? 1 : s === 'sold' ? 2 : 3);
      return rank(a.status) - rank(b.status);
    });

  const statusBadge = (status: string) => {
    if (status === 'available') return 'bg-crimson-500 text-white';
    if (status === 'sold') return 'bg-navy-950/80 text-white';
    if (status === 'reserved') return 'bg-amber-500 text-navy-950';
    return 'bg-mist text-graphite';
  };

  const types = ['all', ...Array.from(new Set(listings.map(l => l.type)))];

  return (
    <section className="bg-alabaster py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeading
          kicker="Available Properties"
          title={
            <>
              Current <span className="text-gradient-crimson">Listings</span>
            </>
          }
          subtitle="Explore our verified property listings. Add new properties from the CRM dashboard."
        />

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" size={18} />
            <input
              type="text"
              placeholder="Search by title, location, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-navy-900/10 bg-white py-3 pl-11 pr-4 text-sm transition-all placeholder:text-graphite focus:border-crimson-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-crimson-500 text-white'
                  : 'bg-white text-graphite border border-navy-900/10 hover:border-crimson-500/50'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>

        {filteredListings.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-graphite">No available listings found. Check back later or add properties via CRM.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Reveal key={listing.id}>
                <Link
                  href={`/real-estate/${encodeURIComponent(listing.id)}`}
                  className="group block overflow-hidden border border-navy-900/10 bg-white transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={listing.photo}
                      alt={listing.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-crimson-500 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                        <Tag size={12} />
                        {listing.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase ${statusBadge(listing.status)}`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-navy-900">{listing.title}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-graphite">
                      <MapPin size={14} className="text-crimson-500" />
                      {listing.location}
                    </div>
                    <div className="mt-4 border-t border-navy-900/10 pt-4">
                      <p className="font-display text-2xl font-bold text-crimson-600">
                        {formatPrice(listing.price)}
                      </p>
                      <p className="mt-1 text-xs text-graphite">ID: {listing.id}</p>
                      <p className="mt-3 text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                        View Details →
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}


      </div>
    </section>
  );
}
